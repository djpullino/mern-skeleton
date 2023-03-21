import React, { useState } from 'react';

const RatingPage = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted rating: ${rating}`);
    // Add code to submit rating to backend or store in state
    console.log("Rating for this stop is : " + rating);
  };
  
  function changeBackground(color) {
    document.body.style.background = color;
  }
 
  window.addEventListener("load",function() { changeBackground('') });

  

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button 
            type="button" 
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => setRating(index)}
          >
           
            <h1 className="star">&#9733;</h1>
          </button>
        );
      })}
    </div>
  );

  
};
export default RatingPage;
