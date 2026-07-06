import React, { useState, useEffect } from "react";
import classes from "./Body.module.css";

import useHttp from "../../hooks/use-http";
import WeatherCard from "../weatherCard/WeatherCard";
import SkeletonList from "../skeleton/Skeleton";
import { API_URLS } from "../../constants/api";

const Body = ({
  selectedCity, dailyWind, dailytRain, weatherTypes,
  cityUV, isDay, isLoading, lastUpdated
}) => {
  const [dailyMeteorology, setDailyMeteorology] = useState(null);
  const [fadeKey, setFadeKey] = useState(0);
  const { sendRequest: fetchMetTasks, error } = useHttp();

  useEffect(() => {
    if (!selectedCity) return;
    setDailyMeteorology(null);
    fetchMetTasks(
      { url: API_URLS.DAILY_FORECAST(selectedCity.globalIdLocal) },
      (data) => {
        setDailyMeteorology(data);
        setFadeKey((k) => k + 1);
      }
    );
  }, [fetchMetTasks, selectedCity]);

  if (error) {
    return (
      <div style={{ color: "red", padding: "2rem" }}>
        Erro ao carregar previsão: {error}
      </div>
    );
  }

  const showSkeleton = isLoading || !dailyMeteorology;

  const lastUpdatedText = lastUpdated
    ? lastUpdated.toLocaleString("pt-pt", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : null;

  const heroImage = selectedCity
    ? process.env.PUBLIC_URL +
      "/images/" +
      String(selectedCity.local).toLocaleLowerCase() +
      ".png"
    : null;

  return (
    <div>
      {/* Hero Banner */}
      {selectedCity && (
        <div className={classes.hero}>
          <img
            className={classes.hero_img}
            alt={selectedCity.local}
            src={heroImage}
            loading="lazy"
          />
          <div className={classes.hero_overlay}>
            <span className={classes.hero_city}>{selectedCity.local}</span>
            {lastUpdatedText && (
              <span className={classes.hero_updated}>
                Atualizado: {lastUpdatedText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cards */}
      {showSkeleton ? (
        <SkeletonList count={7} />
      ) : (
        <div key={fadeKey} className={`${classes.cards_container} fade-in`}>
          {dailyMeteorology.data.map((day) => (
            <WeatherCard
              key={day.forecastDate}
              value={day}
              wind={dailyWind}
              dailytRain={dailytRain}
              weatherTypes={weatherTypes}
              uvIndex={cityUV?.find(u => u.date === day.forecastDate)?.uv ?? null}
              isDay={isDay}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
