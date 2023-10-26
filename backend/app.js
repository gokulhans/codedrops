const express = require("express")
const app = express()
const cors = require('cors');
const db = require('./db');
require('dotenv').config()

app.use(express.json())

app.use(cors());

const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const dropRouter = require('./routes/dropRoutes')

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/drop", dropRouter)

app.listen(process.env.PORT || 5000, () => console.log("Server is running on port 5000"))