require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes");

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
