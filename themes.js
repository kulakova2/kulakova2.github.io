function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        updateToggleButton(true);
    }
}

function updateToggleButton(isDark) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
    }
}

function setupThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleButton(isDark);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setupThemeToggle();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('dark-mode', e.matches);
        updateToggleButton(e.matches);
    }
});