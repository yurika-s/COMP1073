/*
 ** NASA API
 ** referred > https://api.nasa.gov/
 */
// Base URL
const apodBaseURL = 'https://api.nasa.gov/planetary/apod';
const nasaKey = 'Wx2a3iSokQa0cEygrXQhcqgQSZMIAckriUbLhfAh';
/*
 ** NEWS API
 ** referred > https://newsapi.org/
 */
const newsBaseURL =
  'https://newsapi.org/v2/everything?from=20150101&sortBy=relevancy';
const newsKey = 'dd52c0778b0e45a087da87d270407cef';
// Grab elements
const container = document.querySelector('.container');
const mainImageArea = document.querySelector('.main-image');
const weekImagesArea = document.querySelector('.week-images');
const dateInput = document.querySelector('input[name=date]');
const emailInput = document.querySelector('input[name=email]');
const searchBtn = document.querySelector('button');
const errorParagraph = document.querySelector('.error');
const newsList = document.querySelector('.news-list');
const newsListTable = document.querySelector('.news-list table');
const tBody = document.querySelector('tbody');
const newsListMessage = document.querySelector('.news-list>p');

// get today's date object and string with "YYYY-MM-YY" format
const today = new Date();
const todayString = today.toLocaleDateString('sv-SE');
const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
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
  const url = `${apodBaseURL}?api_key=${nasaKey}&start_date=${startDate}&end_date=${endDate}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      astronomyInfo = data;
      astronomyInfo.forEach((item) => {
        // set item's url no image url if its media type is not image (ex. video etc)
        if (item.media_type !== 'image') {
          item.url =
            'https://placehold.jp/ccc/ffffff/750x600.png?text=No%20Image';
        }
      });
      displayImages();
    })
    .catch((error) => {
      resetImages(error);
    });
}

function displayImages() {
  resetImages('');
  // set images retrieved through API
  for (let i = 0; i < astronomyInfo.length; i++) {
    const img = createImgElement(
      astronomyInfo[i].url,
      astronomyInfo[i].title,
      astronomyInfo[i].copyright,
      i + 1
    );
    weekImagesArea.appendChild(img);

    if (i === 5) {
      setMainInfo(i);
    }
  }
}

async function getNews(keyword) {
  // full URL to access the API
  const url = `${newsBaseURL}&apiKey=${newsKey}&q=${keyword}`;
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.status === 'ok') {
        // filter data including author
        const articles = data.articles.filter((item) => item.author !== null);
        // limit the first 10 articles and display
        displayNewsList(articles.slice(0, 10));
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      resetImages(error);
    });
}

// create image element to insert into the HTML
function createImgElement(url, title, copyright, nth = 1) {
  const img = document.createElement('img');
  img.src = url;
  img.alt = title;
  img.setAttribute('copyright', copyright);
  img.setAttribute('data-nth', nth);
  return img;
}

function setMainInfo(index) {
  // reset child elements in main image area
  mainImageArea.innerHTML = '';
  // remove active class showing border from the previous selected image
  document
    .querySelector(`.week-images img:nth-child(${activeImageNth})`)
    .classList.remove('active');
  activeImageNth = index + 1;
  // create elements for selected image and append them to the main area
  const h2 = document.createElement('h2');
  h2.textContent = astronomyInfo[index].title;
  const p = document.createElement('p');
  p.textContent = astronomyInfo[index].explanation;
  const img = createImgElement(
    astronomyInfo[index].url,
    astronomyInfo[index].title,
    astronomyInfo[index].copyright
  );
  mainImageArea.appendChild(h2);
  mainImageArea.appendChild(img);
  mainImageArea.appendChild(p);
  // add active class to selected image in week images
  document
    .querySelector(`.week-images img:nth-child(${activeImageNth})`)
    .classList.add('active');

  showNewsList(false);
}

function resetImages(errorMessage) {
  mainImageArea.innerHTML = '';
  weekImagesArea.innerHTML = '';
  errorParagraph.textContent = errorMessage;
}

function displayNewsList(data) {
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
      <td>${new Date(article.publishedAt).toLocaleDateString(
        'en-US',
        dateOptions
      )}</td>
    `;
      tBody.append(tr);
      showNewsList(true);
    });

    // scroll down to the list
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

function setDisplayClass(element, display = true) {
  if (display) {
    element.classList.remove('hide');
    element.classList.add('show');
  } else {
    element.classList.add('hide');
    element.classList.remove('show');
  }
}
// add click event to week images created after retrieving the info through the API
// referred > https://stackoverflow.com/questions/21700364/adding-click-event-listener-to-elements-with-the-same-class
document.querySelector('.week-images').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    const nth = e.target.getAttribute('data-nth');

    // change main image info for the image clicked
    setMainInfo(nth - 1);
    container.scrollIntoView(); // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
  }
});

// add change event to date input to call api and update images
dateInput.addEventListener('change', (e) => {
  const date = new Date(e.target.value);
  getAstronomyPictures(date);
});

// add click event to button element to search more information about the astronomy topic the user selected
searchBtn.addEventListener('click', () => {
  const keyword = astronomyInfo[activeImageNth - 1].title;
  getNews(keyword);
});
