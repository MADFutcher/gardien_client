

function ProcessWeatherForcast(weatherForecast, locationId, plantInfo){
    const weatherForecastData = weatherForecast
    let warnings =[]
    let warningInfo = {}
    weatherForecastData.forecastday.forEach(foreCastedDay=>{
        const maxDayTemp = foreCastedDay.day.maxtemp_c
        const minDayTemp = foreCastedDay.day.mintemp_c
        const forecastedDate = foreCastedDay.date
        plantInfo.forEach(plant=>{
            let plantName = plant.name
            let plantMaxTemp = plant.maxTemp
            let plantMinTemp = plant.minTemp
            if(minDayTemp < plantMinTemp){
                warningInfo = {
                    plantName,
                    message:"The Temperature will be too cold for your plant",
                    severity:"high",
                    date:forecastedDate,
                    tempState:'low'
                }
                warnings.push(warningInfo)
            }
            if(maxDayTemp>plantMaxTemp){
                warningInfo = {
                    plantName,
                    message:"The Temperature will be too Hot for your plant",
                    severity:"high",
                    date:forecastedDate,
                    tempState:'high'
                }
                warnings.push(warningInfo)
            }
        })
    })
    return warnings
}

export default ProcessWeatherForcast;