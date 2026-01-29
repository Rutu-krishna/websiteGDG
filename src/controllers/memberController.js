const { Member, CoreTeam } = require('../models/member');

// --- Member Controllers ---
exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Core Team / Domain Controllers ---

exports.getAllDomains = async (req, res) => {
    try {
        const domains = await CoreTeam.find().sort({ createdAt: -1 });
        res.status(200).json(domains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

