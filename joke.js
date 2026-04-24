// const PIN = "1234";
// let currentJoke = "";

// // Unlock page with PIN
// function unlock() {
//   const pin = document.getElementById("pin").value;

//   if (pin === PIN) {
//     document.getElementById("pinPage").classList.remove("active");
//     document.getElementById("jokePage").classList.add("active");
//   } else {
//     document.getElementById("error").textContent = "Wrong PIN ✋";
//   }
// }


// // Generate joke using API
// async function generate() {
//   try {

//     const response = await fetch(
//       "https://official-joke-api.appspot.com/random_joke"
//     );

//     const data = await response.json();

//     currentJoke = data.setup + " " + data.punchline;

//     typeEffect(currentJoke);

//     laugh();

//     emojiRain();

//   } catch (error) {
//     document.getElementById("jokeBox").textContent = "Failed to load joke 😢";
//   }
// }


// // Typewriter effect
// function typeEffect(text) {
//   const box = document.getElementById("jokeBox");

//   box.textContent = "";

//   let i = 0;

//   const t = setInterval(() => {
//     box.textContent += text[i];
//     i++;

//     if (i === text.length) {
//       clearInterval(t);
//     }
//   }, 40);
// }


// // Copy joke
// function copyJoke() {
//   if (!currentJoke) return;

//   navigator.clipboard.writeText(currentJoke);

//   alert("Copied ✨");
// }


// // Speak joke
// function speakJoke() {
//   if (!currentJoke) return;

//   const speech = new SpeechSynthesisUtterance(currentJoke);

//   speechSynthesis.speak(speech);
// }


// // Clear joke
// function clearJoke() {
//   document.getElementById("jokeBox").textContent = "";
// }


// // Toggle dark mode
// function toggleDark() {
//   document.body.classList.toggle("dark");
// }


// // Laugh sound
// function laugh() {
//   const sound = new Audio(
//     "https://www.myinstants.com/media/sounds/cartoon-laugh.mp3"
//   );

//   sound.play();
// }


// // Emoji rain animation
// function emojiRain() {
//   const emojis = ["✨", "😂", "💖", "🌈", "😂"];

//   for (let i = 0; i < 12; i++) {
//     const e = document.createElement("span");

//     e.textContent = emojis[Math.floor(Math.random() * emojis.length)];

//     e.style.position = "fixed";
//     e.style.left = Math.random() * 100 + "vw";
//     e.style.top = "-20px";
//     e.style.fontSize = "22px";

//     document.body.appendChild(e);

//     let y = -20;

//     const fall = setInterval(() => {
//       y += 4;
//       e.style.top = y + "px";

//       if (y > window.innerHeight) {
//         clearInterval(fall);
//         e.remove();
//       }
//     }, 30);
//   }
// }
//============================================================

const PIN = "1234";
let currentJoke = "";

// Unlock page with PIN
function unlock() {
  const pin = document.getElementById("pin").value;

  if (pin === PIN) {
    document.getElementById("error").textContent = "";

    // 🔥 FIX ONLY HERE (safe page switch)
    switchPage("jokePage");
  } else {
    document.getElementById("error").textContent = "Wrong PIN ✋";
  }
}


// Generate joke using API
async function generate() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    const data = await response.json();

    currentJoke = data.setup + " " + data.punchline;

    typeEffect(currentJoke);

    laugh();

    emojiRain();

  } catch (error) {
    document.getElementById("jokeBox").textContent = "Failed to load joke 😢";
  }
}


// Typewriter effect
function typeEffect(text) {
  const box = document.getElementById("jokeBox");

  box.textContent = "";

  let i = 0;

  const t = setInterval(() => {
    box.textContent += text[i];
    i++;

    if (i === text.length) {
      clearInterval(t);
    }
  }, 40);
}


// Copy joke
function copyJoke() {
  if (!currentJoke) return;

  navigator.clipboard.writeText(currentJoke);

  alert("Copied ✨");
}


// Speak joke
function speakJoke() {
  if (!currentJoke) return;

  const speech = new SpeechSynthesisUtterance(currentJoke);

  speechSynthesis.speak(speech);
}


// Clear joke
function clearJoke() {
  document.getElementById("jokeBox").textContent = "";
}


// Toggle dark mode
function toggleDark() {
  document.body.classList.toggle("dark");
}


// Laugh sound
function laugh() {
  const sound = new Audio(
    "https://www.myinstants.com/media/sounds/cartoon-laugh.mp3"
  );

  sound.play();
}


// Emoji rain animation
function emojiRain() {
  const emojis = ["✨", "😂", "💖", "🌈", "😂"];

  for (let i = 0; i < 12; i++) {
    const e = document.createElement("span");

    e.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    e.style.position = "fixed";
    e.style.left = Math.random() * 100 + "vw";
    e.style.top = "-20px";
    e.style.fontSize = "22px";

    document.body.appendChild(e);

    let y = -20;

    const fall = setInterval(() => {
      y += 4;
      e.style.top = y + "px";

      if (y > window.innerHeight) {
        clearInterval(fall);
        e.remove();
      }
    }, 30);
  }
}


/* ✅ ONLY NEW ADDITION (DO NOT CHANGE OLD CODE) */

// Page switch controller
function switchPage(pageId) {
  const pages = document.querySelectorAll(".card");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}