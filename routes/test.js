const express = require('express');
const router = express.Router();
const soap = require('soap');
const fs = require('fs');

const config = require('../config.json');
const printers = JSON.parse(fs.readFileSync('./printersConfig.js'));

router.post('/receipt/:id',function(req,res,next) {
    // test receipt

})

router.post('/fiscalinvoice/:id',function(req,res,next) {
    // test receipt

})

router.post('/document/:id',function(req,res,next) {
    const request = {
        printerId : parseInt(req.params.id),
        UniqueKey : printers.printers[req.params.id].key
    };
    soap.createClient( 
        config.server.protocol + "://" + printers.printers[req.params.id]['url']['address'] + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
        request,
        function(err,client) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                client.PrintTestDocument(
                    request,
                    function(err, result, rawResponse, soapHeader, rawRequest) {
                        if(err) {
                            console.log("/// CHECK PRINTER ERROR");
                            console.log(err);
                            res.status(500).send(err);

                        } else {
                            console.log({
                                result : result,
                                rawResponse : rawResponse,
                                soapHeader : soapHeader,
                                rawRequest : rawRequest
                            });
                            res.send({
                                result : result,
                                rawResponse : rawResponse,
                                soapHeader : soapHeader,
                                rawRequest : rawRequest
                            });

                        }
                    }
                    )
            }
        }
    )
})

router.post('/label/:id',function(req,res,next) {
    const request = {
        printerId : parseInt(req.params.id),
        UniqueKey : printers.printers[req.params.id].key
    };
    soap.createClient( 
        config.server.protocol + "://" + printers.printers[req.params.id]['url']['address'] + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
        request,
        function(err,client) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                client.PrintTestDocument(
                    request,
                    function(err, result, rawResponse, soapHeader, rawRequest) {
                        if(err) {
                            console.log("/// CHECK PRINTER ERROR");
                            console.log(err);
                            res.status(500).send(err);

                        } else {
                            console.log({
                                result : result,
                                rawResponse : rawResponse,
                                soapHeader : soapHeader,
                                rawRequest : rawRequest
                            });
                            res.send({
                                result : result,
                                rawResponse : rawResponse,
                                soapHeader : soapHeader,
                                rawRequest : rawRequest
                            });

                        }
                    }
                    )
            }
        }
    )
})


module.exports = router;