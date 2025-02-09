const express = require("express");
require("dotenv").config();
const config = require("./config/config");
const CacheService = require("./services/cacheService");
const CacheController = require("./controllers/cacheController");
const cacheRoutes = require("./routes/cacheRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Initialize services and controllers
const cacheService = new CacheService(config.cache.maxSize);
const cacheController = new CacheController(cacheService);

app.use("/cache", cacheRoutes(cacheController));

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Cache API running on port ${config.port}`);
});
