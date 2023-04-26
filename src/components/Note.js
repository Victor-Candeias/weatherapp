// import React from "react";
import React from 'react';
import * as AllData from './Data'

function Note(props) {

    console.log(props);

    // ImageId
    let imageId = parseInt(props.idWeatherType);

    // Date Format
    var date = new Date(props.forecastDate); 

    // Class wind description
    let windType = AllData.GetClassWindType(String(props.classWindSpeed));

    console.log(windType[0].descClassWindSpeedDailyPT);

    let weatherType = AllData.WeatherIndicator(props.idWeatherType);

    console.log(weatherType[0].descWeatherTypePT);

    const handleClick = (e) => {
        console.log(e.target.value);
        console.log(props.value);
    };

    return (
            <div value={date.toDateString()} className="note" onClick={handleClick}>
                <p>Dia: {date.toDateString()}</p>
                <p>Temp. Max.: {props.tMin}°c</p>
                <p>Temp. Min.: {props.tMax}°c</p>
                <p>Prb.Precip.: {props.precipitaProb}%</p>
                <p>Vento: {windType[0].descClassWindSpeedDailyPT}</p>
                <p>{weatherType[0].descWeatherTypePT}</p>
                <img src={process.env.PUBLIC_URL + "/images/w_ic_d_" + zeroPad(imageId, 2) + "anim.svg"} alt="Wheater type"></img>
            </div>
    )};

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

export default Note;
