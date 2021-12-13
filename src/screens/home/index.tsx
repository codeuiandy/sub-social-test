import React, {useEffect, useState} from "react";
import {baseUrl, httpGet} from "../../utils/https";
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

  
  const getConnections = async () => {
    const res = await httpGet("api/v1/chains/properties");
    if (res.er) {
      return alert("Error found");
    }
    let convertObjectToArray = Object.values(res);
    let filterArray = convertObjectToArray.filter((data: any) => {
      return data.tokenSymbol && data.tokenDecimals;
    });
    const newArray = [];
    for (let index = 0; index < filterArray.length; index++) {
      const newObj: any = {
        // @ts-ignore
        status: await getStatus(filterArray[index].name),
        // @ts-ignore
        icon: filterArray[index].icon,
        // @ts-ignore
        name: filterArray[index].name,
      };
      newArray.push(newObj);
    }
    // @ts-ignore
    setData(newArray);
    // @ts-ignore
    setConnection(newArray);
    setLoading(false);
  };

  const getStatus = async (name: string) => {
    // Gets company connection status
    let convertToLower = name.toLowerCase();
    const res = await httpGet(`api/v1/check/${convertToLower}`);
    if (res.er) {
      return false;
    }
    return res;
  };

  const filterActivity = (type: string) => {
    // Filter Connections


    switch (type) {
      case "active":
        const filterActive = data.filter((connection: any) => {
          return connection.status == true;
        });
        setConnection(filterActive);
        break;

        case "inactive":
          const filterInactive = data.filter((connection: any) => {
            return connection.status == false;
          });
          setConnection(filterInactive);
          break;
    
      default:
        setConnection(data);
        break;
    }

  };

  const NetworkCard = () => {
    return loading ? null : (
      <div className="connections">
        {connection?.map((res: any, index: number) => {
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