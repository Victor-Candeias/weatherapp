import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import classes from "./App.module.css";

import useHttp from "../hooks/use-http";

const distritsIslandsURL =
  "https://api.ipma.pt/open-data/distrits-islands.json";
const windDailySpeed =
  "https://api.ipma.pt/open-data/wind-speed-daily-classe.json";
const precipitationValue =
  "https://api.ipma.pt/open-data/precipitation-classe.json";

function App() {
  // Wind
  const [dailyWind, setDailyWind] = useState([]);
  const { sendRequest: fetchWindTasks } = useHttp();

  // Precipitation
  const [dailytRain, setDailyRain] = useState([]);
  const { sendRequest: fetchRainTasks } = useHttp();

  // Countries list
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(0);

  const { isLoading, sendRequest: fetchTasks } = useHttp();

  // Wind speed info
  useEffect(() => {
    const transformTasks = (taksMetObj) => {
      setDailyWind(taksMetObj);
    };

    fetchWindTasks(
      {
        url: windDailySpeed,
      },
      transformTasks
    );
  }, [fetchWindTasks, selectedCity]);

  // Rain
  useEffect(() => {
    const transformTasks = (taksMetObj) => {
      setDailyRain(taksMetObj);
    };

    fetchRainTasks(
      {
        url: precipitationValue,
      },
      transformTasks
    );
  }, [fetchRainTasks, selectedCity]);

  // Lista de cidades
  useEffect(() => {
    const transformTasks = (taksObj) => {
      setCities(taksObj);
      setSelectedCity(taksObj.data[0].globalIdLocal);
    };

    fetchTasks(
      {
        url: distritsIslandsURL,
      },
      transformTasks
    );
  }, [fetchTasks]);

  // Change City
  const handleSelectChange = (e) => {
    // prevent page refresh
    e.preventDefault();

    const filtered2 = cities.data.filter((city) => {
      return "" + city.globalIdLocal === e.currentTarget.value;
    });

    setSelectedCity(filtered2[0].globalIdLocal);
  };

  if (
    isLoading ||
    (cities.data !== undefined && cities.data.length === 0) ||
    selectedCity === 0
  ) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <div className={classes.app_header}>
          <Header citiesList={cities.data} onChange={handleSelectChange} />
        </div>
        <div>
          {selectedCity !== 0 && (
            <Body
              selectedCity={selectedCity}
              dailyWind={dailyWind}
              dailytRain={dailytRain}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
