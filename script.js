const createTodo = function(todo) {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=302',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: todo
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
      $('#inputBox').val(' ')
      getTodos()
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
      <i class="far fa-times-circle delete"></i>
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

$('#inputBox').keypress(function(event){
  console.log(`keypress`)
  console.log($(this).val())
  if (event.keyCode == 13 || event.which == 13) {
    console.log(`enter pressed`)
    event.preventDefault()
    let formText = $(this).val()
    createTodo(formText)
  }
})

const deleteTodo = function(id) {
  console.log(`deleteTodo`)
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=302`,
      success: function (response, textStatus) {
        resolve(response)
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  })
  return promise
}

$('#list').on('click', '.delete', function() {
  console.log(`delete click`)
  let li = $(this).parent()
  let input = li.find('input')
  let id = input.attr('id')
  console.log(id)
  deleteTodo(id)
    .then(response => {
      console.log(response)
      li.remove()
    })
})

$('document').ready(function() {
  getTodos()
})