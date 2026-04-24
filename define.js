// Your Google Gemini 2.5 Flash API key
const API_KEY = "AIzaSyATBquFs30NY4kdEZOtvIjjf8vcnTfM0VM";

async function findDefinition() {
    const text = document.getElementById("textInput").value.trim();
    const definitionOutput = document.getElementById("definitionOutput");

    if (!text) {
        definitionOutput.innerText = "Please enter a word or phrase.";
        return;
    }

    definitionOutput.innerText = "Finding definition... ⏳";

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
                            parts: [
                                { text: `Provide a clear and concise definition for the following word or phrase:\n\n"${text}"` }
                            ]
                        }
                    ]
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.candidates && data.candidates.length > 0) {
            const result = data.candidates[0].content.parts[0].text;
            definitionOutput.innerText = result;
        } else {
            definitionOutput.innerText = "Error: Could not find definition.";
        }

    } catch (error) {
        definitionOutput.innerText = "Error: " + error.message;
    }
}