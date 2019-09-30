import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import {
  convertData,
  filterByDatasource,
  filterByCampaign,
  returnAll
} from "../utils/processData";
import Chart from "./Chart";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv"
      );
      const parsed = convertData(response.data);
      setData(parsed);
    };
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", flex: 1, justifyContent: "center" }}>
      <Chart data={returnAll(data)} />
    </div>
  );
};

export default App;
