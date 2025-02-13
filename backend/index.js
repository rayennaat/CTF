require("dotenv").config(); 
const config = require("./config.json");
const mongoose = require("mongoose");   
mongoose.connect(config.connectionString);
const User = require("./models/user.model");
const Team = require("./models/team.model");
const Challenge = require("./models/challenge.model"); // Adjust path if needed
const express = require("express");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const crypto = require("crypto"); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const fs = require('fs');
const path = require('path');

app.use(express.json());

const PORT = 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// Backend ready !!!

// Create account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password, teamChoice, teamName, teamPassword } = req.body;
    // Validate user fields
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }
    // Normalize and hash email
    const normalizedEmail = email.trim().toLowerCase();
    const hashedEmail = crypto.createHash("sha256").update(normalizedEmail).digest("hex");
    // Check if user already exists
    const isUser = await User.findOne({ email: hashedEmail });
    if (isUser) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Get the user's IP address
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    // Create user
    const user = new User({
        fullName,
        email: hashedEmail,
        rawEmail: normalizedEmail,
        password: hashedPassword,
        teamId: null, // Initially null, will be updated if a team is created
        profilePic: null, // Default value if not provided
        ip: ip,
    });
    if (teamChoice === "create") {
        // Validate team fields
        if (!teamName) {
            return res.status(400).json({ error: true, message: "Team Name is required" });
        }
        if (!teamPassword) {
            return res.status(400).json({ error: true, message: "Team Password is required" });
        }
        // Check if team already exists
        const isTeam = await Team.findOne({ name: teamName });
        if (isTeam) {
            return res.status(400).json({ error: true, message: "Team already exists" });
        }
        // Create team
        const team = new Team({
            name: teamName,
            password: teamPassword,
            points: 0, // Default points for a new team
            bio: "",
            link: "",
            teamPic: null,
            adminId: user._id,
        });
        await team.save();
        // Associate user with the newly created team
        user.teamId = team._id;
    } else if (teamChoice === "join") {
        // Join existing team
        if (!teamPassword) {
            return res.status(400).json({ error: true, message: "Team Password is required" });
        }
        const existingTeam = await Team.findOne({ password: teamPassword });
        if (!existingTeam) {
            return res.status(400).json({ error: true, message: "Invalid Team Password" });
        }
        user.teamId = existingTeam._id;
    }
    await user.save();
    // Generate access token
    const accessToken = jwt.sign(
        {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: normalizedEmail, // Use normalized email here
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "36000m" }
    );
    return res.status(201).json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    const SHA256 = require("crypto-js/sha256"); // Correct import
    // Normalize email for case-insensitivity
    const hashedEmail = SHA256(email.trim().toLowerCase()).toString();
    // Fetch user by normalized email
    const userInfo = await User.findOne({ email: hashedEmail  });
    if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    // Fetch the team details
    const teamDetails = await Team.findOne({ _id: userInfo.teamId });
    if (!teamDetails) {
        return res.status(500).json({ message: "User's team could not be found" });
    }
    // Generate JWT token
    const user = {
        id: userInfo._id, // use _id to match the structure you're expecting in the middleware
        fullName: userInfo.fullName,
    };
    const accessToken = jwt.sign({ user: { id: user._id, fullName: user.fullName } }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });    
    return res.status(201).json({
        error: false,
        user,
        accessToken,
        message: "Login Successful",
    });
});

app.get("/get-user", authenticateToken, async (req, res) => {
    if (!req.user) {
        console.log("No user found in request");
        return res.sendStatus(403);
    }
    console.log("Decoded user:", req.user);
    const { id } = req.user.user;
    const isUser = await User.findOne({ _id: id });
    if (!isUser) {
        console.log("User not found in database");
        return res.sendStatus(401);
    }
    let teamName = null;
    if (isUser.teamId) {
        const team = await Team.findOne({ _id: isUser.teamId });
        if (team) {
            teamName = team.name;
        }
    }
    return res.json({
        user: {
            fullName: isUser.fullName,
            rawEmail: isUser.rawEmail, // Include rawEmail
            points: isUser.points,
            team: teamName,
            id: isUser._id,
        },
        message: "",
    });
});

