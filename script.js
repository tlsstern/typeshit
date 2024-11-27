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

        this.currentWord = '';
        this.wordIndex = 0;
        this.charIndex = 0;
        this.displayedWords = [];
        this.wordsToShow = 3; // Number of words to show at once
        this.initializeWords();

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

    initializeWords() {
        this.displayedWords = [];
        for (let i = 0; i < this.wordsToShow; i++) {
            this.displayedWords.push(this.getRandomWord());
        }
        this.currentWord = this.displayedWords[0];
        this.renderText();
    }

    getRandomWord() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    renderText() {
        const text = this.displayedWords.join(' ');
        this.textDisplay.innerHTML = text
            .split('')
            .map(char => `<span class="char">${char}</span>`)
            .join('');
        
        const firstChar = this.textDisplay.querySelector('.char');
        if (firstChar) firstChar.classList.add('active');
    }

    handleBackspace() {
        if (this.charIndex > 0) {
            this.charIndex--;
            const charElements = this.textDisplay.querySelectorAll('.char');
            
            charElements[this.charIndex].classList.remove('correct', 'incorrect');
            charElements[this.charIndex].classList.add('active');
            
            if (charElements[this.charIndex + 1]) {
                charElements[this.charIndex + 1].classList.remove('active');
            }

            this.totalChars--;
            if (charElements[this.charIndex].classList.contains('correct')) {
                this.correctChars--;
            }
            
            this.updateStats();
        }
    }

    checkCharacter(key) {
        if (!this.isTestActive) return;
        
        const currentChar = this.displayedWords.join(' ')[this.charIndex];
        const charElements = this.textDisplay.querySelectorAll('.char');
        
        charElements[this.charIndex].classList.remove('active');
        
        if (key === currentChar) {
            charElements[this.charIndex].classList.add('correct');
            this.correctChars++;
            
            // Check if word is completed
            if (currentChar === ' ' || this.charIndex === this.displayedWords.join(' ').length - 1) {
                this.wordIndex++;
                // Add new word and remove first word
                this.displayedWords.shift();
                this.displayedWords.push(this.getRandomWord());
                this.renderText();
                this.charIndex = 0;
            } else {
                this.charIndex++;
                if (charElements[this.charIndex]) {
                    charElements[this.charIndex].classList.add('active');
                }
            }
        } else {
            charElements[this.charIndex].classList.add('incorrect');
            this.charIndex++;
            if (charElements[this.charIndex]) {
                charElements[this.charIndex].classList.add('active');
            }
        }

        this.totalChars++;
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