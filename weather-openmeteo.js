async function loadWeather() {
    try {
        const lat = 60.396676;
        const lon = 30.381688;

        // Запрос к Open-Meteo. Параметр current указывает, какие поля нам нужны.
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        // Open-Meteo возвращает температуру в поле temperature_2m
        const temp = Math.round(data.current.temperature_2m);
        document.getElementById('weather-temp').textContent = `${temp}°C`;

        // Погодный код находится в поле weather_code
        const code = data.current.weather_code;
        const iconEl = document.getElementById('weather-icon');
        iconEl.textContent = getIconFromCode(code);
        
        // Описание можно сделать на основе кода, либо просто оставить иконку
        iconEl.title = getDescriptionFromCode(code);

    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        document.getElementById('weather-icon').textContent = '❌';
        document.getElementById('weather-temp').textContent = 'Нет данных';
    }
}

// Вспомогательная функция для преобразования кодов WMO в иконки
function getIconFromCode(code) {
    // Коды взяты из документации Open-Meteo (WMO Weather interpretation codes)
    if (code === 0) return '☀️'; // Ясно
    if (code === 1 || code === 2) return '⛅'; // Переменная облачность
    if (code === 3) return '☁️'; // Пасмурно
    if (code >= 45 && code <= 48) return '🌫️'; // Туман
    if (code >= 51 && code <= 57) return '🌦️'; // Морось
    if (code >= 61 && code <= 67) return '🌧️'; // Дождь
    if (code >= 71 && code <= 77) return '❄️'; // Снег
    if (code >= 80 && code <= 82) return '🌧️'; // Ливень
    if (code >= 95 && code <= 99) return '⛈️'; // Гроза
    return '🌤️'; // Запасной вариант
}

function getDescriptionFromCode(code) {
    if (code === 0) return 'Ясно';
    if (code === 1 || code === 2) return 'Переменная облачность';
    if (code === 3) return 'Пасмурно';
    if (code >= 45 && code <= 48) return 'Туман';
    if (code >= 51 && code <= 57) return 'Морось';
    if (code >= 61 && code <= 67) return 'Дождь';
    if (code >= 71 && code <= 77) return 'Снег';
    if (code >= 80 && code <= 82) return 'Ливень';
    if (code >= 95 && code <= 99) return 'Гроза';
    return 'Погода';
}

loadWeather();
setInterval(loadWeather, 3600000);