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
      setAccessibleStops(filteredStops)
    }
    fetchData();

    async function fetchRoutes() {
      const result = await axios('https://api-v3.mbta.com/routes');
      const validRoutes = result.data.data.map(route => route.attributes.long_name);
      setValidLines(validRoutes);
    }
    fetchRoutes();
  }, []);

  function submit(event) {
    event.preventDefault();
    const userStops = document.getElementById('stopsTest').value.toLowerCase();
    const filteredStops = stops.filter(stop =>
      stop.attributes['wheelchair_boarding'] === 1 &&
      stop.relationships.route.data &&
      stop.relationships.route.data?.attributes?.long_name?.toLowerCase() === userStops.toLowerCase()
    );
    setAccessibleStops(filteredStops);
    setSelectedLine(userStops);
  }

  return (
    <div>
      <div style={{ textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat' }}>
        <label htmlFor="stopsTest">Choose a Line to see its Accessible Stops:</label>
        <input type="text" id="stopsTest" />
        <button onClick={submit} type="button">Enter</button>
      </div>

      <h1 style={{ textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat' }}>
        {selectedLine ? `Accessible Stops for ${selectedLine} Line` : 'All Accessible Stops'}
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

