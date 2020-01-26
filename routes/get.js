const express = require('express');
const router = express.Router();
const soap = require('soap');
const fs = require('fs');

const config = require('../config.json');
const printers = JSON.parse(fs.readFileSync('./printersConfig.js'));

router.get('/printersettings/:id', function(req,res,next) {
    const request = {
        printerId : parseInt(req.params.id),
        UniqueKey : printers.printers[req.params.id].key
    };
    // const request = [printers.printers[req.params.id].key,req.params.id];
    // soap.createClientAsync( "http" + "://" + config.server.address + ":" + config.server.port )
    soap.createClient( 
        config.server.protocol + "://" + config.server.address + ":" + printers.printers[req.params.id]['url']['port'] + "/PrinterService",
        request,
        function(err,client) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                client.GetPrinterSettings(
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