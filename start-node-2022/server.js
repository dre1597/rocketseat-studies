const http = require('http');

http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'application/json' });

    if (request.url === '/product') {
      response.end(JSON.stringify({ message: 'Product route' }));
    }

    if (request.url === '/users') {
      response.end(JSON.stringify({ message: 'User route' }));
    }
  })
  .listen(3000, () => console.log('Server running on port 3000'));
