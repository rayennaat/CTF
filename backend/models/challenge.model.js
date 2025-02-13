const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  hint: { type: String, default: "" },
  resource: {
    type: String,
    default: "",
    validate: {
      validator: function (value) {
        if (!value) return true; // Allow empty resource
        return /\.(rar|zip)$/i.test(value); // Ensures only .rar or .zip files are allowed
      },
      message: "Resource file must be in .rar or .zip format.",
    },
  },
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