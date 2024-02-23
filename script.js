const search = document.getElementById('search');
const find = document.getElementById('find');
const temp = document.getElementById('temp');
const weatherImg = document.getElementById('weatherImg');
const city = document.getElementById('city');
const windA = document.getElementById('windA');

find.addEventListener('click', async()=> {
    //get the value of the location that will be seent to the server
    const location = search.value;
	search.value = "";

	const url = `https://weatherx.p.rapidapi.com/weather/v1.0/current?location=${location}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '21ed8aea1bmshe75ea1d8431ff22p18b244jsn0b0eb90eee3a',
		'X-RapidAPI-Host': 'weatherx.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

	//if unknown or invalid loaction shows an error message and  font size reduces
	if(result.temperature === undefined){
		temp.innerHTML = "Location Not Found"
		temp.style.fontSize = '20px'
	} else{
	temp.innerHTML =  result.temperature.current + "<sup>°c</sup>";
	temp.style.fontSize = '5rem'
	city.textContent = result.location
	/*
	//changes the image due to the insight reading
	switch(result.data.current_weather){
		case 'Rain':
			weatherImg.src = "img/rainy_FILL0_wght400_GRAD0_opsz24.svg"
			break;
		case 'Cloud':
			weatherImg.src = "img/cloudy_snowing_FILL0_wght400_GRAD0_opsz24.svg"
			break;
	}*/

	//wind speed with animation
	let speedApi = (result.wind.speed) * 10
	let speed = 0;
function windAnimate(){
	speed += 1;
	if(speed <= speedApi ){ //if the initial speed is less or equal to the api speed the animation works
		windA.style.width = speed + "px"
	}
	document.getElementById("windtext").textContent = result.wind.speed;
	requestAnimationFrame(windAnimate); //looping the animation
	//position += 10;
//speed = result.wind.speed + speed;

}


windAnimate()
}
	

} 
catch (error) {
	console.error('Error:', error);
} 
})



	
	