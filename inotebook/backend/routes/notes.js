const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: GEt all the notes : GET:"./api/auth.getuser"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//ROute to add notes: POST:"./api/notes/addnote" Login require
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a description & is atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;