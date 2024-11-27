class TypingTest {
    constructor() {
        this.words = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
            "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
            // Add more words as needed
        ];
        this.currentText = '';
        this.currentIndex = 0;
        this.startTime = null;
        this.timeLimit = 30;
        this.timer = null;
        this.wpm = 0;
        this.accuracy = 0;
        this.isTestActive = false;
        this.correctChars = 0;
        this.totalChars = 0;

        // DOM elements
        this.textDisplay = document.getElementById('text-display');
        this.restartBtn = document.getElementById('restart');
        this.timeSelect = document.getElementById('timeSelect');
        this.themeSelect = document.getElementById('themeSelect');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timeDisplay = document.getElementById('time');

        // Default settings
        this.defaultTheme = 'cyber';
        this.defaultTime = 30;

        // Initialize settings
        this.initializeSettings();
        
        // Start periodic checks
        this.startSettingsCheck();

        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.isModalOpen = false;
        this.initializeEventListeners();
        this.generateNewText();
        this.textDisplay.focus();
    }

    initializeEventListeners() {
        this.restartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.restartTest(true);
        });
        
        this.timeSelect.addEventListener('change', (e) => {
            this.timeLimit = parseInt(e.target.value);
            localStorage.setItem('time', this.timeLimit);
            this.restartTest(true);
        });
        
        this.themeSelect.addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });
    }

    handleKeyDown(e) {
        // Only prevent typing if modal is open
        if (this.isModalOpen) {
            // Only allow Tab key for accessibility
            if (e.key === 'Tab') {
                return;
            }
            e.preventDefault();
            return;
        }

        // Handle restart shortcut
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                this.restartTest();
                return;
            }
        }

        // Rest of the typing logic
        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
            if (e.key === 'Backspace') {
                this.handleBackspace();
                return;
            }

            if (e.key.length === 1) {
                if (!this.isTestActive) {
                    this.startTest();
                }
                this.processCharacter(e.key);
            }
        }
    }

    handleBackspace() {
        if (this.currentIndex > 0) {
            // Remove classes from current character
            const chars = this.textDisplay.children;
            if (chars[this.currentIndex]) {
                chars[this.currentIndex].classList.remove('active');
            }

            // Move back one character
            this.currentIndex--;

            // Remove classes from previous character
            if (chars[this.currentIndex]) {
                chars[this.currentIndex].classList.remove('correct', 'incorrect');
                chars[this.currentIndex].classList.add('active');
            }

            // Update statistics
            if (chars[this.currentIndex].classList.contains('incorrect')) {
                this.totalChars--;
            } else if (chars[this.currentIndex].classList.contains('correct')) {
                this.totalChars--;
                this.correctChars--;
            }

            this.updateStats();
        }
    }

    processCharacter(char) {
        if (this.currentIndex >= this.currentText.length) return;

        const currentChar = this.currentText[this.currentIndex];
        const isCorrect = char === currentChar;
        
        // Update character display
        const chars = this.textDisplay.children;
        if (chars[this.currentIndex]) {
            chars[this.currentIndex].classList.remove('active');
            chars[this.currentIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        }

        // Update statistics
        this.totalChars++;
        if (isCorrect) this.correctChars++;

        // Move to next character
        this.currentIndex++;
        if (chars[this.currentIndex]) {
            chars[this.currentIndex].classList.add('active');
        }

        this.updateStats();
    }

    generateNewText() {
        let wordCount = 50;
        let randomWords = [];
        for (let i = 0; i < wordCount; i++) {
            let randomIndex = Math.floor(Math.random() * this.words.length);
            randomWords.push(this.words[randomIndex]);
        }
        this.currentText = randomWords.join(' ');
        this.textDisplay.innerHTML = this.currentText.split('').map(char => 
            `<span class="char">${char}</span>`
        ).join('');

        // Set active class on first character
        if (this.textDisplay.firstChild) {
            this.textDisplay.firstChild.classList.add('active');
        }
    }

    startTest() {
        this.isTestActive = true;
        this.startTime = new Date();
        this.timeDisplay.textContent = `${this.timeLimit}s`;
        this.timer = setInterval(() => this.updateTime(), 1000);
    }

    updateStats() {
        if (!this.startTime) return;

        let timeElapsed = (new Date() - this.startTime) / 60000; // in minutes
        
        // Calculate WPM based on correct characters
        let grossWPM = (this.correctChars / 5) / timeElapsed;
        this.wpm = Math.max(0, Math.round(grossWPM));
        
        // Calculate accuracy
        this.accuracy = Math.round((this.correctChars / this.totalChars) * 100) || 0;

        // Update display
        this.wpmDisplay.textContent = this.wpm;
        this.accuracyDisplay.textContent = `${this.accuracy}%`;
    }

    updateTime() {
        let timeElapsed = Math.floor((new Date() - this.startTime) / 1000);
        let timeLeft = this.timeLimit - timeElapsed;
        
        if (timeLeft <= 0) {
            this.timeDisplay.textContent = '0s';
            this.endTest();
        } else {
            this.timeDisplay.textContent = `${timeLeft}s`;
        }
    }

    endTest() {
        clearInterval(this.timer);
        this.isTestActive = false;
        
        // Only show results if the test wasn't manually restarted
        if (!this.isModalOpen) {
            const finalWPM = this.wpm;
            const finalAccuracy = this.accuracy;
            const correctWords = Math.floor(this.correctChars / 5);
            
            document.removeEventListener('keydown', this.boundHandleKeyDown);
            
            this.isModalOpen = true;
            this.showResults(finalWPM, finalAccuracy, correctWords);
        }
    }

    showResults(wpm, accuracy, words) {
        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'results-modal';
        
        // Create modal content
        modal.innerHTML = `
            <div class="results-content">
                <h2>Test Complete!</h2>
                <div class="results-stats">
                    <div class="result-item">
                        <span class="result-label">WPM</span>
                        <span class="result-value">${wpm}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Accuracy</span>
                        <span class="result-value">${accuracy}%</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Words</span>
                        <span class="result-value">${words}</span>
                    </div>
                </div>
                <button class="restart-btn">Try Again</button>
            </div>
        `;

        // Add modal to page
        document.body.appendChild(modal);

        // Add event listener to restart button
        const restartBtn = modal.querySelector('.restart-btn');
        restartBtn.addEventListener('click', () => {
            this.closeModal(modal);
            this.restartTest();
        });

        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
                this.restartTest();
            }
        });
    }

    closeModal(modal) {
        document.body.removeChild(modal);
        this.isModalOpen = false;
        this.restartTest();
    }

    restartTest(isManualRestart = false) {
        // Clear any existing timer
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.isModalOpen = false;
        this.isTestActive = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.startTime = null;
        
        // Reset displays
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '0%';
        this.timeDisplay.textContent = `${this.timeLimit}s`;
        
        // Generate new text
        this.generateNewText();

        // Ensure keyboard listener is active
        document.removeEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('keydown', this.boundHandleKeyDown);
        
        // Focus on the typing area
        this.textDisplay.focus();
    }

    changeTheme(theme) {
        document.body.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
    }

    initializeSettings() {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || this.defaultTheme;
        this.themeSelect.value = savedTheme;
        this.changeTheme(savedTheme);

        // Initialize time
        const savedTime = localStorage.getItem('time') || this.defaultTime;
        this.timeSelect.value = savedTime;
        this.timeLimit = parseInt(savedTime);
        this.timeDisplay.textContent = `${this.timeLimit}s`;
    }

    startSettingsCheck() {
        // Initial check
        this.checkSettings();

        // Check every second
        setInterval(() => this.checkSettings(), 1000);
    }

    checkSettings() {
        // Check theme
        const currentTheme = document.body.className.replace('theme-', '') || this.defaultTheme;
        if (this.themeSelect.value !== currentTheme) {
            this.changeTheme(this.themeSelect.value);
        }

        // Check time
        if (!this.isTestActive) {
            const selectedTime = parseInt(this.timeSelect.value);
            if (this.timeLimit !== selectedTime) {
                this.timeLimit = selectedTime;
                this.timeDisplay.textContent = `${this.timeLimit}s`;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingTest = new TypingTest();
    // Add initial keyboard listener
    document.addEventListener('keydown', typingTest.boundHandleKeyDown);
}); 