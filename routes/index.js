const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route GET /:code
// @desc it redirects to the original url

router.get('/:code', async (req, res) => {
    try {
        let url = await Url.findOne({urlCode: req.params.code});
        if(url) {
            return res.redirect(url.longUrl);
        }
        else {
            return res.status(404).json('Url not found');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Sever error');
    }
});

module.exports = router;