// Smoothie Class
class Smoothie {
  constructor(size, base, ingredients) {
    this.size = size;
    this.base = base;
    this.ingredients = ingredients;
  }

  serveIt() {
    const output = document.querySelector('#output');
    let description = `
      <h2>Your Order</h2>
      <p>Size: ${this.size}</p>
      <p>Base: ${this.base}</p>
      <p>Ingredients: ${this.ingredients.join(', ')}</p>
    `;
    output.innerHTML = description;
  }
}

// create a Smoothie instance with parameters user selected and execute a method in the class
const orderSmoothie = () => {
  const size = document.querySelector('#size').value;
  const base = document.querySelector('#base').value;
  // the array to store ingredient values
  let ingredients = [];
  // retrieve checkbox elements that user checked
  const checkedElements = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  // add ingredients value to the array
  checkedElements.forEach((el) => {
    ingredients.push(el.value);
  });
  // create a new smoothie instance
  const smoothie = new Smoothie(size, base, ingredients);
  smoothie.serveIt();
};

// grab the order button element add orderSmoothie function to click event
const orderBtn = document.querySelector('#orderBtn');
orderBtn.onclick = orderSmoothie;
