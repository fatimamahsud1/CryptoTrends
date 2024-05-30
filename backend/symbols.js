// backend/symbols.js
const express = require("express");
const router = express.Router();

router.get("/symbols", async (req, res) => {
  // Fetch the symbols from BitMEX API or use a static list if the API doesn't provide this
  const symbols = ["XBTUSD", "ETHUSD", "LTCUSD"]; // Replace with dynamic fetching logic if needed
  res.json(symbols);
});

module.exports = router;
