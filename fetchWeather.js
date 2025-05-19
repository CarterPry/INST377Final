document.addEventListener('DOMContentLoaded', () => {
    
    //Used documentation to help
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const API_KEY = '89c7025f289f86ad60f6a2e98ddb20f1';

    async function fetchWeather(city){
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
        const data = await response.json();
        return data;
    }

    async function getWeather(){
        const city = document.getElementById('cityInput').value;

        
        try{
            const weatherData = await fetchWeather(city);
            if (!weatherData.current){
                document.getElementById('result').innerHTML = "<p>City not found</p>";
                return;
            }

            const resultHTML = 
            `
                <h3>${weatherData.location.name}, ${weatherData.location.country}</h3>
                <p>Temperature: ${weatherData.current.temperature} °C</p>
                <p>Weather: ${weatherData.current.weather_descriptions[0]}</p>
            `
            ;
            document.getElementById('result').innerHTML = resultHTML;

            await saveCity(weatherData.location.name);
        } 
        catch (error){
            console.error("Error fetching weather:", error);
        }
    }

    async function saveCity(city){
        const{ data, error } = await supabase
            .from('cities')
            .insert([{ city_name: city }])
            .select();

        if (error){
            console.error('Failed to save city to Supabase:', error.message);
        } 
        else 
        {
            console.log('City saved to Supabase:', data);
        }
    }

    async function getSavedCities(){
        const{ data, error } = await supabase
            .from('cities')
            .select('*')
            .order('created_at', { ascending: false });

        if (error){
            console.error('Failed to fetch data:', error.message);
            return;
        }

        const ul = document.getElementById('savedCities');
        ul.innerHTML = '';
        data.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city.city_name;
            ul.appendChild(li);
        });
    }

    document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
    document.getElementById('getSavedCitiesBtn').addEventListener('click', getSavedCities);
});