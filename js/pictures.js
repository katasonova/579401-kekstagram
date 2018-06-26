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

// отрисовка всех фотографий на страницу
var renderPhotos = function (photos) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length - 1; i++) {
    var newPhotoNode = photoTemplate.cloneNode(true);
    newPhotoNode.querySelector('.picture__img').src = photos[i].url;
    newPhotoNode.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    newPhotoNode.querySelector('.picture__stat--comments').textContent = photos[i].comments.length;

    documentFragment.appendChild(newPhotoNode);
  }

  picturesElement.appendChild(documentFragment);
};


var allPhotos = createPhotoObject();
renderPhotos(allPhotos);


var getAvatarPath = function (numberOfAvatar) {
  return AVATAR_PATH + numberOfAvatar + AVATAR_EXTENSION;
};
// .social__comments два раза нахожу элемент с этим классов один раз в функ renderTargetPhoto другой раз здесьпотому что нужна ссылка на объект
// var existSocialCommentElement = existBigPictureElement.querySelector('.social__comments');
var socialCommentElement = existBigPictureElement.querySelector('.social__comments');

var createSocialComments = function (commentList, comments) {

  var documentFragment = document.createDocumentFragment();
  // var result = [];

  for (var i = 0; i < comments.length; i++) {
  var socialCommentItem = document.createElement('li');
  socialCommentItem.className = 'social__comment';

  var socialCommentAvatar = document.createElement('img');
  socialCommentAvatar.src = '';
  socialCommentAvatar.className = 'social__picture social__comment--text';
  socialCommentAvatar.alt = 'Аватар комментатора фотографии';
  socialCommentAvatar.width = '35';
  socialCommentAvatar.height = '35';
  
  socialCommentItem.appendChild(socialCommentAvatar);
  
  var socialCommentText = document.createElement('p');
  socialCommentText.textContent = comments[i];
  socialCommentText.className = 'social__text';
  
  socialCommentItem.appendChild(socialCommentText);
  
  documentFragment.appenChild(socialCommentItem);
  
  // result.push(socialCommentItem);
  }

  socialCommentElement.appendChild(documentFragment);

  // return result;
};


var renderTargetPhoto = function (photoObject) {
  var bigPictureElementClone = existBigPictureElement.cloneNode(true);

  mainContainer.removeChild(existBigPictureElement);

  bigPictureElementClone.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPictureElementClone.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureElementClone.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPictureElementClone.querySelector('.social__picture').src = getAvatarPath(getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX));
  bigPictureElementClone.querySelector('.social__caption').textContent = photoObject.description;

  var socialCommentElement = bigPictureElementClone.querySelector('.social__comments');
  socialCommentElement.innerHTML = '';
  createSocialComments(socialCommentElement, photoObject.comments);


  mainContainer.appendChild(bigPictureElementClone);

  return bigPictureElementClone;
};


var openChangePhotoForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escKeyboardButtonHandler);
};
// renderTargetPhoto(allPhotos[0]);

var photoUpload = document.querySelector('#upload-file');
photoUpload.addEventListener('change', openChangePhotoForm);

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var photoUploadClose = imgUploadOverlay.querySelector('#upload-cancel');

/*// сбрас значение поля выбора файла #upload-file
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


/*var clickPhotoHandler = function (photoObject, evt) {
  evt.preventDefault();
  renderTargetPhoto(photoObject);
}

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

var createSocialComents = function (comments) {
  var result = [];

  for (var i = 0; i < comments.length; i++) {
    var socialComment = document.createElement('li');
    socialComment.className = 'social__comment';

    var socialImg = document.createElement('img');
    socialImg.src = '';
    socialImg.className = 'social__picture';

    socialComment.appendChild(socialImg);

    var socialText = document.createElement('p');
    socialText.textContent = comments[i];
    socialText.className = 'social__text';

    socialComment.appendChild(socialText);

    result.push(socialComment);
  }

  return result;
}

var renderTargetPhoto = function (photoObject) {
  var existBigPictureElement = document.querySelector('.big-picture');
  var bigPictureElement = existBigPictureElement.cloneNode(true);

  mainContainer.removeChild(existBigPictureElement);

  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPictureElement.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPictureElement.querySelector('.social__picture').src = getAvatarPath(getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX));
  // photoView.querySelector('social__text').textContent = photoObject.comments;
  bigPictureElement.querySelector('.social__caption').textContent = photoObject.description;
  var socialCommentElement = bigPictureElement.querySelector('.social__comments');

  // Здесь поставь обработчик на закрытие по крестику, esc
  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', function (evt) {
    bigPictureElement.classList.add('hidden');
  });

  bigPictureElement.classList.remove('hidden');

  mainContainer.appendChild(bigPictureElement);

  return photoView;
};

var openChangePhotoForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escKeyboardButtonHandler);
};
// renderTargetPhoto(allPhotos[0]);

var photoUpload = document.querySelector('#upload-file');

photoUpload.addEventListener('change', openChangePhotoForm);

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var photoUploadClose = imgUploadOverlay.querySelector('#upload-cancel');

var closeChangePhotoForm = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escKeyboardButtonHandler);
};

photoUploadClose.addEventListener('click', closeChangePhotoForm);

var escKeyboardButtonHandler = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    closeChangePhotoForm();
  }
};*/
