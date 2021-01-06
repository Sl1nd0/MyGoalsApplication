app.service('createAccountService', function ($q, $http)
{
	let postGoalService = this

	postGoalService.createAccount = function (data)
	{
		return $http.get('/API/CreateAccount' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* createAccountService.createAccount */ 

    postGoalService.loginAccount = function (data)
	{
		return $http.get('/API/loginAccount' + data)
		.then(function (response)
		{
			return response;
		},
		function (response)
		{
			return response;
		})
    } /* createAccountService.createAccount */ 

});