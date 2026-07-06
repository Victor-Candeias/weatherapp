import classes from "./WeatherCard.module.css";

const getRainColor = (prob) => {
  if (prob <= 30) return "#22c722";
  if (prob < 69) return "#e67e22";
  return "#e74c3c";
};

const getUVLevel = (uv) => {
  if (uv === null) return null;
  if (uv <= 2)  return { label: "Baixo",         color: "#27ae60", icon: "🟢" };
  if (uv <= 5)  return { label: "Moderado",      color: "#c8a800", icon: "🟡" };
  if (uv <= 7)  return { label: "Elevado",       color: "#e67e22", icon: "🟠" };
  if (uv <= 10) return { label: "Muito elevado", color: "#e74c3c", icon: "🔴" };
  return        { label: "Extremo",              color: "#8e44ad", icon: "🟣" };
};

const WeatherCard = ({ value, wind, dailytRain, weatherTypes, uvIndex, isDay }) => {
  const weatherImage =
    process.env.PUBLIC_URL +
    "/images/w_ic_" +
    (isDay ? "d" : "n") +
    "_" +
    String(value.idWeatherType).padStart(2, "0") +
    "anim.svg";

  const windDirImage =
    process.env.PUBLIC_URL +
    "/images/" +
    String(value.predWindDir).toLocaleLowerCase() +
    ".png";

  const windSpeedDesc =
    wind.data.find((w) => w.classWindSpeed === "" + value.classWindSpeed)
      ?.descClassWindSpeedDailyPT ?? "---";

  // Usa descrição oficial da API (weatherTypes) ou fallback
  const weatherDesc =
    (weatherTypes && weatherTypes[value.idWeatherType]) ?? "Tempo variável";

  const formattedDate = new Date(value.forecastDate).toLocaleString("pt-pt", {
    weekday: "long",
  });

  const probRainColor = getRainColor(value.precipitaProb);
  const uvLevel = getUVLevel(uvIndex);

  return (
    <div className={classes.card + " " + (isDay ? classes.card_day : classes.card_night)}>

      {/* Título (dia + data) */}
      <div className={classes.card_title}>
        <span className={classes.weekdate}>{formattedDate}</span>
        <span className={classes.datestr}>{value.forecastDate}</span>
      </div>

      {/* Ícone do tempo + temperaturas + vento (linha central) */}
      <div className={classes.card_main}>
        <img
          alt={weatherDesc}
          title={weatherDesc}
          src={weatherImage}
          className={classes.img_weather}
          loading="lazy"
        />
        <div className={classes.temps}>
          <span className={classes.temp_min}>{value.tMin}°</span>
          <span className={classes.temp_max}>{value.tMax}°</span>
        </div>
        <img
          alt={value.predWindDir}
          title={`Vento: ${value.predWindDir}`}
          src={windDirImage}
          className={classes.img_arrows}
          loading="lazy"
        />
      </div>

      {/* Vento (descrição) */}
      <div className={classes.wind_label}>{windSpeedDesc}</div>

      {/* Precipitação */}
      <div className={classes.rain_section}>
        <span className={classes.rain_label}>Precip.</span>
        <div className={classes.rain_bar_wrap} title={`Precipitação: ${value.precipitaProb}%`}>
          <div
            className={classes.rain_bar}
            style={{ width: `${value.precipitaProb}%`, backgroundColor: probRainColor }}
          />
        </div>
        <span className={classes.rain_pct} style={{ color: probRainColor }}>
          {value.precipitaProb}%
        </span>
      </div>

      {/* Índice UV */}
      {uvLevel && (
        <div className={classes.uv_section} title={uvLevel.label}>
          <span className={classes.uv_label}>UV</span>
          <span className={classes.uv_value} style={{ color: uvLevel.color }}>
            {uvLevel.icon} {uvIndex}
          </span>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
