//var app = angular.module('myApp', [
//  'ngRoute']);
  
app.controller('personalController', function($scope, $sessionStorage, $window, $location, $http, $sce, postGoalService, createAccountService) {

	if ($sessionStorage.user == undefined)
	{
		$scope.user = "user";
	} else {
		$scope.user = $sessionStorage.user;
	}

	$scope.myVar = false;
	$scope.myVarw = false;
	$scope.login = false;
	$scope.starting = false;
	//$scope.main = true;

	//alert('!  Hope' + $sessionStorage.track);
	
	$scope.AddTextarea = function(val)
	{	
		if (val == 'p')
		{
			$scope.myVar = true;
		} 

		if (val == 'w') {
			$scope.myVarw = true;
		}

		//alert(val + "   -&&&&-  ");
		//
	}
	
	$scope.Cancel = function(val)
	{
		if (val == 'p')
		{
			$scope.myVar = false;
		} else if (val == 'w') {
			$scope.myVarw = false;
		}
		$scope.Clearall();
	}	

	$scope.Postgoal = function(val)
	{
		let i = 0;
		let qute = $scope.postdata;
		let valid = [];
		//.replace(/\s/g,' ')
	
		let mystr = '';
		if (qute != undefined)
		{
			mystr = qute.replace(/\s/g,' ');
		} else {
			mystr = qute;
		}
		
		if (qute != undefined)
		{
			while(mystr.indexOf('"') >= 0)
			{
				mystr = mystr.replace('"', "<q2>");
			}

			while(mystr.indexOf("'") >= 0)
			{
				mystr = mystr.replace("'", "<q1>");
			}
		}

		let qute2 = $scope.goaltitle;
		let mstr = qute2;

		if (mstr != undefined) {
			while(mstr.indexOf('"') >= 0)
			{
				mstr = mstr.replace('"', "<q2>");
			}

			while(mstr.indexOf("'") >= 0)
			{
				mstr = mstr.replace("'", "<q1>");
			}
		}
		
		//alert('Im POSTING !!!! ' + mystr);

		let data = {
			title: mstr,
			date: $scope.goaldate,
			goalDesc: mystr,
			userid: $sessionStorage.uid
		}

		let qute1 = $scope.postdataw;
		let mystrw='';
		if (qute1 != undefined)
		{
			mystrw = qute1.replace(/\s/g,' ');
		} else {
			mystrw = qute1;
		}

		if (qute1 != undefined)
		{
			while(mystrw.indexOf('"') >= 0)
			{
				mystrw = mystrw.replace('"', "<q2>");
			}

			while(mystrw.indexOf("'") >= 0)
			{
				mystrw = mystrw.replace("'", "<q1>");
			}
		}

		
		let qutet2 = $scope.goaltitlew;
		let mstr2 = qutet2;
		if (mstr2 != undefined)
		{
			while(mstr2.indexOf('"') >= 0)
			{
				mstr2 = mstr2.replace('"', "<q2>");
			}

			while(mstr2.indexOf("'") >= 0)
			{
				mstr2 = mstr2.replace("'", "<q1>");
			}
		}

		let data2 = {
			title: mstr2,
			date: $scope.goaldatew,
			goalDesc: mystrw,
			userid: $sessionStorage.uid
		}

		if (val == 'p')
		{
			postGoalService.postPersonalGoal(JSON.stringify(data))
			.then(function (response)
			{	
				// alert(response.data);
				//$scope.testa = response.data;
				//$scope.mHtml = response.data;
				//IMPORTANT THING IN LIFE!!!
				//$location.path('/');
				if (response.status != 200)
				{
					//$scope.myVar = false;
					alert(response.data);
				} else { 
					$scope.myVar = false;
					var text = response.data;
					//var text2 = $sce.trustAsHtml(text);
					//$scope.solved = text2;
					$scope.Clearall();
					 return $scope.start();
					 //return;
				}
			});
		} else if (val == 'w') {
			//alert('For WORK !! ');
			postGoalService.postWorkGoal(JSON.stringify(data2))
			.then(function (response)
			{	
				// alert(response.data);
				//$scope.testa = response.data;
				//$scope.mHtml = response.data;
				//IMPORTANT THING IN LIFE!!!
				//$location.path('/');
				if (response.status != 200)
				{
					//$scope.myVar = false;
				//	alert(response.data);
				} else { 
					$scope.myVarw = false;
					var text = response.data;
					//var text2 = $sce.trustAsHtml(text);
//					$scope.solved = text2;
					//$scope.Clearall();
					//$scope.start();
				//	alert('Arrived At LAST END! ');
					$scope.Clearall();
					 return $scope.start();
					 //return;
				}
			});
		}

		
		//$scope.start();

	}

	$scope.meetGoal = function(val)
	{
		//val is my sent goal list!
	//alert
	let index = val.butmet.substring(1, val.butmet.length);
	//alert(l + ' As ind');
		let myvalue = val.goaldesc;

		while(myvalue.indexOf('"') >= 0)
		{
			myvalue = myvalue.replace('"', "<q2>");
		}

		while(myvalue.indexOf("'") >= 0)
		{
			myvalue = myvalue.replace("'", "<q1>");
		}

		let updateData = {
			id: index,
			goaldesc: myvalue
		}


		//console.log(updateData);

		postGoalService.setStatus(JSON.stringify(updateData))
		.then(function (response)
		{
			//alert(response.data);
			return $scope.start();
		});
		//alert(' VAL ' + val.goal);
	}

	$scope.meetGoalWork = function(val)
	{
		//val is my sent goal list!
	//alert
	let index1 = val.wbutmet.substring(1, val.wbutmet.length);
	let myvalue = val.wgoaldesc;

		while(myvalue.indexOf('"') >= 0)
		{
			myvalue = myvalue.replace('"', "<q2>");
		}

		while(myvalue.indexOf("'") >= 0)
		{
			myvalue = myvalue.replace("'", "<q1>");
		}
	//alert(l + ' As ind');
		let updateData1 = {
			id: index1,
			wgoaldesc: myvalue
		}

		// alert(updateData1.id);

		postGoalService.setWorkStatus(JSON.stringify(updateData1))
		.then(function (response)
		{
			//alert(response.data);
			return $scope.start();
		});
		//alert(' VAL ' + val.goal);
	}

	$scope.removeGoal = function(val)
	{
		var index = val.butremove.substring(1, val.butremove.length);

		let myvalue = val.goaldesc;

		while(myvalue.indexOf('"') >= 0)
		{
			myvalue = myvalue.replace('"', "<q2>");
		}

		while(myvalue.indexOf("'") >= 0)
		{
			myvalue = myvalue.replace("'", "<q1>");
		}

		let updateData = {
			id: index,
			goaldesc: myvalue
		}
		
		let value = confirm("Are you sure you want to remove?");
		//alert(value);
		if (value)
		{
			postGoalService.removePGoal(JSON.stringify(updateData))
			.then(function (response)
			{
			//	alert(response.data + ' DEL');
				$window.location.reload();
				return $scope.start();
			});
		} else {
			$window.location.reload();
			$scope.start();
		}

	}

	$scope.removeGoalW = function(val)
	{
		var index1 = val.wbutremove.substring(1, val.wbutremove.length);

		let myvalue1 = val.wgoaldesc;

		while(myvalue1.indexOf('"') >= 0)
		{
			myvalue1 = myvalue1.replace('"', "<q2>");
		}

		while(myvalue1.indexOf("'") >= 0)
		{
			myvalue1 = myvalue1.replace("'", "<q1>");
		}

		let updateData = {
			id: index1,
			wgoaldesc: myvalue1
		}
		let value = confirm("Are you sure you want to remove?");
		//alert(value);

		if (value)
		{
		postGoalService.removeWGoal(JSON.stringify(updateData))
		.then(function(response) 
		{
		//	alert(response.data + ' DEL 2');

			//$location.path('/login');
			$window.location.reload();
			$scope.start();
		});
		} else {
			$window.location.reload();
			$scope.start();
		}
	}

	/*$scope.trustAsHtml = function(html) {
					
		 	html =  response.data;
			//alert('Hooray!');
			return $sce.trustAsHtml(html);
	}*/

	$scope.Clearall = function()
	{
		$scope.postdata = '';
		$scope.goaltitle = '';
		$scope.goaldate = '';
		$scope.postdataw = '';
		$scope.goaltitlew = '';
		$scope.goaldatew = '';
	}

	$scope.start = function()
	{
		//alert($sessionStorage.uid);
		if($sessionStorage.uid != undefined)
		{
		postGoalService.CheckAllGoals($sessionStorage.uid)
		.then(function (response)
		{
			if (response.status != 200)
			{
				//alert('! ANADA  Hope' + $sessionStorage.track);
			   //$scope.myVar = false;
				//alert($scope.main + ' As check ');
			   
			} else {
				//alert(response.data.rows[0].goal + " " + response.data.rowCount )
			   $scope.myVar = false;
			   $scope.myVarw = false;
			   // var text = response.data;
			    //var text2 = $sce.trustAsHtml(text);

			   if (response.data.personal != undefined)
			   {
		
				  let mydata = [];
				  for (var i = 0; i < response.data.personal.rowCount; i++)
				  {
						let date = response.data.personal.rows[i].goaldate; 
						let fixdate = date.toString();
						let fixdesc = response.data.personal.rows[i].goaldesc;

						while(fixdesc.indexOf("<q1>") >= 0)
						{
							fixdesc = fixdesc.replace('<q1>', "'");
						}

						while(fixdesc.indexOf("<q2>") >= 0)
						{
							fixdesc = fixdesc.replace('<q2>', '"');
						}

						let fixtitle1 = response.data.personal.rows[i].goal;

						while(fixtitle1.indexOf("<q1>") >= 0)
						{
							fixtitle1 = fixtitle1.replace('<q1>', "'");
						}

						while(fixtitle1.indexOf("<q2>") >= 0)
						{
							fixtitle1 = fixtitle1.replace('<q2>', '"');
						}

						let myjson = {
						goal: fixtitle1,
						goaldesc: fixdesc,
						goaldate: fixdate.substring(0, 10),
						butremove: response.data.personal.rows[i].butremove,
						butmet: response.data.personal.rows[i].butmet,
						goalstatus: response.data.personal.rows[i].goalstatus
						}

					 	 mydata.push(myjson);  
				  }
				//$scope.personalGoals = true;
				//alert( ' AS TEST THINGY !!  1');
				//alert(mydataw.wgoal[0] + ' AS TEST THINGY !! ');
				$scope.picklists1 = mydata;
			   }

			   let mydataw = [];
			   if (response.data.work != undefined)
			   {

				for (var i = 0; i < response.data.work.rowCount; i++)
				{
					  let wdate = response.data.work.rows[i].wgoaldate;
					  let wfixdate = wdate.toString();

					  let fixdescw = response.data.work.rows[i].wgoaldesc;

						while(fixdescw.indexOf("<q1>") >= 0)
						{
							fixdescw = fixdescw.replace('<q1>', "'");
						}

						while(fixdescw.indexOf("<q2>") >= 0)
						{
							fixdescw = fixdescw.replace('<q2>', '"');
						}

						let fixtitle2 = response.data.work.rows[i].wgoal;

						while(fixtitle2.indexOf("<q1>") >= 0)
						{
							fixtitle2 = fixtitle2.replace('<q1>', "'");
						}

						while(fixtitle2.indexOf("<q2>") >= 0)
						{
							fixtitle2 = fixtitle2.replace('<q2>', '"');
						}

					  let myjsonw = {
					  wgoal: fixtitle2,
					  wgoaldesc: fixdescw,
					  wgoaldate: wfixdate.substring(0, 10),
					  wbutremove: response.data.work.rows[i].wbutremove,
					  wbutmet: response.data.work.rows[i].wbutmet,
					  wgoalstatus: response.data.work.rows[i].wgoalstatus
					  }
						mydataw.push(myjsonw);
				}
				//alert( ' AS TEST THINGY !!  2');
				$scope.picklists2 = mydataw;
			   }

			   $scope.Clearall();
			  
			   //$scope.personalGoals = true;
			   //$scope.solved = text2;
			   return;
		   }
		});
		} 
		return;
	}

	$scope.refresh = function(val)
	{
		$scope.user = "user";

		createAccountService.loginAccount(val)
		.then(function (response)
		{
			//alert('Using Sessions');
			//;
			if (response.status != 200)
			{
				alert(response.data.user);
			} else {
				$sessionStorage.track = '1';
				$sessionStorage.uid = response.data.userid;
				$scope.main = true;
				$scope.user = response.data.user;
				$sessionStorage.user = response.data.user;
				$scope.start();
				$location.path('/login');
			}
		   // 
		});
		//$scope.start();
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
					$sessionStorage.uid = response.data.userid;
					$sessionStorage.track = '1';
					$sessionStorage.data = JSON.stringify(loginData);
				//	alert(response.data.user);
					$sessionStorage.user = response.data.user;
					$scope.main = true;
					//$scope.start();
					$scope.user = response.data.user;
					$location.path('/login');
					$window.location.reload();
				} else {
					alert(response.data.user);
					$sessionStorage.track = undefined;
				}
			});

		return;
	}

	$scope.back = function()
	{
		$sessionStorage.uid = undefined;
		$sessionStorage.user = undefined;
		$scope.user = 'user';
		$scope.myVar = false;
		$scope.myVarw = false;
		$scope.login = false;
		$scope.starting = false;
		$scope.main = false;
		$sessionStorage.track = undefined;
		$scope.Clearall();
		$location.path('/');
	}

	if ($sessionStorage.track == '1')
	{
		$scope.refresh($sessionStorage.data);
	} else {
		$scope.main = false;
	}

	//$scope.start();
//var text = "<textarea value='' rows='10' cols='50'> </textarea> <br> <button type='button' class='btn btn-warning'>   Post  </button> <button type='button' ng-model = 'Cancel()' class='btn btn-warning'> Cancel </button> <br><br>";

        // mark it as clean
        //text = $sce.trustAsHtml(text);

   // $scope.firstName = "John";
    //$scope.lastName = "Doe";
});