const getData = input => {
 
	axios.get(`https://wger.de/api/v2/exercise/?language=2&status=2&limit=200`)
		.then(response => {
			console.log(response)
			const exercises = response.data


		})
		.catch(err => console.log(err))
}



	// Get data from  API
	getData(input)


    