window.onload=function(){
    weatherApp();
}

function weatherApp(){
    let long;
    let lat;
    let city=document.querySelector('.city');
    let temperature=document.querySelector('.temp');
    let weather=document.querySelector('.weather');
    let skyIcon=document.querySelector('.skyicon');
    let humid=document.querySelector('.humid');
    let wind=document.querySelector('.wind');
    let htmp=document.querySelector('.htemp');
    let ltemp=document.querySelector('.ltemp');
    let activityTit=document.querySelector('.activity-tit');
    let activityIcon=document.querySelector('.activity-icon');
    let clothesTit=document.querySelector('.clothes-tit');
    let clothesIcon=document.querySelector('.clothes-icon');
    const kel=273.15;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            //console.log(long);
           
        let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=99a0b110b789603bd3ca7c53f8a44018`;
            fetch(api)
            .then(response=>{
                let data = response.json();
                return data;     
            })
            .then(data=>{
                //console.log(data);
                city.textContent=data.name.toUpperCase()+","+"\n"+data.sys.country;
                temperature.textContent=Math.floor(data.main.temp-kel);
                weather.textContent=data.weather[0].main;
                humid.textContent=data.main.humidity;
                wind.textContent=data.wind.speed;
                htmp.textContent=Math.floor(data.main.temp_max-kel);
                ltemp.textContent=Math.floor(data.main.temp_min-kel);

                let skyCondition=data.weather[0].main;
                let temp=Math.floor(data.main.temp-kel);

                activityData(skyCondition);
                clothesData(temp);
            })

            function activityData(sky){
                if(sky=='Clear'){
                    skyIcon.innerHTML='<i class="fas fa-sun"></i>';
                    activityTit.textContent='Jogging';
                    activityIcon.innerHTML='<i class="fas fa-running"></i>';
                }else if(sky=='Snow'){
                    skyIcon.innerHTML='<i class="fas fa-snowflake"></i>';
                    activityTit.textContent='Drink Hot Chocolate';
                    activityIcon.innerHTML='<i class="fas fa-mug-hot"></i>';
                }else if(sky=='Rain'){
                    skyIcon.innerHTML='<i class="fas fa-cloud-showers-heavy"></i>';
                    activityTit.textContent='Watch Movies';
                    activityIcon.innerHTML='<i class="fas fa-video"></i>';
                }
            }//activityData

            function clothesData(deg){
                if(deg <=18 && deg >= 5){
                    clothesTit.textContent='Coat';
                    clothesIcon.innerHTML='<i class="fas fa-user-secret"></i>';
                }else if(deg <=5 && deg >= -10){
                    clothesTit.textContent='Mitten';
                    clothesIcon.innerHTML='<i class="fas fa-mitten"></i>';
                }else if(deg >= 18 && deg <=25){
                    clothesTit.textContent='Tshirt';
                    clothesIcon.innerHTML='<i class="fas fa-tshirt"></i>';
                }else if(deg >= 25){
                    clothesTit.textContent='Cool Down';
                    clothesIcon.innerHTML='<i class="fas fa-fan"></i>';
                }else if(deg <= -10){
                    clothesTit.textContent='Heat Up';
                    clothesIcon.innerHTML='<i class="fas fa-fire"></i>';
                }
            }
            
           


        })
    }else{
        alert('please confirm your location!');
    }
}