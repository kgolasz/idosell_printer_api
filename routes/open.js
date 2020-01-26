const express = require('express');
const router = express.Router();

// open drawer
const express = require('express');
const router = express.Router();

// print receipt
router.get('/drawer/:id', function (req, res, next) {
    const request = {
        printerId : parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.OpenDrawer(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}
// print PDF
// print XPS

module.exports = router;

module.exports = router;