/* script.js */

let barChart;
let radarChart;

function analyze(){

let error = document.getElementById("error");
error.innerText = "";

/* Inputs */
let age = Number(document.getElementById("age").value);
let smoke = Number(document.getElementById("smoke").value) || 0;
let alcohol = Number(document.getElementById("alcohol").value) || 0;
let junk = Number(document.getElementById("junk").value) || 0;
let soft = Number(document.getElementById("soft").value) || 0;
let snacks = Number(document.getElementById("snacks").value) || 0;
let water = Number(document.getElementById("water").value) || 0;
let exercise = Number(document.getElementById("exercise").value) || 0;

/* Validation */

if(!age || age <= 0){
error.innerText = "Please enter valid age.";
return;
}

if(
smoke < 0 ||
alcohol < 0 ||
junk < 0 ||
soft < 0 ||
snacks < 0 ||
water < 0 ||
exercise < 0
){
error.innerText = "Negative values are not allowed.";
return;
}

/* Score Formula */

let score =
(age * 0.4) +
(smoke * 12) +
(alcohol * 7) +
(junk * 5) +
(soft * 4) +
(snacks * 4) -
(water * 2) -
(exercise * 0.15);

score = Math.max(0, Math.min(100, Math.round(score)));

/* Risk */

let risk = "Low";
if(score >= 25) risk = "Moderate";
if(score >= 50) risk = "High";
if(score >= 75) risk = "Hazardous";

/* Update UI */

document.getElementById("score").innerText =
"Toxicity Score: " + score;

document.getElementById("risk").innerText =
"Risk Level: " + risk;

document.getElementById("fill").style.width =
score + "%";

/* Organ Age */

let organAge =
age +
(smoke * 2) +
(alcohol * 1.5) +
(junk * 1.2) +
(soft * 1) +
(snacks * 0.8) -
(exercise * 0.05);

organAge = Math.round(Math.max(age, organAge));

document.getElementById("organAge").innerText =
organAge + " Years";

/* Money Waste */

let money =
(smoke * 20 * 30) +
(alcohol * 220 * 4) +
(junk * 140 * 4) +
(soft * 45 * 4) +
(snacks * 35 * 4);

document.getElementById("money").innerText =
"₹" + money.toLocaleString() + " / month";

/* DNA Risk */

let dna = "Low";
if(score >= 30) dna = "Moderate";
if(score >= 60) dna = "High";
if(score >= 80) dna = "Critical";

document.getElementById("dna").innerText = dna;

/* AI Report */

let report = "Healthy balance maintained.";

if(score >= 25){
report = "Mild chemical burden detected.";
}
if(score >= 50){
report = "Significant oxidative stress predicted.";
}
if(score >= 75){
report = "Severe organ stress likely if habits continue.";
}

document.getElementById("report").innerText = report;

/* Charts */

makeBar(smoke, alcohol, junk, soft, snacks);
makeRadar(score);

}

/* Bar Chart */

function makeBar(smoke, alcohol, junk, soft, snacks){

if(barChart) barChart.destroy();

barChart = new Chart(
document.getElementById("barChart"),
{
type:"bar",
data:{
labels:[
"Nicotine",
"Ethanol",
"Acrylamide",
"Sugar Load",
"Preservatives"
],
datasets:[{
data:[
smoke * 15,
alcohol * 10,
junk * 8,
soft * 8,
snacks * 7
],
borderRadius:8
}]
},
options:{
responsive:true,
plugins:{
legend:{display:false}
},
scales:{
y:{
beginAtZero:true,
max:100
}
}
}
});
}

/* Radar Chart */

function makeRadar(score){

if(radarChart) radarChart.destroy();

radarChart = new Chart(
document.getElementById("radarChart"),
{
type:"radar",
data:{
labels:[
"Lungs",
"Liver",
"Heart",
"Kidney",
"Brain"
],
datasets:[{
data:[
score * 0.95,
score * 0.85,
score * 0.78,
score * 0.65,
score * 0.72
],
fill:true
}]
},
options:{
responsive:true,
plugins:{
legend:{display:false}
},
scales:{
r:{
beginAtZero:true,
max:100
}
}
}
});
}