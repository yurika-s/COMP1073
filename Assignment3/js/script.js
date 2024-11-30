// NASA API Base URL
const apodBaseURL = 'https://api.nasa.gov/planetary/apod';
// NASA API key
const key = 'Wx2a3iSokQa0cEygrXQhcqgQSZMIAckriUbLhfAh';
// Grab elements
const mainImageArea = document.querySelector('.main-image');
const weekImagesArea = document.querySelector('.week-images');
const dateInput = document.querySelector('input[name=date]');
const emailInput = document.querySelector('input[name=email]');
const InvalidEmailMessage = document.querySelector('.main-image + div p');
const sendBtn = document.querySelector('button');
const errorParagraph = document.querySelector('.error');

// get today's date object and string with "YYYY-MM-YY" format
const today = new Date();
const todayString = today.toLocaleDateString('sv-SE');
// set date input attribute (referred > https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
dateInput.max = todayString;
dateInput.value = todayString;
let astronomyInfo = [];
// store the number of the current active image
let activeImageNth = 6;
getAstronomyPictures(today);

// Functions
async function getAstronomyPictures(date) {
  activeImageNth = 6;
  // set start date and end date
  let startDate = new Date();
  startDate.setDate(date.getDate() - 5);
  // format date to "YYYY-MM-YY" string
  startDate = startDate.toLocaleDateString('sv-SE');
  const endDate = date.toLocaleDateString('sv-SE');
  // full URL to access the API
  const url = `${apodBaseURL}?api_key=${key}&start_date=${startDate}&end_date=${endDate}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      astronomyInfo = data;
      displayImages(data);
    })
    .catch((error) => {
      resetImages(error);
    });
}

function displayImages(json) {
  resetImages('');
  // set images retrieved through API
  for (let i = 0; i < json.length; i++) {
    const nth = i + 1;
    const img = createImgElement(json[i].url, json[i].title, nth);
    weekImagesArea.appendChild(img);

    if (i === 5) {
      const img = createImgElement(json[i].url, json[i].title);
      mainImageArea.appendChild(img);
      document
        .querySelector(`.week-images img:nth-child(${nth})`)
        .classList.add('active');
    }
  }
}

// create image element to insert into the HTML
function createImgElement(url, title, nth = 1) {
  const img = document.createElement('img');
  img.src = url;
  img.alt = title;
  img.setAttribute('data-nth', nth);
  return img;
}

function setMainImage(index) {
  mainImageArea.innerHTML = '';
  const img = createImgElement(
    astronomyInfo[index].url,
    astronomyInfo[index].title
  );
  mainImageArea.appendChild(img);
}

function resetImages(errorMessage) {
  // mainImage.src = 'https://placehold.jp/ccc/ffffff/750x600.png?text=No%20Image';
  // mainImage.alt = 'No image';
  mainImageArea.innerHTML = '';
  weekImagesArea.innerHTML = '';
  errorParagraph.textContent = errorMessage;
}

// add click event to week images created after retrieving the info through the API
// referred > https://stackoverflow.com/questions/21700364/adding-click-event-listener-to-elements-with-the-same-class
document.querySelector('.week-images').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    const nth = e.target.getAttribute('data-nth');
    document
      .querySelector(`.week-images img:nth-child(${activeImageNth})`)
      .classList.remove('active');

    // change main image attribute into the attribute of the image clicked
    const mainImg = document.querySelector('.main-image img');
    mainImg.src = e.target.src;
    mainImg.alt = e.target.alt;
    document
      .querySelector(`.week-images img:nth-child(${nth})`)
      .classList.add('active');
    activeImageNth = nth;
  }
});

// add change event to date input to call api and update images
dateInput.addEventListener('change', (e) => {
  const date = new Date(e.target.value);
  getAstronomyPictures(date);
});

// add click event to button element to send the info via email
sendBtn.addEventListener('click', () => {
  InvalidEmailMessage.classList.remove('show');

  // validate email formate
  InvalidEmailMessage.classList.add('show');
});
