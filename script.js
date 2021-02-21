const createTodo = function() {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=302',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: 'Finish to do list'
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

const getTodos = function() {
  console.log(`getTodos()`)
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=302',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // response is a parsed JavaScript object instead of raw JSON
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$('document').ready(function() {
  // createTodo()
  getTodos()
})