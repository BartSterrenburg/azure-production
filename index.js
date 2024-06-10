const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoutes = require('./src/Routes/user.routes');
const tokenRoutes = require('./src/Routes/token.routes');
const formRoutes = require("./src/Routes/form.routes");
const orderRoutes = require("./src/Routes/order.routes");

// Set limits for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Gebruik CORS middleware
const corsOptions = {
  origin: "http://127.0.0.1:1234",
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
 
app.use(cors(corsOptions));
app.use(express.json());
 
app.get("/", (req, res, next) => {
  res.json({
    status: 200,
    message: "API of GPW_turbineSupport is working!",
    data: {},
  });
});

app.use(userRoutes)
app.use(tokenRoutes)
app.use(formRoutes)
app.use(orderRoutes)


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