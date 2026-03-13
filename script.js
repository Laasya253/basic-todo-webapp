function getCurrentTime() {
    return new Date().toLocaleString();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = createTaskElement(taskText, getCurrentTime(), false);
    document.getElementById("pendingList").appendChild(li);

    input.value = "";
}

function createTaskElement(text, timeAdded, isCompleted, timeCompleted = "") {
    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.className = "task-text";
    taskText.innerText = text;

    const taskTime = document.createElement("div");
    taskTime.className = "task-time";
    taskTime.innerText = isCompleted 
        ? "Completed on: " + timeCompleted 
        : "Added on: " + timeAdded;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    if (!isCompleted) {
        completeBtn.onclick = function () {
            const completedTask = createTaskElement(
                taskText.innerText,
                timeAdded,
                true,
                getCurrentTime()
            );
            document.getElementById("completedList").appendChild(completedTask);
            li.remove();
        };
        actions.appendChild(completeBtn);
    }

    editBtn.onclick = function () {
        const newText = prompt("Edit your task:", taskText.innerText);
        if (newText) {
            taskText.innerText = newText;
        }
    };

    deleteBtn.onclick = function () {
        li.remove();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(taskTime);
    li.appendChild(actions);

    return li;
}
