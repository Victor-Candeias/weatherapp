import { useState, useEffect } from "react";
import useHttp from "./use-http";
import { API_URLS } from "../constants/api";

const useWeatherData = () => {
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [dailyWind, setDailyWind] = useState(null);
  const [dailytRain, setDailyRain] = useState(null);
  const [weatherTypes, setWeatherTypes] = useState(null);
  // uvByCity: { globalIdLocal: { "2026-07-06": maxUV, ... } }
  const [uvByCity, setUvByCity] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { sendRequest: fetchCities, error } = useHttp();
  const { sendRequest: fetchWind } = useHttp();
  const { sendRequest: fetchRain } = useHttp();
  const { sendRequest: fetchWeatherTypes } = useHttp();
  const { sendRequest: fetchUV } = useHttp();

  useEffect(() => {
    fetchCities({ url: API_URLS.DISTRICTS }, (data) => {
      data.data.sort((a, b) => a.local.localeCompare(b.local));
      setCities(data);
      setSelectedCity(data.data[0]);
      setLastUpdated(new Date());
    });
    fetchWind({ url: API_URLS.WIND_SPEED }, setDailyWind);
    fetchRain({ url: API_URLS.PRECIPITATION }, setDailyRain);
    fetchWeatherTypes({ url: API_URLS.WEATHER_TYPES }, (data) => {
      const map = {};
      data.data.forEach((t) => { map[t.idWeatherType] = t.descWeatherTypePT; });
      setWeatherTypes(map);
    });
    fetchUV({ url: API_URLS.UV }, (data) => {
      // Build: { globalIdLocal: { date: maxUV } }
      const map = {};
      data.forEach(({ globalIdLocal, data: date, iUv }) => {
        const id = String(globalIdLocal);
        const val = parseFloat(iUv);
        if (!map[id]) map[id] = {};
        if (!map[id][date] || val > map[id][date]) map[id][date] = val;
      });
      setUvByCity(map);
    });
  }, [fetchCities, fetchWind, fetchRain, fetchWeatherTypes, fetchUV]);

  const isLoading = !cities || !dailyWind || !dailytRain || !weatherTypes;

  const handleCityChange = (e) => {
    e.preventDefault();
    const city = cities.data.find(
      (c) => "" + c.globalIdLocal === e.currentTarget.value
    );
    setSelectedCity(city);
    setLastUpdated(new Date());
  };

  // UV forecast for selected city: sorted array of { date, uv }
  const cityUV = selectedCity && uvByCity
    ? Object.entries(uvByCity[String(selectedCity.globalIdLocal)] ?? {})
        .map(([date, uv]) => ({ date, uv }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  return {
    cities, selectedCity, dailyWind, dailytRain,
    weatherTypes, cityUV, isLoading, error, lastUpdated,
    handleCityChange,
  };
};

export default useWeatherData;
