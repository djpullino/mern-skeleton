import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function TrainStops() {
  const [stops, setStops] = useState([]);
  const [accessibleStops, setAccessibleStops] = useState([]);
  const [selectedLine, setSelectedLine] = useState('');
  const [validLines, setValidLines] = useState([]);

   var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', "https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
  document.head.appendChild(link);

  useEffect(() => {
    async function fetchData() {
      const result = await axios('https://api-v3.mbta.com/stops');
      const filteredStops = result.data.data.filter(stop => stop.attributes.wheelchair_boarding === 1);
      setStops(filteredStops);
      setAccessibleStops(filteredStops); //filters all stops to be ones that are accessible
    }
    fetchData();

    async function fetchRoutes() { //filters all possible routes in the mbta which can be used
      const result = await axios('https://api-v3.mbta.com/routes');
      const validRoutes = result.data.data.map(route => route.attributes.long_name);
      setValidLines(validRoutes);
    }
    fetchRoutes();
  }, []);

  function submit(event) {
  event.preventDefault();
  if (selectedLine === "") { // if user selects "All Lines"
    const filteredStops = stops.filter(stop => stop.attributes.wheelchair_boarding === 1);
    setAccessibleStops(filteredStops);
  } else { // if user selects a specific line
    const userStops = stops.filter(stop =>
      stop.attributes['wheelchair_boarding'] === 1 &&
      stop.relationships.route.data &&
      stop.relationships.route.data?.attributes?.long_name === selectedLine
    );
    setAccessibleStops(userStops);
  }
}

  function handleSelect(event) {
    setSelectedLine(event.target.value); //function which takes the value from the dropdown
  }

  return (
    <div style ={{backgroundColor: '#0c0c1f', color: 'white'}}> 
      <div style={{ textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat' , backgroundColor: '#0c0c1f' }}>  
        <label htmlFor="stopsTest">Choose a Line to see its Accessible Stops:</label> 
        <br></br>
        <select style={{backgroundColor: '#0c0c1f', color: 'white', textAlign: 'center'}}id="stopsTest" value={selectedLine} onChange={handleSelect}>
          <option value="">All Lines</option>
          {validLines.map(line => <option key={line} value={line}>{line}</option>)}
        </select>
        <button style={{backgroundColor: '#cc5c99', color:'white'}}onClick={submit} type="button">Enter</button>
      </div>

      <h1 style={{ textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat' }}>
        {selectedLine ? `Accessible Stops for ${selectedLine}` : 'All Accessible Stops'}
      </h1>

      {accessibleStops.map(stop => (
        <div key={stop.id} style={{ paddingLeft: "10px", textAlign: 'center', fontFamily: 'Montserrat' }}>
          <h3>{stop.attributes.header}</h3>
          <p>{stop.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TrainStops;