let todoItems = [];
const todoStorage = localStorage.getItem("todoItems");
const todoListEl = document.querySelector(".todo__List");
if(todoStorage) {
  todoItems = [...JSON.parse(todoStorage)];
}
const formModalEl = document.querySelector(".todo__modal");
const toggleModal = () => {
    formModalEl.classList.toggle("show");
};
formModalEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo__modal")) toggleModal();
  });
const unigueIdGenerator = () => {
    return Math.round(Math.random() * 100000 + 1);
};

const addTodoToHtml = (todoItem) =>{
    let todoItemHtml = ` <li class="todo__item ${
      todoItem.isComplete ? `complete`: `` }"> 
    <div class="todo__complete btn" data-id="${todoItem.id}"
     onclick ="toggleTodoComplete(this)">
      <img src="./checked.svg" alt="">
    </div>
      <div class="todo__info">
        <span class="todo__info-title">${todoItem.title}</span>
        <span class="todo__info-desc">${todoItem.desc}</span>
      </div>
      <img class="btn" src="./delete.png" data-id="${todoItem.id}"
       onclick="removeTodoItems(this)">
  </li>`;

  todoListEl.insertAdjacentHTML("beforeend",todoItemHtml);
};
const saveTodoItemsTols = () =>{
  localStorage.setItem("todoItems",JSON.stringify(todoItems));
};

const addTodoItems = () => {
    if(todoListEl.innerHTML!="") todoListEl.innerHTML ="";
    const title =document.querySelector("input[name='title']").value;
    const desc =document.querySelector("textarea[name='desc']").value;
    const addedTodoItem = {
        id:unigueIdGenerator(),
        title,
        desc,
        isComplete:false
    };
    document.querySelector("#addTodoForm").reset();
    addTodoToHtml(addedTodoItem);
    todoItems.push(addedTodoItem);
    saveTodoItemsTols();
    toggleModal();

};

const toggleTodoComplete = (selectedEl) => {
const toggleItemIndex = todoItems.findIndex(todo => todo.id ==selectedEl.dataset.id);

if(toggleItemIndex != -1){
  todoItems[toggleItemIndex].isComplete = !todoItems[toggleItemIndex].isComplete
  selectedEl.parentNode.classList.toggle("complete")
  saveTodoItemsTols();
}
};
const noneTodoItems = () => {
  const notFoundItem = `<li class="none-todos"> Henüz Bir Şey Eklemediniz !</li>`;
  todoListEl.insertAdjacentHTML("beforeend",notFoundItem);
      
};

const removeTodoItems = (removedEl) => {
  const removedItemIndex =todoItems.findIndex(todo =>todo.id ==removedEl.dataset.id);

  if(removedItemIndex !=1){
    todoItems.splice(removedItemIndex,1);
    removedEl.parentNode.remove();
    saveTodoItemsTols();
    if(todoItems.length ==0){
      noneTodoItems();
        

    }
  }
};

const listTodoItem = () => {
  if(todoItems.length >0){
    todoItems.forEach(todo => {
      addTodoToHtml(todo);
      });
  }else{
    noneTodoItems();
      
    }
  };
  
listTodoItem();

