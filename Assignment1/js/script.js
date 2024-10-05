// declare const array for words in each category
const wordChoice = [
  ['The man', 'The lady', 'My friend', 'The monkey', 'The android'],
  [
    'in the car',
    'with long hair',
    'wearing glasses',
    'with a smile',
    `on the street`,
  ],
  ['always', 'often', 'usually', 'sometimes', 'seldom'],
  ['takes a walk', 'runs', 'eats bananas', 'looks happy', 'speaks'],
  [
    'in the morning',
    'in the afternoon',
    'in the evening',
    'at night',
    'whole day',
  ],
];

// create a class that operate story
class StoryMaker {
  constructor() {
    this.story = '';
    this.selectedIndexes = [-1, -1, -1, -1, -1];
  }

  getStory = () => this.story;
  getIndexes = () => this.selectedIndexes;

  incrementIndex = (index = -1) => {
    // if the user hits the button when the last word in the list is selected,
    if (this.selectedIndexes[index] === 4) {
      // change the index to -1 to show the first word
      this.selectedIndexes[index] = -1;
    }
    this.selectedIndexes[index]++;
  };

  combineWords = () => {
    // set story valuable to empty text
    this.story = '';
    // combine selected words in each category and display it
    for (i = 0; i < this.selectedIndexes.length; i++) {
      this.story += wordChoice[i][this.selectedIndexes[i]];
      if (i !== this.selectedIndexes.length - 1) {
        this.story += ' ';
      } else {
        this.story += '.';
      }
    }
  };

  generateRandomStory = () => {
    // generate 5 random numbers and add them to selectedWordIndexes array in each item
    for (i = 0; i < 5; i++) {
      this.selectedIndexes[i] = Math.floor(Math.random() * 4);
    }
  };
}

// grab elements
const storyParagraph = document.querySelector('#story');
const errorMessage = document.querySelector('section:nth-child(1) p');
const wordSelectButtons = []; // array to store word select button elements
for (i = 1; i < 6; i++) {
  wordSelectButtons.push(
    document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${i}) button`
    )
  );
}
// for modal
const modal = document.querySelector('#storyModal');
// buttons
const showStoryBtn = document.querySelector('#showStoryBtn');
const closeModalBtn = document.querySelector('#closeModalBtn');
const randomBtn = document.querySelector('#randomBtn');
const resetBtn = document.querySelector('#resetBtn');

// create an instance of StoryMaker class
let storyMaker = new StoryMaker();

// add click event to each word select button
for (const [i, button] of Object.entries(wordSelectButtons)) {
  wordSelectButtons[i].addEventListener('click', () => {
    let index = Number(i);
    storyMaker.incrementIndex(index);
    showSelectedWord(index);
  });
}

// function to show selected word
const showSelectedWord = (idx) => {
  let num = idx + 1;
  let selectedWordIndexes = storyMaker.getIndexes();

  // grab span element showing current selected word in each category
  const span = document.querySelector(
    `section:nth-child(2) > div > div:nth-child(${num}) p span`
  );
  // show the word the user is selecting now below the select button
  span.textContent = wordChoice[idx][selectedWordIndexes[idx]];
  const currentArrow = document.querySelector(
    `section:nth-child(2) > div > div:nth-child(${num}) span.selected`
  );
  const newArrow = document.querySelector(
    `section:nth-child(2) > div > div:nth-child(${num}) li:nth-child(${
      selectedWordIndexes[idx] + 1
    }) span`
  );
  if (currentArrow !== null) {
    currentArrow.classList.remove('selected');
  }
  newArrow.classList.add('selected');
};

// function to show completed story sentence
const showStory = () => {
  let selectedWordIndexes = storyMaker.getIndexes();
  if (selectedWordIndexes.includes(-1)) {
    errorMessage.classList.add('error');
  } else {
    storyMaker.combineWords();
    let story = storyMaker.getStory();
    storyParagraph.textContent = story;
    modal.classList.add('active');
    errorMessage.classList.remove('error');
  }
};

// function to show a random story
const showRandomStory = () => {
  storyMaker.generateRandomStory();
  // show randomly selected words and arrows on the screen
  for (i = 0; i < 5; i++) {
    showSelectedWord(i);
  }
  showStory();
  // add audio voice to read the story sentence
  const utterance = new SpeechSynthesisUtterance(storyMaker.getStory());
  speechSynthesis.speak(utterance);
};

// function to reset a story
const resetStory = () => {
  // reset StoryMaker class
  storyMaker = new StoryMaker();
  // grab the span element
  for (num = 1; num < 6; num++) {
    const span = document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${num}) p span`
    );
    // empty the span text
    span.textContent = '';
    const currentArrow = document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${num}) span.selected`
    );
    if (currentArrow !== null) {
      currentArrow.classList.remove('selected');
    }
  }
  // set empty text to modal content
  storyParagraph.textContent = '';
};

// function to close the modal
const modalClose = () => {
  modal.classList.remove('active');
};

// add click event to buttons
showStoryBtn.addEventListener('click', showStory);
randomBtn.addEventListener('click', showRandomStory);
resetBtn.addEventListener('click', resetStory);
closeModalBtn.addEventListener('click', modalClose);
