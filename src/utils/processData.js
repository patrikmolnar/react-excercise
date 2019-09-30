import _ from "lodash";

export const convertData = data => {
  let csvRowArray = data.split(/\n/);
  let headerCellArray = removeQuotes(csvRowArray.shift().split(","));
  let objectArray = [];

  while (csvRowArray.length) {
    let rowCellArray = removeQuotes(csvRowArray.shift().split(","));
    let rowObject = _.zipObject(headerCellArray, rowCellArray);
    objectArray.push(rowObject);
  }
  return objectArray;
};

const removeQuotes = stringArray => {
  const len = stringArray.length;
  for (let i = 0; i < len; i++) {
    stringArray[i] = _.trim(stringArray[i], '"');
  }
  return stringArray;
};

const getSum = (arr, key) => {
  return _.sumBy(
    _.map(arr, n => {
      if (n[key]) {
        n[key] = parseInt(n[key]);
      } else {
        n[key] = 0;
      }
      return n;
    }),
    `${key}`
  );
};

export const returnAll = arr => {
  let byDate = _.groupBy(arr, "Date");
  let output = [];
  _.each(byDate, function(dateArray) {
    let computedItem = {
      Date: "",
      Impressions: 0,
      Clicks: 0
    };
    _.each(dateArray, function(item) {
      if (item.Impressions === "") {
        item.Impressions = 0;
      }
      computedItem.Date = item.Date;
      computedItem.Impressions += parseInt(item.Impressions);
      computedItem.Clicks += parseInt(item.Clicks);
    });
    output.push(computedItem);
  });
  output.pop();
  return output;
};

/// chain into one variable
export const filterByDatasource = (array, value) => {
  let filteredArray = _.filter(array, { Datasource: value });
  let newArray = _.map(_.groupBy(filteredArray, "Date"), o => {
    return {
      Date: o[0].Date,
      Datasource: o[0].Datasource,
      Campaign: o[0].Campaign,
      Impressions: getSum(o, "Impressions"),
      Clicks: getSum(o, "Clicks")
    };
  });
  return newArray;
};

export const filterByCampaign = (array, value) => {
  let filteredArray = _.filter(array, { Campaign: value });
  let newArray = _.map(_.groupBy(filteredArray, "Date"), o => {
    return {
      Date: o[0].Date,
      Datasource: o[0].Datasource,
      Campaign: o[0].Campaign,
      Impressions: getSum(o, "Impressions"),
      Clicks: getSum(o, "Clicks")
    };
  });
  return newArray;
};
