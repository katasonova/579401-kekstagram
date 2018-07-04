'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = window.constants.QUERY_TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.constants.SUCCESS_RESPONSE_CODE:

          onSuccess(xhr.response);
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var loadData = function (onSuccess, onError) {
    request('GET', URL_LOAD, onSuccess, onError);
  }

  var saveData = function (data, onSuccess, onError) {
    request('POST', URL_SAVE, onSuccess, onError, data);
  }

  window.backend = {
    loadData: loadData,
    saveData: saveData,
  };

})();
