function getAffirmation(){

document.getElementById("affirmation").innerText = "Loading...";

fetch("https://api.adviceslip.com/advice")

.then(response => response.json())

.then(data => {
document.getElementById("affirmation").innerText = data.slip.advice;
})

.catch(error => {
document.getElementById("affirmation").innerText = "Something went wrong.";
});

}