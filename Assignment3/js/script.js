/*
 ** NASA API
 ** referred > https://api.nasa.gov/
 */
// Base URL and key
const apodBaseURL = 'https://api.nasa.gov/planetary/apod';
const nasaKey = 'Wx2a3iSokQa0cEygrXQhcqgQSZMIAckriUbLhfAh';
// object to store the data from NASA API
let astronomyInfo = {};

/*
 ** The News API
 ** referred > https://newsapi.org/
 */
const newsBaseURL =
  'https://api.thenewsapi.com/v1/news/all?language=en&categories=science';
const newsKey = '8KazwDIpLzVNywgTrmucXbCSHwbQ9eTyH6onP2xm';
// Grab HTML elements
const container = document.querySelector('.container');
const mainImageArea = document.querySelector('.main-image');
const dateInput = document.querySelector('input[name=date]');
const searchBtn = document.querySelector('button');
const errorParagraph = document.querySelector('.error');
const newsList = document.querySelector('.news-list');
const newsListTable = document.querySelector('.news-list table');
const tBody = document.querySelector('tbody');
const newsListMessage = document.querySelector('.news-list>p');

// get today's date object and string with "YYYY-MM-YY" format
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
const today = new Date();
const todayString = today.toLocaleDateString('sv-SE');
// set date input attribute (referred > https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
dateInput.max = todayString;
dateInput.value = todayString;

// constants
const noImagePath =
  'https://placehold.jp/ccc/ffffff/750x600.png?text=No%20Image';
const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
// call function when it load
getAstronomyPictures(today);

/*
 ** Functions
 */
function getAstronomyPictures(date) {
  // format date to "YYYY-MM-YY" string
  const dateString = date.toLocaleDateString('sv-SE');
  // full URL to access the NASA API
  const url = `${apodBaseURL}?api_key=${nasaKey}&date=${dateString}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      // check if the object contains "error" key
      if ('error' in data) {
        throw new Error(data.error.message);
      }
      // store the json object
      astronomyInfo = data;
      // check if media type is image or change url to no image path
      if (astronomyInfo.media_type !== 'image') {
        astronomyInfo.url = noImagePath;
      }
      displayInfo(astronomyInfo);
    })
    .catch((error) => {
      resetInfo(error);
    });
}

function displayInfo(json) {
  resetInfo('');
  // create elements for retrieved data and append them to the main image area
  //h2
  const h2 = document.createElement('h2');
  h2.textContent = json.title;
  // image
  const img = document.createElement('img');
  img.src = json.url;
  img.alt = json.title;
  img.setAttribute('copyright', json.copyright);
  // p
  const p = document.createElement('p');
  p.textContent = json.explanation;
  // append
  mainImageArea.appendChild(h2);
  mainImageArea.appendChild(img);
  mainImageArea.appendChild(p);
  // reset news list
  showNewsList(false);
}

function getNews(keyword) {
  // full URL to access The News API
  const url = `${newsBaseURL}&api_token=${newsKey}&search=${keyword}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      if ('error' in json) {
        throw new Error(json.error.message);
      }
      displayNewsList(json.data);
    })
    .catch((error) => {
      resetInfo(error);
    });
}

function resetInfo(errorMessage) {
  mainImageArea.innerHTML = '';
  errorParagraph.textContent = errorMessage;
}

function displayNewsList(data) {
  // reset tbody and no list message
  tBody.innerHTML = '';
  newsListMessage.classList.remove('show');
  newsListMessage.classList.add('hide');
  // add data to table body
  if (data.length > 0) {
    data.forEach((article) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td><a href="${article.url}" target="blank">${article.title}</a></td>
      <td>${article.description}</td>
      <td>${new Date(article.published_at).toLocaleDateString(
        'en-US',
        dateOptions
      )}</td>
    `;
      tBody.append(tr);
      showNewsList(true);
    });
    // scroll down to the list (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
    newsList.scrollIntoView();
  } else {
    showNewsList(true, newsListMessage);
  }
}

function showNewsList(display = true, content = newsListTable) {
  // reset display state
  setDisplayClass(newsListTable, false);
  setDisplayClass(newsListMessage, false);
  if (display) {
    setDisplayClass(newsList);
    setDisplayClass(content);
  } else {
    setDisplayClass(newsList, false);
  }
}

// general function to change a element's display class
function setDisplayClass(element, display = true) {
  if (display) {
    element.classList.remove('hide');
    element.classList.add('show');
  } else {
    element.classList.add('hide');
    element.classList.remove('show');
  }
}

// add change event to date input to call api and update screen
dateInput.addEventListener('change', (e) => {
  const date = new Date(e.target.value);
  getAstronomyPictures(date);
});

// add click event to button element to search more information about the astronomy topic based on the information from NASA API
searchBtn.addEventListener('click', () => {
  const keyword = astronomyInfo.title;
  getNews(keyword);
});
