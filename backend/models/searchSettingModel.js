const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeedSchema = new Schema({
  seedType: { type: String, required: true },
  seedValue: { type: String, required: true },
});

const ParamsSchema = new Schema({
  paramType: { type: String, required: false },
  minValue: { type: Number, required: false },
  maxValue: { type: Number, required: false },
  targetValue: { type: Number, required: false },
});

const searchSettingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    seeds: {
      type: [SeedSchema],
      validate: {
        validator: function (v) {
          return v.length <= 5 && v[0].seedType && v[0].seedValue;
        },
        message: (props) =>
          `Seeds array must have less than 5 items and the first one must have both seedType and seedValue.`,
      },
    },
    parameters: { type: [ParamsSchema], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SearchSetting", searchSettingSchema);
