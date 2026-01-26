const Snippet = require('../models/Snippet');

// Save snippet to DB

exports.addSnippet = async (req, res) => {
    try {
        console.log("SERVER RECEIVED:", req.body); // Check your terminal for this!
        const { title, code } = req.body;
        
        const newSnippet = new Snippet({ title, code });
        await newSnippet.save();
        
        res.status(201).json({ message: "Saved!" });
    } catch (err) {
        console.error("SAVE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

// Fetch all snippets for the website
exports.getAllSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find().sort({ _id: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a snippet by ID
exports.deleteSnippet = async (req, res) => {
    try {
        await Snippet.findByIdAndDelete(req.params.id);
        res.json({  message: "Snippet deleted successfully!"  });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};