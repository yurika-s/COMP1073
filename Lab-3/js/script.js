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
// Function to display the car information
function displayToyInfo() {
  const pElement = document.createElement('p');
  // grab HTML elements
  const name = document.querySelector('h1');
  const img = document.querySelector('img#productImage');
  const price = document.querySelector('p.price');
  const stars = document.querySelector('div.stars');
  const details = document.querySelector('div.details');
  const reviews = document.querySelector('div.reviews');
  // create a instance
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
        title: 'Florida Squad',
        reviewer: 'Larry K. Carlson ',
        date: 'Mar 26, 2022',
        comment: 'Usual excellent Greenlight quality &detail',
        stars: 4,
      },
      {
        title: 'Florida Squad2',
        reviewer: 'Larry K. Carlson ',
        date: 'Mar 26, 2022',
        comment: 'Usual excellent Greenlight quality &detail',
        stars: 3,
      },
      {
        title: 'Florida Squad3',
        reviewer: 'Larry K. Carlson ',
        date: 'Mar 26, 2022',
        comment: 'Usual excellent Greenlight quality &detail',
        stars: 4,
      },
    ]
  );

  name.textContent = toyCar.name;
  img.setAttribute('src', toyCar.image);
  price.textContent = `$${toyCar.price}`;

  // add details
  let detailContent = '';
  if (toyCar.sku) detailContent += `<p>SKU: ${toyCar.sku}</p>`;
  if (toyCar.upc) detailContent += `<p>UPC: ${toyCar.upc}</p>`;
  if (toyCar.brand) detailContent += `<p>Brand: ${toyCar.brand}</p>`;
  if (toyCar.model) detailContent += `<p>Model: ${toyCar.model}</p>`;
  if (toyCar.color) detailContent += `<p>Colour: ${toyCar.color}</p>`;
  if (toyCar.decade) detailContent += `<p> Decade: ${toyCar.decade}</p>`;
  if (toyCar.packaging)
    detailContent += `<p>Packaging: ${toyCar.packaging}</p>`;
  if (toyCar.scale) detailContent += `<p>Scale: ${toyCar.scale}</p>`;
  if (toyCar.type) detailContent += `<p>Vehicle Type: ${toyCar.type}</p>`;
  if (toyCar.description)
    detailContent += `<p>Description: ${toyCar.description}</p>`;

  details.innerHTML = detailContent;

  // reviews
  let averageStars = toyCar.getAverageStars();
  // create a variable to show stars being added to HTML
  let starElements = getStarSVGElements(averageStars);

  stars.innerHTML = starElements;

  toyCar.reviews.forEach((review) => {
    let div = document.createElement('div');
    // div.classList.add('');
    let pTitle = document.createElement('p');
    let pReviewer = document.createElement('p');
    let pDate = document.createElement('p');
    let pComment = document.createElement('p');
    let divStars = document.createElement('div');
    divStars.classList.add('stars');
    let reviewStars = getStarSVGElements(review.stars);
    divStars.innerHTML = reviewStars;
    pTitle.textContent = review.title;
    pReviewer.textContent = review.reviewer;
    pDate.textContent = review.date;
    pComment.textContent = review.comment;
    div.appendChild(pTitle);
    div.appendChild(pReviewer);
    div.appendChild(pDate);
    div.appendChild(divStars);
    div.appendChild(pComment);
    reviews.appendChild(div);
  });
}
function getStarSVGElements(stars) {
  let starElements = '';
  // create a filled star element (0-5)
  for (i = 1; i <= 5; i++) {
    starElements += `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >`;
    if (i < stars) {
      starElements += `<path fill="#F9B618"`;
    } else {
      starElements += `<path fill="#FFF"`;
    }
    starElements += ` stroke="#F9B618"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21.5 9.757-5.278 4.354 1.649 7.389L12 17.278 6.129 21.5l1.649-7.389L2.5 9.757l6.333-.924L12 2.5l3.167 6.333z"
                    /></svg>`;
  }
  starElements += `<span class="average-stars">${stars}</span>`;

  return starElements;
}
displayToyInfo();
