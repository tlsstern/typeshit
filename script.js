class TypingTest {
    constructor() {
        this.words = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
            "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
            "say", "this", "but", "his", "by", "from", "they", "we", "say", "her",
            "she", "or", "an", "will", "my", "one", "all", "would", "there", "their",
            "what", "so", "up", "out", "if", "about", "who", "get", "which", "go",
            "me", "when", "make", "can", "like", "time", "no", "just", "him", "know",
            "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
            "other", "than", "then", "now", "look", "only", "come", "its", "over", "think",
            "also", "back", "after", "use", "two", "how", "our", "work", "first", "well",
            "way", "even", "new", "want", "because", "any", "these", "give", "day", "most",
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

        this.displayedWords = [];
        this.nextWords = [];
        this.wordIndex = 0;
        this.lineCount = 5;
        this.charsPerLine = 60;

        this.initializeEventListeners();
        this.generateInitialText();
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

    generateInitialText() {
        this.displayedWords = this.generateWords(30); // Generate more words initially
        this.nextWords = this.generateWords(15);
        this.currentText = this.displayedWords.join(' ');
        this.renderText();
    }

    generateWords(count) {
        return Array.from({length: count}, () => this.words[Math.floor(Math.random() * this.words.length)]);
    }

    renderText() {
        let displayText = "";
        let currentLine = 0;
        let currentLineChars = 0;

        const allWords = [...this.displayedWords, ...this.nextWords];
        
        for (let i = this.wordIndex; i < allWords.length && currentLine < this.lineCount; i++) {
            const word = allWords[i];
            if (currentLineChars + word.length + 1 > this.charsPerLine) {
                displayText += "\n";
                currentLine++;
                currentLineChars = 0;
            }
            if (currentLine < this.lineCount) {
                displayText += word + " ";
                currentLineChars += word.length + 1;
            }
        }

        this.textDisplay.innerHTML = displayText.split('').map((char, index) => 
            `<span class="char ${index === this.currentIndex ? 'active' : ''}">${char}</span>`
        ).join('');
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

        // Check if we need to shift text
        if (this.currentIndex >= this.charsPerLine) {
            this.shiftText();
        }

        if (this.currentIndex < charElements.length) {
            charElements[this.currentIndex].classList.add('active');
        }

        this.updateStats();
    }

    shiftText() {
        const wordsToRemove = this.displayedWords.findIndex(word => 
            this.currentText.indexOf(word, this.currentIndex) !== -1
        );
        
        if (wordsToRemove > 0) {
            this.displayedWords = this.displayedWords.slice(wordsToRemove);
            this.displayedWords = [...this.displayedWords, ...this.nextWords.slice(0, wordsToRemove)];
            this.nextWords = [...this.nextWords.slice(wordsToRemove), ...this.generateWords(wordsToRemove)];
            this.currentText = this.displayedWords.join(' ') + ' ' + this.nextWords.join(' ');
            this.currentIndex -= this.charsPerLine;
            this.renderText();
        }
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
        this.generateInitialText();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
}); 