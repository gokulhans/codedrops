const express = require("express")
const app = express()
const cors = require('cors');
const db = require('./db');
require('dotenv').config()

app.use(express.json())

app.use(cors());

const userRouter = require('./routes/userRoutes')

app.get('/', (req, res) => {
    res.json({ message: "Hello" });
});

app.use("/api/auth/user", userRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))