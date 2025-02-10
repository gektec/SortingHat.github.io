const log = document.getElementById('log');
const inputBox = document.getElementById('inputBox');

function appendToLog(message, isUser) {
    const prefix = isUser ? 'You: ' : 'Sorting Hat: ';
    const messageElement = document.createElement("div");
    messageElement.textContent = prefix + message;
    log.appendChild(messageElement);
}

function sendInput() {
    const userInput = inputBox.value.trim();
    if (userInput) {
        appendToLog(userInput, true);
        fetch('API_ENDPOINT', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ user_input: userInput })
        })
        .then(response => response.json())
        .then(data => {
            appendToLog(data.hat_response, false);
        })
        .catch(error => console.error('Error:', error));
        inputBox.value = '';
    }
}
