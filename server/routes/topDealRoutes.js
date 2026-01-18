const express = require("express");
const router = express.Router();
const TopDeal = require("../models/TopDeal");

// Get all top deals
router.get("/", async (req, res) => {
  try {
    const topDeals = await TopDeal.find().sort({ id: 1 });
    res.json(topDeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single top deal by id
router.get("/:id", async (req, res) => {
  try {
    const topDeal = await TopDeal.findOne({ id: parseInt(req.params.id) });
    if (!topDeal) {
      return res.status(404).json({ message: "Top deal not found" });
    }
    res.json(topDeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
