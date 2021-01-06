/*
 * @Author: Silindokuhle (Sli)
 * @Date: 2019-06-14
 *
 * 
 */
app.service('postGoalService', function ($q, $http)
{
	let postGoalService = this

	postGoalService.postPersonalGoal = function (data)
	{
		return $http.get("/API/postPersonal" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* postGoalService.postPersonalGoal */ 
    
    postGoalService.postWorkGoal = function (data)
	{
		return $http.get("/API/postWork" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* postGoalService.postWorkGoal */  

	postGoalService.setWorkStatus = function (data)
	{
		return $http.get("/API/WorkSet" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	} /* postGoalService.setWorkStatus */ 

	postGoalService.setStatus = function (data)
	{
		return $http.get("/API/Setstatus" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	}
	/* postGoalService.setStatus */ 

	postGoalService.removePGoal = function (data)
	{
		return $http.get("/API/removepersonalGoal" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	}
	/* postGoalService.removePGoal */ 

	postGoalService.removeWGoal = function (data)
	{
		return $http.get("/API/workRemove" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	}
	/* postGoalService.workRemove */ 

	postGoalService.CheckAllGoals = function (data)
	{
		return $http.get("/API/Checkgoals" + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
	}
	/* postGoalService.CheckAllGoals */ 
})
