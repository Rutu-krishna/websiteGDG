const Member = require('../../models/Member');

// GET all members (for the public website)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ order: 1 });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members" });
  }
};

// POST a new member (from the Admin Panel)
exports.addMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: "Member added successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Failed to add member" });
  }
};

// DELETE a member
exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};