const express = require('express');
const router = express.Router();

module.exports = (cacheController) => {
    router.post('/', cacheController.store.bind(cacheController));
    router.get('/size', cacheController.getSize.bind(cacheController));
    router.get('/:key', cacheController.retrieve.bind(cacheController));
    router.delete('/:key', cacheController.remove.bind(cacheController));

    return router;
};