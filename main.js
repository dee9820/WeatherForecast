function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=2fbe94fcddc9faf776bc802a0f1818d0')
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min / 10).toFixed(1) + "°";
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max / 10).toFixed(1) + "°";
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("hum" + (i + 1)).innerHTML = "Humidity: " + Number(data.list[i].main.humidity) + "%";
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("speed" + (i + 1)).innerHTML = "Wind: " + Number(data.list[i].wind.speed) + " mph";
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("w" + (i + 1)).innerHTML =  (data.list[i].weather[0].description) ;
            }
            
            //------------------------------------------------------------

            //Getting Weather Icons
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon
                    + ".png";

            }

            for (i = 0; i < 5; i++) {
                var d = new Date();
                // current_date.setDate(current_date.getDate() + i);
                // document.getElementById("p1").innerHTML = current_date.toString();
                document.getElementById("p"+(i+1)).innerHTML = (d.getDate()+i)+ "/"+ (d.getMonth()+1)+"/"+(d.getFullYear());
            }
            //------------------------------------------------------------
            console.log(data)


        })

        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Delhi";
    GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
//------------------------------------------------------------
//date and time
setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + " " + am_pm;
    var date = new Date();
    var current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var date_time = current_date + " " + currentTime;
    document.getElementById("clock").innerHTML = date_time;
}




