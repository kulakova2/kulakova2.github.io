(function () {
    const textEl = document.getElementById('quote-text');
    const btnEl = document.getElementById('quote-btn');

    let phrases = [];
    let lastIndex = -1;

    async function loadPhrases() {
        try {
            const response = await fetch('phrases.txt');
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const text = await response.text();

            phrases = text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            if (phrases.length === 0) {
                throw new Error('Файл с фразами пуст');
            }

            showRandomPhrase();
        } catch (error) {
            console.error('Ошибка загрузки фраз:', error);
            textEl.textContent = 'Не удалось загрузить фразы';
            textEl.classList.add('error');
        }
    }

    function showRandomPhrase() {
        if (phrases.length === 0) return;

        let index;
        if (phrases.length === 1) {
            index = 0;
        } else {
            do {
                index = Math.floor(Math.random() * phrases.length);
            } while (index === lastIndex);
        }

        lastIndex = index;
        textEl.textContent = phrases[index];
    }

    btnEl.addEventListener('click', showRandomPhrase);

    document.addEventListener('DOMContentLoaded', loadPhrases);
})();