const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://Adham:v8l941PwWRP8KqtT@todo.3kt5zkc.mongodb.net/'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

// mongo here...
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

// scheema
const todoSchema = new mongoose.Schema({
    text: { type: String, required: true } 
  })
  
  // model
  const Todo = mongoose.model('Todo', todoSchema, 'todos')

// Routes here

app.post('/todos', async (request, response) => {
    const { text } = request.body
    const todo = new Todo({
        text: text
    })
    const savedTodo = await todo.save()
    response.json(savedTodo)  
    })

// todos-route
app.get('/todos/:id', async (request, response) => {
    console.log('ID:', request.params.id); // Add this line to log the ID
    const todo = await Todo.findById(request.params.id);
    if (todo) response.json(todo);
    else response.status(404).end();
  });

  app.delete('/todos/:id', async (request, response) => {
    const deletedTodo = await Todo.findByIdAndRemove(request.params.id)
    if (deletedTodo) response.json(deletedTodo)
    else response.status(404).end()
    })

    app.put('/todos/:id', async (request, response) => {
      const { id } = request.params;
      const { text } = request.body;
  
      try {
          const updatedTodo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
          if (updatedTodo) {
              response.json(updatedTodo);
          } else {
              response.status(404).end();
          }
      } catch (error) {
          console.error(error);
          response.status(500).json({ error: 'Internal server error' });
      }
  });

  function init() {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...'
    // loadTodos()
  }

  async function loadTodos() {
    let response = await fetch('http://localhost:3000/todos')
    let todos = await response.json()
      console.log(todos)
    //showTodos(todos)
  }

  function createTodoListItem(todo) {
    // luodaan uusi LI-elementti
    let li = document.createElement('li')
      // luodaan uusi id-attribuutti
    let li_attr = document.createAttribute('id')
      // kiinnitetään tehtävän/todon id&#58;n arvo luotuun attribuuttiin 
    li_attr.value= todo._id
      // kiinnitetään attribuutti LI-elementtiin
    li.setAttributeNode(li_attr)
      // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
    let text = document.createTextNode(todo.text)
      // lisätään teksti LI-elementtiin
    li.appendChild(text)
      // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
    let span = document.createElement('span')
      // luodaan uusi class-attribuutti
    let span_attr = document.createAttribute('class')
      // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
    span_attr.value = 'delete'
      // kiinnitetään SPAN-elementtiin yo. attribuutti
    span.setAttributeNode(span_attr)
      // luodaan tekstisolmu arvolla x
    let x = document.createTextNode(' x ')
      // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
    span.appendChild(x)
      // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
    span.onclick = function() { removeTodo(todo._id) }
      // lisätään SPAN-elementti LI-elementtin
    li.appendChild(span)
      // palautetaan luotu LI-elementti
      // on siis muotoa: <li id="mongoIDXXXXX">Muista soittaa...<span class="remove">x</span></li>
      let editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.onclick = function() { editTodo(todo._id, todo.text); };
  
      // Append the "Edit" button to the LI element
      li.appendChild(editButton);
  
      return li;
    
  }

  async function editTodo(id, currentText) {
    const newText = prompt('Edit todo:', currentText);
    if (newText === null) {
        // User clicked cancel, do nothing
        return;
    }

    const data = { text: newText };
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT', // Use HTTP PUT method for updating
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        // Update the todo item on the client side
        const updatedTodo = await response.json();
        const li = document.getElementById(id);
        li.firstChild.textContent = updatedTodo.text;
    } else {
        alert('Failed to update todo.');
    }
}

  function showTodos(todos) {
    let todosList = document.getElementById('todosList')
    let infoText = document.getElementById('infoText')
    // no todos
    if (todos.length === 0) {
      infoText.innerHTML = 'Ei tehtäviä'
    } else {    
      todos.forEach(todo => {
          let li = createTodoListItem(todo)        
          todosList.appendChild(li)
      })
      infoText.innerHTML = ''
    }
  }

  async function addTodo() {
    let newTodo = document.getElementById('newTodo')
    const data = { 'text': newTodo.value }
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let todo = await response.json()
    let todosList = document.getElementById('todosList')
    let li = createTodoListItem(todo)
    todosList.appendChild(li)
  
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = ''
    newTodo.value = ''
  }

  async function removeTodo(id) {
    const response = await fetch('http://localhost:3000/todos/'+id, {
      method: 'DELETE'
    })
    let responseJson = await response.json()
    let li = document.getElementById(id)
    li.parentNode.removeChild(li)
  
    let todosList = document.getElementById('todosList')
    if (!todosList.hasChildNodes()) {
      let infoText = document.getElementById('infoText')
      infoText.innerHTML = 'Ei tehtäviä'
    }
  }
  
  
// app listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})

