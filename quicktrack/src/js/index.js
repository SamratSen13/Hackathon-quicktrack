let timeTrackTask; 
let timeTrackEndTask = JSON.parse(localStorage.getItem("timeTrackEndTask")) || [];;
const inputbox = document.getElementById("input-box");
const taskName = document.getElementById("taskName");
const stopWatchEnd = document.getElementById("stopWatchEnd");
const stopButton = document.getElementById("stopButton");
const trackAllTask = document.getElementById("trackAllTask");
//const task1 = document.getElementById("task1");
//const task1Duration = document.getElementById("task1Duration");
//const startDate = document.getElementById("startDate");
//const taskStartTime = document.getElementById("taskStartTime");
//const taskEndTime = document.getElementById("taskEndTime");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let current_time = null;
let current_date = null;
let end_Current_Time = null;
let duration = null;

function startTask() {
  if (!isRunning){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 1);
    isRunning = true;          
  }
  const newTask = inputbox.value;
  if(newTask === ''){
    confirm("You must write something!");
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    stopWatchEnd.textContent = "00:00:00";
  }
  else {
    taskName.innerHTML = inputbox.value; 
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let date = today.getDate();
    current_date = `${date}/${month}/${year}`;
    let start_hours = today.getHours();
    let start_minutes = today.getMinutes();
    let start_seconds = today.getSeconds();

    start_hours = String(start_hours).padStart(2, "0");
    start_minutes = String(start_minutes).padStart(2, "0");
    start_seconds = String(start_seconds).padStart(2, "0");
    current_time = `${start_hours}:${start_minutes}:${start_seconds}`;
    if(localStorage.getItem("timeTrackTask") == null){
      timeTrackTask = [];
    }
    else {
      timeTrackTask = JSON.parse(localStorage.getItem("timeTrackTask"));
    }
    
    timeTrackTask.push({
      inputTask: newTask,
      startTime: current_time,
      startDate: current_date,
    });
    }
  saveToLocalStorage();
  inputbox.value = "";
  displayTasks();
}

function endTask() {
  if (isRunning){
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    seconds = Math.floor(elapsedTime / 1000 % 60);
    minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    hours = Math.floor(elapsedTime / (1000 *60 * 60));
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    duration = `${hours}:${minutes}:${seconds}`;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    let today = new Date();
    let end_hours = today.getHours();
    let end_minutes = today.getMinutes();
    let end_seconds = today.getSeconds();

    end_hours = String(end_hours).padStart(2, "0");
    end_minutes = String(end_minutes).padStart(2, "0");
    end_seconds = String(end_seconds).padStart(2, "0");
    end_Current_Time = `${end_hours}:${end_minutes}:${end_seconds}`;
    
    stopWatchEnd.textContent = "00:00:00";
  //  startDate.innerHTML = current_date;
   // taskStartTime.textContent = current_time;
   // taskEndTime.textContent = end_Current_Time;
  
  }
  
  if(taskName.value !== ''){
 // task1.innerHTML = taskName.textContent;
 // task1Duration.innerHTML=`${hours}:${minutes}:${seconds}`;
  timeTrackEndTask.push({
    dur: duration, 
    endTime: end_Current_Time,
 });
 
  saveToLocalStorage();
  taskName.textContent ='';
  displayTasks();
  }
  else {
    alert("No Task Found!");
  }
  
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  
  let hours = Math.floor(elapsedTime / (1000 *60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
  let seconds = Math.floor(elapsedTime / 1000 % 60);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  stopWatchEnd.textContent = `${hours}:${minutes}:${seconds}`;
}

function saveToLocalStorage() {
  localStorage.setItem("timeTrackTask", JSON.stringify(timeTrackTask));
  localStorage.setItem("timeTrackEndTask", JSON.stringify(timeTrackEndTask));
}

function displayTasks() {
  if(localStorage.getItem("timeTrackTask") == null){
    timeTrackTask = [];
  }
  else {
    timeTrackTask = JSON.parse(localStorage.getItem("timeTrackTask"));
  }
  let html ="";
  timeTrackTask.forEach(function (element, index){
    html += "<tr>";
    html += "<td>" + element.inputTask + "</td>"
    html += "<td>" + element.startTime + "</td>"
    html += "<td>" + element.startDate + "</td>"
    html += "</tr>";
   });
   document.querySelector("#allTaskTable tbody").innerHTML = html;
   
   let html2 ="";
   timeTrackEndTask.forEach(function (element , index){
    html2 += "<tr>"
    html2 += "<td>" + element.dur + "</td>"
    html2 += "<td>" + element.endTime + "</td>"
    html2 += '<td><button onclick="deleteData('+index+') class="btn-delete">Delete</button>'
    html2 += "</tr>"
   });
   document.querySelector("#allTaskEndTable tbody").innerHTML = html2;
  

}

document.onload = displayTasks();

function deleteData(index) {
  if(localStorage.getItem("timeTrackTask") == null){
    timeTrackTask = [];
  }
  else {
    timeTrackTask = JSON.parse(localStorage.getItem("timeTrackTask"));
  }

  timeTrackTask.splice(index, 1);
  localStorage.setItem("timeTrackTask", JSON.stringify(timeTrackTask));
  timeTrackEndTask.splice(index, 1);
  localStorage.setItem("timeTrackEndTask", JSON.stringify(timeTrackEndTask));
  displayTasks();
}