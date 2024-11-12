// create constructor function
function ToyCar(
  name,
  price,
  sku,
  upc,
  brand,
  model,
  color,
  decade,
  packaging,
  scale,
  type,
  description,
  image,
  reviews = []
) {
  this.name = name;
  this.price = price;
  this.sku = sku;
  this.upc = upc;
  this.brand = brand;
  this.model = model;
  this.color = color;
  this.decade = decade;
  this.packaging = packaging;
  this.scale = scale;
  this.type = type;
  this.description = description;
  this.image = image;
  this.reviews = reviews;
  this.getAverageStars = () => {
    let total = 0;
    this.reviews.forEach((review) => {
      total += review.stars;
    });
    return Math.round((total / reviews.length) * 10) / 10;
  };
}

// create an instance
let toyCar = new ToyCar(
  'Broward Cty Florida Sheriffs Office 18 Ford F-350 Dually 46060C/48 1/64 scale Diecast Model Toy Car',
  8.99,
  '46060C-GL-WHITE',
  '680334685595',
  'Ford',
  'F-350 Dually',
  'White',
  '',
  'Blister Card',
  '1/64',
  'pickup truck',
  "Every car lover dreams about this neat pickup truck from Greenlight! This Broward County, Florida Sheriff’s Office 2018 Ford F-350 Dually is a 1/64 scale model replica. It comes in white and features real rubber tires, metal body and chassis, detailed exterior, comes in a blister pack. It's a terrific choice for any pickup truck collection, and just right for faithful Ford aficionados!",
  './images/toy-car.jpg',
  [
    {
      title: 'Arrived soon',
      reviewer: 'Sofi Berre',
      date: 'Oct 29, 2022',
      comment:
        'Really liked how soon it arrived, the only problem is that it came with a scratch on the back, but besides that, it was perfect',
      stars: 3,
    },
    {
      title: 'Florida Squad',
      reviewer: 'Larry K. Carlson',
      date: 'Mar 26, 2022',
      comment: 'Usual excellent Greenlight quality & detail',
      stars: 4,
    },
    {
      title: 'Love the Paint!',
      reviewer: ' James King',
      date: 'Feb 18, 2022',
      comment: 'Love the paint. A nice addition to my collection',
      stars: 5,
    },
  ]
);

// function to display the car information
function displayToyInfo() {
  // grab HTML elements
  const name = document.querySelector('h1');
  const img = document.querySelector('img#productImage');
  const price = document.querySelector('p.price');
  const stars = document.querySelector('div.stars');
  const details = document.querySelector('div.details');
  const reviews = document.querySelector('div.reviews');

  // add main information
  name.textContent = toyCar.name;
  img.setAttribute('src', toyCar.image);
  price.textContent = `$${toyCar.price}`;

  // add detail information
  let detailContent = '';
  if (toyCar.sku) detailContent += `<p><span>SKU: </span>${toyCar.sku}</p>`;
  if (toyCar.upc) detailContent += `<p><span>UPC: </span>${toyCar.upc}</p>`;
  if (toyCar.brand)
    detailContent += `<p><span>Brand: </span>${toyCar.brand}</p>`;
  if (toyCar.model)
    detailContent += `<p><span>Model: </span>${toyCar.model}</p>`;
  if (toyCar.color)
    detailContent += `<p><span>Colour: </span>${toyCar.color}</p>`;
  if (toyCar.decade)
    detailContent += `<p><span>Decade: </span>${toyCar.decade}</p>`;
  if (toyCar.packaging)
    detailContent += `<p><span>Packaging: </span>${toyCar.packaging}</p>`;
  if (toyCar.scale)
    detailContent += `<p><span>Scale: </span>${toyCar.scale}</p>`;
  if (toyCar.type)
    detailContent += `<p><span>Vehicle Type: </span>${toyCar.type}</p>`;
  if (toyCar.description)
    detailContent += `<p><span>Description: </span>${toyCar.description}</p>`;
  details.innerHTML = detailContent;

  // reviews area
  let averageStars = toyCar.getAverageStars();
  // create a variable to show stars being added to HTML
  let starElements = getStarSVGElements(averageStars);
  stars.innerHTML = starElements;

  // reset reviews area and add reviews to HTML
  reviews.innerHTML = '';
  toyCar.reviews.forEach((review) => {
    const div = getReviewsDivElement(review);
    reviews.appendChild(div);
  });
}

// function to get a svg element string for stars
function getStarSVGElements(stars) {
  let starElements = '';
  // create 5 star elements
  for (i = 1; i <= 5; i++) {
    starElements += `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >`;
    if (i <= stars) {
      // filled
      starElements += `<path fill="#F9B618"`;
    } else {
      // non filled
      starElements += `<path fill="#FFF"`;
    }
    starElements += ` stroke="#F9B618"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333z"
                    /></svg>`;
  }
  starElements += `<span class="star-points">${stars}</span>`;
  return starElements;
}

// function to get div element part for review
function getReviewsDivElement(review) {
  // create new elements showing review information
  let div = document.createElement('div');
  let pTitle = document.createElement('p');
  let spReviewer = document.createElement('span');
  let spDate = document.createElement('span');
  let pComment = document.createElement('p');
  let divStars = document.createElement('div');
  // add class
  divStars.classList.add('stars');
  // get a svg element string for stars and add it
  let reviewStars = getStarSVGElements(review.stars);
  divStars.innerHTML = reviewStars;
  // add contents to elements that have just created at the beginning
  pTitle.textContent = review.title;
  spReviewer.textContent = review.reviewer + ' / ';
  spReviewer.classList.add('small');
  spDate.textContent = review.date;
  spDate.classList.add('small');
  pComment.textContent = review.comment;
  // add these elements to div elements and return it
  div.appendChild(pTitle);
  div.appendChild(divStars);
  div.appendChild(spReviewer);
  div.appendChild(spDate);
  div.appendChild(pComment);
  return div;
}
displayToyInfo();

// event handling
const reviewForm = document.querySelector('form');
const postReviewBtn = document.querySelector('.postReviewBtn');
const submitReviewBtn = document.querySelector('.SubmitBtn');
postReviewBtn.onclick = () => {
  reviewForm.classList.add('show');
  reviewForm.classList.remove('hidden');
};

submitReviewBtn.onclick = () => {
  // retrieve each value of review
  const title = document.querySelector('#reviewTitle');
  const reviewer = document.querySelector('#reviewer');
  const stars = document.querySelector('#reviewStars');
  const comment = document.querySelector('#comment');
  const date = new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const newReview = {
    title: title.value,
    reviewer: reviewer.value,
    date,
    comment: comment.value,
    stars: parseInt(stars.value),
  };
  // add a new review to the ToyCar object
  toyCar.reviews.unshift(newReview);
  // reset form values
  title.value = '';
  reviewer.value = '';
  stars.value = '5';
  comment.value = '';

  // update the display for review area
  displayToyInfo();
  // hide review posting area
  reviewForm.classList.add('hidden');
  reviewForm.classList.remove('show');
};
