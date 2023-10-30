import classes from "./Header.module.css";
import ComboBox from "../comboBox/ComboBox";

const Header = (props) => {

  console.log(props);

  return (
    <div className={classes.header}>
      <div className={classes.header_label}>Weather App Info</div>
      <div className={classes.header_combobox}>
        <ComboBox citiesList={props.citiesList} onChange={props.onChange}/>
      </div>
    </div>
  );
};

export default Header;
