// Smoothie Class
class Smoothie {
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

  serveIt() {
    const output = document.querySelector('#output');
    let description = `
      <h2>Your Order</h2>
      <p>Size: ${this.size}</p>
      <p>Base: ${this.base}</p>
      <p>Ingredient: ${this.ingredient}</p>
      <p>Adds: ${this.adds.join(', ')}</p>
    `;
    output.innerHTML = description;
  }
}

// create a Smoothie instance with parameters user selected and execute a method in the class
const orderSmoothie = () => {
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
  checkedElements.forEach((el) => {
    adds.push(el.value);
  });
  // create a new smoothie instance
  const smoothie = new Smoothie(size, base, ingredient, adds);
  smoothie.serveIt();
};

// grab the order button element add orderSmoothie function to click event
const orderBtn = document.querySelector('#orderBtn');
orderBtn.onclick = orderSmoothie;
