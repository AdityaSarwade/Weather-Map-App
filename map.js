function setMap()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const data=await getWeatherData(lat,long);

            // Creating map options
            var mapOptions = {
            center: [lat,long],
            zoom: 16
            }
         
            // Creating a map object
            var map = new L.map('map', mapOptions);
         
            // Creating a Layer object
            var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
               maxzoom: 10,
               attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });

            // Creating a marker
            var marker = new L.marker([lat,long]);
            marker.bindPopup(data.name).openPopup();

            // On clicking map
            map.on('click',async function(e){
               console.log("Lat: "+e.latlng.lat+" Long: "+e.latlng.lng);
            })

            // Adding layer to the map
            map.addLayer(layer);
            map.addLayer(marker);
            
        }
        )
    }
}
setMap();

async function getWeatherData(lat,long)
{
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
            let response = await fetch(api);

            let data = await response.json();
            console.log(data);

            return data;
}
