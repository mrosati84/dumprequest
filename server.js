const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedUrl = url.parse(req.url, true);
    const requestDump = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      parameters: parsedUrl.query,
      body: body,
    };

    // Dump the request information to standard output
    console.log("New Request:");
    console.log(JSON.stringify(requestDump, null, 2));

    // Send a simple response to the client
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Request received and logged");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
