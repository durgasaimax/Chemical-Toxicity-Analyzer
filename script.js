/* script.js */

let barChart, radarChart, lineChart, pieChart;

function analyze() {

const error = document.getElementById("error");
error.innerText = "";

/* Inputs */
let age = Number(document.getElementById("age").value);
let smoke = Number(document.getElementById("smoke").value) || 0;
let alcohol = Number(document.getElementById("alcohol").value) || 0;
let junk = Number(document.getElementById("junk").value) || 0;
let soft = Number(document.getElementById("soft").value) || 0;
let snacks = Number(document.getElementById("snacks").value) || 0;
let caffeine = Number(document.getElementById("caffeine").value) || 0;
let water = Number(document.getElementById("water").value) || 0;
let exercise = Number(document.getElementById("exercise").value) || 0;

/* Validation */
if (!age || age <= 0) {
error.innerText = "Please enter valid age.";
return;
}

if (
smoke < 0 || alcohol < 0 || junk < 0 ||
soft < 0 || snacks < 0 || caffeine < 0 ||
water < 0 || exercise < 0
) {
error.innerText = "Negative values are not allowed.";
return;
}

/* Toxicity Score */
let score =
(age * 0.35) +
(smoke * 12) +
(alcohol * 7) +
(junk * 5) +
(soft * 4) +
(snacks * 4) +
(caffeine * 3) -
(water * 2) -
(exercise * 0.15);

score = Math.max(0, Math.min(100, Math.round(score)));

/* Risk */
let risk = "Low Risk";
if (score >= 25) risk = "Moderate Risk";
if (score >= 50) risk = "High Risk";
if (score >= 75) risk = "Hazardous";

/* Animate Score */
animateNumber("score", score, 1200);
document.getElementById("risk").innerText = risk;
document.getElementById("fill").style.width = score + "%";

/* pH */
let ph = 7.0 - (soft * 0.08) - (alcohol * 0.04) - (junk * 0.02) + (water * 0.03);
ph = Math.max(4.5, Math.min(8.5, ph)).toFixed(1);

document.getElementById("ph").innerText = ph;

let phText = "Neutral";
if (ph < 6) phText = "Highly Acidic";
else if (ph < 6.8) phText = "Mildly Acidic";
else if (ph > 7.5) phText = "Alkaline";

document.getElementById("phText").innerText = phText;

/* Organ Age */
let organAge = age + smoke * 2 + alcohol * 1.4 + junk + soft + snacks * 0.8 - exercise * 0.05;
organAge = Math.round(Math.max(age, organAge));
document.getElementById("organAge").innerText = organAge + " Years";

/* DNA */
let dna = "Low";
if (score >= 35) dna = "Moderate";
if (score >= 60) dna = "High";
if (score >= 80) dna = "Critical";
document.getElementById("dna").innerText = dna;

/* Money Waste */
let money =
(smoke * 20 * 30) +
(alcohol * 220 * 4) +
(junk * 150 * 4) +
(soft * 45 * 4) +
(snacks * 35 * 4) +
(caffeine * 120 * 4);

document.getElementById("money").innerText =
"₹" + money.toLocaleString() + "/month";

/* AI Report */
let report = "Healthy balance maintained.";
if (score >= 25) report = "Mild chemical burden detected.";
if (score >= 50) report = "Significant oxidative stress predicted.";
if (score >= 75) report = "Severe organ stress likely if habits continue.";
document.getElementById("report").innerText = report;

/* Suggestions */
renderTips(score, smoke, alcohol, soft, junk, water, exercise);

/* Charts */
makeBar(smoke, alcohol, junk, soft, snacks, caffeine);
makeRadar(score);
makeLine(score);
makePie(alcohol, soft, snacks);

}

/* Animate Numbers */
function animateNumber(id, target, duration) {
let obj = document.getElementById(id);
let start = 0;
let increment = target / (duration / 16);

let counter = setInterval(() => {
start += increment;
if (start >= target) {
start = target;
clearInterval(counter);
}
obj.innerText = Math.round(start);
}, 16);
}

/* Tips */
function renderTips(score, smoke, alcohol, soft, junk, water, exercise) {

let tips = [];

if (smoke > 0) tips.push("Reduce smoking to lower nicotine and tar exposure.");
if (alcohol > 3) tips.push("Limit alcohol intake to reduce liver stress.");
if (soft > 3) tips.push("Replace sugary drinks with water.");
if (junk > 3) tips.push("Reduce fried foods to cut acrylamide intake.");
if (water < 2) tips.push("Increase water intake for detox support.");
if (exercise < 20) tips.push("Exercise 20+ mins daily for metabolic recovery.");
if (score < 25) tips.push("Maintain current healthy routine.");

document.getElementById("tips").innerHTML =
tips.map(t => `<li>${t}</li>`).join("");

}

/* BAR CHART */
function makeBar(smoke, alcohol, junk, soft, snacks, caffeine) {

if (barChart) barChart.destroy();

barChart = new Chart(document.getElementById("barChart"), {
type: "bar",
data: {
labels: ["Nicotine", "Ethanol", "Acrylamide", "Sugar", "Preservatives", "Caffeine"],
datasets: [{
data: [
smoke * 15,
alcohol * 10,
junk * 8,
soft * 8,
snacks * 7,
caffeine * 8
],
backgroundColor: [
"#ef233c",
"#ffd166",
"#f4a261",
"#00b4d8",
"#7b2d8b",
"#0077b6"
],
borderRadius: 8
}]
},
options: {
plugins:{legend:{display:false}},
responsive:true,
scales:{y:{beginAtZero:true,max:100}}
}
});

}

/* RADAR */
function makeRadar(score) {

if (radarChart) radarChart.destroy();

radarChart = new Chart(document.getElementById("radarChart"), {
type: "radar",
data: {
labels: ["Lungs","Liver","Heart","Kidney","Brain"],
datasets: [{
data: [
score * 0.95,
score * 0.85,
score * 0.75,
score * 0.62,
score * 0.70
],
fill:true,
backgroundColor:"rgba(0,180,216,.25)",
borderColor:"#0077b6",
pointBackgroundColor:"#0077b6"
}]
},
options:{
plugins:{legend:{display:false}},
responsive:true,
scales:{r:{beginAtZero:true,max:100}}
}
});

}

/* LINE */
function makeLine(score) {

if (lineChart) lineChart.destroy();

lineChart = new Chart(document.getElementById("lineChart"), {
type:"line",
data:{
labels:["Now","1Y","2Y","3Y","4Y","5Y"],
datasets:[{
data:[
score,
score+5,
score+10,
score+14,
score+18,
score+22
],
borderColor:"#0077b6",
backgroundColor:"rgba(0,180,216,.15)",
fill:true,
tension:.4
}]
},
options:{
plugins:{legend:{display:false}},
responsive:true,
scales:{y:{beginAtZero:true,max:100}}
}
});

}

/* PIE */
function makePie(alcohol, soft, snacks) {

if (pieChart) pieChart.destroy();

pieChart = new Chart(document.getElementById("pieChart"), {
type:"doughnut",
data:{
labels:["Ethanol","Sugar Additives","Preservatives"],
datasets:[{
data:[
alcohol * 4,
soft * 5,
snacks * 4
],
backgroundColor:[
"#ffd166",
"#00b4d8",
"#ef233c"
]
}]
},
options:{
responsive:true
}
});

}