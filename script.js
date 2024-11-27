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
                '--bg-color': '#2b1055',
                '--text-color': '#ff2d95',
                '--header-bg': '#1a0933',
                '--typing-area-bg': '#2d1963',
                '--char-color': '#9d8ec7',
                '--correct-color': '#00fff5',
                '--incorrect-color': '#ff124f',
                '--cursor-color': '#ff2d95',
                '--button-bg': '#1a0933',
                '--button-hover-bg': '#3b1c75'
            },
            matrix: {
                '--bg-color': '#000000',
                '--text-color': '#00ff41',
                '--header-bg': '#001100',
                '--typing-area-bg': '#001100',
                '--char-color': '#003b00',
                '--correct-color': '#00ff41',
                '--incorrect-color': '#ff0000',
                '--cursor-color': '#00ff41',
                '--button-bg': '#001100',
                '--button-hover-bg': '#002200'
            },
            sunset: {
                '--bg-color': '#ff7700',
                '--text-color': '#ffffff',
                '--header-bg': '#cc4400',
                '--typing-area-bg': '#cc4400',
                '--char-color': '#ffaa66',
                '--correct-color': '#ffff00',
                '--incorrect-color': '#ff0066',
                '--cursor-color': '#ffffff',
                '--button-bg': '#cc4400',
                '--button-hover-bg': '#ff5500'
            },
            ocean: {
                '--bg-color': '#006994',
                '--text-color': '#ffffff',
                '--header-bg': '#004c6d',
                '--typing-area-bg': '#004c6d',
                '--char-color': '#7ab7d0',
                '--correct-color': '#00ffcc',
                '--incorrect-color': '#ff6b6b',
                '--cursor-color': '#ffffff',
                '--button-bg': '#004c6d',
                '--button-hover-bg': '#005c82'
            },
            coffee: {
                '--bg-color': '#4b3832',
                '--text-color': '#fff4e6',
                '--header-bg': '#3c2f2f',
                '--typing-area-bg': '#3c2f2f',
                '--char-color': '#be9b7b',
                '--correct-color': '#d4b483',
                '--incorrect-color': '#854442',
                '--cursor-color': '#fff4e6',
                '--button-bg': '#3c2f2f',
                '--button-hover-bg': '#854442'
            },
            terminal: {
                '--bg-color': '#002b36',
                '--text-color': '#839496',
                '--header-bg': '#073642',
                '--typing-area-bg': '#073642',
                '--char-color': '#586e75',
                '--correct-color': '#859900',
                '--incorrect-color': '#dc322f',
                '--cursor-color': '#839496',
                '--button-bg': '#073642',
                '--button-hover-bg': '#094555'
            },
            neon: {
                '--bg-color': '#0c0c1f',
                '--text-color': '#fff',
                '--header-bg': '#1a1a3c',
                '--typing-area-bg': '#1a1a3c',
                '--char-color': '#4d4d99',
                '--correct-color': '#0f0',
                '--incorrect-color': '#f0f',
                '--cursor-color': '#0ff',
                '--button-bg': '#1a1a3c',
                '--button-hover-bg': '#2d2d66'
            },
            forest: {
                '--bg-color': '#193726',
                '--text-color': '#e8ffe8',
                '--header-bg': '#0f2417',
                '--typing-area-bg': '#0f2417',
                '--char-color': '#5c8374',
                '--correct-color': '#90ee90',
                '--incorrect-color': '#ff6b6b',
                '--cursor-color': '#e8ffe8',
                '--button-bg': '#0f2417',
                '--button-hover-bg': '#2d503a'
            },
            pastel: {
                '--bg-color': '#f7f0f5',
                '--text-color': '#333',
                '--header-bg': '#e8dff1',
                '--typing-area-bg': '#f0e6f6',
                '--char-color': '#b39ddb',
                '--correct-color': '#81c784',
                '--incorrect-color': '#e57373',
                '--cursor-color': '#333',
                '--button-bg': '#d1c4e9',
                '--button-hover-bg': '#b39ddb'
            },
            midnight: {
                '--bg-color': '#2c3e50',
                '--text-color': '#ecf0f1',
                '--header-bg': '#34495e',
                '--typing-area-bg': '#2c3e50',
                '--char-color': '#95a5a6',
                '--correct-color': '#1abc9c',
                '--incorrect-color': '#e74c3c',
                '--cursor-color': '#ecf0f1',
                '--button-bg': '#34495e',
                '--button-hover-bg': '#1abc9c'
            },
            vintage: {
                '--bg-color': '#f5f5dc',
                '--text-color': '#5d4037',
                '--header-bg': '#d7ccc8',
                '--typing-area-bg': '#f5f5dc',
                '--char-color': '#8d6e63',
                '--correct-color': '#6d4c41',
                '--incorrect-color': '#d32f2f',
                '--cursor-color': '#5d4037',
                '--button-bg': '#bcaaa4',
                '--button-hover-bg': '#8d6e63'
            }
        };

        this.typingArea = document.querySelector('.typing-area');

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

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        for (const [property, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(property, value);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
}); 