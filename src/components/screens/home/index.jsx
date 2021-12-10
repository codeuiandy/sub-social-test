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
    const newArray = [];
    for (let index = 0; index < filterArray.length; index++) {
      const newObj = {
        status: await getStatus(filterArray[index].name),
        icon: filterArray[index].icon,
        name: filterArray[index].name,
      };
      newArray.push(newObj);
    }
    setData(newArray);
    setLoading(false);
  };

  const getStatus = async (name) => {
    let convertToLower = name.toLowerCase();
    const res = await httpGet(`api/v1/check/${convertToLower}`);
    if (res.er) {
      return "Not found";
    }
    return res;
  };

  const MapData = () => {
    return loading ? null : (
      <div className="connections">
        {data.map((res, index) => {
          console.log(res);
          return (
            <div key={index} className="connect">
              <img src={`${baseUrl}/icons/${res?.icon}`} alt="" />
              <h2>{res?.name}</h2>

              {res.status == true ? (
                <div className="status-container">
                  <h3>Connected</h3>
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
