import { useEffect, useState } from "react";
import axios from "axios";

const HeaderBox = () => {
    const [greeting, setGreeting] = useState("Good Morning!");
    const [weatherText, setWeatherText] = useState("Fetching weather...");
    const [weatherEmoji, setWeatherEmoji] = useState("☀️");
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const fetchWeather = async () => {
        try {
            const locationMap: { [key: string]: { latitude: number; longitude: number } } = {
                Colombo: { latitude: 6.9271, longitude: 79.8612 },
            };
            const { latitude, longitude } = locationMap["Colombo"];

            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

            const response = await axios.get(apiUrl);
            const data = response.data.current_weather;
            const temp = Math.round(data.temperature);
            const weatherCode = data.weathercode;

            setWeatherEmoji(getWeatherEmoji(weatherCode));
            setWeatherText(`${temp}° | ${getWeatherDescription(weatherCode)}`);
        } catch (error) {
            console.error("Failed to fetch weather data", error);
            setWeatherText("Unable to fetch weather data.");
        }
    };

    function getWeatherDescription(weatherCode: number) {
        if ([0, 1].includes(weatherCode)) return "Clear sky";
        if ([2, 3].includes(weatherCode)) return "Partly cloudy or overcast";
        if ([45, 48].includes(weatherCode)) return "Foggy";
        if ([51, 53, 55].includes(weatherCode)) return "Drizzle";
        if ([61, 63, 65].includes(weatherCode)) return "Rain";
        if ([71, 73, 75].includes(weatherCode)) return "Snowfall";
        if ([80].includes(weatherCode)) return "Heavy rain";
        if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";
        return "Default";
    }

    const getWeatherEmoji = (weatherCode: number) => {
        if ([0, 1].includes(weatherCode)) return "☀️";
        if ([2, 3].includes(weatherCode)) return "☁️";
        if ([45, 48].includes(weatherCode)) return "🌫️";
        if ([51, 53, 55].includes(weatherCode)) return "🌦️";
        if ([61, 63, 65].includes(weatherCode)) return "🌧️";
        if ([71, 73, 75].includes(weatherCode)) return "❄️";
        if ([80].includes(weatherCode)) return "🌧️";
        if ([95, 96, 99].includes(weatherCode)) return "⛈️";
        return "🌈";
    };

    const updateGreeting = () => {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 5 && hours < 12) {
            setGreeting("Good Morning!");
        } else if (hours >= 12 && hours < 17) {
            setGreeting("Good Afternoon!");
        } else if (hours >= 17 && hours < 21) {
            setGreeting("Good Evening!");
        } else {
            setGreeting("Good Night!");
        }
    };

    useEffect(() => {
        updateGreeting();
        fetchWeather();
        const clockInterval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    return (
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-6">
            <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 ml-5" id="greeting-txt">
                    {greeting}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium ml-5" id="clock">
                    {time}
                </p>
            </div>
            <div className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <span className="mr-2 text-2xl sm:text-xl lg:text-2xl" id="weather-emoji">
                    {weatherEmoji}
                </span>
                <p id="weather-txt" className="font-medium text-xs sm:text-sm lg:text-base">
                    {weatherText}
                </p>
            </div>
        </header>
    );
};

export default HeaderBox;
