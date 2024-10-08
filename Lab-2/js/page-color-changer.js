// grab html, input slider elements
const html = document.querySelector('html');
const sliderElements = [
  document.querySelector('#red'),
  document.querySelector('#green'),
  document.querySelector('#blue'),
];

// declare array to store RGB values
let RGBValues = ['0', '0', '0'];

// function to set RGB value depending on each slider value
const setRGBValue = (index, element) => {
  let inputValue = element.value;
  RGBValues[index] = inputValue;
};

// function to change the html background color
const changeBgColor = () => {
  let bgValue = `rgb(${RGBValues[0]}, ${RGBValues[1]}, ${RGBValues[2]})`;
  html.style.backgroundColor = bgValue;
  if (bgValue === 'rgb(255, 255, 255)') {
    html.style.color = '#000';
  }
};

