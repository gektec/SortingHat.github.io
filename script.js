const apiKey = "YOUR_OPENAI_API_KEY";  // 硬编码的API密钥

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
        const response = await fetch("https://api.openai-hk.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        log.innerHTML += `<div><strong>OpenAI:</strong> ${reply}</div>`;
        log.scrollTop = log.scrollHeight;
    } catch (error) {
        log.innerHTML += `<div><strong>OpenAI:</strong> Error: ${error.message}</div>`;
        log.scrollTop = log.scrollHeight;
    }
}
