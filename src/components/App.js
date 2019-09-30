import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { convertData, returnData } from "../utils/processData";
import Chart from "./Chart";
import Filter from "./Filter";

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    value: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv"
      );
      const parsed = convertData(response.data);
      setData(returnData(parsed));
      applyFilter(parsed);
    };
    fetchData();
  }, [filter]);

  const applyFilter = array => {
    switch (filter.name) {
      case "Datasource":
        setData(returnData(array, filter.name, filter.value));
        break;
      case "Campaign":
        setData(returnData(array, filter.name, filter.value));
        break;
      case "All":
        setData(returnData(array));
      default:
        setData(returnData(array));
    }
  };

  return (
    <div style={{ width: "100%", flex: 1, justifyContent: "center" }}>
      <Chart data={returnData(data)} />
      <Filter
        setData={setData}
        data={returnData(data)}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default App;
