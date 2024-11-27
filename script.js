class TypingTest {
    constructor() {
        this.words = [
            "us", "time", "day", "year", "now", "month", "week", "hour", "minute", "second",
            "morning", "evening", "night", "today", "tomorrow", "yesterday", "soon", "later", "early", "late",
            "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "many", "much", "few", "several", "some", "any", "all", "both", "each", "every",
            "happy", "sad", "angry", "tired", "excited", "scared", "worried", "surprised", "confused", "proud",
            "love", "hate", "like", "feel", "think", "know", "want", "need", "hope", "wish",
            "family", "friend", "mother", "father", "parent", "child", "baby", "sister", "brother", "wife",
            "husband", "son", "daughter", "uncle", "aunt", "cousin", "grandmother", "grandfather", "person", "people",
            "home", "house", "room", "office", "school", "work", "store", "shop", "market", "restaurant",
            "city", "town", "country", "world", "place", "area", "street", "road", "building", "garden",
            "food", "water", "drink", "meal", "breakfast", "lunch", "dinner", "fruit", "vegetable", "meat",
            "bread", "rice", "fish", "chicken", "beef", "pork", "egg", "milk", "coffee", "tea",
            "red", "blue", "green", "yellow", "black", "white", "brown", "pink", "purple", "orange",
            "gray", "silver", "gold", "dark", "light", "bright", "color", "shade", "tone", "hue",
            "weather", "rain", "snow", "wind", "sun", "cloud", "storm", "hot", "cold", "warm",
            "cool", "tree", "flower", "grass", "sky", "sea", "ocean", "river", "mountain", "beach",
            "car", "bus", "train", "plane", "bike", "walk", "run", "drive", "ride", "fly",
            "travel", "trip", "journey", "way", "road", "street", "path", "direction", "map", "route",
            "computer", "phone", "internet", "email", "website", "online", "data", "system", "program", "software",
            "app", "game", "video", "music", "picture", "camera", "screen", "device", "machine", "tool",
            "work", "job", "career", "study", "learn", "teach", "student", "teacher", "class", "lesson",
            "test", "exam", "grade", "paper", "book", "note", "write", "read", "speak", "listen",
            "head", "face", "eye", "ear", "nose", "mouth", "tooth", "hair", "hand", "arm",
            "leg", "foot", "body", "back", "heart", "brain", "skin", "bone", "muscle", "blood",
            "clothes", "shirt", "pants", "dress", "shoe", "hat", "coat", "jacket", "sock", "belt",
            "wear", "fit", "size", "style", "fashion", "design", "pattern", "color", "material", "fabric",
            "make", "do", "take", "give", "get", "put", "set", "move", "turn", "change",
            "open", "close", "start", "stop", "begin", "end", "come", "go", "leave", "return",
            "say", "tell", "ask", "answer", "speak", "talk", "call", "write", "read", "listen",
            "hear", "see", "look", "watch", "show", "mean", "explain", "understand", "know", "think",
            "good", "bad", "big", "small", "high", "low", "long", "short", "old", "new",
            "young", "different", "same", "right", "wrong", "true", "false", "important", "real", "best",
            "thing", "way", "day", "man", "woman", "child", "world", "life", "time", "year",
            "hand", "part", "eye", "place", "work", "week", "case", "point", "government", "company",
            "could", "would", "should", "may", "might", "must", "shall", "will", "can", "need",
            "try", "call", "ask", "seem", "feel", "become", "leave", "put", "mean", "keep",
            "each", "well", "just", "while", "where", "why", "who", "whose", "which", "what",
            "when", "then", "there", "here", "those", "these", "that", "this", "they", "them"
            // Add more words to reach 1000 if needed
        ];
        
        this.textDisplay = document.getElementById('text-display');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timeDisplay = document.getElementById('time');
        this.restartBtn = document.getElementById('restart');
        this.timeSelect = document.getElementById('timeSelect');
        this.resultsModal = document.getElementById('resultsModal');
        this.wpmResult = document.getElementById('wpmResult');
        this.accuracyResult = document.getElementById('accuracyResult');
        this.totalCharsResult = document.getElementById('totalCharsResult');
        this.correctCharsResult = document.getElementById('correctCharsResult');
        this.incorrectCharsResult = document.getElementById('incorrectCharsResult');
        this.playAgainBtn = document.getElementById('playAgainBtn');

        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.mistakes = new Set();
        this.startTime = null;
        this.timeLimit = parseInt(this.timeSelect.value);
        this.isTestActive = false;
        this.timer = null;

        this.currentText = '';
        this.linesPerView = 5;
        this.charsPerLine = 60;
        this.visibleTextStart = 0;
        this.statsTimer = null;
        this.themeSelect = document.getElementById('themeSelect');
        this.themes = {
            dark: {
                '--bg-color': '#1a1a1a',
                '--text-color': '#fff',
                '--header-bg': '#2a2a2a',
                '--typing-area-bg': '#2a2a2a',
                '--char-color': '#666',
                '--correct-color': '#4caf50',
                '--incorrect-color': '#f44336',
                '--cursor-color': '#fff',
                '--button-bg': '#333',
                '--button-hover-bg': '#444'
            },
            synthwave: {
                '--bg-color': '#1a1a2e',
                '--text-color': '#ff2d95',
                '--header-bg': '#16213e',
                '--typing-area-bg': '#16213e',
                '--char-color': '#4d4d8d',
                '--correct-color': '#00fff5',
                '--incorrect-color': '#ff124f',
                '--cursor-color': '#ff2d95',
                '--button-bg': '#16213e',
                '--button-hover-bg': '#1a1a2e'
            },
            matrix: {
                '--bg-color': '#0d0d0d',
                '--text-color': '#00ff41',
                '--header-bg': '#1a1a1a',
                '--typing-area-bg': '#1a1a1a',
                '--char-color': '#005f00',
                '--correct-color': '#00ff41',
                '--incorrect-color': '#ff0000',
                '--cursor-color': '#00ff41',
                '--button-bg': '#1a1a1a',
                '--button-hover-bg': '#2a2a2a'
            },
            sunset: {
                '--bg-color': '#1a1517',
                '--text-color': '#ff7b00',
                '--header-bg': '#2a1f20',
                '--typing-area-bg': '#2a1f20',
                '--char-color': '#664d4d',
                '--correct-color': '#ffd700',
                '--incorrect-color': '#ff3333',
                '--cursor-color': '#ff7b00',
                '--button-bg': '#2a1f20',
                '--button-hover-bg': '#3a2f30'
            },
            ocean: {
                '--bg-color': '#1a1a2e',
                '--text-color': '#00ffff',
                '--header-bg': '#1f2937',
                '--typing-area-bg': '#1f2937',
                '--char-color': '#4d4d8d',
                '--correct-color': '#00ffff',
                '--incorrect-color': '#ff6b6b',
                '--cursor-color': '#00ffff',
                '--button-bg': '#1f2937',
                '--button-hover-bg': '#2d3748'
            },
            coffee: {
                '--bg-color': '#1a1412',
                '--text-color': '#d4b483',
                '--header-bg': '#2a201c',
                '--typing-area-bg': '#2a201c',
                '--char-color': '#665c57',
                '--correct-color': '#d4b483',
                '--incorrect-color': '#854442',
                '--cursor-color': '#d4b483',
                '--button-bg': '#2a201c',
                '--button-hover-bg': '#3a302c'
            },
            terminal: {
                '--bg-color': '#0a0f14',
                '--text-color': '#98d1ce',
                '--header-bg': '#1a1f24',
                '--typing-area-bg': '#1a1f24',
                '--char-color': '#4d5a5e',
                '--correct-color': '#859900',
                '--incorrect-color': '#dc322f',
                '--cursor-color': '#98d1ce',
                '--button-bg': '#1a1f24',
                '--button-hover-bg': '#2a2f34'
            },
            neon: {
                '--bg-color': '#0a0a1f',
                '--text-color': '#00ffff',
                '--header-bg': '#1a1a3c',
                '--typing-area-bg': '#1a1a3c',
                '--char-color': '#4d4d99',
                '--correct-color': '#00ff00',
                '--incorrect-color': '#ff00ff',
                '--cursor-color': '#00ffff',
                '--button-bg': '#1a1a3c',
                '--button-hover-bg': '#2a2a4c'
            },
            forest: {
                '--bg-color': '#1a2213',
                '--text-color': '#90ee90',
                '--header-bg': '#2a321f',
                '--typing-area-bg': '#2a321f',
                '--char-color': '#5c6657',
                '--correct-color': '#90ee90',
                '--incorrect-color': '#ff6b6b',
                '--cursor-color': '#90ee90',
                '--button-bg': '#2a321f',
                '--button-hover-bg': '#3a422f'
            }
        };

        this.typingArea = document.querySelector('.typing-area');

        // Load saved preferences
        const savedTime = localStorage.getItem('selectedTime');
        const savedTheme = localStorage.getItem('selectedTheme');

        if (savedTime) {
            this.timeSelect.value = savedTime;
            this.timeLimit = parseInt(savedTime); // Update timeLimit with saved value
        }

        if (savedTheme) {
            this.themeSelect.value = savedTheme;
            this.applyTheme(savedTheme); // Apply the saved theme
        }

        // Update event listeners
        this.timeSelect.addEventListener('change', (e) => {
            const selectedTime = e.target.value;
            this.timeLimit = parseInt(selectedTime);
            localStorage.setItem('selectedTime', selectedTime);
            this.restartTest();
        });

        this.themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            localStorage.setItem('selectedTheme', selectedTheme);
            this.applyTheme(selectedTheme);
        });

        // Initialize the time display with the correct time
        this.timeDisplay.textContent = this.timeLimit + 's';

        this.initializeEventListeners();
        this.generateInitialText();
        this.applyTheme('dark'); // Set default theme

        this.playAgainBtn.addEventListener('click', () => {
            this.closeResultsModal();
            this.restartTest();
        });
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            // Handle Tab key
            if (e.key === 'Tab') {
                e.preventDefault(); // Prevent default tab behavior
                this.restartBtn.focus(); // Focus the restart button
                return;
            }

            // Handle Enter key when restart button is focused
            if (e.key === 'Enter' && document.activeElement === this.restartBtn) {
                e.preventDefault();
                this.restartTest();
                return;
            }

            if (this.resultsModal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    this.closeResultsModal();
                    this.restartTest();
                }
                return;
            }

            if (e.key === 'Backspace') {
                e.preventDefault();
                if (this.isTestActive && this.currentIndex > 0) {
                    this.handleBackspace();
                }
                return;
            }

            if (!this.isTestActive && e.key.length === 1) {
                this.startTest();
            }

            // Prevent focus on other elements during the test
            if (this.isTestActive && !this.typingArea.contains(document.activeElement)) {
                e.preventDefault();
                this.typingArea.focus();
            }
        });

        document.addEventListener('keypress', (e) => {
            if (this.resultsModal.style.display === 'flex') return;
            
            if (!this.isTestActive) return;
            
            if (e.key.length === 1) {
                this.checkCharacter(e.key);
            }
        });

        this.restartBtn.addEventListener('click', () => this.restartTest());
        this.timeSelect.addEventListener('change', (e) => {
            this.timeLimit = parseInt(e.target.value);
            this.restartTest();
        });
        this.themeSelect.addEventListener('change', (e) => {
            this.applyTheme(e.target.value);
        });

        // Prevent focus on select and button elements during the test
        this.restartBtn.addEventListener('mousedown', (e) => {
            if (this.isTestActive) {
                e.preventDefault();
            }
        });

        this.timeSelect.addEventListener('mousedown', (e) => {
            if (this.isTestActive) {
                e.preventDefault();
            }
        });

        this.themeSelect.addEventListener('mousedown', (e) => {
            if (this.isTestActive) {
                e.preventDefault();
            }
        });
    }

    generateInitialText() {
        this.currentText = this.generateWords(100).join(' ');
        this.renderText();
    }

    generateWords(count) {
        return Array.from({length: count}, () => this.words[Math.floor(Math.random() * this.words.length)]);
    }

    renderText() {
        const allChars = this.currentText.split('');
        
        // Calculate current line
        this.currentLine = Math.floor(this.currentIndex / this.charsPerLine);
        
        // If we're past the first line, adjust visibleTextStart to keep cursor on second line
        if (this.currentLine > 0) {
            this.visibleTextStart = (this.currentLine - 1) * this.charsPerLine;
        }
        
        const visibleChars = allChars.slice(
            this.visibleTextStart, 
            this.visibleTextStart + (this.linesPerView * this.charsPerLine)
        );
        
        this.textDisplay.innerHTML = visibleChars.map((char, index) => {
            const globalIndex = index + this.visibleTextStart;
            let classes = ['char'];
            
            if (globalIndex < this.currentIndex) {
                if (this.mistakes.has(globalIndex)) {
                    classes.push('incorrect');
                } else {
                    classes.push('correct');
                }
            } else if (globalIndex === this.currentIndex) {
                classes.push('active');
            }
            
            return `<span class="${classes.join(' ')}">${char}</span>`;
        }).join('');
    }

    handleBackspace() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            
            if (this.mistakes.has(this.currentIndex)) {
                this.mistakes.delete(this.currentIndex);
            } else {
                this.correctChars--;
            }
            this.totalChars--;
            
            // Update visibleTextStart when backspacing to previous lines
            const newLine = Math.floor(this.currentIndex / this.charsPerLine);
            if (newLine < this.currentLine && newLine > 0) {
                this.visibleTextStart = (newLine - 1) * this.charsPerLine;
            }
            
            this.renderText();
            this.updateStats();
        }
    }

    checkCharacter(key) {
        if (!this.isTestActive || this.resultsModal.style.display === 'flex') return;
        
        const currentChar = this.currentText[this.currentIndex];
        
        if (key === currentChar) {
            this.correctChars++;
        } else {
            this.mistakes.add(this.currentIndex);
        }

        this.currentIndex++;
        this.totalChars++;

        // Add more text if needed
        if (this.currentIndex >= this.currentText.length - (this.charsPerLine * 2)) {
            this.currentText += ' ' + this.generateWords(20).join(' ');
        }

        this.renderText();
        this.updateStats();
    }

    startTest() {
        this.isTestActive = true;
        this.startTime = new Date();
        this.timer = setInterval(() => this.updateTime(), 1000);
        this.statsTimer = setInterval(() => this.updateStats(), 100);
        
        // Focus on the typing area
        this.typingArea.focus();
        
        // Make the typing area focusable
        this.typingArea.setAttribute('tabindex', '-1');
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
        clearInterval(this.statsTimer);
        this.isTestActive = false;
        this.showResultsModal();
    }

    showResultsModal() {
        // Calculate final stats
        const timeElapsed = this.timeLimit / 60; // Convert seconds to minutes
        const wpm = Math.round((this.correctChars / 5) / timeElapsed);
        const accuracy = this.totalChars > 0 
            ? Math.round((this.correctChars / this.totalChars) * 100) 
            : 0;
        const totalChars = this.totalChars;
        const correctChars = this.correctChars;
        const incorrectChars = totalChars - correctChars;

        // Update display
        this.wpmResult.textContent = `WPM: ${wpm}`;
        this.accuracyResult.textContent = `Accuracy: ${accuracy}%`;
        this.totalCharsResult.textContent = `Total Characters: ${totalChars}`;
        this.correctCharsResult.textContent = `Correct Characters: ${correctChars}`;
        this.incorrectCharsResult.textContent = `Incorrect Characters: ${incorrectChars}`;
        
        // Update the header stats to match final results
        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy + '%';
        
        this.resultsModal.style.display = 'flex';
        // Trigger reflow
        void this.resultsModal.offsetWidth;
        this.resultsModal.classList.add('show');
    }

    closeResultsModal() {
        this.resultsModal.classList.remove('show');
        setTimeout(() => {
            this.resultsModal.style.display = 'none';
        }, 300); // Match this delay with the transition duration
    }

    restartTest() {
        this.closeResultsModal();
        clearInterval(this.timer);
        clearInterval(this.statsTimer);
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.mistakes = new Set();
        this.startTime = null;
        this.isTestActive = false;
        this.timeDisplay.textContent = this.timeLimit + 's';
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '0%';
        this.generateInitialText();
    }

    applyTheme(theme) {
        // Remove any existing theme classes
        document.body.classList.remove(...document.body.classList);
        // Add the new theme class
        document.body.classList.add(theme);
    }
}

// Remove the separate DOM content loaded event listener for preferences
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
}); 