import classes from "./Header.module.css";
import ComboBox from "../comboBox/ComboBox";
import {isMobile} from 'react-device-detect';

const Header = (props) => {

  return (
    <div className={classes.header}>
      <div className={(isMobile ? classes.header_label_mobile : classes.header_label)}>Tempo Portugal</div>
      <div className={classes.header_combobox}>
        <ComboBox citiesList={props.citiesList} onChange={props.onChange}/>
      </div>
    </div>
  );
};

export default Header;
