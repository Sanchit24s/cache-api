class CacheService {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }

    set(key, value) {
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            throw new Error(`Cache is full (max size: ${this.maxSize})`);
        }
        this.cache.set(key, value);
        return { key, value };
    }

    get(key) {
        if (!this.cache.has(key)) {
            throw new Error("Key not found");
        }
        return { key, value: this.cache.get(key) };
    }

    delete(key) {
        if (!this.cache.has(key)) {
            throw new Error("Key not found");
        }
        this.cache.delete(key);
        return { key };
    }

    getSize() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
        };
    }

    clear() {
        this.cache.clear();
    }
}

module.exports = CacheService;
