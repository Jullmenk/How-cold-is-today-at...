export async function handler(cityNames) {
    const apiKey = process.env.WEATHER_API_KEY;
    
    try {
        const weatherData = await Promise.all(
            cityNames.map(async (city) => {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
                const response = await fetch(apiUrl);
                return await response.json();
            })
        );
        return weatherData; 

    } catch (error) {
        console.log("Erro ao fetch data", error);
        return { error: "An error occurred while fetching data" };
    }
}
