import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ReactDOM from "react-dom";
import * as AllData from './Data'
import Note from "./Note";

const getInitialState = () => {
  const value = "1010500";
  return value;
};

function App() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  const [value, setValue] = useState(getInitialState);
  const {loading, cities} = AllData.GetCities();

  const handleChange = (e) => {
      setValue(e.target.value);
  };

  var { cityInfo } = AllData.GetCityInfo(value);
  
  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = event => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  if (loading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        <Styles.Wrapper>
          <CSSReset />
          <Navbar.Wrapper>
            <Navbar.Logo>Tempo em Portugal</Navbar.Logo>

            <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
              <HamburgerButton.Lines />
            </HamburgerButton.Wrapper>

            <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
              <Navbar.Item>
                <h3>Selecione uma cidade</h3>
                <select class="comboBox-item" value={value} onChange={handleChange}>
                  {cities.map((city) => (
                      <option value={city.globalIdLocal}>{city.local}</option>
                  ))};
                </select>
              </Navbar.Item>
            </Navbar.Items>
          </Navbar.Wrapper>
        </Styles.Wrapper>
        <div className="div-top">
            { cityInfo.data.map((tmp) => (
                    <Note 
                        value={value}
                        forecastDate={tmp.forecastDate}
                        tMin={tmp.tMin}
                        tMax={tmp.tMax}
                        idWeatherType={tmp.idWeatherType}
                        precipitaProb={tmp.precipitaProb}
                        classWindSpeed={tmp.classWindSpeed}
                    />
                ))
            }
          </div>
      </div>
    );
  }
}

const Styles = {
  Wrapper: styled.main`
    display: flex;
    background-color: #eeeeee;
    height: auto; /* Altera de 100vh -> auto */
  `
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #DAF5FF;

    // 40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      width: 100vw;
      top: 0; /* Alterado de botton -> top */
      height: auto;
    }
  `,
  Logo: styled.h1`
    border: 0px solid gray;
    padding: 0.5rem 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0; 
      top: 0;

      height: 100%;

      flex-direction: column;

      background-color: white;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;

export default App;