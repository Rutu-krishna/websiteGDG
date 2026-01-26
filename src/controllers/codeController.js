const snippets = require('../models/Snippets');

exports.getAllSnippets = async (req, res) => {
    try {
        // Move await to the front so MongoDB handles the sorting
        const allData = await snippets.find().sort({ _id: -1 }); 
        res.status(200).json(allData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}