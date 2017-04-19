'use strict';

(function () {

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

  var onwWzardEyesCoatClick = function (evt) {
    var curColor = evt.currentTarget.style.fill;
    var colorsArray = evt.currentTarget.classList.contains('wizard-coat') ? COAT_COLORS : EYES_COLORS;
    var nextColor = getNextColor(curColor, colorsArray);
    evt.currentTarget.style.fill = nextColor;
  };

  var onwWzardFireballClick = function (evt) {
    var curColor = getComputedStyle(evt.currentTarget).backgroundColor;
    var nextColor = getNextColor(convertRGBtoHEX(curColor), FIREBALL_COLORS);
    evt.currentTarget.style.backgroundColor = nextColor;
  }

  var wizardAppearance = window.setup.querySelector('.setup-player');
  var wizardCoat = wizardAppearance.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', onwWzardEyesCoatClick);
  var wizardEyes = wizardAppearance.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', onwWzardEyesCoatClick);
  var wizardFireball = wizardAppearance.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', onwWzardFireballClick);

})();
