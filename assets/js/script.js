
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
if (!taskList || !Array.isArray(taskList)) {
    taskList = [];
}
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (!nextId) {
        nextId = 1;
    } else {
        nextId++;
    }
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
console.log(task.name)
    let card = $("<div>").addClass("taskCard")
    let name = $("<h3>").addClass("taskName").text(task.name)
    card.append(name)
    return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
let todoContainer = $("#todo-cards")
for (let i=0; i< taskList.length; i++){
let card = createTaskCard(taskList[i])

todoContainer.append(card)

}}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
event.preventDefault();
let taskName = $("#taskName").val();
let taskDescription = $("#taskDescription").val();
let dueDate = $("#datepicker").val();

let task = {
    id: generateTaskId(),
    name: taskName,
    description: taskDescription,
    dueDate: dueDate

};
taskList.push(task);
console.log(taskList);
localStorage.setItem("tasks", JSON.stringify(taskList));

}



// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#taskForm").on("submit", handleAddTask);
    $( "#datepicker" ).datepicker();

});

