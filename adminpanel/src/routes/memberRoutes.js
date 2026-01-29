const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const teamCtrl = require('../controllers/memberController');

// Multer Config for member photos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './memberphoto'); // Must match the folder in server.js
    },
    filename: (req, file, cb) => {
        cb(null, 'member-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/members', upload.single('image'), teamCtrl.addMember);
router.get('/members', teamCtrl.getAllMembers);
router.delete('/members/:id', teamCtrl.deleteMember);

router.post('/core-team', upload.single('image'), teamCtrl.addDomain);
router.get('/core-team', teamCtrl.getAllDomains);
router.delete('/core-team/:id', teamCtrl.deleteDomain);

module.exports = router;