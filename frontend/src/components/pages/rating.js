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
    <div>
      <h1>Rate this page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="radio" id="star1" name="rating" value="1" onChange={handleRating}/>
          <label htmlFor="star1">1 star</label>
        </div>
        <div>
          <input type="radio" id="star2" name="rating" value="2" onChange={handleRating}/>
          <label htmlFor="star2">2 stars</label>
        </div>
        <div>
          <input type="radio" id="star3" name="rating" value="3" onChange={handleRating}/>
          <label htmlFor="star3">3 stars</label>
        </div>
        <div>
          <input type="radio" id="star4" name="rating" value="4" onChange={handleRating}/>
          <label htmlFor="star4">4 stars</label>
        </div>
        <div>
          <input type="radio" id="star5" name="rating" value="5" onChange={handleRating}/>
          <label htmlFor="star5">5 stars</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default RatingPage;
