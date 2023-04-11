const express = require("express");
const router = express.Router();
const deleteRatings = require('../models/userRatings')

router.post('/delete', async (req, res) => {
    const ratings = await deleteRatings.deleteOne();
    return res.json(ratings)
  })

  module.exports = router;