const express = require('express');

module.exports = function(server) {

    //definir url
    const router = express.Router();
    server.use('/api', router);

    //clients avance
    const Avance = require('../api/avance/avanceClientService');
    Avance.register(router,'/avanceClient');
}