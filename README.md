# TypeShit - Typing Speed Test

## Overview
Modern, responsive typing speed test application with real-time statistics, accuracy tracking, and performance visualization. Features a clean interface optimized for both desktop and mobile devices.

## Features
- **Multiple Test Durations**: 10s, 15s, 30s, 1min, 2min tests
- **Real-time Statistics**: Live WPM (Words Per Minute) calculation
- **Accuracy Tracking**: Monitors typing accuracy percentage
- **Visual Feedback**: Color-coded feedback for correct/incorrect typing
- **Performance Charts**: Graphical representation of typing speed over time
- **Mobile Optimized**: Full mobile web app support
- **Responsive Design**: Works seamlessly on all devices

## Technologies Used
- HTML
- CSS
- JavaScript
- Chart.js for data visualization

## How It Works
1. Select your preferred test duration
2. Start typing the displayed text
3. Get real-time feedback on your typing
4. View your final statistics including:
   - Words Per Minute (WPM)
   - Accuracy percentage
   - Time elapsed
5. Track your progress with visual charts

## Features in Detail

### Typing Test
- Dynamic text generation
- Character-by-character validation
- Real-time error highlighting
- Backspace support for corrections

### Statistics
- **WPM Calculation**: Based on standard 5-character words
- **Accuracy**: (Correct characters / Total characters) × 100
- **Time Tracking**: Countdown timer with visual display

### Mobile Support
- Touch-optimized keyboard input
- Viewport optimization
- App-capable meta tags for fullscreen experience
- No-zoom policy for consistent UX

## Setup Instructions
1. Clone or download the project
2. Open `index.html` in any modern web browser
3. No build process or dependencies required

## File Structure
```
typeshit/
├── index.html     # Main HTML structure
├── styles.css     # Styling and animations
└── script.js      # Core typing test logic
```

## Keyboard Shortcuts
- `Tab` - Reset test
- `Enter` - Start new test after completion
- `Escape` - Clear current progress
