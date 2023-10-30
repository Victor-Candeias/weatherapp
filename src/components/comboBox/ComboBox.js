import React from "react";
import Form from "react-bootstrap/Form";

import classes from "./ComboBox.module.css";
import { Fragment } from "react";

export default function App(props) {
  console.log(props);

  return (
    <Fragment>
      {/* cidade */}
      {props.citiesList !== undefined && (
        <Form.Select
          aria-label="Default select example"
          className={classes.combobox}
          onChange={props.onChange}
        >
          {props.citiesList.map((city) => (
            <option key={city.globalIdLocal} value={city.globalIdLocal}>
              {city.local}
            </option>
          ))}
        </Form.Select>
      )}
    </Fragment>
  );
}
