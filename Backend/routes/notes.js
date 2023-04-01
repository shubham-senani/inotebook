const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//ROUTE_1: Get all the notes using: Get "api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const allNotes = await Note.find({ user: req.user.id });
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).send("Internal Server Error!!")
    }
})

//ROUTE_2: Get all the notes using: Get "api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "enter a valid description").isLength({ min: 5 })
], async (req, res) => {
    // if error occurs retrun bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const newNote = new Note({
            title, description, tag, user: req.user.id
        });

        await newNote.save();
        res.status(200).send(newNote);

    } catch (error) {
        res.status(500).send("Internal Server Error!!")
    }

})

//ROUTE_3: Update an existing Note using: PUT "/api/notes/updatenote". login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(500).send("Internal Server Error!!");
    }
})

//ROUTE_4: Delete an existing Note using: DELETE "/api/notes/deletenote". login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "successfully": "note has been deleted" });
    } catch (error) {
        res.status(500).send("Internal Server Error!!");
    }
})


module.exports = router;