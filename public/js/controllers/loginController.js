app.controller('loginController', function($scope, $window, $sessionStorage, $location, $http, $sce, createAccountService) {
	//$scope.main = false;
	$scope.user = 'user';
	//alert($sessionStorage.userM + ' **& TEST');

	$scope.refresh = function(val)
	{
		createAccountService.loginAccount(JSON.stringify(val))
		.then(function (response)
		{
			alert('Using Sessions');
			alert(response.data.user);
			$scope.main = true;
			$location.path('/login');
		});
		return;
	}

	$scope.login = function()
	{
		var loginData = {
			useremail: $scope.email,
			userpassword: $scope.password
		}

		createAccountService.loginAccount(JSON.stringify(loginData))
		.then(function (response)
		{
			if (response.data.login == '00')
			{
				$sessionStorage.track = '1';
				$sessionStorage.data = loginData;
				alert(response.data.user);
				$scope.main = true;
				$location.path('/login');
			} else {
				alert(response.data.user);
				$sessionStorage.track = undefined;
			}
			
		});
		return;
	}

	if ($sessionStorage.track == '1')
	{
		$scope.refresh($sessionStorage.data);
	}

	alert('LOGIN');
});