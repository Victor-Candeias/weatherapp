import classes from "./Header.module.css";
import ComboBox from "../comboBox/ComboBox";

const Header = ({ citiesList, onChange, isDay }) => {
  const icon = isDay ? "☀️" : "🌙";

  return (
    <div className={classes.header + " " + (isDay ? classes.header_day : classes.header_night)}>
      <div className={classes.header_label}>
        {icon} Tempo Portugal
      </div>
      <div className={classes.header_combobox}>
        <ComboBox citiesList={citiesList} onChange={onChange} isDay={isDay} />
      </div>
    </div>
  );
};

export default Header;
