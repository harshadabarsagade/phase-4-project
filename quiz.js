const API_KEY = "AIzaSyCXVigVBuIJGN-D1NSqsb5KNl-UZmcjsTw";

let questions = [];
let index = 0;
let score = 0;
let selected = "";

async function startQuiz() {
  const topic = document.getElementById("topic").value.trim();

  if (!topic) {
    alert("Enter topic");
    return;
  }

  document.getElementById("question").innerText = "Loading...";

  const prompt = `
Generate 10 simple quiz questions about ${topic}.
Return ONLY JSON:
[
 {"q":"...","options":["A","B","C","D"],"answer":"..."}
]
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();

    // ❗ Check if API failed
    if (!data.candidates) {
      throw new Error("API failed: " + JSON.stringify(data));
    }

    let text = data.candidates[0].content.parts[0].text;

    // Clean JSON
    text = text.replace(/```json|```/g, "").trim();

    questions = JSON.parse(text);

    index = 0;
    score = 0;

    loadQuestion();

  } catch (err) {
    console.error(err);

    document.getElementById("question").innerText =
      "API Error (Check key / quota / model)";
  }
}

function loadQuestion() {
  let q = questions[index];
  document.getElementById("question").innerText = q.q;

  let html = "";
  q.options.forEach(opt => {
    html += `<div class="option" onclick="selectOption('${opt}')">${opt}</div>`;
  });

  document.getElementById("options").innerHTML = html;
}

function selectOption(opt) {
  selected = opt;
}

function nextQuestion() {
  if (!questions.length) return;

  if (selected === questions[index].answer) {
    score++;
  }

  index++;
  selected = "";

  if (index < questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-container").innerHTML =
      `<h2>Your Score: ${score}/10</h2>`;
  }
}