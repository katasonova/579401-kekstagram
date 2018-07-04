'use strict';

var PHOTOS_COUNT = 25;

var PHOTO_PATH = 'photos/';
var PHOTO_EXTENSION = '.jpg';

var LIKES = {
  MIN: 15,
  MAX: 200
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var COMMENT_MIN = 0;
var COMMENT_MAX = COMMENTS.length - 1;
var COMMENT_ONE = 1;
var COMMENT_TWO = 2;

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var DESCRIPTION_MIN = 0;
var DESCRIPTION_MAX = DESCRIPTION.length - 1;

var AVATAR = {
  MIN: 1,
  MAX: 6
};

var AVATAR_PATH = 'img/avatar-';
var AVATAR_EXTENSION = '.svg';

var ESC_KEYCODE = 'Escape';

var existBigPictureElement = document.querySelector('.big-picture');
// existBigPictureElement.classList.remove('hidden');

var mainContainer = document.querySelector('main');

var listItemComment = existBigPictureElement.querySelector('.social__comment');
listItemComment.classList.add('social__comment--text');

var commentCountHide = existBigPictureElement.querySelector('.social__comment-count');
commentCountHide.classList.add('visually-hidden');

var newCommentLoadHide = existBigPictureElement.querySelector('.social__loadmore');
newCommentLoadHide.classList.add('visually-hidden');

var photoTemplate = document.querySelector('#picture').content;
var picturesElement = document.querySelector('.pictures');

var getPhotoPath = function (numberOfPhoto) {
  return PHOTO_PATH + numberOfPhoto + PHOTO_EXTENSION;
};

var getRandomIntFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getCommentsForPhoto = function (count) {
  var result = [];

  for (var i = 0; i < count; i++) {
    result.push(COMMENTS[getRandomIntFromRange(COMMENT_MIN, COMMENT_MAX)]);
  }
  return result;
};

// создание массива объектов, объект - одна фотография
var createPhotoObject = function () {
  var result = [];

  for (var i = 1; i <= PHOTOS_COUNT; i++) {
    var newPhoto = {};
    newPhoto.url = getPhotoPath(i);
    newPhoto.likes = getRandomIntFromRange(LIKES.MIN, LIKES.MAX);
    newPhoto.comments = getCommentsForPhoto(getRandomIntFromRange(COMMENT_ONE, COMMENT_TWO));
    newPhoto.description = DESCRIPTION[getRandomIntFromRange(DESCRIPTION_MIN, DESCRIPTION_MAX)];

    result.push(newPhoto);
  }

  return result;
};

var clickPhotoHandler = function (photoObject, evt) {
  evt.preventDefault();
  renderTargetPhoto(photoObject);
};

// отрисовка всех фотографий на страницу
var renderPhotos = function (photos) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length - 1; i++) {
    var newPhotoNode = photoTemplate.cloneNode(true);
    newPhotoNode.querySelector('.picture__img').src = photos[i].url;
    newPhotoNode.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    newPhotoNode.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;

    newPhotoNode.querySelector('.picture__link').addEventListener('click', clickPhotoHandler.bind(undefined, photos[i]));

    documentFragment.appendChild(newPhotoNode);
  }

  picturesElement.appendChild(documentFragment);
};

var getAvatarPath = function (numberOfAvatar) {
  return AVATAR_PATH + numberOfAvatar + AVATAR_EXTENSION;
};

var allPhotos = createPhotoObject();
renderPhotos(allPhotos);


var createSocialComments = function (commentListElement, comments) {

  for (var i = 0; i < comments.length; i++) {
     var socialCommentItem = document.createElement('li');
    socialCommentItem.className = 'social__comment';

    var socialCommentAvatar = document.createElement('img');
    socialCommentAvatar.src = getAvatarPath(getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX));
    socialCommentAvatar.className = 'social__picture social__comment--text';
    socialCommentAvatar.alt = 'Аватар комментатора фотографии';
    socialCommentAvatar.width = '35';
    socialCommentAvatar.height = '35';

    socialCommentItem.appendChild(socialCommentAvatar);

    var socialCommentText = document.createElement('p');
    socialCommentText.textContent = comments[i];
    socialCommentText.className = 'social__text';

    socialCommentItem.appendChild(socialCommentText);

    commentListElement.appendChild(socialCommentItem);
  }

  return commentListElement;

};

