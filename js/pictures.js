'use strict';

var PHOTOS_COUNT = 25;

var photoView = document.querySelector('.big-picture');
photoView.classList.remove('hidden');

var listItemComment = document.querySelector('.social__comment');
listItemComment.classList.add('social__comment--text');

var commentCountHide = document.querySelector('.social__comment-count');
commentCountHide.classList.add('visually-hidden');

var newCommentLoadHide = document.querySelector('.social__loadmore');
newCommentLoadHide.classList.add('visually-hidden');

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

var renderTargetPhoto = function (index) {
  photoView.querySelector('.big-picture__img').src = allPhotos[index].url;
  photoView.querySelector('.likes-count').textContent = allPhotos[index].likes;
  photoView.querySelector('.comments-count').textContent = allPhotos[index].comments.length;
  photoView.querySelector('social__picture').src = 'img/avatar-' + getRandomIntFromRange(AVATAR.MIN, AVATAR.MAX) + '.svg';
  photoView.querySelector('social__text').textContent = allPhotos[index].comments;
  photoView.querySelector('.social__caption').textContent = allPhotos[index].description;

  return photoView;
};

renderTargetPhoto(0);
