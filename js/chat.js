const portfolioContext = `
        About Charles Nixon Cayading:
        - Web Developer and IT Instructor with 1+ years of experience
        - Skills: Frontend (Vue.js, React, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS)
        - Backend: PHP, MySQL, Laravel, Docker, REST API, AWS
        - Projects: IPT Link Submission, BCC SAS QR Code Generator, BCC Student Attendance System
        - Education: Information Technology degree
        - Location: Basista Pangasinan, Philippines
        - Contact: charlesnixoncayading@gmail.com
        - Portfolio: https://cncc.vercel.app
        - Facebook: https://www.facebook.com/charlesnixon.cayading
        - Messenger: https://m.me/charlesnixon.cayading
        `;

const quickResponses = {
    'projects': `I have worked on various exciting projects! Check out my portfolio:<br><br>
                🚀 <a href="https://cncc.vercel.app/#projects" target="_blank">View All My Projects</a><br><br>
                Including IPT Link Submission, BCC SAS QR Code Generator, and Student Attendance System!`,
    'skills': `My main skills include:<br><br>
                <strong>Frontend:</strong> Vue.js, React, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS<br><br>
                <strong>Backend:</strong> PHP, MySQL, Laravel, Docker, REST API, AWS<br><br>
                I'm always learning new technologies to stay current!`,
    'contact': `You can reach me through these platforms:<br><br>
                📧 <a href="mailto:charlesnixoncayading@gmail.com">charlesnixoncayading@gmail.com</a><br><br>
                💬 <a href="https://m.me/charlesnixon.cayading" target="_blank">Messenger</a><br><br>
                📱 <a href="https://www.facebook.com/charlesnixon.cayading" target="_blank">Facebook</a><br><br>
                I'm always open to new opportunities!`,
};

const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChatBtn = document.getElementById('closeChatBtn');
const notificationBadge = document.querySelector('.notification-badge');
const sendBtn = document.getElementById('sendBtn');

chatToggleBtn.addEventListener('click', () => {
    chatWidget.classList.add('active');
    if (notificationBadge) {
        notificationBadge.style.display = 'none';
    }
});

closeChatBtn.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

function addMessage(text, isUser) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    messageDiv.innerHTML = `
                <div class="avatar">${isUser ? '👤' : '🤖'}</div>
                <div class="message-content">${text}</div>
            `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return messageDiv;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';

    typingDiv.innerHTML = `
                <div class="avatar">🤖</div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for quick responses first
    if (message.includes('project')) return quickResponses.projects;
    if (message.includes('skill')) return quickResponses.skills;
    if (message.includes('contact') || message.includes('email')) return quickResponses.contact;

    // Use free Hugging Face API
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: `Context: ${portfolioContext}\n\nUser question: ${userMessage}\n\nProvide a helpful, friendly response about Charles Nixon Cayading's portfolio:`,
                parameters: {
                    max_length: 150,
                    temperature: 0.7
                }
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0].generated_text) {
                return data[0].generated_text;
            }
        }
    } catch (error) {
        console.log('AI fallback active');
    }

    // Smart fallback responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! I\'m here to help you learn about Charles Nixon\'s portfolio. Feel free to ask about his projects, skills, or experience!';
    }
    if (message.includes('experience') || message.includes('work')) {
        return 'Charles has 1+ years of experience in web development, working as both a Web Developer and IT Instructor. He specializes in creating modern, responsive web applications using technologies like Vue.js, React, and Laravel.';
    }
    if (message.includes('education') || message.includes('study')) {
        return 'Charles holds a degree in Information Technology and continuously expands his knowledge through online courses and hands-on projects.';
    }
    if (message.includes('location') || message.includes('where')) {
        return 'Charles is based in Basista Pangasinan, Philippines.';
    }
    if (message.includes('thank')) {
        return 'You\'re welcome! Feel free to ask anything else about the portfolio. 😊';
    }

    return 'That\'s a great question! I can help you with information about Charles\' projects, skills, experience, or contact details. What would you like to know?';
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message === '') return;

    // Disable input while processing
    input.disabled = true;
    sendBtn.disabled = true;

    addMessage(message, true);
    input.value = '';

    showTypingIndicator();

    try {
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addMessage(response, false);
    } catch (error) {
        removeTypingIndicator();
        addMessage('I\'m here to help! Ask me about projects, skills, or how to contact Charles.', false);
    } finally {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }
}

async function sendQuickReply(message) {
    addMessage(message, true);
    showTypingIndicator();

    try {
        const response = await getAIResponse(message);
        removeTypingIndicator();
        addMessage(response, false);
    } catch (error) {
        removeTypingIndicator();
        addMessage('Let me help you with that!', false);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !sendBtn.disabled) {
        sendMessage();
    }
}