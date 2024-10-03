// grab elements
const storyParagraph = document.querySelector('#story');
const wordSelectButtons = []; // array to store word select button elements
for (i = 1; i < 6; i++) {
  wordSelectButtons.push(
    document.querySelector(
      `section:nth-child(2) > div > div:nth-child(${i}) button`
    )
  );
}
// for modal
const showStoryBtn = document.querySelector('#showStoryBtn');
const modal = document.querySelector('.js-modal');
const closeModalBtn = document.querySelector('#closeModalBtn');

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
  // combine selected words in each category and display it
  for (i = 0; i < selectedWordIndexes.length; i++) {
    story += wordChoice[i][selectedWordIndexes[i]];
    if (i !== selectedWordIndexes.length - 1) {
      story += ' ';
    } else {
      story += '.';
    }
  }
  storyParagraph.textContent = story;
};

// function to open the modal
const modalOpen = () => {
  modal.classList.add('active');
};

const modalClose = () => {
  modal.classList.remove('active');
};

// add click event to buttons
showStoryBtn.addEventListener('click', showStory);
showStoryBtn.addEventListener('click', modalOpen);
closeModalBtn.addEventListener('click', modalClose);

