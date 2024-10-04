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

// declare array for words in each category
const wordChoice = [
  ['The turkey', 'Mom', 'Dad', 'The dog', 'My teacher'],
  ['sat on', 'ate', 'danced with', 'saw', `doesn't like`],
  ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking'],
  ['goat', 'monkey', 'fish', 'cow', 'flog'],
  [
    'on the moon',
    'on the chair',
    'in my spaghetti',
    'in my soup',
    'on the grass',
  ],
];
// declare array for indexes that the user selected in each list
let selectedWordIndexes = [-1, -1, -1, -1, -1];

// add click event to each word select button
for (const [i, button] of Object.entries(wordSelectButtons)) {
  wordSelectButtons[i].addEventListener('click', () => {
    let idx = Number(i);
    // if the user hits the button when the last word in the list is selected,
    if (selectedWordIndexes[idx] === 4) {
      // change the index to -1 to show the first word
      selectedWordIndexes[idx] = -1;
    }
    selectedWordIndexes[idx]++;

    let num = idx + 1;
    // grab span element showing current selected word in each category
    const span = document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${num}) p span`
    );
    // show the word the user is selecting now below the select button
    span.textContent = wordChoice[idx][selectedWordIndexes[idx]];
  });
}

// function to show completed story sentence
const showStory = () => {
  let story = '';
  let isError = false;
  // combine selected words in each category and display it
  for (i = 0; i < selectedWordIndexes.length; i++) {
    if (selectedWordIndexes[i] === -1) {
      isError = true;
      break;
    }
    story += wordChoice[i][selectedWordIndexes[i]];
    if (i !== selectedWordIndexes.length - 1) {
      story += ' ';
    } else {
      story += '.';
    }
  }
  if (isError) {
    errorMessage.classList.add('error');
  } else {
    storyParagraph.textContent = story;
    modal.classList.add('active');
    errorMessage.classList.remove('error');
  }
};

// function to generate a random story
const generateRandomStory = () => {
  // generate 5 random numbers and add them to selectedWordIndexes array in each item
  for (i = 0; i < 5; i++) {
    selectedWordIndexes[i] = Math.floor(Math.random() * 4);
  }
  showStory();
};

// function to reset a story
const resetStory = () => {
  // reset the index array
  for (i = 0; i < 5; i++) {
    selectedWordIndexes[i] = -1;
  }
  // grab the span element
  for (num = 1; num < 6; num++) {
    const span = document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${num}) p span`
    );
    // empty the span text
    span.textContent = '';
  }
};

// function to close the modal
const modalClose = () => {
  modal.classList.remove('active');
};

// add click event to buttons
showStoryBtn.addEventListener('click', showStory);
randomBtn.addEventListener('click', generateRandomStory);
resetBtn.addEventListener('click', resetStory);
closeModalBtn.addEventListener('click', modalClose);

