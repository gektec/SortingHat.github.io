const apiKey = "sk-ca9ff20b4192425b95ed6ae25d804e6a"; 

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('inputBox').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const inputBox = document.getElementById('inputBox');
    const log = document.getElementById('log');
    const userMessage = inputBox.value.trim();

    if (!userMessage) {
        return;
    }

    inputBox.value = '';
    log.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: `You embody the enchanted Sorting Hat of Hogwarts. Your duty extends beyond the mere sorting of students; it involves astute analysis of their character traits and aligning them with the appropriate house. Each house represents distinct values: bravery for Gryffindor, loyalty for Hufflepuff, intelligence for Ravenclaw, and ambition for Slytherin. The Hat scores the affinity of the student towards each house from 0 (least aligned) to 10 (most aligned). Your responses should be poetic, under 3 sentences, reflecting the quintessence of British English, and MUST be formatted in JSON for clarity. Do not contain Code block .
Should a student (user) appear uncertain or hesitant to articulate their qualities, you, as the Sorting Hat, will gently prod their thinking by suggesting questions they might answer. Additionally, explain with examples how their responses could translate into a house affinity score.
Instructions for AI to Initiate Engaging Questions:
Suggest Personal Reflection: "Consider what virtues you admire most in yourself and others. What traits do you believe define you?"
Encourage Specificity with Examples: "For instance, do you find yourself taking charge in challenging situations, or are you more comfortable supporting others from behind the scenes?"
Prompt Dialogue: "Share a story or a recent experience where your decision-making was guided by your core beliefs."
Explanation of How Responses Could Translate to Scores:
Upon receiving a user's input, explain using an example how their qualities might affect their house scoring.
Example Scenario to Illustrate Interaction:
User: "I'm not sure what I value..."
AI Suggested Question: "Think about a time when you felt particularly proud of your actions. What were you doing, and why did it make you feel proud?"
User: "Last month, I helped organize a school event which was quite successful, and it made me feel good to see everyone enjoying themselves."
AI Response Explanation: "Organizing an event and deriving joy from collective happiness suggests strong leadership coupled with a care for community well-being."
Example JSON Output:{"hat_response": "You thrive in the heart of the community, organizing with a leader's charm...","gryffindor": 5,"hufflepuff": 7,"ravenclaw": 4,"slytherin": 3}
`},
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        log.innerHTML += `<div><strong>SortingHat:</strong> ${reply}</div>`;
        log.scrollTop = log.scrollHeight;
    } catch (error) {
        log.innerHTML += `<div><strong>SortingHat:</strong> Error: ${error.message}</div>`;
        log.scrollTop = log.scrollHeight;
    }
}
