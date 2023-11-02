import React from "react";
import Form from "react-bootstrap/Form";

import classes from "./ComboBox.module.css";
import { Fragment } from "react";
import { isMobile } from "react-device-detect";

export default function App(props) {
  console.log(props);

  return (
    <Fragment>
      {/* cidade */}
      {props.citiesList !== undefined && (
        <Form.Select
          aria-label="Default select example"
          className={
            (isMobile ? classes.combobox_mobile : classes.combobox) +
            " " +
            (props.isDay ? classes.combobox_day : classes.combobox_night)
          }
          onChange={props.onChange}
        >
          {props.citiesList.map((city) => (
            <option
              className={isMobile ? classes.combobox_option_mobile : ""}
              key={city.globalIdLocal}
              value={city.globalIdLocal}
            >
              {city.local}
            </option>
          ))}
        </Form.Select>
      )}
    </Fragment>
  );
}
