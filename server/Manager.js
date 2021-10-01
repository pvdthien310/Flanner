const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const KnowledgeRoute = require('./routes/knowledgeRoute')
const StatusRoute = require('./routes/statusRoute')
const UserRoute = require('./routes/userRoute')

/// Process file json and env
app.use(bodyParser.json())
dotenv.config();

/// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected !")
})
mongoose.connection.on("error", () => {
    console.log("Connect MongoDB Failed !")
})



/// Handle All API 
app.use("/api/knowledge", KnowledgeRoute)
app.use("/api/status", StatusRoute)
app.use("/api/user", UserRoute)






//// Open port
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Backends server is running!')
});