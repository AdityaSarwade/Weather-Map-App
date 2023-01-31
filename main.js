    /*
    const btn = document.getElementById("btn-add");

    btn.addEventListener("click",addNum);

    function addNum()
    {
        const n1=document.getElementById("text1").value;
        const n2=document.getElementById("text2").value;

        const sum= +n1 + +n2;

        const resultDiv = document.getElementById("Result");
        resultDiv.innerHTML=sum;
    }
*/

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const data=await getWeatherData(lat,long);


            renderWeatherData(data);
        }
        )
    }
}
getLocation();



async function getWeatherData(lat,long)
{
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
            let response = await fetch(api);

            let data = await response.json();
            console.log(data);

            return data;
}

function renderWeatherData(data)
{
    document.getElementById("CityName").innerHTML = "City Name: "+data.name;
    document.getElementById("Temperature").innerHTML = "Temperature: "+data.main.temp;
    document.getElementById("Base").innerHTML = "Base: "+data.base;
    document.getElementById("Pressure").innerHTML = "Pressure: "+data.main.pressure;
    document.getElementById("Humidity").innerHTML = "Humidity: "+data.main.humidity;
    document.getElementById("WindSpeed").innerHTML = "WindSpeed: "+data.wind.speed;

}