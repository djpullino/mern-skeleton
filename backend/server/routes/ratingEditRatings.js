const express = require("express");
const router = express.Router();
const commentModel = require('../models/userRatings')

router.post('/editRatings', async (req, res) => {
    const { _id, username, stationName, ratings, comments, Date } = req.body;

    try {
      await commentModel.findByIdAndUpdate(_id, {
        ratings : ratings,
        comments: comments,
        Date : Date,
      });
      res.status(200).send('Comment updated successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error updating comment');
    }
  });

module.exports = router;