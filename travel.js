let cv, ctx;
let totalCities = 100;
let cities = [];
let bestPath = [];
let recordDistance = Infinity;

window.onload = () => setup();

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  for (let i = 0; i < totalCities; i++) {
    cities.push(createVector(cv.width * Math.random(), cv.height * Math.random()));
  }
  setInterval(draw, 20);
}

const draw = function() {
  background(cv, 'black');
  showPath();
  showBestPath();
  for (let iter = 0; iter < 1000; iter++) {
    let d = calcDist(cities);
    // console.log(d);
    if (d < recordDistance) {
      recordDistance = d;
      bestPath = cities.valueOf();
      console.log('update', recordDistance);
    };
    // bestPath.forEach(city => ctx.ellipse(city.x, city.y, 4, 4));
    cities.shuffle();
  };
};

const showBestPath = function() {
  ctx.strokeStyle = rgb(10, 200, 10);
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i < bestPath.length - 1; i++) {
    ctx.moveTo(bestPath[i].x, bestPath[i].y);
    ctx.lineTo(bestPath[i + 1].x, bestPath[i + 1].y);
  }
  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = 'blue';
  bestPath.forEach(v => ctx.ellipse(v.x, v.y, 16, 16));
}

const showPath = function() {
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  cities.forEach(city => ctx.ellipse(city.x, city.y, 4, 4));
  ctx.beginPath();
  for (let i = 0; i < cities.length - 1; i++) {
    ctx.moveTo(cities[i].x, cities[i].y);
    ctx.lineTo(cities[i + 1].x, cities[i + 1].y);
  }
  ctx.stroke();
  ctx.closePath();
}

const calcDist = function(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    sum += Math.dist(arr[i].x, arr[i].y, arr[i + 1].x, arr[i + 1].y);
  }
  return sum;
}
