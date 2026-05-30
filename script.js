let usedTimes = [];

let completedTasks = 0;
let missedTasks = 0;

const allSlots = [
"6AM - 7AM",
"7AM - 8AM",
"8AM - 9AM",
"9AM - 10AM",
"10AM - 11AM"
];

function updateSystem(){

let score =
100 +
(completedTasks * 8) -
(missedTasks * 15);

if(score > 100){
score = 100;
}

if(score < 0){
score = 0;
}

document.getElementById("score").innerHTML =
score + "%";

document.getElementById("completedCount").innerHTML =
completedTasks;

document.getElementById("missedCount").innerHTML =
missedTasks;

if(score >= 80){
document.getElementById("momentum").innerHTML =
"Momentum Stable 🚀";
}
else if(score >= 50){
document.getElementById("momentum").innerHTML =
"Momentum Dropping ⚠";
}
else{
document.getElementById("momentum").innerHTML =
"Recovery Mode Active 🧠";
}
}

function addTask(){

let userType =
document.getElementById("userType").value;

let task =
document.getElementById("taskInput").value.trim();

let priority =
document.getElementById("priorityInput").value;

let time =
document.getElementById("timeInput").value;

let status =
document.getElementById("status");

let taskGrid =
document.getElementById("taskGrid");

if(
userType === "" ||
task === "" ||
priority === "" ||
time === ""
){

status.innerHTML =
"⚠ Please complete all fields.";

status.style.color =
"#facc15";

return;
}

if(usedTimes.includes(time)){

let freeSlot =
allSlots.find(
slot => !usedTimes.includes(slot)
);

status.innerHTML =
"⚠ Time Conflict Detected.<br><br>Suggested Smart Slot: <b>" +
freeSlot +
"</b>";

status.style.color =
"#fb923c";

return;
}

usedTimes.push(time);

let priorityClass =
priority.toLowerCase();

let taskCard =
document.createElement("div");

taskCard.classList.add(
"taskCard",
priorityClass
);

taskCard.setAttribute(
"data-time",
time
);

taskCard.innerHTML =
"<div class='badge'>" +
priority +
"</div>" +
"<div class='taskTitle'>" +
task +
"</div>" +
"<div class='taskInfo'>" +
"👤 " + userType +
"<br>" +
"⏰ " + time +
"</div>" +
"<div class='taskButtons'>" +
"<button class='completeBtn' onclick='completeTask(this)'>Complete</button>" +
"<button class='missBtn' onclick='missTask(this)'>Missed</button>" +
"<button class='deleteBtn' onclick='deleteTask(this)'>Delete</button>" +
"</div>";

taskGrid.appendChild(taskCard);

status.innerHTML =
"✅ Adaptive schedule generated successfully.";

status.style.color =
"#4ade80";

document.getElementById("taskInput").value = "";
}

function completeTask(button){

let taskCard =
button.parentElement.parentElement;

taskCard.classList.add("completed");

completedTasks++;

updateSystem();

disableButtons(taskCard);
}

function missTask(button){

let taskCard =
button.parentElement.parentElement;

taskCard.classList.add("missed");

missedTasks++;

updateSystem();

disableButtons(taskCard);
}

function deleteTask(button){

let taskCard =
button.parentElement.parentElement;

let taskTime =
taskCard.getAttribute("data-time");

usedTimes =
usedTimes.filter(
t => t !== taskTime
);

taskCard.remove();

document.getElementById("status").innerHTML =
"🗑 Task removed and slot freed successfully.";

document.getElementById("status").style.color =
"#94a3b8";
}

function disableButtons(card){

let buttons =
card.querySelectorAll("button");

buttons.forEach(btn => {

if(!btn.classList.contains("deleteBtn")){

btn.disabled = true;
btn.style.opacity = "0.5";

}

});
}

let focusInterval;

function startFocusMode(){

let overlay =
document.createElement("div");

overlay.classList.add("focusOverlay");

overlay.innerHTML =
"<div class='focusBox'>" +
"<div class='focusTitle'>Focus Mode 🚀</div>" +
"<div class='timer' id='timer'>25:00</div>" +
"<button class='closeFocus' onclick='closeFocusMode()'>Exit Focus Mode</button>" +
"</div>";

document.body.appendChild(overlay);

let totalSeconds = 1500;

focusInterval =
setInterval(() => {

let minutes =
Math.floor(totalSeconds / 60);

let seconds =
totalSeconds % 60;

if(seconds < 10){
seconds = "0" + seconds;
}

document.getElementById("timer").innerHTML =
minutes + ":" + seconds;

totalSeconds--;

if(totalSeconds < 0){

clearInterval(focusInterval);

document.getElementById("timer").innerHTML =
"Done ✅";

}

},1000);
}

function closeFocusMode(){

clearInterval(focusInterval);

document.querySelector(".focusOverlay").remove();

}
