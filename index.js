let co = require('co');
var http = require('http');

co(function* () {
    let a = getData(1);
    let b = getData(2);

    return yield [a, b];
}).then(([a, b]) => {
    console.log(a);
    console.log(b);
});

function getData(count) {
    return new Promise((res, rej) => {
        return http.get(`http://localhost:3000/data${count}`, (response) => {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);
                res(parsed);
            });
        });

    });
}
