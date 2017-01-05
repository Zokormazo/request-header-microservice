var express = require('express')
var accepts = require('accepts')

var app = express()

app.set('port', (process.env.PORT || 5000))

app.enable('trust proxy')

app.get('/', function(req, res) {
    var ua = req.headers['user-agent']
    var os = ''
    
    if (/like Mac OS X/.test(ua))
        os = 'iOS ' + /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        
    if (/Android/.test(ua))
        os = /(Android [0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        os = /(webOS\/[0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        os = /(Intel|PPC) (Mac OS X ?[0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        os = /(Windows NT [0-9\._]+)[\);]/.exec(ua)[1];
        
    res.send({
        ipaddress: req.ip,
        language: req.acceptsLanguages()[0],
        software: os
    })
    res.end()
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})