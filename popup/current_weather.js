

function saveOptions(e) {
	e.preventDefault();
	
	var selected_units = document.querySelector('input[name="units"]:checked').value;
	var city_name = document.querySelector('#city_name').value;
	
	var settings = {};
  
	settings.units = selected_units;
	settings.city_name = city_name;
  
	
	  function onError(error) {
		  console.log(`Error: ${error}`);
	  }
	
	setting = browser.storage.local.set({settings});
	setting.then(null, onError);
	
	browser.runtime.sendMessage({settings});
  }
  
  function restoreOptions() {
  
	function setCurrentChoice(result) {  
	  
	  if(result.settings) {
		  document.settingForm.units.value = result.settings.units;
		  document.settingForm.city_name.value = result.settings.city_name;
	  } else {
		  document.settingForm.units.value = "metric";
		  document.settingForm.city_name.value = "Kiev";
	  }
	  
	}
  
	function onError(error) {
	  console.log(`Error: ${error}`);
	}
  
	var getting = browser.storage.local.get("settings");  
	getting.then(setCurrentChoice, onError);
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);



var getting = browser.storage.local.get("weather");
	getting.then(onWeatherGot, onError)		


function onWeatherGot(item) {
	console.log(item.weather)
	
	var weatherIcon = document.getElementById("weather-icon");
	var nowDes = document.getElementById("nowDes");
	var reminder = document.getElementById("reminder");

	weatherIcon.src = '/icons/' + item.weather.weather[0]['icon'] + '.png';
	weatherIcon.alt =  item.weather.weather[0]['description'];	
	weatherIcon.title =  item.weather.weather[0]['description'];
	remind = item.weather.weather[0]['main'];

	var cityName = document.getElementById("city-name");
	
	cityName.textContent = item.weather['name'] + ", " + item.weather['sys']['country'];
	nowDes.textContent = weatherIcon.title;
	
	

	//function remind(msg){
		if (remind == 'Clear'){
			 msg = "Hot weather! Drink more water";
		}if (remind == 'Rain') {
			 msg = "Bring your umbrella!";
		}if (remind == 'Clouds'){
			msg = "Good day!";
	   	}if (remind == 'Snow') {
			msg = "Wear more clothes";
	   	}if (remind == 'Drizzle'){
			msg = "Wear raincoat";
	   	}if (remind == 'Thunderstorm') {
			msg = "Dont stay out!";
	   	}
		// }else if (nowDes = 'light rain') {
		// 	msg = "Bring your umbrella";
		// }
		//return msg;
	//}
	reminder.textContent =msg;
	
	 
}


function onError(error) {
  console.log(`Error: ${error}`);
  console.log("Error happend");
}


