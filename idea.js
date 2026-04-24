const API_KEY = "AIzaSyDpPVFQ7WA-Ez509wQXs05xqISLVNeETrc";

async function generateIdea(retry = 0) {
    const topic = document.getElementById("textInput").value.trim();
    const ideaOutput = document.getElementById("ideaOutput");

    if (!topic) {
        ideaOutput.innerText = "Please enter a topic or keyword.";
        return;
    }

    ideaOutput.innerText = "Generating ideas... ✨";

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
                                { text: `Generate 5 creative ideas for: ${topic}` }
                            ]
                        }
                    ]
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.error) {
            ideaOutput.innerText = "API Error: " + data.error.message;
            return;
        }

        const result =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

        ideaOutput.innerText = result || "No ideas generated.";

    } catch (error) {
        if (retry < 3) {
            ideaOutput.innerText = "Retrying... 🔄";
            setTimeout(() => generateIdea(retry + 1), 2000);
        } else {
            ideaOutput.innerText = "Error: " + error.message;
        }
    }
}