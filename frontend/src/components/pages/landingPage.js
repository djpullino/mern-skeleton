import React, {} from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
const Landingpage = () => {
    
    return (
        <div className="d-flex justify-content-center">
        <Card style={{ width: '40rem' }} className="mx-20 my-20"> 
        <Card.Img src ="https://external-preview.redd.it/KWkc0wreGafiCXOXC2ymxUv3qmoHTwK6cDZLOwxiBIg.png?auto=webp&s=97c093a33170d7c1f7b5250debe109aaacba3ce5" />
        <Card.Body>
          <Card.Title>MBTA Disabled Accesible Stops</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">An easy to understand webpage that displays disabled accesible trainstops</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
      </div>
    )
}

export default Landingpage