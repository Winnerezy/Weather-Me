const search = document.getElementById('search');
const find = document.getElementById('find');
const temp = document.getElementById('temp');
const weatherImg = document.getElementById('weatherImg');
const city = document.getElementById('city');
const windA = document.getElementById('windA');
const humidityA = document.getElementById('humidityA');
const main = document.getElementById('main');

search.addEventListener('keydown', (e)=>{
	if(e.key === 'Enter'){
	e.preventDefault();
	find.click();
	}
});

find.addEventListener('click', async()=> {
    //get the value of the location that will be seent to the server
    const location = search.value;
	search.value = "";

	if(search.value = ""){
		return;
	}
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
	document.getElementById("windText").innerHTML = result.wind.speed;
	requestAnimationFrame(windAnimate); //looping the animation

}


windAnimate()
}

let humidityApi = (result.humidity)
let humidity = 0;
function humidityAnimate(){
humidity += 1;
if(humidity <= humidityApi){ //if the initial speed is less or equal to the api speed the animation works
	humidityA.style.width = humidity + "px"
}
document.getElementById("humidityText").innerHTML = result.humidity;
requestAnimationFrame(humidityAnimate); //looping the animation
//position += 10;
//speed = result.wind.speed + speed;

}


humidityAnimate()
}
	

catch (error) {
	console.error('Error:', error);
} 
})

const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const amPM = document.getElementById('amPM');

//adding a clock to the UI
function time(){
const today = new Date();

const hourE = today.getHours();
const minuteE = today.getMinutes();
const secondE = today.getSeconds();

hour.textContent = hourT(hourE);
minute.textContent = padZero(minuteE);
second.textContent = padZero(secondE);
AP(hourE)
}
interval = setInterval(time, 1000);
time()

//changing to 12-digit time
function hourT(hourE){
	return hourE > 13? hourE - 12 : hourE;
}

//addin "0" to the beginning of < 10 numbers
function padZero(value){
	return value < 10? "0" + value : value;
}

//adding AM and PM to the time
function AP(hourE){
	if(hourE > 12){
		amPM.textContent = 'PM'
		//main.style.backgroundColor = "#3a5772"
	}
	else {
		amPM.textContent = 'AM'
	}
}

