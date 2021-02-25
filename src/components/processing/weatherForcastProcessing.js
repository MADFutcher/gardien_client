

function ProcessWeatherForcast(weatherForecast, locationId, plantInfo){
    const weatherForecastData = weatherForecast
    let warnings =[]
    let warningInfo = {}
    weatherForecastData.forecastday.forEach(foreCastedDay=>{
        const maxDayTemp = foreCastedDay.day.maxtemp_c
        const minDayTemp = foreCastedDay.day.mintemp_c
        const forecastedDate = foreCastedDay.date
        
        const tooHot = []
        const tooCold = []
    

        plantInfo.forEach(plant=>{
            let plantName = plant.name
            let plantMaxTemp = plant.maxTemp
            let plantMinTemp = plant.minTemp
            if(minDayTemp < plantMinTemp){
                tooCold.push(plantName)
            }
            if(maxDayTemp>plantMaxTemp){
                tooHot.push(plantName)
            }
        })
        
        if(tooHot.length>0){
            warningInfo = {
                plants:tooHot,
                severity:"high",
                date:forecastedDate,
                tempState:'low'
            }
            warnings.push(warningInfo)
        }
        if(tooCold.length>0){
            warningInfo = {
                plants:tooCold,
                severity:"high",
                date:forecastedDate,
                tempState:'high'
            }
            warnings.push(warningInfo)
        }
    })
    return warnings
}

export default ProcessWeatherForcast;