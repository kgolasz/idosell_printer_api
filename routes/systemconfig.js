const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fetchUrl = require("fetch").fetchUrl;
const fs = require('fs');


router.get('/system', function(req,res,next) {
    const auth = req.headers.authorization.split(" ");
    let buff = new Buffer.from(auth[1], 'base64');
    const loginData = buff.toString('utf8').split(":");
    
    const date = new Date();
    const month = ((date.getMonth() +1) < 10) ? "0" + (date.getMonth() +1) : (date.getMonth() +1)
    const salt = date.getFullYear() + month + date.getDate();
    
    const passHash = crypto.createHash('sha1');
    passHash.update(loginData[1]);
    const authHash = crypto.createHash('sha1');
    authHash.update(salt + passHash.digest('hex'));

    const authKey = authHash.digest('hex');  
    const userName = loginData[0];
    const technicalDomain = req.headers.technicaldomain;

    const url = "http://" + technicalDomain + "/api/?gate=systemconfig/get/98/json";
    const request = {
        authenticate : {
            userLogin : userName,
            authenticateKey : authKey
        }
    }
    console.log(request);
    fetchUrl(
        url,
        {
            payload : JSON.stringify(request),
            method : "POST"
        },
        function(error, meta, body) { 
            console.log("////done");
            if(error) {
                res.status(500).send(error);
            } else {
                const response = JSON.parse(body);
                let systemPrinters = response.printers;
                let systemFiscals = response.fiscal_printers;

                let output = {
                    printers : {},
                    fiscals : {}
                }; 

                const addressRegex = /^([A-z]+)\:\/\/(.+)\:([0-9]+)/;
                systemPrinters.forEach(printer => {
                    let url = addressRegex.exec(printer.address);
                    printer['url'] = {
                        protocol : url[1],
                        address : url[2],
                        port : url[3]
                    };
                    output.printers[printer.id] = printer;
                })
                systemFiscals.forEach(fiscal => {
                    let f = fiscal;
                    let url = addressRegex.exec(fiscal.address);
                    fiscal['url'] = {
                        protocol : url[1],
                        address : url[2],
                        port : url[3]
                    };
                    output['fiscals'][f.id] = f;
                });
                fs.writeFile(
                    './printersConfig.js',
                    JSON.stringify(output),
                    function(err) {
                        if(err) {
                            res.send(err);
                        } else {
                            res.send(output);
                        }
                    }
                    )
            }
        }
    )

})

module.exports = router;