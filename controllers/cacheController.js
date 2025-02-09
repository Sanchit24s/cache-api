class CacheController {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }

    async store(req, res) {
        try {
            const { key, value } = req.body;

            if (!key || value === undefined) {
                return res.status(400).json({
                    error: "Both key and value are required",
                });
            }

            const result = this.cacheService.set(key, value);
            return res.status(201).json({
                message: "Cached successfully",
                ...result,
            });
        } catch (error) {
            if (error.message.includes("Cache is full")) {
                return res.status(400).json({ error: error.message });
            }
            throw error;
        }
    }

    async retrieve(req, res) {
        try {
            const { key } = req.params;
            const result = this.cacheService.get(key);
            return res.json(result);
        } catch (error) {
            if (error.message === "Key not found") {
                return res.status(404).json({ error: error.message });
            }
            throw error;
        }
    }

    async remove(req, res) {
        try {
            const { key } = req.params;
            const result = this.cacheService.delete(key);
            return res.json({
                message: "Cache entry deleted successfully",
                ...result,
            });
        } catch (error) {
            if (error.message === "Key not found") {
                return res.status(404).json({ error: error.message });
            }
            throw error;
        }
    }

    async getSize(req, res) {
        const size = this.cacheService.getSize();
        return res.json(size);
    }
}

module.exports = CacheController;
