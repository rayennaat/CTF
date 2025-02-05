const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  hint: { type: String, default: "" },
  resource: { type: String, default: "" },
  solvedByTeams: [
    {
      team_id: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
      time: { type: Date, default: Date.now },
    },
  ],
  solvedByUsers: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      time: { type: Date, default: Date.now },
    },
  ],
});



const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

/*
const challengeSchema = new mongoose.Schema({

});

*/