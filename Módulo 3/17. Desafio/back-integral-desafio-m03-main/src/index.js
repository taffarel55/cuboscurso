const app = require("./servidor");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server ON!`);
});
