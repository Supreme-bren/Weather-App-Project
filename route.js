const express = require('express');
const router = express.Router();
const needle = require('needle');
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const url = require('url');

router.get('/',  async(req, res) =>{
    try{
        const params = new URLSearchParams({
            ['key']: API_KEY,
            ...url.parse(req.url, true).query
        })
        const apiRes = await needle('get', `${API_URL}?${params}` );
        const data = apiRes.body
        res.status(200).json(data)
    } catch(error){
        res.status(500).json({error})
    }
})

module.exports = router