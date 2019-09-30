import React from "react";
import _ from "lodash";

const Filter = ({ data, setFilter, filter }) => {
  let datasources = [
    "All",
    "Facebook Ads",
    "Mailchimp",
    "Google Adwords",
    "Google Analytics"
  ];
  let campaigns = [];
  if (filter.name === "Datasource" || filter.name === "Campaign") {
    campaigns = _.uniqBy(data, "Campaign");
  }
  return (
    <div>
      <h2>Datasource</h2>
      <select
        onChange={e => setFilter({ name: "Datasource", value: e.target.value })}
        name="datasource"
      >
        {datasources.map((f, i) => (
          <option key={i}>{f}</option>
        ))}
      </select>
      {filter.name === "Datasource" || filter.name === "Campaign" ? (
        <>
          <h2>Campaign</h2>
          <select
            onChange={e =>
              setFilter({ name: "Campaign", value: e.target.value })
            }
          >
            {campaigns.map((d, i) => {
              return <option key={i}>{d.Campaign}</option>;
            })}
          </select>
        </>
      ) : null}
    </div>
  );
};

export default Filter;
