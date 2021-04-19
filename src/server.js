const app = require("./app");
const port = require("./config");

app.listen(port.port, () => {
  console.log(`Server listening at http://localhost:${port.port}`);
});
