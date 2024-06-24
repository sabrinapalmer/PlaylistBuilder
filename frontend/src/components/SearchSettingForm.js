import { useState, useEffect } from "react";
import ParamOptions from "./Parameters";

const SearchSettingForm = () => {
  const [title, setTitle] = useState("");
  const [seeds, setSeeds] = useState("");
  const [parameters, setParameters] = useState("");

  const [genreList, setGenreList] = useState(null);
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:4000/api/genres");
      const json = await response.json();

      if (response.ok) {
        setGenreList(json);
      }
    };
    fetchGenres();
  }, []);

  return (
    <form className="create">
      <h3>Add a New Search Setting</h3>
      <label>Search Setting Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <br />
      <label>Search Seed: </label>
      <select
        onChange={(e) => {
          setSeeds({ seedType: e.target.value });
        }}
        value={seeds.seedType}
      >
        <option value="Genre">Genre</option>
        <option value="Artist">Artist</option>
        <option value="Track">Track</option>
      </select>
      <select onChange={(e) => {}}>
        {genreList &&
          genreList.map((genre, i) => {
            return <option value={"g"}>{"genre"}</option>;
          })}
      </select>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <br />
      <select
        onChange={(e) => {
          setParameters({ paramType: e.target.value });
        }}
        value={parameters.paramType}
      >
        <option value="">Please pick a parameter</option>
        {ParamOptions.map((option, i) => {
          return (
            <option
              key={i}
              value={option.paramName}
              label={option.paramName}
            ></option>
          );
        })}
      </select>
    </form>
  );
};
export default SearchSettingForm;
