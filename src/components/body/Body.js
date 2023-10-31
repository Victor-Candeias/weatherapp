import React, { useState, useEffect, Fragment } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import classes from "./Body.module.css";
import Item from "../item/Item";

import useHttp from "../../hooks/use-http";

const dailyCityURL =
  "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/";

const Body = (props) => {
  const [dailyMeteorology, setDailyMeteorology] = useState([]);

  let selectedCity = props.selectedCity;

  const { isLoading, error, sendRequest: fetchMetTasks } = useHttp();

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
              <Item
                value={day}
                wind={props.dailyWind}
                dailytRain={props.dailytRain}
              />
            ))}
          </div>
        </BrowserView>
        <MobileView>
          <h1>This is rendered only on mobile</h1>
        </MobileView>
      </Fragment>
    );
  }
};

export default Body;
