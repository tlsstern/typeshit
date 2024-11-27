class TypingTest {
    constructor() {
        this.words = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", 
            "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", 
            "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", 
            "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", 
            "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", 
            "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", 
            "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", 
            "give", "day", "most", "us"
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
        this.timeButtons = document.querySelectorAll('.time-btn');
        this.customTimeInput = document.getElementById('customTime');
        this.themeSelect = document.getElementById('themeSelect');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timeDisplay = document.getElementById('time');
        this.timeSelect = document.getElementById('timeSelect');

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

        this.wordIndex = 0;
        this.displayedWords = [];
        this.nextWords = [];
        this.generateInitialText();
    }

    initializeEventListeners() {
        this.restartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.restartTest(true);
        });
        
        this.timeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const newTime = parseInt(btn.dataset.time);
                this.updateTimeSelection(newTime);
                btn.classList.add('active');
            });
        });

        this.customTimeInput.addEventListener('change', (e) => {
            let newTime = parseInt(e.target.value);
            
            // Validate input
            if (isNaN(newTime) || newTime < 1) {
                newTime = 30;
                this.customTimeInput.value = '';
            } else if (newTime > 999) {
                newTime = 999;
                this.customTimeInput.value = 999;
            }
            
            this.updateTimeSelection(newTime);
        });

        this.customTimeInput.addEventListener('keydown', (e) => {
            e.stopPropagation();
        });

        this.themeSelect.addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });

        this.timeSelect.addEventListener('change', (e) => {
            this.timeLimit = parseInt(e.target.value);
            this.restartTest(true);
        });
    }

    handleKeyDown(e) {
        // Handle instant restart with Escape key
        if (e.key === 'Escape') {
            e.preventDefault();
            this.restartTest(true);
            return;
        }

        // Prevent typing if modal is open
        if (this.isModalOpen) {
            e.preventDefault();
            return;
        }

        // Handle backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleBackspace();
            return;
        }

        // Ignore if modifier keys are pressed
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // Only process single characters
        if (e.key.length === 1) {
            if (!this.isTestActive) {
                this.startTest();
            }
            this.processCharacter(e.key);
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
        const currentChar = this.currentText[this.currentIndex];
        const isCorrect = char === currentChar;
        
        const chars = this.textDisplay.children;
        if (chars[this.currentIndex]) {
            chars[this.currentIndex].classList.remove('active');
            chars[this.currentIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        }

        this.totalChars++;
        if (isCorrect) this.correctChars++;

        this.currentIndex++;

        // Check if we need to add more words
        if (this.currentIndex >= (this.displayedWords.join(' ').length)) {
            this.displayedWords = [...this.displayedWords.slice(this.displayedWords.length / 2), ...this.nextWords];
            this.nextWords = this.generateWords(30);
            this.renderText();
        }

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

        // Add animation class when numbers update
        const animate = (element, newValue) => {
            const oldValue = element.textContent;
            if (oldValue !== newValue.toString()) {
                element.classList.add('changed');
                setTimeout(() => element.classList.remove('changed'), 300);
            }
            element.textContent = newValue;
        };

        animate(this.wpmDisplay, this.wpm);
        animate(this.accuracyDisplay, `${this.accuracy}%`);
        animate(this.timeDisplay, `${timeLeft}s`);
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
        clearInterval(this.timer);
        this.isModalOpen = false;
        this.isTestActive = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.startTime = null;
        this.wordIndex = 0;
        this.displayedWords = [];
        this.nextWords = [];
        
        // Reset displays
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '0%';
        this.timeDisplay.textContent = `${this.timeLimit}s`;
        
        this.generateInitialText();
        document.addEventListener('keydown', this.boundHandleKeyDown);
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

    setDefaultTime() {
        // Set default time (30 seconds)
        const defaultTime = 30;
        this.timeLimit = defaultTime;
        this.timeDisplay.textContent = `${defaultTime}s`;
        
        // Set active state on default button
        this.timeButtons.forEach(btn => {
            if (parseInt(btn.dataset.time) === defaultTime) {
                btn.classList.add('active');
            }
        });
    }

    updateTimeSelection(newTime) {
        // Update time limit
        this.timeLimit = newTime;
        this.timeDisplay.textContent = `${newTime}s`;
        
        // Reset active state on all buttons
        this.timeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Clear custom input if selecting a preset time
        if ([10, 15, 30].includes(newTime)) {
            this.customTimeInput.value = '';
        }
        
        // Restart test
        this.restartTest(true);
    }

    generateInitialText() {
        // Generate initial set of words
        this.displayedWords = this.generateWords(50);
        this.nextWords = this.generateWords(30);
        this.currentText = this.displayedWords.join(' ');
        this.renderText();
    }

    generateWords(count) {
        let words = [];
        for (let i = 0; i < count; i++) {
            words.push(this.words[Math.floor(Math.random() * this.words.length)]);
        }
        return words;
    }

    renderText() {
        const allWords = [...this.displayedWords, ...this.nextWords];
        this.currentText = allWords.join(' ');
        
        this.textDisplay.innerHTML = allWords.map(word => 
            word.split('').map(char => 
                `<span class="char">${char}</span>`
            ).join('')
        ).join('<span class="char"> </span>');

        // Maintain cursor position
        const chars = this.textDisplay.children;
        if (chars[this.currentIndex]) {
            chars[this.currentIndex].classList.add('active');
        }
    }

    // Add this CSS to handle word wrapping and scrolling
    setupStyles() {
        this.textDisplay.style.cssText = `
            overflow-y: hidden;
            white-space: pre-wrap;
            word-break: break-word;
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const typingTest = new TypingTest();
    // Add initial keyboard listener
    document.addEventListener('keydown', typingTest.boundHandleKeyDown);
}); 