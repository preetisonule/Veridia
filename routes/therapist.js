const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');

// Get all therapists
router.get('/', async (req, res) => {
    const therapists = await Therapist.find();
    res.json(therapists);
});

// Add new therapist
router.post('/', async (req, res) => {
    const therapist = new Therapist(req.body);
    await therapist.save();
    res.json(therapist);
});

module.exports = router;
