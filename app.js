const http = require('http');

const server = http.createServer((req, res) => {
  res.end(`Hello from branch: ${process.env.BRANCH_NAME || 'unknown'}`);
});

server.listen(3000, () => console.log("Server running on port 3000 new stuff added"));

