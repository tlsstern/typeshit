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
        this.currentLine = 0;
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
            light: {
                '--bg-color': '#f5f5f5',
                '--text-color': '#333',
                '--header-bg': '#e0e0e0',
                '--typing-area-bg': '#fff',
                '--char-color': '#999',
                '--correct-color': '#4caf50',
                '--incorrect-color': '#f44336',
                '--cursor-color': '#333',
                '--button-bg': '#ddd',
                '--button-hover-bg': '#ccc'
            },
            blue: {
                '--bg-color': '#1a237e',
                '--text-color': '#fff',
                '--header-bg': '#3f51b5',
                '--typing-area-bg': '#283593',
                '--char-color': '#9fa8da',
                '--correct-color': '#00e676',
                '--incorrect-color': '#ff1744',
                '--cursor-color': '#fff',
                '--button-bg': '#5c6bc0',
                '--button-hover-bg': '#7986cb'
            },
            green: {
                '--bg-color': '#1b5e20',
                '--text-color': '#fff',
                '--header-bg': '#4caf50',
                '--typing-area-bg': '#2e7d32',
                '--char-color': '#a5d6a7',
                '--correct-color': '#ffeb3b',
                '--incorrect-color': '#ff6e40',
                '--cursor-color': '#fff',
                '--button-bg': '#66bb6a',
                '--button-hover-bg': '#81c784'
            }
        };

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