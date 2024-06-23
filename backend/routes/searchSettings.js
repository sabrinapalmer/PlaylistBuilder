const express = require("express");
const SearchSetting = require("../models/searchSettingModel");
const {
  createSearchSetting,
  getSearchSettings,
  getSearchSetting,
  deleteSearchSetting,
  updateSearchSetting,
} = require("../controllers/searchSettingController");

const router = express.Router();

// GET all searchSettings
router.get("/", getSearchSettings);

// GET a single searchSetting
router.get("/:id", getSearchSetting);

//POST a single searchSetting
router.post("/", createSearchSetting);

//DELETE a single searchSetting
router.delete("/:id", deleteSearchSetting);

//UPDATE a single searchSetting
router.patch("/:id", updateSearchSetting);

module.exports = router;
