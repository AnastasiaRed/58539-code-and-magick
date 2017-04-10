'use strict';

// Configuration
var setup = document.querySelector('.setup');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];

for (var i = 0; i < 4; i++) {
  var wizardName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  var wizardCoatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
  var wizardEyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];

  wizards[i] = {
    name: wizardName,
    coatColor: wizardCoatColor,
    eyesColor: wizardEyesColor
  };
}

var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = setup.querySelector('.setup-similar-list');

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'];
  wizardElement.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

// Interaction
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.currentTarget.activeElement.className !== 'setup-user-name' && evt.keyCode === 27) {
    hideSetup();
  }
};

var showSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var hideSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  showSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    showSetup();
  }
});

setupClose.addEventListener('click', function () {
  hideSetup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    hideSetup();
  }
});

// change wizard coat color
var wizardAppearance = setup.querySelector('.setup-player');
var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
var wizardCoatCounter = 1;
wizardCoat.addEventListener('click', function () {
  if (wizardCoatCounter >= EYES_COLORS.length) {
    wizardCoatCounter = 0;
  }
  wizardCoat.style.fill = COAT_COLORS[wizardCoatCounter];
  wizardCoatCounter++;
});

// change wizard eyes color
var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
var wizardEyesCounter = 1;
wizardEyes.addEventListener('click', function () {
  if (wizardEyesCounter >= EYES_COLORS.length) {
    wizardEyesCounter = 0;
  }
  wizardEyes.style.fill = EYES_COLORS[wizardEyesCounter];
  wizardEyesCounter++;
});

// change wizard fireball color
var wizardFireball = wizardAppearance.querySelector('.setup-fireball-wrap');
var wizardFireballCounter = 1;
wizardFireball.addEventListener('click', function () {
  if (wizardFireballCounter >= FIREBALL_COLORS.length) {
    wizardFireballCounter = 0;
  }
  wizardFireball.style.background = FIREBALL_COLORS[wizardFireballCounter];
  wizardFireballCounter++;
});
