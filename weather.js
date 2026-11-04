async function loadWeather() {
    try {
        const lat = 60.396676;
        const lon = 30.381688;

        const response = await fetch(
            `https://wttr.in/${lat},${lon}?format=j1`
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();

        // Структура wttr.in: data.current_condition[0]
        const current = data.current_condition[0];

        // Температура (приходит строкой, поэтому приводим к числу)
        const temp = Math.round(parseFloat(current.temp_C));
        document.getElementById('weather-temp').textContent = `${temp}°C`;

        // Погодный код wttr.in (это WWO code)
        const code = parseInt(current.weatherCode, 10);
        const iconEl = document.getElementById('weather-icon');
        iconEl.textContent = getIconFromWWO(code);

        // Описание берём из weatherDesc[0].value (русского в ответе нет)
        const description = current.weatherDesc[0].value.trim();
        iconEl.title = description;

        // Бонус: можно вывести название населённого пункта, если нужно
        // const area = data.nearest_area[0].areaName[0].value;
        // console.log('Погода для:', area);

    } catch (error) {
        console.error('Ошибка загрузки погоды:', error);
        document.getElementById('weather-icon').textContent = '❌';
        document.getElementById('weather-temp').textContent = 'Нет данных';
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

// и в loadWeather:
const description = translateDesc(current.weatherDesc[0].value.trim());
iconEl.title = description;

// Преобразование WWO weather code (World Weather Online) в эмодзи
function getIconFromWWO(code) {
    const icons = {
        113: '☀️', // Ясно
        116: '⛅', // Переменная облачность
        119: '☁️', // Облачно
        122: '☁️', // Пасмурно
        143: '🌫️', // Туман
        176: '🌦️', // Местами дождь
        179: '🌨️', // Местами снег
        182: '🌨️', // Местами мокрый снег
        185: '🌨️', // Местами ледяная морось
        200: '⛈️', // Местами гроза
        227: '🌨️', // Метель
        230: '❄️', // Пурга
        248: '🌫️', // Туман
        260: '🌫️', // Ледяной туман
        263: '🌦️', // Местами лёгкая морось
        266: '🌦️', // Лёгкая морось
        281: '🌧️', // Ледяная морось
        284: '🌧️', // Сильная ледяная морось
        293: '🌦️', // Местами лёгкий дождь
        296: '🌧️', // Лёгкий дождь
        299: '🌧️', // Местами умеренный дождь
        302: '🌧️', // Умеренный дождь
        305: '🌧️', // Местами сильный дождь
        308: '🌧️', // Сильный дождь
        311: '🌧️', // Лёгкий ледяной дождь
        314: '🌧️', // Умеренный/сильный ледяной дождь
        317: '🌨️', // Лёгкий мокрый снег
        320: '🌨️', // Умеренный/сильный мокрый снег
        323: '🌨️', // Местами лёгкий снег
        326: '🌨️', // Лёгкий снег
        329: '❄️', // Местами умеренный снег
        332: '❄️', // Умеренный снег
        335: '❄️', // Местами сильный снег
        338: '❄️', // Сильный снег
        350: '🌧️', // Ледяная крупа
        353: '🌦️', // Лёгкий ливень
        356: '🌧️', // Умеренный/сильный ливень
        359: '🌧️', // Проливной дождь
        362: '🌨️', // Лёгкий ливневый снег
        365: '🌨️', // Умеренный/сильный ливневый снег
        368: '🌨️', // Лёгкий снежный ливень
        371: '❄️', // Умеренный/сильный снежный ливень
        374: '🌧️', // Лёгкая ледяная крупа
        377: '🌧️', // Умеренная/сильная ледяная крупа
        386: '⛈️', // Местами лёгкий дождь с грозой
        389: '⛈️', // Умеренный/сильный дождь с грозой
        392: '⛈️', // Местами лёгкий снег с грозой
        395: '⛈️'  // Умеренный/сильный снег с грозой
    };
    return icons[code] || '🌤️';
}

loadWeather();
setInterval(loadWeather, 3600000);