require("dotenv").config(); 

const config = require("./config.json");
const mongoose = require("mongoose");   

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Team = require("./models/Team.model");
const Challenge = require("./models/challenge.model"); // Adjust path if needed



const express = require("express");
const cors = require("cors");
const app = express();

const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto"); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

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


app.get("/",(req, res) =>{
    res.json({data:"hello"});
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
        _id: userInfo._id, // use _id to match the structure you're expecting in the middleware
        fullName: userInfo.fullName,
    };
    
    const accessToken = jwt.sign({ user: { id: user._id, fullName: user.fullName } }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });    
    
    return res.status(201).json({
        error: false,
        user,
        accessToken,
        message: "login Successful",
    });
});


app.get("/get-user", authenticateToken, async (req, res) => {
    if (!req.user) {
      console.log("No user found in request");
      return res.sendStatus(403);
    }
  
    console.log("Decoded user:", req.user); // Debugging: Log the decoded user data
  
    const { id } = req.user.user; // Access user ID from req.user.user (since payload is { user: { id, fullName } })
  
    const isUser = await User.findOne({ _id: id });
  
    if (!isUser) {
      console.log("User not found in database");
      return res.sendStatus(401);
    }
  
    let teamName = null;

    if (isUser.teamId) {
      const team = await Team.findOne({ _id: isUser.teamId }); // Fetch team details
      if (team) {
        teamName = team.name; // Just send the team name
      }
    }
  
    return res.json({
      user: {
        fullName: isUser.fullName,
        points: isUser.points,
        team: teamName, // Send only team name
        _id: isUser._id,
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


app.get('/api/challenges/solved-by-user/:userId', async (req, res) => {
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




// Add a task
app.post("/add-challenge", async (req, res) => {
    try {
      const { title, points, category, description, hint, resource, solvedByUsers, solvedByTeams } = req.body;
  
      // Validate input
      if (!title || !points || !category) {
        return res.status(400).json({ error: "Title, points, and category are required" });
      }
  
      // Function to validate MongoDB ObjectId
      const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
  
      // Convert solvedByUsers and solvedByTeams only if they contain valid ObjectIds
      const solvedByUsersData = (solvedByUsers || []).map(({ user_id, time }) => {
        if (!isValidObjectId(user_id)) {
          throw new Error(`Invalid user_id: ${user_id}`);
        }
        return {
          user_id: new mongoose.Types.ObjectId(user_id),
          time: time || new Date().toISOString()
        };
      });
  
      const solvedByTeamsData = (solvedByTeams || []).map(({ team_id, time }) => {
        if (!isValidObjectId(team_id)) {
          throw new Error(`Invalid team_id: ${team_id}`);
        }
        return {
          team_id: new mongoose.Types.ObjectId(team_id),
          time: time || new Date().toISOString()
        };
      });
  
      // Create new challenge object
      const newChallenge = new Challenge({
        title,
        points,
        category,
        description: description || "",
        hint: hint || "",
        resource: resource || "",
        solvedByUsers: solvedByUsersData,
        solvedByTeams: solvedByTeamsData
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
  

// add notes
app.post("/add-note", authenticateToken, async (req, res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if (!title){
        return res.status(400).json({error: true, message: "Title is required"});
    }
    if (!content){
        return res.status(400).json({error: true, message: "Content is required"});
    }
    try{
        const note= new Note({
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
    } catch (error){
        return res.status(500).json({
            error: true,
            message: "Internet Server Error",
        });
    }
});

// Edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned} = req.body;
    const { user } = req.user;

    if (!title && !content && !tags){
        return res.status(400).json({error: true, message: "No changes provided"});
    }
    
    try{
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note){
            return res.status(404).json({error: true, message: "Note not found"});
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
    }catch{
        return res.status(500).json({
            error: true,
            message: "internal Server Error",
        });
    }
})

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const {user} = req.user;

    try {
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    }catch {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {user} = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if (!note){
            return res.status(404).json({error:true, message: "Note not found"});
        }
        await Note.deleteOne({_id: noteId, userId: user._id});
        
        return res.json({
            error: false,
            message: "Note deleted successfully",
        });

    }catch(error) {
        return res.status(500).json({error: true, message: "Internal server Error"});
    }
});

// Pin Note (Update isPinned value)
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned} = req.body;
    const { user } = req.user;

    
    try{
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if (!note){
            return res.status(404).json({error: true, message: "Note not found"});
        }

        note.isPinned = isPinned || false;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }catch{
        return res.status(500).json({
            error: true,
            message: "internal Server Error",
        });
    }
});

// Search note
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;
    const {query} = req.query;

    if (!query) {
        return res
          .status(400)
          .json({ error: true, message: "search query is required"});
    }

    try{
      const matchingNotes = await Note.find({
        userId: user._id,
        $or: [
            {title: {$regex: new RegExp(query, "i")}},
            {content: {$regex: new RegExp(query, "i")}},
        ],
      });

      return res.json({
        error: false,
        notes: matchingNotes,
        message: "Notes matching the search query retrived successfully",
      });
    }catch(error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });

module.exports =app;
