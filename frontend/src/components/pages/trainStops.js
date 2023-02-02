import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function TrainStops() {
  const [stops, setAlerts] = useState([]);

  var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', "https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
document.head.appendChild(link);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/stops',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);

  function submit(){
    var userStops = document.getElementById('stopsTest')
  
  }

  

  return (

    
    <div>
      
    <div style={{textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat'}}>
      <form>
        Choose a Line to see its Accessible Stops: <input type="text" id="stopsTest"></input>
      </form>
      <button onclick="submit();" id="button1" type="button">Enter</button>
      </div>
      {/* {stops.map(stops => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>Stops</Card.Title>
        <Card.Text>{stops.attributes.header}{stops.attributes.description}</Card.Text>
        </Card.Body>
      </Card>
      ))} */}

    

     

        <h1 style={{textAlign: 'center', paddingTop: "10px", fontFamily: 'Montserrat'}}>Stops</h1>
      {stops.map(stops => (
        <div key={stops.id} style={{paddingLeft: "10px", textAlign: 'center', fontFamily: 'Montserrat'}}>
          <h3  >{stops.attributes.header}</h3>
          <p>{stops.attributes.description}</p>
          </div>
      ))}
    </div>
    
  );
  
}

export default TrainStops;