const Parameters = [
  { paramName: "acousticness", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "danceability", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "durationMS", minValue: 0, maxValue: 100000, stepValue: 1 },
  { paramName: "energy", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "instrumentalness", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "key", minValue: 0, maxValue: 11, stepValue: 1 },
  { paramName: "liveness", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "loudness", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "mode", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "popularity", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "speechiness", minValue: 0, maxValue: 1, stepValue: 0.01 },
  { paramName: "tempo", minValue: 30, maxValue: 500, stepValue: 1 },
  { paramName: "timeSignature", minValue: 3, maxValue: 7, stepValue: 1 },
  { paramName: "valence", minValue: 0, maxValue: 1, stepValue: 0.01 },
];
export default Parameters;
