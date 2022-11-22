/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/
function processRequest(data) {
  const heights = [];
  const weights = [];
  const weightsHeights = [];
  data.forEach((element) => heights.push(element.height.meters));
  data.forEach((element) => weights.push(element.weight.kilograms));
  // console.log(heights, weights);
  for (let i = 0; i < weights.length; i++) {
    weightsHeights.push([heights[i], weights[i]]);
  }
  console.log(weightsHeights);
  return weightsHeights;
}

async function shapeDataForLineChart(array) {
  return array.reduce((collection, item) => {
    if (!collection[item.category]) {
      collection[item.category] = [item];
    } else {
      collection[item.category].push(item);
    }
    return collection;
  }, {});
}

function initChart(chart, object) {
  const labels = Object.keys(object);
  const info = Object.keys(object).map((item) => object[item].length);

  const data = {
    labels: labels,
    datasets: [{
      label: 'Group 14 Lab 9 Chart',
      backgroundColor: 'rgb(255,99,132)',
      borderColor: 'rgb(255,99,132)',
      data: info
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  return new Chart(
    targetElement,
    config
  );
}

function changeChart(chart, dataObject) {
  const labels = Object.keys(dataObject);
  const info = Object.keys(dataObject).map((item) => dataObject[item].length);

  chart.data.labels = labels;
  chart.data.datasets.forEach((set) => {
    set.data = info;
    return set;
  });
  chart.update();
}

async function getData() {
  const url = 'https://api-nba-v1.p.rapidapi.com/players?team=1&season=2021';
  // const url = 'https://api-nba-v1.p.rapidapi.com/teams/statistics?id=2&season=2020';
  // const request = await fetch(url);
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4f97ce439dmshc2e85d907e86424p17ef73jsna492d20dc9ec',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  });
  const json = await data.json();
  // const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
  return json;
}
async function mainEvent() {
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const submit = document.querySelector('#get_resto');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  loadAnimation.classList.remove('lds-ellipsis');
  loadAnimation.classList.add('lds-ellipsis-hidden');
  const data = await getData();
  const dataManipulated = processRequest(data.response);
  // const shapedData = shapeDataForLineChart(data.response);
  console.log(dataManipulated);
  // console.log(data);
}

/*
      This last line actually runs first!
      It's calling the 'mainEvent' function at line 57
      It runs first because the listener is set to when your HTML content has loaded
    */
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
