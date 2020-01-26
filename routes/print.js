const express = require('express');
const router = express.Router();

// print receipt
router.post('/receipt/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintReceipt(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

router.post('/pdf/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key,
        pdfsBase64: req.query.pdf
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintPDF(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

router.post('/pdf/copies/:copies/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key,
        pdfsBase64: req.query.pdf,
        numberOfCopies : req.params.copies
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintPDFForMultipleCopies(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

router.post('/xps/copies/:copies/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key,
        xps: req.query.xps,
        numberOfCopies : req.params.copies,
        name : req.query.name 
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintXPS(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}
router.post('/orderdocument/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key,
        order : req.query.order
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintOrderDocument(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

router.post('/courierdocument/:id', function (req, res, next) {
    const request = {
        printerId: parseInt(req.params.id),
        UniqueKey: printers.fiscals[req.params.id].key,
        order : req.query.order
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintCourierDocument(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

router.post('/documentsfromitem', function (req, res, next) {
    const request = {
        params : req.query.params
    };
    // soap.createClient(
    //     config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
    //     // request,
    //     function (err, client) {
    //         client.PrintDocumentsFromItem(
    //             request,
    //             function(err, result, rawResponse, soapHeader, rawRequest) {

    //             }
    //         )

    //     }
    // )
}

module.exports = router;