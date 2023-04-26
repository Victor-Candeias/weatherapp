import React, { useState } from "react";
import * as AllBD from "./BD";
const citiesUrl = "https://api.ipma.pt/open-data/distrits-islands";
const cityInfoURL = "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/";

function GetCities() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        fetch(citiesUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                setCities(responseJson.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return { loading, cities };
}

const cityInfoInitialState = { 
    currentId: "",
    oldId: "",
    loading: true,
    data: [] 
};

function GetCityInfo(id) {
    const [cityInfo, setCityInfo] = React.useState(cityInfoInitialState);
    
    if (cityInfo.oldId !== id) {
        console.log(id);
        const requestAnimePromise = id => {
            fetch(cityInfoURL + id)
                .then(response => response.json())
                .then(json => {
                    // Set data
                    cityInfoInitialState.oldId = id;
                    cityInfoInitialState.loading = false;
                    cityInfoInitialState.data = json.data;

                    setCityInfo(cityInfoInitialState); 
                    
                    while (cityInfo.oldId !== id) {
                        console.log();
                    };
                })
                .catch((error) => {
                    console.error(error);
                    // Set data
                    cityInfoInitialState.oldId = "";
                    cityInfoInitialState.loading = false;
                    cityInfoInitialState.data = [];
                    setCityInfo(cityInfoInitialState);
                });
        }
    
        requestAnimePromise(id);
    };


    /*
    if (oldId !== id && oldId !== '') {
        setOldId(id);
        setCityInfo(cityInfoInitialState);
        // setLoadingInfo(true);
    }

    React.useEffect(() => {
        const doSearch = () => {
            setLoadingInfo(true);
            fetch(cityInfoURL + id)
                .then((response) => response.json())
                .then((responseJson) => {
                    setCityInfo(responseJson.data);
                    setLoadingInfo(false);
                    setOldId(id);
                })
                .catch((error) => {
                    console.error(error);
                    setLoadingInfo(false);
                });
        }
        doSearch();
    }
    */
        /*
        setLoadingInfo(true);
        fetch(cityInfoURL + id)
            .then((response) => response.json())
            .then((responseJson) => {
                setCityInfo(responseJson.data);
                setLoadingInfo(false);
            })
            .catch((error) => {
                console.error(error);
                setLoadingInfo(false);
            });
    }
 
    , cityInfo);
   */

    return { cityInfo };
};

function GetClassWindType(id) {

    const filterWindType = AllBD.classWindType.filter(
        (t) => t.classWindSpeed === id);

    return filterWindType;
};

function WeatherIndicator(id) {

    const filterWindType = AllBD.weatherIndicator.filter(
        (t) => t.idWeatherType === id);

    return filterWindType;
};

export { GetCities, GetCityInfo, GetClassWindType, WeatherIndicator }