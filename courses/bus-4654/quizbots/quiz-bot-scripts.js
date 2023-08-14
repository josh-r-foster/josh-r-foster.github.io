function getQuestion() {
    const topic = document.getElementById('topic').textContent;
    const chatWindow = document.getElementById('chat-window');

    document.getElementById("get-question-button").style.display = 'none';

    // Send message to your server
    fetch('https://ivey-courses-c53714e21473.herokuapp.com/api/serve-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, topic })
    })
    .then(response => response.json())
    .then(data => {
        // Append server's response to the chat window
        const content = data.choices[0].message.content;
        chatWindow.innerHTML += `<div class="bubble ai">${content}</div>`;
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

function evaluateAnswer() {
    const topic = document.getElementById('topic').textContent;
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    const chatWindow = document.getElementById('chat-window');

    // Append user's message to the chat window
    chatWindow.innerHTML += `<div class="bubble user">${message}</div>`;

    // Clear the input field
    messageInput.value = '';

    const bubbles = chatWindow.getElementsByClassName('bubble');
    const chatHistory = [];

    for (const bubble of bubbles) {
        const role = bubble.classList.contains('ai') ? 'assistant' : 'user';
        const content = bubble.textContent;
        chatHistory.push({ role, content });
    }

    const totalCharacters = chatHistory.reduce((count, message) => {
      return count + message.content.length;
    }, 0);

    const characterThreshold = 2500; 

    while (totalCharacters > characterThreshold) {
      // Remove the first element
      chatHistory.shift();
      
      // Recalculate the total characters
      totalCharacters = chatHistory.reduce((count, message) => {
        return count + message.content.length;
      }, 0);
    }

    // Send message to your server
    fetch('https://ivey-courses-c53714e21473.herokuapp.com/api/evaluate-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatHistory, topic })
    })
    .then(response => response.json())
    .then(data => {
        // Append server's response to the chat window
        const content = data.choices[0].message.content;
        chatWindow.innerHTML += `<div class="bubble ai">${content}</div>`;
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

// Bind the Enter key to send the message
document.getElementById('message').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        evaluateAnswer();
    }
});