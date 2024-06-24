const SearchSettingChip = ({ searchSetting }) => {
  let seedString = "";
  searchSetting.seeds.map((seed, index) => {
    seedString =
      seedString +
      (index == 0 ? " " : ", ") +
      seed.seedType +
      ": " +
      seed.seedValue;
  });

  let paramsString = "";
  searchSetting.parameters.map((param, index) => {
    paramsString =
      paramsString +
      (index == 0 ? " " : ", ") +
      (param.minValue ? param.minValue + " < " : "") +
      param.paramType +
      (param.targetValue ? " (~" + param.targetValue + ")" : "") +
      (param.maxValue ? " < " + param.maxValue : "");
  });

  return (
    <div className="searchSettingChip">
      <h3>{searchSetting.title}</h3>
      <p>
        <strong>
          Search Seed{searchSetting.seeds.length > 1 ? "s: " : ": "}
        </strong>
        {seedString}
        <br />
        <strong>
          Search Parameter{searchSetting.parameters.length > 1 ? "s: " : ": "}
        </strong>
        {paramsString}
        <br />
        <strong>{searchSetting.createdAt}</strong>
      </p>
    </div>
  );
};

export default SearchSettingChip;
