const express = require('express');
const router = express.Router();
const SessionNotes = require('../models/SessionNotes');

// Get all session notes
router.get('/', async (req, res) => {
    try {
        const sessionNotes = await SessionNotes.find();
        res.json(sessionNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new session note
router.post('/', async (req, res) => {
    try {
        const sessionNote = new SessionNotes(req.body);
        await sessionNote.save();
        res.status(201).json(sessionNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
