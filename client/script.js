/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

// npm install plotly.js-dist is needed for this script to work

function processRequest(data) {
  const heights = [];
  const weights = [];
  const weightsHeights = [];
  data.forEach((element) => heights.push(element.height.meters));
  data.forEach((element) => weights.push(element.weight.kilograms));
  for (let i = 0; i < weights.length; i++) {
    weightsHeights.push([heights[i], weights[i]]);
  }
  return weightsHeights;
}

function createArrays(data) {
  const x = [];
  const y = [];
  for (let i = 0; i < data.length; i++) {
    x.push(data[i][0]);
    y.push(data[i][1]);
  }
  return [x, y];
}

function createPlot(data) {
  const trace1 = {
    x: data[0],
    y: data[1],
    mode: 'markers',
    type: 'scatter'
  };
  const plotData = [trace1];

  Plotly.newPlot('myDiv', plotData);
}
function injectHMTL(data) {
  console.log(data);
  const lst = document.createElement('ol');
  data.forEach((item) =>{
    const el = document.createElement('li');
    el.innerText = item[0]
  })

}

async function getData(param) {
  // const team_number = param
  const url = 'https://api-nba-v1.p.rapidapi.com/players?team=' + param + '&season=2021';
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
  return json;
}

async function mainEvent() {
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const submit = document.querySelector('button[type="submit"]');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  loadAnimation.classList.remove('lds-ellipsis');
  loadAnimation.classList.add('lds-ellipsis-hidden');
  const data = await getData(2);

  form.addEventListener('submit', (submitEvent) => {
    const dataManipulated = processRequest(data.response);
    const x_and_y = createArrays(dataManipulated);
    submitEvent.preventDefault();
    injectHMTL(x_and_y)
  });

  // console.log(data);
}

// edit
/*
      This last line actually runs first!
      It's calling the 'mainEvent' function at line 57
      It runs first because the listener is set to when your HTML content has loaded
    */

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
