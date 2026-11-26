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

        // Запрос к Open-Meteo. Запрашиваем температуру и погодный код.
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`,
            {
                // Важно: Open-Meteo может блокировать запросы без User-Agent.
                // Указываем идентификатор, чтобы запрос не был отклонён с ошибкой 403.
                headers: {
                    'User-Agent': 'MyWeatherWidget/1.0 (https://site.ru)'
                }
            }
        );
        
        if (!response.ok) throw new Error('HTTP ' + response.status);
        
        const data = await response.json();

        // Open-Meteo возвращает данные в объекте current
        const current = data.current;

        // Температура
        const temp = Math.round(current.temperature_2m);
        tempEl.textContent = `${temp}°C`;

        // Погодный код (WMO)
        const code = current.weather_code;
        iconEl.textContent = getIconFromWMO(code);

        // Устанавливаем описание в title
        iconEl.title = getDescriptionFromWMO(code);

    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        iconEl.textContent = '❌';
        tempEl.textContent = 'Нет данных';
    }
}

// Преобразование WMO weather code (Open-Meteo) в эмодзи
// Справочник: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
function getIconFromWMO(code) {
    const icons = {
        0: '☀️',  // Ясно
        1: '🌤️', // Преимущественно ясно
        2: '⛅',  // Переменная облачность
        3: '☁️',  // Пасмурно
        45: '🌫️', // Туман
        48: '🌫️', // Туман с изморозью
        51: '🌦️', // Лёгкая морось
        53: '🌦️', // Умеренная морось
        55: '🌧️', // Плотная морось
        56: '🌧️', // Лёгкая ледяная морось
        57: '🌧️', // Плотная ледяная морось
        61: '🌦️', // Небольшой дождь
        63: '🌧️', // Умеренный дождь
        65: '🌧️', // Сильный дождь
        66: '🌧️', // Лёгкий ледяной дождь
        67: '🌧️', // Сильный ледяной дождь
        71: '🌨️', // Небольшой снег
        73: '🌨️', // Умеренный снег
        75: '❄️',  // Сильный снег
        77: '❄️',  // Снежная крупа
        80: '🌦️', // Небольшие ливни
        81: '🌧️', // Умеренные ливни
        82: '🌧️', // Сильные ливни
        85: '🌨️', // Небольшие снегопады
        86: '❄️',  // Сильные снегопады
        95: '⛈️',  // Гроза
        96: '⛈️',  // Гроза с небольшим градом
        99: '⛈️'   // Гроза с сильным градом
    };
    return icons[code] || '🌤️';
}

function getDescriptionFromWMO(code) {
    const descriptions = {
        0: 'Ясно', 1: 'Преимущественно ясно', 2: 'Переменная облачность', 3: 'Пасмурно',
        45: 'Туман', 48: 'Туман с изморозью',
        51: 'Лёгкая морось', 53: 'Умеренная морось', 55: 'Плотная морось',
        56: 'Лёгкая ледяная морось', 57: 'Плотная ледяная морось',
        61: 'Небольшой дождь', 63: 'Умеренный дождь', 65: 'Сильный дождь',
        66: 'Лёгкий ледяной дождь', 67: 'Сильный ледяной дождь',
        71: 'Небольшой снег', 73: 'Умеренный снег', 75: 'Сильный снег', 77: 'Снежная крупа',
        80: 'Небольшие ливни', 81: 'Умеренные ливни', 82: 'Сильные ливни',
        85: 'Небольшие снегопады', 86: 'Сильные снегопады',
        95: 'Гроза', 96: 'Гроза с небольшим градом', 99: 'Гроза с сильным градом'
    };
    return descriptions[code] || 'Погода';
}

document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    setInterval(loadWeather, 3600000);
});