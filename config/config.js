const config = {
    port: process.env.PORT || 3000,
    cache: {
        maxSize: process.env.CACHE_MAX_SIZE || 10
    }
};

module.exports = config;