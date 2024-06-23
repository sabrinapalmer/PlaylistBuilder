const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SeedSchema = new Schema({
  seedType: {
    type: String,
    required: true,
  },
  seedValue: {
    type: String,
    required: true,
  },
});

const ZeroOneRangeSetting = new Schema({
  minValue: { type: Number, min: 0, max: 1, required: false },
  maxValue: { type: Number, min: 0, max: 1, required: false },
  targetValue: { type: Number, min: 0, max: 1, required: false },
});

const ZeroOneHundredRangeSetting = new Schema({
  minValue: { type: Number, min: 0, max: 100, required: false },
  maxValue: { type: Number, min: 0, max: 100, required: false },
  targetValue: { type: Number, min: 0, max: 100, required: false },
});

const ZeroElevenRangeSetting = new Schema({
  minValue: { type: Number, min: 0, max: 11, required: false },
  maxValue: { type: Number, min: 0, max: 11, required: false },
  targetValue: { type: Number, min: 0, max: 11, required: false },
});

const ThreeSevenRangeSetting = new Schema({
  minValue: { type: Number, min: 3, max: 7, required: false },
  maxValue: { type: Number, min: 3, max: 7, required: false },
  targetValue: { type: Number, min: 3, max: 7, required: false },
});

const MinZeroRangeSetting = new Schema({
  minValue: { type: Number, min: 0, required: false },
  maxValue: { type: Number, min: 0, required: false },
  targetValue: { type: Number, min: 0, required: false },
});

const ParamsSchema = new Schema({
  acousticness: [ZeroOneRangeSetting],
  danceability: [ZeroOneRangeSetting],
  durationMS: [MinZeroRangeSetting],
  energy: [ZeroOneRangeSetting],
  instrumentalness: [ZeroOneRangeSetting],
  key: [ZeroElevenRangeSetting],
  liveness: [ZeroOneRangeSetting],
  loudness: [ZeroOneRangeSetting],
  mode: [ZeroOneRangeSetting],
  popularity: [ZeroOneHundredRangeSetting],
  speechiness: [ZeroOneRangeSetting],
  tempo: [MinZeroRangeSetting],
  timeSignature: [ThreeSevenRangeSetting],
  valence: [ZeroOneRangeSetting],
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
