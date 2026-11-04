async function loadWeather() {
    const tempEl = document.getElementById('weather-temp');
    const iconEl = document.getElementById('weather-icon');

    if (!tempEl || !iconEl) {
        console.error('Не найдены элементы #weather-temp или #weather-icon');
        return;
    }

    try {
        const lat = 60.396676;
        const lon = 30.381688;

        const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
        if (!response.ok) throw new Error('HTTP ' + response.status);

        const data = await response.json();

        const current = data.current_condition[0];

        // Температура
        const temp = Math.round(parseFloat(current.temp_C));
        tempEl.textContent = `${temp}°C`;

        // Иконка по коду WWO
        const code = parseInt(current.weatherCode, 10);
        iconEl.textContent = getIconFromWWO(code);

        // Описание: переводим на русский, если есть в словаре
        if (current.weatherDesc && current.weatherDesc[0]) {
            const rawDesc = current.weatherDesc[0].value.trim();
            iconEl.title = translateDesc(rawDesc);
        }

    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        iconEl.textContent = '❌';
        tempEl.textContent = 'Нет данных';
    }
}

function translateDesc(desc) {
    const map = {
        'Sunny': 'Ясно',
        'Clear': 'Ясно',
        'Partly cloudy': 'Переменная облачность',
        'Cloudy': 'Облачно',
        'Overcast': 'Пасмурно',
        'Mist': 'Туман',
        'Fog': 'Туман',
        'Patchy rain nearby': 'Местами дождь',
        'Patchy rain possible': 'Возможен дождь',
        'Light drizzle': 'Лёгкая морось',
        'Light rain': 'Лёгкий дождь',
        'Moderate rain': 'Умеренный дождь',
        'Heavy rain': 'Сильный дождь',
        'Light snow': 'Лёгкий снег',
        'Moderate snow': 'Умеренный снег',
        'Heavy snow': 'Сильный снег',
        'Blizzard': 'Пурга',
        'Blowing snow': 'Метель',
        'Thundery outbreaks possible': 'Возможна гроза'
    };
    return map[desc] || desc;
}

function getIconFromWWO(code) {
    const icons = {
        113: '☀️',
        116: '⛅',
        119: '☁️',
        122: '☁️',
        143: '🌫️',
        176: '🌦️',
        179: '🌨️',
        182: '🌨️',
        185: '🌨️',
        200: '⛈️',
        227: '🌨️',
        230: '❄️',
        248: '🌫️',
        260: '🌫️',
        263: '🌦️',
        266: '🌦️',
        281: '🌧️',
        284: '🌧️',
        293: '🌦️',
        296: '🌧️',
        299: '🌧️',
        302: '🌧️',
        305: '🌧️',
        308: '🌧️',
        311: '🌧️',
        314: '🌧️',
        317: '🌨️',
        320: '🌨️',
        323: '🌨️',
        326: '🌨️',
        329: '❄️',
        332: '❄️',
        335: '❄️',
        338: '❄️',
        350: '🌧️',
        353: '🌦️',
        356: '🌧️',
        359: '🌧️',
        362: '🌨️',
        365: '🌨️',
        368: '🌨️',
        371: '❄️',
        374: '🌧️',
        377: '🌧️',
        386: '⛈️',
        389: '⛈️',
        392: '⛈️',
        395: '⛈️'
    };
    return icons[code] || '🌤️';
}

document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    setInterval(loadWeather, 3600000);
});