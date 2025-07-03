async function loadWeather() {
            try {
                const API_KEY = '7aed8fd9e8ffe16580116dcfa41a3620';
                const city = 'Vaskelovo,RU';

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
                );
                const data = await response.json();

                document.getElementById('weather-temp').textContent = `${Math.round(data.main.temp)}°C`;
                document.getElementById('weather-icon').textContent = getIcon(data.weather[0].icon);

                const description = data.weather[0].description;
                document.getElementById('weather-icon').title = description.charAt(0).toUpperCase() + description.slice(1);

            } catch (error) {
                console.error('Ошибка загрузки погоды:', error);
                document.getElementById('weather-icon').textContent = '❌';
                document.getElementById('weather-temp').textContent = 'Нет данных';
            }
        }

        function getIcon(iconCode) {
            const icons = {
                '01d': '☀️', '01n': '🌙',
                '02d': '⛅', '02n': '⛅',
                '03d': '☁️', '03n': '☁️',
                '04d': '☁️', '04n': '☁️',
                '09d': '🌧️', '09n': '🌧️',
                '10d': '🌦️', '10n': '🌦️',
                '11d': '⛈️', '11n': '⛈️',
                '13d': '❄️', '13n': '❄️',
                '50d': '🌫️', '50n': '🌫️'
            };
            return icons[iconCode] || '🌤️';
        }

        loadWeather();
        setInterval(loadWeather, 3600000); 