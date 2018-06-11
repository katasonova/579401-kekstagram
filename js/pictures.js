var photos = [];
var maxPhotos = 25;

var createPhotosItem = function (PhotosNumber) {

    //url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} это ////число от 1 до 25. Адреса картинок не должны повторяться.
    for (var i = 1, i <= maxPhotos; i++) {
      photosItem.url = i;
    }

    //likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200
    var maxLikes = 200;
    var minLikes = 15;

    photosItem.likes = Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes;

    //comments, массив строк — список комментариев, оставленных другими пользователями к этой фотографии.
    var comments = [];
    var comment1 = 'Всё отлично!';
    var comment2 = 'В целом всё неплохо. Но не всё.';
    var comment3 = 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.';
    var comment4 = 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.';
    var comment5 = 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.';
    var comment6 = 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

    for (var i = 0; i < comments.length; i++) {
      for (var j = 1; j < comments.length - 1; j++) {
        comments[i] = 'comment' + j;
      }
    }

    photosItem.comments = comments[Math.floor(Math.random() * comments.length;

          //description, строка, в которой есть одно из следующих предложений:
          var description = [];
          var description1 = 'Тестим новую камеру!';
          var description2 = 'Затусили с друзьями на море';
          var description3 = 'Как же круто тут кормят ';
          var description4 = 'Отдыхаем...';
          var description5 = 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......';
          var description6 = 'Вот это тачка!';

          for (var i = 0; i < description.length; i++) {
            for (var j = 1; j < description.length - 1; j++) {
              comments[i] = 'description' + j;
            }
          }

          photosItem.description = description[Math.floor(Math.random() * description.length;
            };
