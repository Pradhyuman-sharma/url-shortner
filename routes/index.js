const express = require('express');
const router = express.Router();
const { validateToken } = require("./JWT");
const Url = require('../models/Url');


router.get("/",(req,res)=>{
  res.status(200).json("Url-shortner is running...")
})

router.get('/:urlCode', validateToken,async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;
