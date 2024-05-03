const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const dbConfig = require("./Config/dbconfig");

const userRoute = require("./routes/userRoutes");

const movieRoutes = require("./routes/movieRoutes")
app.use(cors());
app.use(express.json());

// Mount your routes
app.use('/api/user', userRoute);

app.use('/api/movie',movieRoutes)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});