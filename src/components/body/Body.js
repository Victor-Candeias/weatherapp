import React, { useState, useEffect, Fragment } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./Body.module.css";

import useHttp from "../../hooks/use-http";
import ItemBrowser from "../itemBrowser/ItemBrowser";
import ItemMobile from "../itemMobile/ItemMobile";

const dailyCityURL =
  "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/";

const Body = (props) => {
  const [dailyMeteorology, setDailyMeteorology] = useState([]);

  let selectedCity = props.selectedCity;

  const { sendRequest: fetchMetTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (taksMetObj) => {
      setDailyMeteorology(taksMetObj);
    };

    fetchMetTasks(
      {
        url: dailyCityURL + selectedCity.globalIdLocal + ".json",
      },
      transformTasks
    );
  }, [fetchMetTasks, selectedCity]);

  if (dailyMeteorology.length === 0) {
    return <div>Loading</div>;
  } else {
    return (
      <Fragment>
        <BrowserView>
          <div className={classes.body_browser}>
            <img
              className={classes.city_image_browser}
              alt={selectedCity.local}
              src={
                process.env.PUBLIC_URL +
                "/images/" +
                String(selectedCity.local).toLocaleLowerCase() +
                ".png"
              }
            />
          </div>
          <div className={classes.body_browser}>
            {dailyMeteorology.data.map((day) => (
              <ItemBrowser
                value={day}
                wind={props.dailyWind}
                dailytRain={props.dailytRain}
                isDay={props.isDay}
              />
            ))}
          </div>
        </BrowserView>
        <MobileView>
          <div className={classes.body_mobile}>
            <img
              className={classes.city_image_mobile}
              alt={selectedCity.local}
              src={
                process.env.PUBLIC_URL +
                "/images/" +
                String(selectedCity.local).toLocaleLowerCase() +
                ".png"
              }
            />
          </div>
          <div className={classes.body_mobile}>
            {dailyMeteorology.data.map((day) => (
              <ItemMobile
                value={day}
                wind={props.dailyWind}
                dailytRain={props.dailytRain}
                isDay={props.isDay}
              />
            ))}
          </div>
        </MobileView>
      </Fragment>
    );
  }
};

export default Body;
