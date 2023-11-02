import classes from "./Header.module.css";
import ComboBox from "../comboBox/ComboBox";
import { isMobile } from "react-device-detect";

const Header = (props) => {
  return (
    <div
      className={
        classes.header +
        " " +
        (props.isDay ? classes.header_day : classes.header_night)
      }
    >
      <div
        className={
          isMobile ? classes.header_label_mobile : classes.header_label
        }
      >
        Tempo Portugal
      </div>
      <div className={classes.header_combobox}>
        <ComboBox
          citiesList={props.citiesList}
          onChange={props.onChange}
          isDay={props.isDay}
        />
      </div>
    </div>
  );
};

export default Header;
