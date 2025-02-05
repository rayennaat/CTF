const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const teamSchema = new Schema({
    name: { type: String, required: true, unique: true }, // Team name, must be unique
    password: { type: String, required: true }, // Password for team management
    points: { type: Number, default: 0 }, // Points earned by the team, default is 0
    TeamPic: { type: String, default: null }, // Optional, stores URL or path to the image
    bio: { type: String, default: "" }, // A short bio for the team, optional
    link: { type: String, default: "" }, // A link for the team (e.g., website or social media), optional
    createdOn: { type: Date, default: Date.now }, // When the team was created
    adminId: { type: String, required: true },
});

module.exports = mongoose.model("Team", teamSchema);


/*

const noteSchema = new Schema({
    title : { type: String, required: true},
    content : { type: String, required: true},
    tags : { type: [String], default: []},
    isPinned : { type: Boolean, default: false},
    userId : { type: String, required: true},
    created0n : { type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("Note", noteSchema);*/