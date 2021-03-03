import "./styles/style.scss";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

console.log(form, input);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = '';
  addTodo(value);
})

const todos = [
  {
    text: 'Je suis une todo',
    done: false,
    editMode: false
  },
  {
    text: 'Je suis une autre todo',
    done: true,
    editMode: false
  },
  {
    text: 'Et moi encore une autre',
    done: false,
    editMode: false
  }
];

// Fonction qui prend en paramètre le tableau de todo et qui le transforme en quelque chose de visible dans le DOM / Le if permet de savoir si on est en editMode ou pas
const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return  createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

// Fonction qui a pour rôle de transformer l'objet JavaScript node (text, done) en un élément Html qui va être utilisable
const createTodoElement = (todo, index) => {
  const li = document.createElement('li');

  const buttonDelete = document.createElement('button');
  buttonDelete.innerHTML = 'Supprimer';

  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = 'Éditer';

  buttonDelete.addEventListener('click', event => {
    event.stopPropagation();
    deleteTodo(index);
  });

  buttonEdit.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  })

  li.innerHTML = 
  `
    <span class="todo ${ todo.done ? "done" : "" }"></span>
    <p>${ todo.text }</p>
  `;
  li.addEventListener('click', (event) => {
    toggleTodo(index);
  })
  li.append(buttonEdit, buttonDelete);
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;

  const buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Sauver';

  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Annuler';

  buttonCancel.addEventListener('click', event => {
    event.stopPropagation();
    toggleEditMode(index);
  })

  buttonSave.addEventListener('click', event => {
    editTodo(index, input);

  })

  li.append(input, buttonCancel, buttonSave);
  return li;
}

// permet de crer une nouvelle todo
const addTodo = (text) => {
  todos.push(
    {
    text: text,
    done: false
    }
  );
  displayTodo();
}

// permet de supprimer une todo
// la méthode splice() d'un tableau modifie directement le tableau sur lequel elle est appelée (Elle ne renvoie pas de nouveau tableau)
const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
}

// Fonction qui sert d'interrupteur
const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
}

const toggleEditMode = index => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
}

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
}

displayTodo()