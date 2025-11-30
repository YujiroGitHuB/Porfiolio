 const responses = {
            'projects': `I have worked on various exciting projects! Check out my portfolio:<br><br>
                🚀 <a href="https://cncc.vercel.app/#projects" target="_blank">View All My Projects</a><br><br>
                You can see all my work`,
            'skills': `My main skills include:<br><br>
                <strong>Frontend:</strong> Vue.js, React, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS<br><br>
                <strong>Backend:</strong> PHP, MySQL, Laravel, Docker, REST API, AWS<br><br>
                I'm always learning new technologies to stay current!`,
            'contact': `You can reach me through these platforms:<br><br>
                📧 <a href="mailto:charlesnixoncayading@gmail.com">charlesnixoncayading@gmail.com</a><br><br>
                💬 <a href="https://m.me/charlesnixon.cayading" target="_blank">Messenger</a><br><br>
                📱 <a href="https://www.facebook.com/charlesnixon.cayading" target="_blank">Facebook</a><br><br>
                I'm always open to new opportunities!`,
            'experience': 'I have 01+ years of experience in web development, working on both frontend and backend technologies. I\'ve collaborated with diverse teams on exciting projects as a Web Developer and IT Instructor.',
            'education': 'I hold a degree in Computer Science and continuously expand my knowledge through online courses and hands-on projects.',
            'default': 'That\'s a great question! Feel free to ask me about my projects, skills, experience, or how to contact me.'
        };

        // Toggle chatbot
        const chatToggleBtn = document.getElementById('chatToggleBtn');
        const chatWidget = document.getElementById('chatWidget');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const notificationBadge = document.querySelector('.notification-badge');

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
        }

        function getBotResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            if (message.includes('project')) return responses.projects;
            if (message.includes('skill')) return responses.skills;
            if (message.includes('contact') || message.includes('email')) return responses.contact;
            if (message.includes('experience') || message.includes('work')) return responses.experience;
            if (message.includes('education') || message.includes('study')) return responses.education;
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) return 'Hello! How can I help you today?';
            if (message.includes('thank')) return 'You\'re welcome! Feel free to ask anything else.';
            
            return responses.default;
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message === '') return;
            
            addMessage(message, true);
            input.value = '';
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, false);
            }, 500 + Math.random() * 500);
        }

        function sendQuickReply(message) {
            addMessage(message, true);
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, false);
            }, 500 + Math.random() * 500);
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }