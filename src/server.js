const express = require("express");

const app = express();

const routes = require("./routes");

app.use(routes);

const PORT = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello!')
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});