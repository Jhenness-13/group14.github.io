/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

// npm install plotly.js-dist is needed for this script to work

//REQUEST IS BEING PROCESSED AND TRANSFORMED INTO 
//ARRAYS
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
function removeNullValues(data) {
  console.log(data[1]);
  const x = [];
  const y = [];
  const x1 = [];
  const y1 = [];
  console.log(data[0].length);
  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i] != null) {
      x.push(data[0][i]);
      y.push(data[1][i]);
    }
  }

  for (let i = 0; i < y.length; i++) {
    if (y[i] != null) {
      x1.push(x[i]);
      y1.push(y[i]);
    }
  }
  return [x1, y1];
}

function initChart(chart, data_) {
  const labels = data_[0];
  const info = data_[1];
  const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: data_,
      backgroundColor: 'rgb(255, 99, 132)',
    }]
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  return new Chart(
    chart,
    config
  );
}

function scatterPoints(data) {
  const arr = [];
  for (let i = 0; i < data[0].length; i++) {
    const x_y_comp = {x: data[0][i], y: data[1][i]};
    arr.push(x_y_comp);
  }
  return arr;
}

async function getData(param) {
  const url = `https://api-nba-v1.p.rapidapi.com/players?team=${param}&season=2021`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4f97ce439dmshc2e85d907e86424p17ef73jsna492d20dc9ec',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  });
  let json = await data.json();
  return json;
}


//SETTING A GLOBAL VARIABLE THAT WILL BE CHANGED AFTER INPUTTING VALUE
var x = 1;
var data1 = 0;
var data2 = 0;

function submitE(data) {
  console.log(data);
  var a = data;
  if (a == "Team 1") {
    x = 1;
  }
  if (a == "Team 2") {
    x =2;
  }
  if (a == "Team 4") {
    x =4;
  }
  if (a == "Team 5") {
    x =5;
  }

  // x = a;
}

async function newFunc() {

  data2 = await getData(x);
  console.log("newFunc")
  console.log(data2)
  return data2
}

// async function initData() {
//   var data1 = await getData(x);
//   return data1
// }

// function done() {
//   return initData()
// }


async function mainEvent() {
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const submit = document.querySelector('button[type="submit"]');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  loadAnimation.classList.remove('lds-ellipsis');
  loadAnimation.classList.add('lds-ellipsis-hidden');
  const chartTarget = document.querySelector('#my_chart');
  // const data1 = await getData(x);
  var data1 = await getData(x);
  console.log(data1)

  form.addEventListener('input', (event) => {
    console.log(event.target.value);
    submitE(event.target.value);
    newFunc()
  });

  form.addEventListener('submit', (submitEvent) => {
    console.log("DATA BELOW")
    console.log(data1)
    if (data2 === 0) {
      var dataManipulated = processRequest(data1.response);
    }
    else {
      var dataManipulated = processRequest(data2.response);
    }
    const x_and_y = createArrays(dataManipulated);
    const cleanValues = removeNullValues(x_and_y);
    const test = scatterPoints(cleanValues);
    submitEvent.preventDefault();
    initChart(chartTarget, test);
  });
}

// edit
/*
      This last line actually runs first!
      It's calling the 'mainEvent' function at line 57
      It runs first because the listener is set to when your HTML content has loaded
    */

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
