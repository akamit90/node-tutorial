const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/',async(req,res)=>{
    try {
        const data = req.body; // assuming the request body contains the person data

        // create a new person document using the mongoose model
        const newMenu = new MenuItem(data);

        //save the person to the db
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response); 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get('/',async(req,res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get('/:taste',async(req,res)=>{
    try {
        const taste = req.params.taste;

        if(taste === 'sweet' || taste === 'sour' || taste === 'bitter' || taste === 'salty' || taste === 'spicy'){
            const response = await MenuItem.find({taste: taste});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'data not found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports = router