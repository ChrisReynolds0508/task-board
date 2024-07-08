
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Function to create a task card element
function createTaskCard(task) {
    let card = $("<div>").addClass("taskCard");
    card.attr("id", task.id); // Assign task id to card

    let name = $("<h3>").addClass("taskName").text(task.name);
    let description = $("<p>").addClass("taskDescription").text(task.description);
    let dueDate = $("<p>").addClass("dueDate").text(task.dueDate);
    let deleteButton = $("<button>").addClass("deleteButton btn btn-danger").text("Delete");

    card.append(name, description, dueDate, deleteButton);
    card.draggable({
        revert: "invalid",
        stack: ".taskCard",
        containment: ".swim-lanes",
        zIndex: 1000
    });
    return card;
}

// Function to render task cards in their respective lanes
function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(function(task) {
        let card = createTaskCard(task);
        $("#" + task.status + "-cards").append(card);
        card.draggable();
    });
}

// Function to handle form submission (adding a new task)
function handleAddTask(event) {
    event.preventDefault();

    let taskName = $("#taskName").val();
    let taskDescription = $("#taskDescription").val();
    let dueDate = $("#datepicker").val();

    let task = {
        id: generateTaskId(),
        name: taskName,
        description: taskDescription,
        dueDate: dueDate,
        status: "todo" 
    };

    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
    $("#formModal").modal("hide"); // Hide the modal after submission
    $("#taskForm").trigger("reset"); // Reset form fields
}

// Function to handle deleting a task

function handleDeleteTask(event) {
    let taskId = $(event.target).closest(".taskCard").attr("id");
    taskList = taskList.filter(task => task.id !== parseInt(taskId)); // Convert taskId to integer if necessary
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to initialize the page
$(document).ready(function() {
    renderTaskList(); // Render tasks when the page loads
    $("#taskForm").on("submit", handleAddTask); // Handle form submission
    $(".deleteButton").on("click", handleDeleteTask); // Handle delete button clicks
    $("#datepicker").datepicker();
    });
$(document).on("click", ".deleteButton", handleDeleteTask); // Handle delete button clicks
    
    $(".drop-area").droppable({
        accept: ".taskCard", // Only accept task cards
    
    });

 
