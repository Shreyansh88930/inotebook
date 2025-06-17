const express= require('express');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const router = express.Router();

//ROUTE 1: Fetch all notes using GET: api/notes/fetchallnotes login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Note.find({user : req.user.id});
    res.json(notes);
});

//ROUTE 2: Add a new note using POST: api/notes/addnote login required
router.post('/addnote', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newNote = new Note({
            user: req.user.id,
            title,
            description,
            tag
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//ROUTE 3: Update an existing note using PUT: api/notes/updatenote/:id login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the user is authorized to update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 4: Delete an existing note using DELETE: api/notes/deletenote/:id login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the user is authorized to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;