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
        url: dailyCityURL + selectedCity + ".json",
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
          <div className={classes.body}>
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
        <div className={classes.body}>
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
