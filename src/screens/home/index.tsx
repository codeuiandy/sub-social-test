import React, { useEffect, useState } from "react";
import { baseUrl, httpGet } from "../../utils/https";
import "./index.css";
import Layout from "../../components/layout/index";
const Network = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState([]);
  const [activity, setActivity] = useState("");
  useEffect(() => {
    getConnections();
  }, []);

  useEffect(() => {
    reCallConnection();
  }, []);

  const reCallConnection = () => {
    setInterval(async () => {
      getConnections();
    }, 300000);
  };

interface ConnectionItem{
  status:Promise<void>,
  icon:any,
  name:any

}
  const getConnections = async () => {
    const res = await httpGet("api/v1/chains/properties");
    if (res.er) {
      return alert("Error found");
    }
    let convertObjectToArray = Object.values(res);
    let filterArray = convertObjectToArray.filter((data:any) => {
      return data.tokenSymbol && data.tokenDecimals;
    });
    const newArray = [];
    for (let index = 0; index < filterArray.length; index++) {
      const newObj:ConnectionItem = {
        status: await getStatus(filterArray[index].name),
        icon: filterArray[index].icon,
        name: filterArray[index].name,
      };
      newArray.push(newObj);
    }
    setData(newArray);
    setConnection(newArray);
    setLoading(false);
  };

  const getStatus = async (name:string) => {
    // Gets company connection status
    let convertToLower = name.toLowerCase();
    const res = await httpGet(`api/v1/check/${convertToLower}`);
    if (res.er) {
      return false;
    }
    return res;
  };

  const filterActivity = (type:string) => {
    // Filter Connections
    setActivity(type);
    if (type == "active") {
      const filterActive = data.filter((connection:any) => {
        return connection.status == true;
      });
      setConnection(filterActive);
    }

    if (type == "inactive") {
      const filterActive = data.filter((connection) => {
        return connection.status == false;
      });
      setConnection(filterActive);
    }

    if (type == "all") {
      setConnection(data);
    }
  };

  const NetworkCard = () => {
    return loading ? null : (
      <div className="connections">
        {connection?.map((res, index) => {
          console.log(res);
          return (
            <div key={index} className="connect">
              <img src={`${baseUrl}/icons/${res?.icon}`} alt="" />
              <h2>{res?.name}</h2>

              {res.status ? (
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
    <Layout>
      {loading ? (
        <p className="app-loading">Loading...</p>
      ) : (
        <div className="home-page-wrap">
          <div className="home-page-header">
            <h2>Connections</h2>
            <select onChange={(e) => filterActivity(e.target.value)}>
              <option value="">Select activity</option>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <NetworkCard />
        </div>
      )}
    </Layout>
  );
};

export default Network;
