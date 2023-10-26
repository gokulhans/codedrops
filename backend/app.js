const express = require("express")
const app = express()
const cors = require('cors');
const db = require('./db');
require('dotenv').config()

app.use(express.json())

app.use(cors());

const userRouter = require('./routes/userRoutes')
app.use("/api/user", userRouter)

const authRouter = require('./routes/authRoutes')
app.use("/api/auth", authRouter)

app.listen(process.env.PORT || 5000, () => console.log("Server is running on port 5000"))