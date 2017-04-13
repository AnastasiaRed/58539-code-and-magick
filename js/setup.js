'use strict';

// Configuration
var WIZARD_AMOUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

window.setupConfiguration = (function () {

  var getRandomWizard = function () {
    var wizard = {
      name: FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] + ' ' + LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)]
    };
    return wizard;
  };

  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard['name'];
    wizardElement.querySelector('.wizard-coat').style.fill = wizard['coatColor'];
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard['eyesColor'];
    return wizardElement;
  };

  return {
    renderWizardsList: function () {
      var wizardsListFragment = document.createDocumentFragment();
      var wizardTemplate = document.querySelector('#similar-wizard-template').content;
      for (var i = 0; i < WIZARD_AMOUNT; i++) {
        var wizard = getRandomWizard();
        var wizardFragment = renderWizard(wizard, wizardTemplate);
        wizardsListFragment.appendChild(wizardFragment);
      }
      return wizardsListFragment;
    }
  };
})();

window.setupInteraction = (function () {

  var MOUSE_CLICK_EVENT = 'click';
  var KEYDOWN_EVENT = 'keydown';
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var onPopupEscPress = function (evt) {
    if (evt.currentTarget.activeElement.className !== 'setup-user-name' && evt.keyCode === ESCAPE_KEY_CODE) {
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

  return {
    onSetupOpenClick: function (evt) {
      if (evt.type === MOUSE_CLICK_EVENT || (evt.keyCode === ENTER_KEY_CODE && evt.type === KEYDOWN_EVENT)) {
        showSetup();
      }
    },
    onSetupCloseClick: function (evt) {
      if (evt.type === MOUSE_CLICK_EVENT || (evt.keyCode === ENTER_KEY_CODE && evt.type === KEYDOWN_EVENT)) {
        hideSetup();
      }
    }
  };
})();

window.playerInteraction = (function () {

  var getNextColor = function (curColor, colorsArray) {
    var curColorIndex = colorsArray.indexOf(curColor);
    var nextColorIndex = curColorIndex + 1;
    if (nextColorIndex === colorsArray.length) {
      nextColorIndex = 0;
    }
    return colorsArray[nextColorIndex];
  };

  var convertRGBtoHEX = function (rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) {
      return rgb;
    }
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var hex = function (x) {
      return ('0' + parseInt(x, 10).toString(16)).slice(-2);
    };
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  };

  return {
    onwWzardEyesCoatClick: function (evt) {
      var curColor = evt.currentTarget.style.fill;
      var colorsArray = evt.currentTarget.classList.contains('wizard-coat') ? COAT_COLORS : EYES_COLORS;
      var nextColor = getNextColor(curColor, colorsArray);
      evt.currentTarget.style.fill = nextColor;
    },
    onwWzardFireballClick: function (evt) {
      var curColor = getComputedStyle(evt.currentTarget).backgroundColor;
      var nextColor = getNextColor(convertRGBtoHEX(curColor), FIREBALL_COLORS);
      evt.currentTarget.style.backgroundColor = nextColor;
    }
  };
})();

var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var wizardsListFragment = window.setupConfiguration.renderWizardsList();
similarListElement.appendChild(wizardsListFragment);
setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
setupOpen.addEventListener('click', window.setupInteraction.onSetupOpenClick);
setupOpen.addEventListener('keydown', window.setupInteraction.onSetupOpenClick);
setupClose.addEventListener('click', window.setupInteraction.onSetupCloseClick);
setupClose.addEventListener('keydown', window.setupInteraction.onSetupCloseClick);

var wizardAppearance = setup.querySelector('.setup-player');
var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
wizardCoat.addEventListener('click', window.playerInteraction.onwWzardEyesCoatClick);
var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
wizardEyes.addEventListener('click', window.playerInteraction.onwWzardEyesCoatClick);
var wizardFireball = wizardAppearance.querySelector('.setup-fireball-wrap');
wizardFireball.addEventListener('click', window.playerInteraction.onwWzardFireballClick);
