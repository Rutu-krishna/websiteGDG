const express = require('express');
const router = express.Router();
const snippetController = require('../controllers/snippetController');

// All paths here are relative to "/api/v1/snippets"
router.get('/', snippetController.getAllSnippets); 
router.post('/', snippetController.addSnippet);
router.delete('/:id', snippetController.deleteSnippet);

module.exports = router;