import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import TrainStops from './trainStops';
import axios from 'axios';


const RatingPage = () => {

  const selectTrain = new TrainStops;

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [stops, setStops] = useState([]);
  const [accessibleStops, setAccessibleStops] = useState([]);
  const [selectedLine, setSelectedLine] = useState('');
  const [validLines, setValidLines] = useState([]);



  const handleRating = (event) => {
    setRating(event.target.value);
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(`Submitted rating: ${rating}`);
  //   // Add code to submit rating to backend or store in state
  //   console.log("Rating for this stop is : " + rating);
  // };

  useEffect(() => { //Will fetch the neccesary routes so our user can select one.
    async function fetchRoutes() { //filters all possible routes in the mbta which can be used
      const result = await axios('https://api-v3.mbta.com/routes');
      const validRoutes = result.data.data.map(route => route.attributes.long_name);
      setValidLines(validRoutes);
    }
    fetchRoutes();
  }, []);


  // Have to update the eventListener, if needed.
  function submit(event) {
  }

  function handleSelect(event) {
    setSelectedLine(event.target.value); //function which takes the value from the dropdown
  }


  return (

    <div className="star-rating" style={{ background: "0c0c1f", textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat' }}>
      <h1>Please select a stop to rate !!</h1>
      <br></br>

      <select style={{ backgroundColor: '#0c0c1f', color: 'white', textAlign: 'center' }} id="stopsTest" value={selectedLine} onChange={handleSelect}>
        <option value="">All Lines</option>
        {validLines.map(line => <option key={line} value={line}>{line}</option>)}
      </select>
      <button style={{ backgroundColor: '#cc5c99', color: 'white' }} onClick={submit} type="button">Enter</button>

      <h3>Selected Stop is : {selectedLine}</h3>

      <br></br>
      {[...Array(5)].map((star, index) => {

        const ratingValue = index + 1;
        //Will map out the array so it shows 5 stars.
        return <label>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            style={{ display: "none", cursor: "pointer" }}
            onClick={() => setRating(ratingValue)} 
          />
          <FaStar
            clasName="star"
            size={100}
            style={{ cursor: "pointer" }}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}

            onMouseEnter={() => setHover(ratingValue)}
            onMouseDown={() => setHover(null)}
          />
        </label>
      })}
      <br></br>
      <br></br>
      <h3>
        The rating you gave for {selectedLine} are :  {rating} stars.
      </h3>




    </div>
  );


};

export default RatingPage;
