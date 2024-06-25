import { useEffect, useState } from "react";

//components
import SearchSettingChip from "../components/SearchSettingChip";
import SearchSettingForm from "../components/SearchSettingForm";

const Home = () => {
  const [searchSettings, setSearchSettings] = useState(null);
  useEffect(() => {
    const fetchSearchSettings = async () => {
      const response = await fetch("http://localhost:4000/api/searchSettings");
      console.log(response);
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setSearchSettings(json);
      }
    };
    fetchSearchSettings();
  }, []);

  return (
    <div className="home">
      <div className="searchSettings">
        {searchSettings &&
          searchSettings.map((searchSetting) => (
            <SearchSettingChip
              key={searchSetting._id}
              searchSetting={searchSetting}
            ></SearchSettingChip>
          ))}
      </div>
      <SearchSettingForm />
    </div>
  );
};

export default Home;
