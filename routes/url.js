const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const { validateToken } = require("./JWT");
const Url = require('../models/Url');


router.post('/shorten',validateToken, async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');


  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }


  const urlCode = shortid.generate();


  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url && url.shortUrl) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

router.post('/customShorten',validateToken, async (req, res) => {
  const { longUrl } = req.body;
  const { customShort } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }


  const urlCode = customShort;

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});


router.get("/all",validateToken, async (req, res) => {
  Url.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
})

router.put('/update/:id',validateToken, async(req, res) => {
  try {
      const {id} = req.params;
      const update = {longUrl: req.body.longUrl,
      shortUrl: undefined,
      urlCode:undefined,
      date: new Date()
    };
      const url = await Url.findByIdAndUpdate(id, update);
      // we cannot find any url in database
      if(!url){
          return res.status(404).json({message: `cannot find any url with ID ${id}`})
      }
      const updatedUrl = await Url.findById(id);
      res.status(200).json(updatedUrl);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

router.delete("/delete/:id",validateToken,async (req,res)=>{

    try {
        const {id} = req.params;
        const url = await Url.findByIdAndDelete(id);
        if(!url){
            return res.status(404).json({message: `cannot find any url with ID ${id}`})
        }
        res.status(200).json("Url deleted successfully.");
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
