import React, { useEffect } from "react";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import classes from "./App.module.css";
import useWeatherData from "../hooks/useWeatherData";

function App() {
  const {
    cities, selectedCity, dailyWind, dailytRain,
    weatherTypes, cityUV, isLoading, error, lastUpdated,
    handleCityChange,
  } = useWeatherData();

  const currentHour = new Date().getHours();
  const isDay = currentHour > 7 && currentHour < 19;

  useEffect(() => {
    document.body.classList.remove("theme-day", "theme-night");
    document.body.classList.add(isDay ? "theme-day" : "theme-night");
  }, [isDay]);

  if (error) {
    return (
      <div style={{ color: "red", padding: "2rem" }}>
        Erro ao carregar dados: {error}
      </div>
    );
  }

  return (
    <div className={classes.app_root}>
      <div className={classes.app_header}>
        <Header
          citiesList={cities?.data ?? []}
          onChange={handleCityChange}
          isDay={isDay}
        />
      </div>
      <div className={classes.app_body}>
        <Body
          selectedCity={selectedCity}
          dailyWind={dailyWind}
          dailytRain={dailytRain}
          weatherTypes={weatherTypes}
          cityUV={cityUV}
          isDay={isDay}
          isLoading={isLoading}
          lastUpdated={lastUpdated}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
