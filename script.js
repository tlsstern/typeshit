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
            console.log(`Loading saved theme: ${savedTheme}`); // Debugging
            this.themeSelect.value = savedTheme;
            this.applyTheme(savedTheme); // Apply the saved theme
        } else {
            console.log('No saved theme found, applying default theme');
            this.applyTheme('dark'); // Set default theme
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
            console.log(`Saving theme: ${selectedTheme}`); // Debugging
            localStorage.setItem('selectedTheme', selectedTheme);
            this.applyTheme(selectedTheme);
        });

        // Initialize the time display with the correct time
        this.timeDisplay.textContent = this.timeLimit + 's';

        this.initializeEventListeners();
        this.generateInitialText();

        this.playAgainBtn.addEventListener('click', () => {
            this.closeResultsModal();
            this.restartTest();
        });

        // Add this new property to store WPM data points
        this.wpmHistory = [];
        this.lastWpmUpdate = null;
        this.lastWord = '';

        // Add after existing constructor properties
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.virtualKeyboard = document.getElementById('virtualKeyboard');
        this.mobileInput = document.getElementById('mobileInput');
        
        if (this.isMobile) {
            this.initializeMobileSupport();
        }
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
        const words = [];
        for (let i = 0; i < count; i++) {
            let newWord;
            do {
                newWord = this.words[Math.floor(Math.random() * this.words.length)];
            } while (newWord === this.lastWord);
            
            words.push(newWord);
            this.lastWord = newWord;
        }
        return words;
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

        // Vibrate on mobile for feedback (if available)
        if (this.isMobile && navigator.vibrate) {
            navigator.vibrate(10);
        }

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

        if (this.isMobile) {
            this.mobileInput.focus();
        }
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
        
        const now = new Date();
        const timeElapsed = (now - this.startTime) / 1000 / 60; // in minutes
        const wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        const accuracy = this.totalChars > 0 
            ? Math.round((this.correctChars / this.totalChars) * 100) 
            : 0;

        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy + '%';

        // Record WPM every second
        if (!this.lastWpmUpdate || (now - this.lastWpmUpdate) >= 1000) {
            this.recordWPM();
            this.lastWpmUpdate = now;
        }
    }

    endTest() {
        clearInterval(this.timer);
        clearInterval(this.statsTimer);
        this.isTestActive = false;
        this.showResultsModal();
    }

    showResultsModal() {
        // Add hide class to container for smooth transition
        document.querySelector('.container').classList.add('hide');
        
        // Wait for container transition before showing modal
        setTimeout(() => {
            const timeElapsed = this.timeLimit / 60; // Convert seconds to minutes
            const wpm = Math.round((this.correctChars / 5) / timeElapsed);
            const accuracy = this.totalChars > 0 
                ? Math.round((this.correctChars / this.totalChars) * 100) 
                : 0;

            // Update display
            this.wpmResult.textContent = wpm;
            this.accuracyResult.textContent = `${accuracy}%`;
            this.totalCharsResult.textContent = this.totalChars;
            this.correctCharsResult.textContent = this.correctChars;
            this.incorrectCharsResult.textContent = this.totalChars - this.correctChars;

            // Clear any existing chart
            const existingChart = Chart.getChart("accuracyGraph");
            if (existingChart) {
                existingChart.destroy();
            }

            // Prepare data for the graph
            const labels = [];
            const data = [];
            const totalTime = this.timeLimit;

            // Create time points from 10% to 100%
            for (let i = 1; i <= 10; i++) {
                const timePoint = (i / 10) * totalTime;
                labels.push(i * 10 + '%');
                
                // Find the closest WPM data point for this time
                const closestPoint = this.wpmHistory.reduce((closest, point) => {
                    if (Math.abs(point.time - timePoint) < Math.abs(closest.time - timePoint)) {
                        return point;
                    }
                    return closest;
                }, this.wpmHistory[0] || { time: 0, wpm: 0 });
                
                data.push(closestPoint ? closestPoint.wpm : 0);
            }

            // Find the maximum WPM achieved
            const maxWPM = Math.max(...data, 0);  // Use 0 as fallback
            const yAxisMax = Math.ceil(maxWPM / 50) * 50;  // Round up to next 50

            // Create accuracy graph
            const ctx = document.getElementById('accuracyGraph').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'WPM',
                        data: data,
                        borderColor: getComputedStyle(document.documentElement)
                            .getPropertyValue('--correct-color'),
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: getComputedStyle(document.documentElement)
                            .getPropertyValue('--correct-color'),
                        pointBorderColor: 'transparent',
                        pointHoverRadius: 6,
                        pointRadius: 4,
                        borderWidth: 3,
                        pointHitRadius: 20
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'WPM',
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-color'),
                            font: {
                                size: 16,
                                family: 'Arial, sans-serif',
                                weight: '500'
                            },
                            padding: {
                                top: 10,
                                bottom: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: getComputedStyle(document.documentElement)
                                .getPropertyValue('--header-bg'),
                            titleColor: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-color'),
                            bodyColor: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-color'),
                            padding: 12,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                color: getComputedStyle(document.documentElement)
                                    .getPropertyValue('--char-color')
                            }
                        },
                        y: {
                            min: 0,
                            max: yAxisMax,  // Use the rounded up value
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                drawBorder: false
                            },
                            ticks: {
                                color: getComputedStyle(document.documentElement)
                                    .getPropertyValue('--char-color'),
                                stepSize: Math.ceil(yAxisMax / 8),  // Adjust step size based on max value
                                callback: function(value) {
                                    return value + ' WPM';
                                }
                            }
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6,
                            radius: 4
                        }
                    }
                }
            });

            // Show modal with animation
            this.resultsModal.style.display = 'flex';
            void this.resultsModal.offsetWidth;
            this.resultsModal.classList.add('show');
        }, 300);
    }

    closeResultsModal() {
        this.resultsModal.classList.remove('show');
        
        // Wait for modal transition before showing container
        setTimeout(() => {
            this.resultsModal.style.display = 'none';
            document.querySelector('.container').classList.remove('hide');
        }, 400);
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
        this.wpmHistory = []; // Clear WPM history
        this.lastWpmUpdate = null;
        this.timeDisplay.textContent = this.timeLimit + 's';
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '0%';
        this.generateInitialText();
    }

    applyTheme(theme) {
        const themeColors = this.themes[theme];
        if (themeColors) {
            Object.entries(themeColors).forEach(([property, value]) => {
                document.documentElement.style.setProperty(property, value);
            });
        }
    }

    // Add this new method to record WPM data points
    recordWPM() {
        const now = new Date();
        const timeElapsed = (now - this.startTime) / 1000 / 60; // in minutes
        const currentWPM = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        this.wpmHistory.push({
            time: timeElapsed * 60, // convert to seconds
            wpm: currentWPM
        });
    }

    initializeMobileSupport() {
        // Handle mobile input
        this.mobileInput.addEventListener('input', (e) => {
            const inputChar = e.data;
            if (inputChar && this.isTestActive) {
                this.checkCharacter(inputChar);
            }
            this.mobileInput.value = ''; // Clear input after each character
        });

        // Handle mobile keyboard show/hide
        this.typingArea.addEventListener('touchstart', () => {
            if (!this.isTestActive) {
                this.mobileInput.focus();
            }
        });

        // Adjust container padding when keyboard shows/hides
        window.visualViewport.addEventListener('resize', () => {
            const container = document.querySelector('.container');
            if (window.visualViewport.height < window.innerHeight) {
                container.classList.add('keyboard-visible');
            } else {
                container.classList.remove('keyboard-visible');
            }
        });
    }
}

// Remove the separate DOM content loaded event listener for preferences
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
}); 