const search = document.getElementById('search');
const find = document.getElementById('find');
const temp = document.getElementById('temp');
const weatherImg = document.getElementById('weatherImg');

find.addEventListener('click', async()=> {
    //get the value of the location that will be seent to the server
    const location = search.value;

    const url = `https://open-weather13.p.rapidapi.com/city/${location}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '21ed8aea1bmshe75ea1d8431ff22p18b244jsn0b0eb90eee3a',
		'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

	//unknown or invalid loaction 
	if(result.main === undefined){
		temp.innerHTML = "Location Not Found"
		temp.style.fontSize = '20px'
	} else{
	temp.innerHTML =  Math.floor((result.main.temp - 32) * (5/9)) + "<sup>°c</sup>";
	}

} 
catch (error) {
	console.error('Error:', error);
} 
})