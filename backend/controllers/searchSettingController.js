const SearchSetting = require("../models/searchSettingModel");
const mongoose = require("mongoose");

// get all searchSettings
const getSearchSettings = async (request, response) => {
  const searchSettings = await SearchSetting.find({}).sort({ createdAt: -1 });
  response.status(200).json(searchSettings);
};

// get a single searchSetting
const getSearchSetting = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid search setting ID" });
  }

  const searchSetting = await SearchSetting.findById(id);
  if (!searchSetting) {
    return response.status(400).json({ error: "No search setting found" });
  }

  response.status(200).json(searchSetting);
};

// create new searchSetting
const createSearchSetting = async (request, response) => {
  const { title, seeds, parameters } = request.body;
  try {
    const searchSetting = await SearchSetting.create({
      title,
      seeds,
      parameters,
    });
    response.status(200).json(searchSetting);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// delete searchSetting
const deleteSearchSetting = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid search setting ID" });
  }
  const searchSetting = await SearchSetting.findOneAndDelete({ _id: id });

  if (!searchSetting) {
    return response.status(400).json({ error: "No search setting found" });
  }

  return response.status(200).json(searchSetting);
};

// update searchSetting -- commented code is for replacing values and not overwriting values which are not included
const updateSearchSetting = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "Invalid search setting ID" });
  }

  // const updates = { ...resposnse.body }
  // const oldSetting = await SearchSetting.findById(id);
  // const oldParameters = oldSetting.parameters[0].toJSON();

  // if (updates.parameters) {
  //   updates.parameters = {
  //     ...oldParameters,
  //     ...updates.parameters,
  //   };
  // }

  const searchSetting = await SearchSetting.findOneAndUpdate(
    { _id: id },
    // updates
    request.body
  );

  if (!searchSetting) {
    return response.status(400).json({ error: "No search setting found" });
  }

  return response.status(200).json(searchSetting);
};

module.exports = {
  createSearchSetting,
  getSearchSettings,
  getSearchSetting,
  deleteSearchSetting,
  updateSearchSetting,
};
