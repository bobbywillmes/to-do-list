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

const buildTodoList = function(tasks) {
  let html = ''
  console.log(tasks)
  let li = ''
  tasks.forEach(task => {
    console.log(task)
    li = 
    `<li class="list-group-item">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="${task.id}">
        <label class="custom-control-label" for="${task.id}">${task.content}</label>
      </div>
     </li>`
     html += li
  })
  $('#list').html(html)
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
      buildTodoList(response.tasks)
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