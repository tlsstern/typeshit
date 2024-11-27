class TypingTest {
    constructor() {
        this.words = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
            "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
            "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
            "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
            "so", "up", "out", "if", "about", "who", "get", "which", "go", "me"
        ];
        
        this.textDisplay = document.getElementById('text-display');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timeDisplay = document.getElementById('time');
        this.restartBtn = document.getElementById('restart');
        this.timeSelect = document.getElementById('timeSelect');

        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.mistakes = new Set();
        this.startTime = null;
        this.timeLimit = parseInt(this.timeSelect.value);
        this.isTestActive = false;
        this.timer = null;

        this.initializeEventListeners();
        this.generateNewText();
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.restartTest();
                return;
            }

            if (e.key === 'Backspace') {
                e.preventDefault();
                if (this.isTestActive && this.currentIndex > 0) {
                    this.handleBackspace();
                }
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isTestActive) {
                    this.checkCharacter(' ');
                }
            }

            if (!this.isTestActive && e.key.length === 1) {
                this.startTest();
            }
        });

        document.addEventListener('keypress', (e) => {
            if (!this.isTestActive) return;
            
            if (e.key.length === 1 && e.key !== ' ') {
                this.checkCharacter(e.key);
            }
        });

        this.restartBtn.addEventListener('click', () => this.restartTest());
        this.timeSelect.addEventListener('change', (e) => {
            this.timeLimit = parseInt(e.target.value);
            this.restartTest();
        });
    }

    generateNewText() {
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += this.words[Math.floor(Math.random() * this.words.length)] + ' ';
        }
        this.currentText = text.trim();
        this.renderText();
    }

    renderText() {
        this.textDisplay.innerHTML = this.currentText
            .split('')
            .map(char => `<span class="char">${char === ' ' ? ' ' : char}</span>`)
            .join('');
        
        const firstChar = this.textDisplay.querySelector('.char');
        if (firstChar) firstChar.classList.add('active');
    }

    handleBackspace() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const charElements = this.textDisplay.querySelectorAll('.char');
            
            charElements[this.currentIndex].classList.remove('correct', 'incorrect');
            charElements[this.currentIndex].classList.add('active');
            
            if (charElements[this.currentIndex + 1]) {
                charElements[this.currentIndex + 1].classList.remove('active');
            }

            if (this.mistakes.has(this.currentIndex)) {
                this.mistakes.delete(this.currentIndex);
            } else {
                this.correctChars--;
            }
            this.totalChars--;
            
            this.updateStats();
        }
    }

    checkCharacter(key) {
        if (!this.isTestActive) return;
        
        const currentChar = this.currentText[this.currentIndex];
        const charElements = this.textDisplay.querySelectorAll('.char');
        
        charElements[this.currentIndex].classList.remove('active');
        
        if (key === currentChar) {
            charElements[this.currentIndex].classList.add('correct');
            this.correctChars++;
        } else {
            charElements[this.currentIndex].classList.add('incorrect');
            this.mistakes.add(this.currentIndex);
        }

        this.currentIndex++;
        this.totalChars++;

        if (this.currentIndex < this.currentText.length) {
            charElements[this.currentIndex].classList.add('active');
        }

        this.updateStats();
    }

    startTest() {
        this.isTestActive = true;
        this.startTime = new Date();
        this.timer = setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const timeElapsed = Math.floor((new Date() - this.startTime) / 1000);
        const timeLeft = this.timeLimit - timeElapsed;
        
        if (timeLeft <= 0) {
            this.endTest();
        } else {
            this.timeDisplay.textContent = timeLeft + 's';
        }
    }

    updateStats() {
        if (!this.startTime) return;
        
        const timeElapsed = (new Date() - this.startTime) / 1000 / 60; // in minutes
        const wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        const accuracy = this.totalChars > 0 
            ? Math.round((this.correctChars / this.totalChars) * 100) 
            : 0;

        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy + '%';
    }

    endTest() {
        clearInterval(this.timer);
        this.isTestActive = false;
        alert(`Test complete!\nWPM: ${this.wpmDisplay.textContent}\nAccuracy: ${this.accuracyDisplay.textContent}`);
        this.restartTest();
    }

    restartTest() {
        clearInterval(this.timer);
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.mistakes = new Set();
        this.startTime = null;
        this.isTestActive = false;
        this.timeDisplay.textContent = this.timeLimit + 's';
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '0%';
        this.generateNewText();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
}); 