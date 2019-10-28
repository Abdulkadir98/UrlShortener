const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/Url');

// @route POST /api/url/shorten
router.post('/shorten', async (req, res) => {
    const {longUrl} = req.body;
    const baseUrl = config.get('baseUrl')
    if(!validUrl.isUri(baseUrl)) {
        res.status(400).json('Invalid base url');
    }

    // Create url code
    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)) {

        try {
            let url = await Url.findOne({longUrl});
            if (url) {
                res.json(url);
            } 
            else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date: new Date()
                });
                await url.save();
                res.json(url);
        }
        
        } catch(err) {
            console.log(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(400).json('Invalid url');
    }


});

module.exports = router;