'use strict';

var WIZARD_AMOUNT = 4;
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

window.setup = document.querySelector('.setup');

(function () {

  // Configuration

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

  var renderWizardsList = function () {
    var wizardsListFragment = document.createDocumentFragment();
    var wizardTemplate = document.querySelector('#similar-wizard-template').content;
    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      var wizard = getRandomWizard();
      var wizardFragment = renderWizard(wizard, wizardTemplate);
      wizardsListFragment.appendChild(wizardFragment);
    }
    return wizardsListFragment;
  };

  var similarListElement = window.setup.querySelector('.setup-similar-list');
  var wizardsListFragment = renderWizardsList();
  similarListElement.appendChild(wizardsListFragment);
  window.setup.querySelector('.setup-similar').classList.remove('hidden');


  // Interaction

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
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var hideSetup = function () {
    window.setup.classList.add('hidden');
    window.setup.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSetupOpenClick = function (evt) {
    if (evt.type === MOUSE_CLICK_EVENT || (evt.keyCode === ENTER_KEY_CODE && evt.type === KEYDOWN_EVENT)) {
      showSetup();
    }
  };

  var onSetupCloseClick = function (evt) {
    if (evt.type === MOUSE_CLICK_EVENT || (evt.keyCode === ENTER_KEY_CODE && evt.type === KEYDOWN_EVENT)) {
      hideSetup();
    }
  };

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenClick);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseClick);

})();
