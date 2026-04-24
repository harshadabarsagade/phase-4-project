// Create input field dynamically
const input = document.createElement("input");
input.type = "text";
input.id = "correctAnswer";
input.placeholder = "Enter correct answer";

// Add it to page
document.body.appendChild(input);



const API_KEY = "AIzaSyC30cFxYwZFnriOS32BVOzRWsOB4pZnpkY";

async function askQuestion() {
    const question = document.getElementById("question").value;
    const answerBox = document.getElementById("answer");

    answerBox.innerText = "Thinking...";

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: question }]
                        }
                    ]
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        // if (data.candidates) {
//             const result = data.candidates[0].content.parts[0].text;
//             answerBox.innerText = result;
//         } else {
//             answerBox.innerText = "Error: " + JSON.stringify(data);
//         }

//     } catch (error) {
//         answerBox.innerText = "Error: " + error.message;
//     }
// }


if (data.candidates) {
            const result = data.candidates[0].content.parts[0].text;
            answerBox.innerText = result;

            // ✅ color logic
            if (result.toLowerCase().includes(correctAnswer)) {
                answerBox.style.backgroundColor = "green";
                answerBox.style.color = "white";
            } else {
                answerBox.style.backgroundColor = "red";
                answerBox.style.color = "white";
            }

        } else {
            answerBox.innerText = "Error: " + JSON.stringify(data);
            answerBox.style.backgroundColor = "red";
            answerBox.style.color = "white";
        }

    } catch (error) {
        answerBox.innerText = "Error: " + error.message;
        answerBox.style.backgroundColor = "red";
        answerBox.style.color = "white";
    }
}