var pictureCloseHandler = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    var existBigPictureElement = document.querySelector('.big-picture');
    existBigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', pictureCloseHandler);
  }
};

var renderTargetPhoto = function (photoObject) {

  var existBigPictureElement = document.querySelector('.big-picture');
  var bigPictureElement = existBigPictureElement.cloneNode(true);

  mainContainer.removeChild(existBigPictureElement);

  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPictureElement.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPictureElement.querySelector('.social__picture').src = getAvatarPath(getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX));
  bigPictureElement.querySelector('.social__caption').textContent = photoObject.description;

  var socialCommentElement = bigPictureElement.querySelector('.social__comments');
  socialCommentElement.innerHTML = '';
  createSocialComments(socialCommentElement, photoObject.comments);

  // Здесь поставь обработчик на закрытие по крестику, esc
  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', function (evt) {
    bigPictureElement.classList.add('hidden');
  });

  document.addEventListener('keydown', pictureCloseHandler);

  bigPictureElement.classList.remove('hidden');

  mainContainer.appendChild(bigPictureElement);

  return bigPictureElement;
};


// Загрузка изображения и показ формы редактирования
var openChangePhotoForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escKeyboardButtonHandler);
};
// renderTargetPhoto(allPhotos[0]);

var photoUpload = document.querySelector('#upload-file');
photoUpload.addEventListener('change', openChangePhotoForm);

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var photoUploadClose = imgUploadOverlay.querySelector('#upload-cancel');

/* // сбрас значение поля выбора файла #upload-file
var inputId = 'img-upload__start';

var clearFileInputField = function (element) {
  document.querySelector(element).innerHTML = document.querySelector(element).innerHTML;
};*/

var closeChangePhotoForm = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escKeyboardButtonHandler);
  // clearFileInputField(inputId);
};

photoUploadClose.addEventListener('click', closeChangePhotoForm);

var escKeyboardButtonHandler = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    closeChangePhotoForm();
  }
};

var PhotoEffects = {
  sepia: 'effects__preview--sepia',
  none: 'effects__preview--none',
  chrome: 'effects__preview--chrome',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};

// Применение эффекта для изображения

var pictureEffectsRadio = document.querySelectorAll('.effects__radio');

var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

var setPhotoEffect = function (photoEffect) {
  imgUploadPreview.className = PhotoEffects[photoEffect];
};

var radioClickHandler = function (evt) {
  setPhotoEffect(evt.currentTarget.value);
};

pictureEffectsRadio.forEach(function (it) {
  it.addEventListener('click', radioClickHandler);
});


var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value');

