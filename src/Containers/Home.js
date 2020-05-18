import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { ThemeContext } from "styled-components";
import {IMaskInput} from 'react-imask';
import IMask from 'imask';


import "./Home.scss";
import Card from "../Components/Card";
import InputContainer from "../Components/InputContainer";
import Input from "../Components/Input";


mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RheXRydWVjbCIsImEiOiJja2FjN3F5bXEwMTk2MnlvNjBncDh1bTI2In0.-R60rCLTCklhTfY9CqPnAA";

const isIp = require("is-ip");
export default function Home() {
  const mapContainer = useRef();
  const mapInstance = useRef();
  const themeContext = useContext(ThemeContext);

  const [text, setText] = useState("");

  const onChange = (event) => {
    const newText = event.target.value;

    console.debug(isIp(newText));
    setText(newText);
  };




  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/" + themeContext.map,
      zoom: 1,
    });

    mapInstance.current = map;
  }, []);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }
    mapInstance.current.setStyle("mapbox://styles/mapbox/" + themeContext.map);
  }, [themeContext.map]);

  return (
    <div className="row mt-5 mb-5">
      <div className="col ">
        <Card className="mainCard">
          <InputContainer>
            <Input value={text} onChange={onChange} />
            <IMaskInput
              placeholderChar={'\u2000'}
              mask={[
                {
                  mask: 'OCT.OCT.OCT.OCT',
                  blocks: {
                    OCT: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 255
                    }
                  }
                },
              ]}
            />
          </InputContainer>

          <div ref={mapContainer} className="mapContainer" />
        </Card>
      </div>
    </div>
  );
}

// https://docs.mapbox.com/mapbox-gl-js/example/setstyle/
