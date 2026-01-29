const mongoose = require('mongoose');

// Schema for Individual Members
const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    domain: { type: String, required: true },
    tier: { type: String, required: true }, // The Primary Key for filtering
    linkedin: {
            type: String,
            validate: {
                validator: function (v) {
                return /^(https?:\/\/)/.test(v);
                },
                message: props => `${props.value} is not a valid URL`
            }
          },
            github: {
            type: String,
            validate: {
                validator: function (v) {
                return /^(https?:\/\/)/.test(v);
                },
                message: props => `${props.value} is not a valid URL`
            }
            },

    image: [String], // Store the URL or file path
    createdAt: { type: Date, default: Date.now }
});

// Schema for Core Team / Domains
const coreTeamSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: String,
    membersList: String,
    image: [String],
    createdAt: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);//collection+schemaa
const CoreTeam = mongoose.model('CoreTeam', coreTeamSchema);

module.exports = { Member, CoreTeam };