function () {

  var EffectsList = {
    DEFAULT: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var applyPinPositionToEffect = function (pinLeftPosition, effectIntensity, scrollBarWidth) {
    if (pinLeftPosition < window.constants.PIN_WIDTH / 2) {
      pinLeftPosition = window.constants.PIN_WIDTH / 2;
    } else if (pinLeftPosition > scrollBarWidth - window.constants.PIN_WIDTH / 2) {
      pinLeftPosition = scrollBarWidth - window.constants.PIN_WIDTH / 2;
    }

    scaleValueInputElement.value = effectIntensity;
    scalePinElement.style.left = pinLeftPosition + 'px';
    previewElement.style.filter = createStyleEffect(currentEffect, window.constants.TYPE_EFFECT_CUSTOM);
    scaleBarElement.style.width = effectIntensity + '%';
  };

  var keyDownHandler = function (downEvt) {

    var scrollBarWidth = caclulateScrollBarWidth();
    var scrollBarCoordX = (windowWidth - scrollBarWidth) / 2;
    var pinLeftPosition;

    if (downEvt.key === window.constants.KEYCODE_LEFT) {
      pinLeftPosition = scalePinElement.offsetLeft - window.constants.PIN_SCROLL_STEP;
    }
    if (downEvt.key === window.constants.KEYCODE_RIGHT) {
      pinLeftPosition = scalePinElement.offsetLeft + window.constants.PIN_SCROLL_STEP;
    }

    updateEffectIntensity(pinLeftPosition + scrollBarCoordX);
    applyPinPositionToEffect(pinLeftPosition, effectIntensity, scrollBarWidth);
  };

  var mouseDownHandler = function (downEvt) {
    downEvt.preventDefault();

    var startCoordX = downEvt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var scrollBarWidth = caclulateScrollBarWidth();
      var shiftX = startCoordX - moveEvt.clientX;
      var scrollBarCoordX = (windowWidth - scrollBarWidth) / 2;
      var pinLeftPosition = scalePinElement.offsetLeft - shiftX;

      if (moveEvt.clientX < scrollBarCoordX) {
        startCoordX = scrollBarCoordX;
      } else if (moveEvt.clientX > scrollBarCoordX + scrollBarWidth) {
        startCoordX = scrollBarCoordX + scrollBarWidth;
      } else {
        startCoordX = moveEvt.clientX;
      }

      updateEffectIntensity(startCoordX);
      applyPinPositionToEffect(pinLeftPosition, effectIntensity, scrollBarWidth);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var createEffectClickHandler = function (effectName) {
    return function () {
      currentEffect = effectName;

      previewElement.className = 'img-upload__preview effects__preview--' + effectName;

      if (effectName === EffectsList.DEFAULT) {
        scaleElement.classList.add('hidden');
      } else {
        scaleElement.classList.remove('hidden');
      }

      previewElement.style.filter = createStyleEffect(effectName, window.constants.TYPE_EFFECT_DEFAULT);
      scalePinElement.style.left = caclulateScrollBarWidth() - window.constants.PIN_WIDTH / 2 + 'px';
      scaleBarElement.style.width = 100 + '%';
    };
  };

  var createGreyScaleStyle = function (effectType) {
    if (effectType !== window.constants.TYPE_EFFECT_CUSTOM) {
      return 'grayscale(' + window.constants.EFFECT_GRAYSCALE_DEFAULT_VALUE + ')';
    }
    return 'grayscale(' + effectIntensity / 100 + ')';
  };

  var createSepiaStyle = function (effectType) {
    if (effectType !== window.constants.TYPE_EFFECT_CUSTOM) {
      return 'sepia(' + window.constants.EFFECT_SEPIA_DEFAULT_VALUE + ')';
    }
    return 'sepia(' + effectIntensity / 100 + ')';
  };

  var createInvertStyle = function (effectType) {
    if (effectType !== window.constants.TYPE_EFFECT_CUSTOM) {
      return 'invert(' + window.constants.EFFECT_INVERT_DEFAULT_VALUE + '%)';
    }
    return 'invert(' + effectIntensity + '%)';
  };

  var createBlurStyle = function (effectType) {
    if (effectType !== window.constants.TYPE_EFFECT_CUSTOM) {
      return 'blur(' + window.constants.EFFECT_BLUR_DEFAULT_VALUE + 'px)';
    }
    return 'blur(' + effectIntensity * window.constants.EFFECT_BLUR_RATIO + 'px)';
  };

  var createBrightnessStyle = function (effectType) {
    if (effectType !== window.constants.TYPE_EFFECT_CUSTOM) {
      return 'brightness(' + window.constants.EFFECT_BRIGHTNESS_DEFAULT_VALUE + ')';
    }
    return 'brightness(' + (effectIntensity * window.constants.EFFECT_BRIGHTNESS_RATIO + 1) + ')';
  };

  var createStyleEffect = function (effect, effectType) {
    switch (effect) {
      case EffectsList.CHROME:
        return createGreyScaleStyle(effectType);
      case EffectsList.SEPIA:
        return createSepiaStyle(effectType);
      case EffectsList.MARVIN:
        return createInvertStyle(effectType);
      case EffectsList.PHOBOS:
        return createBlurStyle(effectType);
      case EffectsList.HEAT:
        return createBrightnessStyle(effectType);
      default:
        return EffectsList.DEFAULT;
    }
  };

  var caclulateScrollBarWidth = function () {
    return scaleLineElement.getBoundingClientRect().width;
  };

  var updateEffectIntensity = function (value) {
    var scrollBarWidth = caclulateScrollBarWidth();
    var pinPosition = value - (windowWidth - scrollBarWidth) / 2;

    effectIntensity = Math.floor(pinPosition / (scrollBarWidth / 100));

    if (effectIntensity < 0) {
      effectIntensity = 0;
    } else if (effectIntensity > 100) {
      effectIntensity = 100;
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var effectElement = uploadFormElement.querySelectorAll('.effects__radio');
  var scalePinElement = uploadFormElement.querySelector('.scale__pin');
  var scaleValueInputElement = uploadFormElement.querySelector('.scale__value');
  var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
  var scaleLineElement = uploadFormElement.querySelector('.scale__line');
  var scaleBarElement = uploadFormElement.querySelector('.scale__level');
  var windowWidth = document.documentElement.clientWidth;

  var currentEffect;
  var effectIntensity;

  scalePinElement.addEventListener('mousedown', mouseDownHandler);

  scalePinElement.addEventListener('focus', function () {
    scalePinElement.addEventListener('keydown', keyDownHandler);
  });

  scalePinElement.addEventListener('focusout', function () {
    scalePinElement.removeEventListener('keydown', keyDownHandler);
  });

  scaleElement.classList.add('hidden');

  Object.values(EffectsList).forEach(function (item, index) {
    effectElement[index].addEventListener('click', createEffectClickHandler(item));
  });

};


// Редактирование размера изображения

function () {

  var uploadFormElement = document.querySelector('.img-upload__form');
  var buttonDecElement = uploadFormElement.querySelector('.resize__control--minus');
  var buttonIncElement = uploadFormElement.querySelector('.resize__control--plus');
  var uploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview');
  var resizeControlElement = uploadFormElement.querySelector('.resize__control--value');

  buttonDecElement.addEventListener('click', function () {
    var currentValue = parseInt(resizeControlElement.value, 10);
    var newValue = Math.max(window.constants.SCALE_LIMIT_MIN, currentValue - window.constants.SCALE_STEP_VALUE);

    resizeControlElement.value = newValue + '%';
    uploadPreviewElement.style.transform = 'scale(' + newValue / 100 + ')';
  });

  buttonIncElement.addEventListener('click', function () {
    var currentValue = parseInt(resizeControlElement.value, 10);
    var newValue = Math.min(window.constants.SCALE_LIMIT_MAX, currentValue + window.constants.SCALE_STEP_VALUE);

    resizeControlElement.value = newValue + '%';
    uploadPreviewElement.style.transform = 'scale(' + newValue / 100 + ')';
  });

};

// Валидация хэштэгов

function () {

  var Errors = {
    HASHTAGS_TOO_MUCH: 'У вас слишком много хэштегов, можно не больше 5',
    HASHTAG_HAS_NO_HASH: 'Каждый хэштег должен начинаться с символа #',
    HASHTAG_TOO_LONG: 'Хэштег не должен быть длиннее 20 символов',
    HASHTAG_ONLY_HASH: 'Хэштег не должен состоять только из одной #',
    HASHTAG_HAS_DOUBLE: 'Пожалуйста, уберите повторяющийся хэштег'
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');


  var validateHashtags = function () {
    var hashtags = hashtagInputElement.value.toLowerCase().trim();
    var hashtagsForTest = hashtags.split(' ');
    var doubleHashtags = [];
    var testDoubleHashtags = [];
    hashtagInputElement.setCustomValidity('');

    if (hashtags === '') {
      return;
    }

    if (hashtagsForTest.length > window.constants.HASHTAGS_MAX_QUANTITY) {
      hashtagInputElement.setCustomValidity(Errors.HASHTAGS_TOO_MUCH);
      return;
    }

    for (var i = 0; i < hashtagsForTest.length; i++) {
      if (hashtagsForTest[i].charAt(0) !== window.constants.HASHTAG_SYMBOL) {
        return hashtagInputElement.setCustomValidity(Errors.HASHTAG_HAS_NO_HASH);
      }

      if (hashtagsForTest[i].length > window.constants.HASHTAG_MAX_LENGTH) {
        return hashtagInputElement.setCustomValidity(Errors.HASHTAG_TOO_LONG);
      }

      if (hashtagsForTest[i] === window.constants.HASHTAG_SYMBOL) {
        return hashtagInputElement.setCustomValidity(Errors.HASHTAG_ONLY_HASH);
      }

      if (testDoubleHashtags.includes(hashtagsForTest[i]) && !doubleHashtags.includes(hashtagsForTest[i])) {
        doubleHashtags.push(hashtagsForTest[i]);
      } else {
        testDoubleHashtags.push(hashtagsForTest[i]);
      }
    }

    if (doubleHashtags.length > 0) {
      return hashtagInputElement.setCustomValidity(Errors.HASHTAG_HAS_DOUBLE);
    }

  };

  hashtagInputElement.addEventListener('keyup', validateHashtags);


};
