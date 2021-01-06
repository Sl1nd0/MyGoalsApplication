app.controller('createController', function($scope, $filter, $window, $location, $http, $sce, createAccountService) {
	//$scope.main = false;
	//alert('CREATE');
	$scope.user = 'user';
	$scope.Create = function()
	{
		let passConfirm = $scope.password2;
		let mydate = $scope.birthdate;
		//let shortdate1 = mydate.toString().substring(0, 10);
		//let datem = $filter('date')(mydate, "yyyy-mm-dd");
		//alert('NAME ' + mydate);
		let data = {
			name: $scope.name,
			surname: $scope.surname,
			birthdate: mydate,
			email: $scope.email,
			number: $scope.number,
			password: $scope.password
		}

		if ($scope.password.trim() == passConfirm.trim())
		{
		 
			if ($scope.password.length > 5)
			{
				createAccountService.createAccount(JSON.stringify(data))
				.then(function (response)
				{
					if (response.status != 200)
					{

						alert(response.data);
						//$scope.Back();
					} else {
						alert('Account created successfully');
						$scope.Back();
					}
					
				});
			} else {
				alert('Password length should be atleast 6 or more characters');
			}
		} else if ($scope.password.trim() != passConfirm.trim()) {
			alert('Password Does not match with confirmation password, please re-enter ');
		}
	}

	$scope.Back = function()
	{
		$scope.clearall();
		$location.path('/');
		return;
	}

	$scope.clearall = function()
	{
		$scope.name = '';
		$scope.surname = '';
		$scope.birthdate = '';
		$scope.email = '';
		$scope.number = '';
		$scope.password = '';
		$scope.password2 = '';
	}

});