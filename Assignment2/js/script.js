// Smoothie Class
class Smoothie {
  addOptions = ['spinach', 'kale', 'protein', 'chia'];
  prices = { small: 5, medium: 6.5, large: 7.5 };
  size;
  base;
  ingredient;
  adds;
  constructor(size, base, ingredient, adds) {
    this.size = size;
    this.base = base;
    this.ingredient = ingredient;
    this.adds = adds;
  }

  getOrderedItem() {
    let description = `
      <p>Size: ${this.size}</p>
      <p>Base: ${this.base}</p>
      <p>Ingredient: ${this.ingredient}</p>
      <p>Adds: ${this.adds.join(', ')}</p>`;
    return description;
  }
  getPrice() {
    let price = this.prices[this.size];
    let extra = this.adds.length;
    return price + extra;
  }
  getPicture() {
    let src = './images/smoothies/applekiwi.png';
    if (this.ingredient === 'red (strawberry + blueberry)') {
      src = './images/smoothies/berry.png';
    } else if (this.ingredient === 'orange (mango + banana)') {
      src = './images/smoothies/mangobanana.png';
    }
    return src;
  }
  isAddItem(item) {
    return this.adds.includes(item);
  }
}

// grab the elements
const orderBtn = document.querySelector('#orderBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
const outputModal = document.querySelector('#outputModal');
const progressPic = document.querySelector('#progressPic');
const orderedSmoothie = document.querySelector('#orderedSmoothie');
const addIcons = document.querySelectorAll('.add-icons img');
const orderDetails = document.querySelector('#details');
const totalPrice = document.querySelector('#price');

// add functions to click event
orderBtn.onclick = orderSmoothie;
orderBtn.onclick = orderSmoothie;
closeModalBtn.addEventListener('click', () => {
  outputModal.classList.remove('active');
});

// create a Smoothie instance with parameters user selected and execute a method in the class
function orderSmoothie() {
  const size = document.querySelector('#size').value;
  const base = document.querySelector('#base').value;
  const ingredient = document.querySelector('#ingredient').value;

  // the array to store add item values
  let adds = [];
  // retrieve checkbox elements that user checked
  const checkedElements = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  // add ingredients value to the array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  checkedElements.forEach((el) => {
    adds.push(el.value);
  });
  // create a new smoothie instance
  const smoothie = new Smoothie(size, base, ingredient, adds);
  // get ordered smoothie info and insert them to HTML elements
  orderedSmoothie.setAttribute('src', smoothie.getPicture());
  addIcons.forEach((img, key) => {
    if (smoothie.isAddItem(smoothie.addOptions[key])) {
      img.classList.add('show');
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
      img.classList.remove('show');
    }
  });
  orderDetails.innerHTML = smoothie.getOrderedItem();
  totalPrice.textContent = `Price: $${smoothie.getPrice()}`;
  // show progress picture and ordered information
  progressPic.classList.add('active');
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  setTimeout(() => {
    progressPic.classList.remove('active');
    outputModal.classList.add('active');
  }, 5000);
}
