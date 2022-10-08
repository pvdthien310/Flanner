const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const KnowledgeRoute = require("./routes/knowledgeRoute");
const UserRoute = require("./routes/userRoute");
const StatusRoute = require("./routes/statusRoute");
const NotificationRoute = require("./routes/notificationRoute");
const EmailRoute = require("./routes/emailRoute");
const CommentRoute = require("./routes/commentRoute");
const ReportRoute = require("./routes/ReportRoute");
const SavePostInfoRoute = require("./routes/savePostInfoRoute");
const NewCommentRoutes = require("./routes/newCommentRoute");

/// Process file json and env
app.use(bodyParser.json());
dotenv.config();

/// Connect MongoDB
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected !");
});
mongoose.connection.on("error", () => {
  console.log("Connect MongoDB Failed !");
});

/// Handle All API
app.use("/api/knowledge", KnowledgeRoute);
app.use("/api/status", StatusRoute);
app.use("/api/user", UserRoute);
app.use("/api/notification", NotificationRoute);
app.use("/api/sendEmail", EmailRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/report", ReportRoute);
app.use("/api/savedpost", SavePostInfoRoute);
app.use("/api/new-comment", NewCommentRoutes);

//// Open port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Backends server is running!");
});
