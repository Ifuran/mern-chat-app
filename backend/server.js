const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDatabase = require("./db/database");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth_routes");
const messageRoutes = require("./routes/message.route");
const userRoutes = require("./routes/user_route");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
