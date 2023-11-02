import classes from "./ItemBrowser.module.css";

const ItemBrowser = (props) => {
  // local vars
  let idWeatherTypeImage = process.env.PUBLIC_URL + "/images/w_ic_d_0anim.svg";
  let predWindDir = "";
  let idWeatherWindSpeed = "---";
  let idWeatherRain = "--";

  if (props === undefined || props.value === undefined) {
    return <div>loding</div>;
  }

  if (props.value !== null) {
    // set weather image base on hour and weather type
    idWeatherTypeImage =
      process.env.PUBLIC_URL +
      "/images/w_ic_" +
      (props.isDay ? "d" : "n") +
      "_" +
      String(props.value.idWeatherType).padStart(2, "0") +
      "anim.svg";

    // Wind direction image
    predWindDir =
      process.env.PUBLIC_URL +
      "/images/" +
      String(props.value.predWindDir).toLocaleLowerCase() +
      ".png";

    // Wind speed text
    idWeatherWindSpeed = props.wind.data.filter((wind) => {
      return wind.classWindSpeed === "" + props.value.classWindSpeed;
    });

    // Filter daily type
    idWeatherRain = props.dailytRain.data.filter((rain) => {
      return rain.classPrecInt === "" + props.value.classPrecInt;
    });
  }

  // Format date to long for header
  let formattedDate = new Date(props.value.forecastDate).toLocaleString(
    "pt-pt",
    { weekday: "long" }
  );

  // color of prob rain
  let probRainColor = "red";

  if (props.value.precipitaProb < 30) {
    probRainColor = "rgb(34, 199, 34)";
  } else if (props.value.precipitaProb < 30) {
    probRainColor = "darkyellow";
  }

  return (
    <div
      className={
        classes.item_browser +
        " " +
        (props.isDay ? classes.item_browser_day : classes.item_browser_night)
      }
    >
      <h3>{formattedDate + " " + props.value.forecastDate}</h3>
      <table className={classes.table_browser}>
        <tr className={classes.tr_header}>
          <td>Temp. Min.</td>
          <td>Temp. Max.</td>
          <td>Prb. Precip.</td>
          <td>Vento</td>
          <td rowspan="2">
            <img
              alt={props.value.predWindDir}
              src={predWindDir}
              className={classes.tr_header_img_arrows}
            />
          </td>
          <td>Precipit.</td>
          <td rowspan="2">
            <img
              alt={props.value.idWeatherType}
              src={idWeatherTypeImage}
              className={classes.tr_header_img_weather}
            />
          </td>
        </tr>
        <tr>
          <td
            className={classes.tr_botton}
            style={{ color: "rgb(73, 128, 231)" }}
          >
            {props.value.tMin}
          </td>
          <td className={classes.tr_botton} style={{ color: "red" }}>
            {props.value.tMax}
          </td>
          <td className={classes.tr_botton} style={{ color: probRainColor }}>
            {props.value.precipitaProb} %
          </td>
          <td className={classes.tr_botton}>
            {idWeatherWindSpeed.length !== 0 &&
              idWeatherWindSpeed[0].descClassWindSpeedDailyPT}
          </td>
          <td className={classes.tr_botton}>
            {idWeatherRain.length !== 0 && idWeatherRain[0].descClassPrecIntPT}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ItemBrowser;
