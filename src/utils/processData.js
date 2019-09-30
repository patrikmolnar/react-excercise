import _ from 'lodash'

export const convertData = data => {
  let csvRowArray = data.split(/\n/)
  let headerCellArray = removeQuotes(csvRowArray.shift().split(','))
  let objectArray = []

  while (csvRowArray.length) {
    let rowCellArray = removeQuotes(csvRowArray.shift().split(','))
    let rowObject = _.zipObject(headerCellArray, rowCellArray)
    objectArray.push(rowObject)
  }
  return filterByDatasource(objectArray)
}

const removeQuotes = stringArray => {
  const leng = stringArray.length
  for (let i = 0; i < leng; i++) {
    stringArray[i] = _.trim(stringArray[i], '"')
  }
  return stringArray
}

const getSum = (arr, key) => {
  return _.sumBy(
    _.map(arr, n => {
      n[key] = parseInt(n[key])
      return n
    }),
    `${key}`
  )
}

// chain into one variable
const filterByDatasource = array => {
  var filteredArray = _.filter(array, { Datasource: 'Facebook Ads' })
  var newArray = _.map(_.groupBy(filteredArray, 'Date'), o => {
    return {
      Date: o[0].Date,
      Datasource: o[0].Datasource,
      Campaign: o[0].Campaign,
      summedImpressions: getSum(o, 'Impressions'),
      summedClicks: getSum(o, 'Clicks')
    }
  })
  return newArray
}