// get teamid for user 
app.get("/get-teamid", authenticateToken, async (req, res) => {
    if (!req.user) {
        console.log("No user found in request");
        return res.sendStatus(403);
    }
    console.log("Decoded user:", req.user); // Debugging: Log the decoded user data
    const { id } = req.user.user; // Access user ID from req.user.user
    try {
        const user = await User.findOne({ _id: id }).select("teamId");
        if (!user) {
            console.log("User not found in database");
            return res.sendStatus(401);
        }
        return res.json({
            teamId: user.teamId || null, // Return null if no teamId is set
            message: user.teamId ? "Team ID retrieved successfully" : "User has no team",
        });
    } catch (error) {
        console.error("Error fetching team ID:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

app.get("/task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        // Step 1: Fetch task (challenge) details
        const task = await Challenge.findById(taskId);
        if (!task) return res.status(404).json({ error: "Task not found" });
        // Step 2: Fetch user details for solvedByUsers
        const solvedByUsers = await Promise.all(
            task.solvedByUsers.map(async (entry) => {
                const user = await User.findById(entry.user_id);
                return user
                    ? { fullName: user.fullName, time: entry.time }
                    : { fullName: "Unknown", time: entry.time };
            })
        );
        res.json({ ...task.toObject(), solvedByUsers }); // Return task + updated solvedByUsers
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/users/solved", async (req, res) => {
    try {
        const userIds = req.query.userIds?.split(","); // Extract user IDs from query params
        if (!userIds || userIds.length === 0) {
            return res.status(400).json({ error: "No user IDs provided" });
        }
        // Fetch users with only `fullName` and `_id`
        const users = await User.find({ _id: { $in: userIds } }).select("fullName _id");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/challenges/solved-by-user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find challenges where the user is in the solvedByUsers array
        const challenges = await Challenge.find({
            'solvedByUsers.user_id': userId,
        }).select('title category points solvedByUsers'); // Select only necessary fields
        // Map the results to include only the relevant data
        const solvedChallenges = challenges.map((challenge) => {
            const solvedByUser = challenge.solvedByUsers.find(
                (entry) => entry.user_id.toString() === userId
            );
            return {
                title: challenge.title,
                category: challenge.category,
                points: challenge.points,
                time: solvedByUser.time, // Time when the user solved the challenge
            };
        });
        res.status(200).json(solvedChallenges);
    } catch (error) {
        console.error('Error fetching solved challenges:', error);
        res.status(500).json({ message: 'Failed to fetch solved challenges' });
    }
});

// GET endpoint to fetch users with their team names
app.get('/api/users-with-teams', async (req, res) => {
    try {
        // Fetch all users and populate the team name using teamId
        const users = await User.find().select('fullName teamId'); // Select only fullName and teamId
        // Map through the users and add the team name
        const usersWithTeams = await Promise.all(
            users.map(async (user) => {
                const team = await Team.findById(user.teamId).select('name'); // Get the team name
                return {
                    fullName: user.fullName,
                    team: team ? team.name : 'No Team', // If teamId is null, set team to 'No Team'
                };
            })
        );
        res.status(200).json(usersWithTeams);
    } catch (error) {
        console.error('Error fetching users with teams:', error);
        res.status(500).json({ message: 'Failed to fetch users with teams' });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        // Fetch teams with only name and link fields
        const teams = await Team.find().select('name link');
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Failed to fetch teams' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('fullName rawEmail'); // Fetch rawEmail
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

app.put('/putteams/:id', async (req, res) => {
    const { id } = req.params; // Team name or ID
    const updates = req.body; // Fields to update
    try {
        // Find the team by name or ID
        const team = await Team.findOne({
            $or: [{ name: id }, { _id: id }]
        });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        // Update the team with the provided fields
        Object.keys(updates).forEach((key) => {
            if (key in team) { // Ensure only valid fields are updated
                team[key] = updates[key];
            }
        });
        // Save the updated team
        await team.save();
        res.status(200).json({ message: 'Team updated successfully', team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get("/get-team", authenticateToken, async (req, res) => {
    if (!req.user) {
        console.log("No user found in request");
        return res.sendStatus(403);
    }
    console.log("Decoded user:", req.user); // Debugging: Log the decoded user data
    const { id } = req.user.user; // Access user ID from req.user.user
    try {
        // Find the user by ID
        const user = await User.findOne({ _id: id });
        if (!user) {
            console.log("User not found in database");
            return res.sendStatus(401);
        }
        // Check if the user has a teamId
        if (!user.teamId) {
            return res.status(404).json({ message: "User is not part of a team" });
        }
        // Find the team by teamId
        const team = await Team.findOne({ _id: user.teamId }, 'name points bio link'); // Only fetch required fields
        if (!team) {
            console.log("Team not found in database");
            return res.status(404).json({ message: "Team not found" });
        }
        // Return the team details, including teamId
        return res.json({
            team: {
                id: team._id, // Include teamId in the response
                name: team.name,
                points: team.points,
                bio: team.bio,
                link: team.link,
            },
            message: "Team details fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching team details:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// GET request to fetch challenges solved by the user's team
app.get('/team/solved-challenges/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        console.log('Team ID:', teamId);
        const challenges = await Challenge.find({
            'solvedByTeams.team_id': teamId.toString(),
        }).select('title category points solvedByTeams');
        const solvedChallenges = challenges.map((challenge) => {
            const solvedByTeam = challenge.solvedByTeams.find(
                (entry) => entry.team_id.toString() === teamId.toString()
            ) || {}; // Prevent undefined
            return {
                title: challenge.title,
                category: challenge.category,
                points: challenge.points,
                time: solvedByTeam.time || null, // Avoid accessing undefined properties
            };
        }).filter(Boolean); // Remove null values
        res.status(200).json(solvedChallenges);
    } catch (error) {
        console.error('Error fetching solved challenges:', error);
        res.status(500).json({ message: 'Failed to fetch solved challenges' });
    }
});

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Add a task
app.post('/add-challenge', upload.single('resource'), async (req, res) => {
  try {
    const { title, points, category, description, hint } = req.body;
    const resource = req.file ? `/uploads/${req.file.filename}` : ""; // Store relative path

    // Validate input
    if (!title || !points || !category) {
      return res.status(400).json({ error: "Title, points, and category are required" });
    }

    // Create new challenge object
    const newChallenge = new Challenge({
      title,
      points: parseInt(points),
      category,
      description: description || "",
      hint: hint || "",
      resource: resource || "",
      solvedByUsers: [],
      solvedByTeams: []
    });

    // Save to database
    await newChallenge.save();

    res.status(201).json({ message: "Challenge added successfully!", challenge: newChallenge });
  } catch (error) {
    console.error("Error adding challenge:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get the challenges
app.get("/api/challenges", async (req, res) => {
  try {
    const challenges = await Challenge.find(); // Assuming `Challenge` is your Mongoose model
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get the challenges
app.get("/api/challenges", async (req, res) => {
  try {
    const challenges = await Challenge.find(); // Assuming `Challenge` is your Mongoose model
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get the challenges
app.get("/api/challenges", async (req, res) => {
    try {
        const challenges = await Challenge.find(); // Assuming `Challenge` is your Mongoose model
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/get-all-users", authenticateToken, async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Return the list of users
        res.json({
            users: users.map(user => ({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/get-usere/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        // Fetch the user by ID from the database
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user data
        res.json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;
        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Get All teams for admin
app.get("/admin/teams", async (req, res) => {
    try {
        const teams = await Team.find({}, "name"); // Fetch only 'name' field
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

module.exports = app;