import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { ThemeContext } from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Home.scss";
import Card from "../Components/Card";
import InputContainer from "../Components/InputContainer";
import Input from "../Components/Input";
import ButtonLoader from "../Components/ButtonLoader";
import Alert from "../Components/Alert";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RheXRydWVjbCIsImEiOiJja2FjN3F5bXEwMTk2MnlvNjBncDh1bTI2In0.-R60rCLTCklhTfY9CqPnAA";

const isIp = require("is-ip");
export default function Home() {
  const mapContainer = useRef();
  const mapInstance = useRef();
  const themeContext = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [isValidIp, setIsValidIp] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  const getLocationForIp = async (ip) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return { error };
    }
  };

  const getCurrentIp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.ipify.org?format=json`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return { error };
    }
  };

  const onSearchPress = async () => {
    if(!isIp(text)){
      return;
    }
    setCurrentData(null);
    setError(null);
    const response = await getLocationForIp(text);

    // catch "ECONNABORTED" and other network errors
    if(response.error){
      return setError(response.error.message);
    }

    if(response.status !== 'success'){
      return setError(response.message);
    }

    setCurrentData(response);

    // add marker to map
    const coords = [response.lon, response.lat];
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(mapInstance.current);
    
    // Center to marker
    mapInstance.current.setCenter(coords).zoomTo(15);
  };

  const onChange = async (event) => {
    const newText = event.target.value;
    setText(newText);
    setIsValidIp(isIp(newText));
  };

  useEffect(() => {
    async function fetchCurrentIp() {
      const current = await getCurrentIp();
      if (current.ip) {
        setText(current.ip);
        setIsValidIp(isIp(current.ip));
      }
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/" + themeContext.map,
      zoom: 1,
    }).addControl(new mapboxgl.NavigationControl({ showCompass: false }));

    mapInstance.current = map;

    fetchCurrentIp();
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
            <FontAwesomeIcon icon={faSearch} />
            <Input value={text} onChange={onChange} onEnter={onSearchPress} isValid={isValidIp}/>
            <ButtonLoader
              disabled={!isValidIp || isLoading}
              isLoading={isLoading}
              onClick={onSearchPress}
            />
          </InputContainer>

          <div ref={mapContainer} className="mapContainer" />
        </Card>

        {error && <Alert message={error} />}

        {currentData && (
          <Card style={{ marginTop: 14 }}>
            <h4>Resultado</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-3">País</dt>
              <dd className="col-sm-9">{currentData.country}</dd>

              <dt className="col-sm-3">Región</dt>
              <dd className="col-sm-9">{currentData.regionName}</dd>

              <dt className="col-sm-3">Ciudad</dt>
              <dd className="col-sm-9">{currentData.city}</dd>

              <dt className="col-sm-3">ISP</dt>
              <dd className="col-sm-9">{currentData.isp}</dd>
            </dl>
          </Card>
        )}
      </div>
    </div>
  );
}