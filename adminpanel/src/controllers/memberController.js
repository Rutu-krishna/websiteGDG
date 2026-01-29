const { Member, CoreTeam } = require('../models/member');

// --- Member Controllers ---
exports.addMember = async (req, res) => {
    try {
        const data = req.body;
        // Check if multer uploaded a file
        if (req.file) {
            data.image = `/memberphoto/${req.file.filename}`;
        }
        const newMember = new Member(data);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMember = async (req, res) => {
    try {
        await Member.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Member deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateMember = async (req, res) => {
    try {
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// --- Core Team / Domain Controllers ---

exports.addDomain = async (req, res) => {
    try {
        const data = req.body;
        if (req.file) {
            data.image = `/memberphoto/${req.file.filename}`;
        }
        const newDomain = new CoreTeam(data);
        await newDomain.save();
        res.status(201).json(newDomain);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllDomains = async (req, res) => {
    try {
        const domains = await CoreTeam.find().sort({ createdAt: -1 });
        res.status(200).json(domains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDomain=async(req,res)=>{
    try{
       await CoreTeam.findByIdAndDelete(req.params.id);
       res.status(200).json({message:"Memeber Deleted successfully"});
    }catch{
        res.status(500).json({error:err.message})
    }
}
// Update an existing Core Team / Domain Group
exports.updateDomain = async (req, res) => {
    try {
        const updatedDomain = await CoreTeam.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedDomain);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};