import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';


const RatingPage = () => {
  const [ratings, setRatings] = useState(null);
  const [comments, setComments] = useState(null);
  const [selectedLine, setSelectedLine] = useState('');
  const [validLines, setValidLines] = useState([]);
  const [username, setUsername] = useState('');
  const [stationName, setStationName] = useState(selectedLine);



  // const handleRating = (event) => {
  //   setRating(event.target.value);
  // };



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log('handleSubmit: ', username, selectedLine, ratings, comments, Date);
      const response = await axios.post('http://localhost:8081/ratings/add', {
        username: username,
        // stationName : stationName,
        stationName: selectedLine,
        ratings: ratings,
        comments: comments,
        Date: new Date(),
      });
      console.log('response from server: ', response.data);
      alert("Rating added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add Rating. Please try again later.");
    }
  };





  useEffect(() => { //Will fetch the neccesary routes so our user can select one.
    async function fetchRoutes() { //filters all possible routes in the mbta which can be used
      const result = await axios('https://api-v3.mbta.com/routes');
      const validRoutes = result.data.data.map(route => route.attributes.long_name);
      setValidLines(validRoutes);
    }
    fetchRoutes();
  }, []);


  function handleSelect(event) {
    const selectedLine = event.target.value; // get the selected line from the dropdown
    setSelectedLine(selectedLine);
  }




  return (
    <form method='post' onSubmit={handleSubmit}>
      <div className="star-rating" style={{ height: 900, background: '#454545', textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat', color: 'white' }}>
        <h1>Please select a stop to rate</h1>
        <br></br>

        <select style={{ backgroundColor: '#0c0c1f', color: 'white', textAlign: 'center' }} id="stopsTest" value={selectedLine} onChange={handleSelect}>
          <option value="">All Lines</option>
          {validLines.map(line => <option key={line} value={line}>{line}</option>)}
        </select>
        <button style={{ backgroundColor: '#cc5c99', color: 'white'}} onClick="submit" type="button">Enter</button>

        <h3>Selected Stop is : {selectedLine}</h3>


        <input type="text" placeholder="Enter your name" value={username} onChange={(event) => setUsername(event.target.value)} />
       

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
              onClick={() => setRatings(ratingValue)}
            />
            <FaStar
              clasName="star"
              size={100}
              style={{ cursor: "pointer" }}
              color={ratingValue <= (ratings) ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        })}
        <br></br>
        <br></br>
        <h3>
          The rating you gave for {selectedLine} are :  {ratings} stars.
        </h3>
        <br></br>

        <textarea
          value={comments}
          onChange={(event) => setComments(event.target.value)}
          placeholder="Enter your comment here"
          style={{ backgroundColor: "#0c0c1f", color: "white" }}
        />

        {/* <CommentBox /> */}
        <br></br>
        <button variant="primary" type="submit">Submit</button>
      </div>
    </form>
  );


};

export default RatingPage;
