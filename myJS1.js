// JavaScript Document
function firebaseInit()
	{
	  var firebaseConfig = {
		apiKey: "AIzaSyDYSjXVHK9N9H_sQYF9jEb1k4Nhtl-V-us",
		authDomain: "joblist-kang.firebaseapp.com",
		databaseURL: "https://joblist-kang.firebaseio.com",
		projectId: "joblist-kang",
		storageBucket: "joblist-kang.firebasestorage.app",
		messagingSenderId: "704002182844",
		appId: "1:704002182844:web:636b84021295c9c629cab9",
		measurementId: "G-W779X1QZW2"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	
	}
	
function firebaseAuth()
	{
	  firebase.auth().signInWithEmailAndPassword("kangjianhai@gmail.com", "671691")
	   .then(function() {
		//window.alert("auth-ok");
		
		//success
		//  document.getElementById("demo").innerHTML = "ok";
		//  myFunction();
	   })
	  .catch(function() {
		window.alert("auth-wrong");
		// Error Handling
		  //document.getElementById("demo").innerHTML = "Wrong"; 
	  });
	
	}	
	
function checkPassWord()
	{
	  var userName = document.getElementById("un");
	  var passWord = document.getElementById("pw");
	  
		if(!userName.value=="" && !passWord.value==""){
			  var ref = firebase.database().ref('registeredPeople');
			  ref.once('value', function(snapshot) {
				var allPersonInfo=snapshot.val();	
				console.log(allPersonInfo);
				var mkeys=Object.keys(allPersonInfo);
					if(mkeys.includes(userName.value)){
						ref.child(userName.value).once('value', function(snapshot) {
							var userInfo=snapshot.val();//userInfo is obj
							//  console.log(userName.value);
							//  console.log(passWord.value);
							//  console.log(userInfo);
								if(passWord.value==userInfo.password){
									document.getElementById("demo").innerHTML = "password ok";
									var json = JSON.stringify(userInfo);//调用stringify()将一个JS对象转换为JSON
									window.localStorage.setItem('userInfo', json);
									getDriverArr(userInfo);
									// window.close();
									
									window.open('navbar.html');
									
								}else{
									document.getElementById("demo").innerHTML = "PassWord is Wrong"; 
								}
						
						   });
					}else{
						document.getElementById("demo").innerHTML = "username is wrong";	
					}


			  });

			  
		}else{
				 document.getElementById("demo").innerHTML = "UserName or PassWord is Empty"; 
		}
	
	}

	
function getDriverArr(userInfo)
	{
		//var companyName = userInfoObj.company;
		var ref = firebase.database().ref('registeredPeople');
		//console.log(userInfoObj.company);
		ref.once('value', function(snapshot) {
			var pathObj1=snapshot.val();//pathObj is obj			
			if(pathObj1==null){
				window.alert("driverObj==null");
				//console.log(pathObj1);
			}else{
				var driverArr = new Array();
				var driverArr1=Object.values(pathObj1)
				//console.log(driverArr1);
				for(i = 0,len=driverArr1.length; i < len; i++){
					
					//console.log(driverArr1[i]);
					if(driverArr1[i].company == userInfo.company){
						
						driverArr.push(driverArr1[i].username);
					}
					
				}
				var json2 = JSON.stringify(driverArr);//调用stringify()将一个JS对象转换为JSON
				window.localStorage.setItem('driverArr', json2);
				console.log(driverArr);
			}
			
		});	
	}		
	