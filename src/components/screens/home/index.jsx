import React, { useEffect, useState } from "react";
import { baseUrl, httpGet } from "../../utils/https";
import "./index.css";
const Network = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    reCallNetwork();
  }, []);

  const reCallNetwork = () => {
    setInterval(async () => {
      getNetworks();
    }, 300000);
  };

  const getNetworks = async () => {
    const res = await httpGet("api/v1/chains/properties");
    if (res.er) {
      return alert("Error found");
    }
    let convertObjectToArray = Object.values(res);
    let filterArray = convertObjectToArray.filter((data) => {
      return data.tokenSymbol && data.tokenDecimals;
    });
    setData(convertObjectToArray);
    setLoading(false);
  };

  const getStatus = async (name) => {
    const res = await httpGet(`api/v1/check/${name}`);
    if (res.er) {
      return "Not found";
    }
    return res;
  };

  const MapData = () => {
    return loading ? null : (
      <div className="connections">
        {data.map((res, index) => {
          return (
            <div key={index} className="connect">
              <img src={`${baseUrl}/icons/${res?.icon}`} alt="" />
              <h2>{res?.name}</h2>

              {getStatus(res.name) == true ? (
                <div className="status-container">
                  <h3>Disconnected</h3>
                  <div className="status-rect Connected"></div>
                </div>
              ) : (
                <div className="status-container">
                  <h3>Disconnected</h3>
                  <div className="status-rect disconnected"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div className="app-header-wrap">
        <h1 className="app-header">Connections</h1>
      </div>
      {loading ? <p className="app-loading">Loading...</p> : <MapData />}
    </div>
  );
};

export default Network;
