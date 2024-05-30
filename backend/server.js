const express = require("express");
const axios = require("axios");
const cors = require("cors");
const symbolsRouter = require("./symbols");

const app = express();

app.use(cors());

// Route to get historical data from BitMEX
app.get("/api/historical", async (req, res) => {
  try {
    const symbol = req.query.symbol || "XBTUSD";
    const response = await axios.get(
      `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1d&partial=false&symbol=${symbol}&count=30&reverse=false`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/api", symbolsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
