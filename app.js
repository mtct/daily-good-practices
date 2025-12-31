import { practices } from './practices.js';

// Constants
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const STORAGE_KEYS = {
    PRACTICE: 'dailyPractice',
    THEME: 'theme'
};

// Theme Management
function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function initTheme() {
    // Priority: localStorage > system preference > default (light)
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const theme = storedTheme || getSystemPreference();
    applyTheme(theme);
    return theme;
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
}

function watchSystemPreference() {
    // Listen for system preference changes only if user hasn't set a preference
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't explicitly set a theme
            if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        });
    }
}

// Practice Management
function getTodaysPractice() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PRACTICE);
        const now = Date.now();

        if (stored) {
            const data = JSON.parse(stored);
            const timeSinceSelection = now - data.timestamp;

            // If less than 24 hours have passed, return stored practice
            if (timeSinceSelection < MILLISECONDS_IN_DAY) {
                return practices[data.index];
            }
        }

        // Generate new random practice
        const randomIndex = Math.floor(Math.random() * practices.length);
        const practiceData = {
            index: randomIndex,
            timestamp: now
        };

        localStorage.setItem(STORAGE_KEYS.PRACTICE, JSON.stringify(practiceData));
        return practices[randomIndex];
    } catch (error) {
        console.error('Error managing practice:', error);
        // Fallback to a random practice without storage
        return practices[Math.floor(Math.random() * practices.length)];
    }
}

function displayPractice() {
    const practiceText = getTodaysPractice();
    const practiceElement = document.getElementById('practice-text');

    if (practiceElement) {
        practiceElement.textContent = practiceText;
    }
}

// Initialization
function init() {
    // Initialize theme first to avoid flash
    initTheme();

    // Display today's practice
    displayPractice();

    // Set up theme toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // Watch for system preference changes
    watchSystemPreference();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
