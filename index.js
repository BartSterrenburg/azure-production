const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require('./src/Routes/user.routes');
const formRoutes = require('./src/Routes/form.routes');

// Gebruik CORS middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({
    status: 200,
    message: "API of GPW_turbineSupport is working!",
    data: {},
  });
});

app.use(userRoutes)
app.use(formRoutes)


// Route error handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Route not found",
    data: {},
  });
});

// Express error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || "Internal Server Error",
    data: {},
  });
});

// Onderstaande code zorgt ervoor dat de server alleen luistert als het bestand niet tijdens testen wordt uitgevoerd.
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
