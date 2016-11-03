var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+"/../public")).listen(8080, function() {
    console.log(__dirname)
    console.log('Server running on 8080');
});