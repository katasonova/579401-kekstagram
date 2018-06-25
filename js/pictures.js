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
existBigPictureElement.classList.remove('hidden');

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

var createSocialComments = function (comments) {
  var result = [];

  for (var i = 0; i < comments.length; i++) {
    var socialCommentItem = document.createElement('li');
    socialCommentItem.classList.add('social__comment');

    var socialCommentAvatar = document.createElement('img');
    socialCommentAvatar.src = '';
    socialCommentAvatar.classList.add('social__picture');

    socialCommentItem.appendChild(socialCommentAvatar);

    var socialCommentText = document.createElement('p');
    socialCommentText.textContent = comments[i];
    socialCommentText.classList.add('social__text');

    socialCommentItem.appendChild(socialCommentText);

    result.push(socialCommentItem);
  }

  return result;
};

createSocialComments(COMMENTS);
console.log('privet');

var renderTargetPhoto = function (photoObject) {
  var bigPictureElementClone = existBigPictureElement.cloneNode(true);

  mainContainer.removeChild(existBigPictureElement);

  bigPictureElementClone.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPictureElementClone.querySelector('.likes-count').textContent = photoObject.likes;
  bigPictureElementClone.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPictureElementClone.querySelector('.social__picture').src = getAvatarPath(getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX));
  bigPictureElementClone.querySelector('.social__text').textContent = photoObject.comments;
  // bigPictureElementClone.querySelector('.social__comment').textContent = getCommentsForPhoto(photoObject);
  bigPictureElementClone.querySelector('.social__caption').textContent = photoObject.description;

  var socialCommentElement = bigPictureElementClone.querySelector('.social__comments');
  socialCommentElement.

  mainContainer.appendChild(bigPictureElementClone);

  return bigPictureElementClone;
};

renderTargetPhoto(allPhotos[0]);


var photoUpload = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var photoUploadClose = imgUploadOverlay.querySelector('.upload-cancel');

var escKeyboardButtonHandler = function (evt) {
  if (evt.key === ESC_KEYCODE) {
    closeChangePhotoForm();
  }
};

var openChangePhotoForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escKeyboardButtonHandler);
};

var closeChangePhotoForm = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escKeyboardButtonHandler);
};

photoUploadClose.addEventListener('click', closeChangePhotoForm());

photoUpload.addEventListener('change', openChangePhotoForm());

