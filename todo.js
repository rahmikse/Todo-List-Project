const form = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo");

const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const filter = document.querySelector("#filter");
const clearBottom = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    // Tüm eventListenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearBottom.addEventListener("click", clearAllTodos);
    
}

function clearAllTodos() {
    if (confirm("Tümünü silmek istediğinize emin misiniz ? ")) {
        // Arayüzden todoları kaldırma
       // todoList.innerHTML = ""; // Yavaş yöntem

      while(todoList.firstElementChild != null){
          todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos");
    }
    
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Not Found
            listItem.setAttribute("style", "display : none ! important");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo successfully removed");
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); // Arrayden değer silme işlemi
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosUI(newTodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        // array içindeki her bir değeri yazdırmak için
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim(); // Trim boşlukları siler

    if (newTodo === "") {
        //         <div class="alert alert-danger" role="alert">
        //   This is a danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
        // </div>

        showAlert("danger", "Please enter a Todo ");
    } else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "Todo successfully added ");
    }
   
    e.preventDefault(); // Default ayara getirerek aynı sayfada açılmayı önler
}

function getTodosFromStorage() {
    // storagedan todoalrı alır
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo); // Todoları storage ekler

    localStorage.setItem("todos", JSON.stringify(todos)); // Stringe parse eder
}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTımeOut Metodu

    setTimeout(function () {
        alert.remove();
    }, 2000);
}

function addTodoToUI(newTodo) {
    // String değerini listItem olarak UI'a
    // ekleyecek

    // <!-- <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>-->

    const listItem = document.createElement("li");
    //Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "deleteItem";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //TodoList'e ListItem ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";
}