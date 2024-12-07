require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const client = new MongoClient(process.env.MONGODB_URI);
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectDB();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token format" });
            }
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        next();
    });
}

// Modified signup route using only email and phone
app.post('/api/signup', async (req, res) => {
    const { email, phone } = req.body;

    try {
        const database = client.db("SeniorProjectDB");
        const usersCollection = database.collection("Users");

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const result = await usersCollection.insertOne({ 
            email,
            phone,
            createdAt: new Date(),
            lastLogin: null
        });

        // Generate token immediately upon signup
        const token = jwt.sign(
            { 
                id: result.insertedId,
                email: email 
            }, 
            JWT_SECRET, 
            { 
                expiresIn: "1h",
                algorithm: 'HS256'
            }
        );

        console.log(`User registered successfully: ${email} (ID: ${result.insertedId})`);
        res.status(201).json({ 
            message: "User registered successfully", 
            token,
            userId: result.insertedId 
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// New auto-login route using email
app.post('/api/login', async (req, res) => {
    const { email } = req.body;

    try {
        const database = client.db("SeniorProjectDB");
        const usersCollection = database.collection("Users");

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email 
            }, 
            JWT_SECRET, 
            { 
                expiresIn: "1h",
                algorithm: 'HS256'
            }
        );

        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() }}
        );

        res.status(200).json({ 
            message: "Login successful", 
            token,
            userId: user._id,
            email: user.email
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/api/protected', authenticateToken, (req, res) => {
    console.log(`Protected route accessed by user ID: ${req.user.id}`);
    res.json({ 
        message: "Welcome to the protected route!", 
        userId: req.user.id,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/verify-token', (req, res) => {
    const { token } = req.body;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ 
            valid: true, 
            decoded,
            expiresIn: new Date(decoded.exp * 1000).toISOString()
        });
    } catch (error) {
        res.json({ 
            valid: false, 
            error: error.message,
            errorType: error.name
        });
    }
});

app.use((err, req, res, next) => {
    console.error("Global error:", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    
    res.status(500).json({ 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        server: 'Authentication Server',
        version: '1.0.0'
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});