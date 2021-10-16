/*
date issue
get input information - user entries
class template with properties and methods
click events - clickhandler - functions
CRUD : create - read - update - delete
*/


// IIFE : Immediately Invoked Function Expression - Self-invoking Function Expression
// (function () {})(); => syntax

// (function () {
//     console.log('Hi guys, how are you doing?');
// })();

(function () {
    let date = new Date();
    //console.log(date);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Frieday', 'Saturday'];

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Day:
    let day = date.getDay();
    // console.log(day)        // output: 0 - 6; 0 === Sunday...
    // console.log(days[day]);
    // Date:
    let dayOfMonth = date.getDate();    // output: 1 - 31; date of the month
    console.log(dayOfMonth);
    // Month:
    let month = date.getMonth();    // output: 0 - 11; 0 === January...
    console.log(months[month]);

    document.querySelector('.date').textContent = `${days[day]}, ${months[month]} ${dayOfMonth}`;
})()


// *************** CREATE CLASS - TEMPLATE *****************
class Todo {
    constructor(id, priority, action) {
        this.id = id;
        this.priority = priority;
        this.action = action;
        this.completed = false; // false by default
    }

    // methods:
    set changePrio(value) {      // change Priority
        this.priority = value;
    }

    set changeAct(value) {       // change Action
        this.action = value;
    }

    set changeCopm(value) {     // change completed
        this.completed = value;
    }

};

// Array for all todo items
let todoItemsArr = [];

//***************** ADD CLICK EVENT HANDLER - CREATE *********************
document.querySelector('.btn-add').addEventListener('click', function () {
    
    let ID, newItem;

    // create a new id
    if (todoItemsArr.length > 0) {
        ID = todoItemsArr[todoItemsArr.length - 1].id + 1;
    } else {
        ID = 1;
    }

    let priority = document.querySelector('.selectPriority').value;
    let action = document.querySelector('.inputTodo').value;

    if (priority !== 'Priority' && action) {

    //console.log(priority, action);

    // to create new nstance object
    newItem = new Todo(ID, priority, action);

    // push newItem, new instance object to todoItemsArr
    todoItemsArr.push(newItem);

    // console.log(todoItemsArr);

    // to clear the input and select element's content
    document.querySelector('.selectPriority').value = 'Priority';
    document.querySelector('.inputTodo').value = '';

    document.querySelector('.noAction').style.display = 'none';
    document.querySelector('.container').style.display = 'block';

    document.querySelector('.container').innerHTML = '';

    todoItemsArr.forEach(todo => addItem(todo));
    }
})

// READ FROM CRUD operators
function addItem({id, priority, action, completed}) {

    let prio = priority === 'Critical' ? 'critical' : priority === 'High' ? 'high' : priority === 'Medium' ? 'medium' : priority === 'Low' ? 'low' : '';


    let itemTemp = `
    <div class="todo-item ${prio}">
        <div class="check ${completed ? 'green' : ''}"><i class="fas fa-check" data-hasan= ${completed} data-id=${id}></i></div>
        <div class="todo ${completed ? 'line' : ''}">${action}</div>
        <div class="edit"><i class="far fa-edit"></i></div>
        <div class="trash"><i class="fas fa-trash-alt" data-id= ${id}></i></div>
    </div>
    `;

    document.querySelector('.container').insertAdjacentHTML('beforeend', itemTemp);
}

// check todo whether completed or not
document.querySelector('.container').addEventListener('click', (e) => {
    // e : event
    // e.target : HTML element

    console.log(e.target);

    let checkElem = e.target.closest('.check > i.fa-check');

    if (checkElem) {
        // console.log(checkElem);
            
        let checked = e.target.dataset.hasan;
        
        let ID = e.target.dataset.id;

        let todoElem = todoItemsArr.find(item => item.id == ID);

        if (checked === 'false') {

            todoElem.changeCopm = true;

            checkElem.setAttribute('data-hasan', true);

            document.querySelector('.container').innerHTML = '';

            todoItemsArr.forEach(todo => addItem(todo))
        } else {

            todoElem.changeCopm = false;

            document.querySelector('.container').innerHTML = '';

            todoItemsArr.forEach(todo => addItem(todo))
        }
    }

})

// DELETE - romove any object from todoItemsArr
document.querySelector('.container').addEventListener('click', (e) => {

    let trashElem = e.target.closest('.fa-trash-alt');

    if (trashElem) {

        let ID = e.target.dataset.id;

        todoItemsArr = todoItemsArr.filter(item => item.id != ID);

        document.querySelector('.container').innerHTML = '';

        todoItemsArr.forEach(todo => addItem(todo));

        if (todoItemsArr.length = 0) {

            document.querySelector('.noAction').style.display = 'block';
            document.querySelector('.container').style.display = 'none';
        }
    }
});

// UPDATE : edit, update the content of any todo
document.querySelector('.container').addEventListener('click', (e) => {

    let editElem = e.target.closest('.fa-edit');

    if (editElem) {

        let ID = e.target.dataset.id;

        let todoElem = todoItemsArr.find(todo => todo.id == ID);

        document.querySelector('.selectPriority').value = todoElem.priority;
        document.querySelector('.inputTodo').value = todoElem.action;
        document.querySelector('.btn-add').textContent = 'Edit';
        document.querySelector('.btn-add').id = todoElem.id;
    }
})