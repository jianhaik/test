import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {myMap} from "./readDb";
import {handleref} from "../main";
import {dataArr,dataMap, ruleMap,spKeysArr} from "./baseinit";

  const signIn = () => {
	const firebaseConfig = {
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
	  const appInt = initializeApp(firebaseConfig);
	  const db = getDatabase(appInt);
	  console.log(db);
		const auth = getAuth();

		signInWithEmailAndPassword(auth,"kangjianhai@gmail.com", "671691")
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
            console.log(user.uid);
			return user.uid;
		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
            console.log(errorMessage+"="+errorCode);
			return errorMessage+"="+errorCode;
		  });
		
	}

  const writeDataBase = () => {
	
		const firebaseConfig = {
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
		  const appInt = initializeApp(firebaseConfig);
			const db = getDatabase(appInt);

			console.log(db);
		
		var a=localStorage.getItem('action');
		var b=localStorage.getItem('toWho');
		var barcodeValue=localStorage.getItem('selRows');
		var barcodeArr=JSON.parse(barcodeValue!);
		let myTime= new Date().valueOf(); 
	  var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
		const timeStr = (new Date(myTime+offset)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
		var userIn = window.localStorage.getItem('userInfo') ?? '{}';
		var userInfoObj=JSON.parse(userIn!);
		for (var k = 0; k < barcodeArr.length; k++){
			const refPath=userInfoObj.company+'/OriginalData'+'/'+barcodeArr[k];
			 const postListRef = ref(db, refPath);
			 const newPostRef = push(postListRef);
			
			switch(a) {
				case "dispatchTo":

					if(myMap.get(barcodeArr[k])[55]=="Finished" ||myMap.get(barcodeArr[k])[55]=="Terminated"){
						window.alert("Finished/Terminated item ("+barcodeArr[k]+") can not be dispatched again!");
						
					}else{
						set(newPostRef, {
							F0_When: timeStr,
							F1_ByWhoDispatch: userInfoObj.username,
							F2_ToWho : b,
							L0_LastStep:'Dispatched',
						})
						.then(() => {
							// Data saved successfully!
							
						})
						.catch((error) => {
							console.log(error);	
						});
					}
					

				break;
				case "undispatch":
					if(myMap.get(barcodeArr[k])[55]=="Finished" ||myMap.get(barcodeArr[k])[55]=="Terminated"){
						window.alert("Finished/Terminated item ("+barcodeArr[k]+") can not be undispatched!");
						
					}else{
						set(newPostRef, {
							A0_When: timeStr,
							A1_ByWhoAdd: userInfoObj.username,			
							L0_LastStep:'UnDispatch',
						})
						.then(() => {
							// Data saved successfully!
							
						})
						.catch((error) => {
							console.log(error);	
						});
					}
					
					
				break;
				case "deleteItems":
					set(postListRef, null)
					.then(() => {
						// Data saved successfully!
						
					})
					.catch((error) => {
						console.log(error);	
					});
					
				break;
				case "terminateItems":
					
					set(newPostRef, {
						J0_When: timeStr,
						J1_ByWhoTerminate: userInfoObj.username,
						J2_TerminateAction : b,
						L0_LastStep:'Terminated',
					})
					.then(() => {
						// Data saved successfully!
						
					})
					.catch((error) => {
						console.log(error);	
					});
					
				break;
				
				default:
				//默认代码块
			} 
		  
		}

		handleref();
		
	}

	const dispatchAll = () => {
		const firebaseConfig = {
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
		  const appInt = initializeApp(firebaseConfig);
			const db = getDatabase(appInt);

			console.log(db);

		var newDate=localStorage.getItem('newDate');
		var barcodeArr=new Array();
		
		for (var k = 0; k < dataArr.length; k++) {
			if(dataArr[k][6]==newDate && dataArr[k][55]=='UnDispatch'){
				barcodeArr.push(dataArr[k][4])
			}						
		}
		if(barcodeArr.length>0){
			for (var j = 0; j < barcodeArr.length; j++) {
				var eachArr:string[]=dataMap.get(barcodeArr[j]);
				var postCode=eachArr[19].slice(0,3);
				var driver=ruleMap.get(postCode);
				let myTime= new Date().valueOf(); 
				var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
				const timeStr = (new Date(myTime+offset)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
				var userIn = window.localStorage.getItem('userInfo') ?? '{}';
				var userInfoObj=JSON.parse(userIn!);
				const refPath=userInfoObj.company+'/OriginalData'+'/'+barcodeArr[j];
				const postListRef = ref(db, refPath);
				const newPostRef = push(postListRef);
				set(newPostRef, {
					F0_When: timeStr,
					F1_ByWhoDispatch: userInfoObj.username,
					F2_ToWho : driver,
					L0_LastStep:'Dispatched',
				})
				.then(() => {
					// Data saved successfully!
					
				})
				.catch((error) => {
					console.log(error);	
				});
			}
			handleref();
		}
		

	}
	
	const unDispatchSp = () => {
		const firebaseConfig = {
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
		  const appInt = initializeApp(firebaseConfig);
			const db = getDatabase(appInt);

			console.log(db);

		var newDate=localStorage.getItem('newDate');
		var barcodeArr=new Array();
		
		for (var k = 0; k < dataArr.length; k++) {
			if(dataArr[k][6]==newDate && dataArr[k][55]=='Dispatched' && spKeysArr.includes(dataArr[k][19])){
				barcodeArr.push(dataArr[k][12])
			}else if(dataArr[k][6]==newDate && dataArr[k][55]=='MeetTrouble' && spKeysArr.includes(dataArr[k][19])){
				barcodeArr.push(dataArr[k][4])
			}						
		}
		if(barcodeArr.length>0){
			for (var j = 0; j < barcodeArr.length; j++) {
				//var eachArr:string[]=dataMap.get(barcodeArr[j]);
				
				let myTime= new Date().valueOf(); 
				var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
				const timeStr = (new Date(myTime+offset)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
				var userIn = window.localStorage.getItem('userInfo') ?? '{}';
				var userInfoObj=JSON.parse(userIn!);
				const refPath=userInfoObj.company+'/OriginalData'+'/'+barcodeArr[j];
				const postListRef = ref(db, refPath);
				const newPostRef = push(postListRef);
				set(newPostRef, {
					A0_When: timeStr,
					A1_ByWhoAdd: userInfoObj.username,			
					L0_LastStep:'UnDispatch',
				})
				.then(() => {
					// Data saved successfully!
					
				})
				.catch((error) => {
					console.log(error);	
				});
			}
			handleref();
		}


	}

	const matchObj = {
		A0_When:"A0_When",
		A1_ByWhoAdd:"A1_ByWhoAdd",
		B0_JobID:"B0_JobID",
		B1_ModeID:"B1_ModeID",
		B2_Barcode:"B2_Barcode",
		B3_CarrierRef:"B3_CarrierRef",
		B4_ScheduledDate:"B4_ScheduledDate",
		B5_BTACC:"B5_BTACC",
		B6_ServiceType:"B6_ServiceType",
		B7_Weight:"B7_Weight",
		B8_Unit:"B8_Unit",
		B9_Route:"B9_Route",
		C0_Company:"C0_Company",
		C1_Address1:"C1_Address1",
		C2_Address2:"C2_Address2",
		C3_Address3:"C3_Address3",
		C4_Receiver:"C4_Receiver",
		C5_City:"C5_City",
		C6_ProvState:"C6_ProvState",
		C7_PostalCode:"C7_PostalCode",
		C8_Phone:"C8_Phone",
		C9_Email:"C9_Email",
		D0_When:"D0_When",
		D1_ByWhoPrice:"D1_ByWhoPrice",
		D2_WhatType:"D2_WhatType",
		D3_Size:"D3_Size",
		D4_HowMany:"D4_HowMany",
		D5_ExtraFee:"D5_ExtraFee",
		id:"D6_What",
		D7_What:"D7_What",
		D8_StartTime:"D8_StartTime",
		D9_EndTime:"D9_EndTime",
		E0_When:"E0_When",
		E1_ByWhoReceive:"E1_ByWhoReceive",
		F0_When:"F0_When",
		F1_ByWhoDispatch:"F1_ByWhoDispatch",
		F2_ToWho:"F2_ToWho",
		G0_When:"G0_When",
		G1_ByWhoLoad:"G1_ByWhoLoad",
		H0_When:"H0_When",
		H1_ByWhoTrouble:"H1_ByWhoTrouble",
		H2_TroubleReason:"H2_TroubleReason",
		H3_Comment:"H3_Comment",
		H4_Photo:"H4_Photo",
		I0_When:"I0_When",
		I1_ByWhoFinish:"I1_ByWhoFinish",
		I2_Receiver:"I2_Receiver",
		I3_Comment:"I3_Comment",
		I4_Photo:"I4_Photo",
		J0_When:"J0_When",
		J1_ByWhoTerminate:"J1_ByWhoTerminate",
		J2_TerminateAction:"J2_TerminateAction",
		K0_When:"K0_When",
		K1_ByWhoGroup:"K1_ByWhoGroup",
		K2_GroupCode:"K2_GroupCode",
		L0_LastStep:"L0_LastStep"

	};
	const matchKeys:string[]=Object.keys(matchObj);
	const writeChange = (a:number[],b:string[]) => {
		
		console.log(a);
		console.log(b);
		var obj: { [key: string]: any } = {};
		for (var j = 0; j < a.length; j++) {
			
			var newkey=matchKeys[a[j]];//key
			var newValue=b[a[j]];//new value
			if(b[55]=='Finished' || b[55]=='Terminated' ){
					if(a[j]>22){
						obj[newkey]=newValue;	
					}
			}else{
						obj[newkey]=newValue;
						
			}
		}

		

		const firebaseConfig = {
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
		  const appInt = initializeApp(firebaseConfig);
			const db = getDatabase(appInt);

			console.log(db);

		let myTime= new Date().valueOf(); 
		var offset=new Date().getTimezoneOffset()*-60*1000; // offset mm
		const timeStr = (new Date(myTime+offset)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
		var userIn = window.localStorage.getItem('userInfo') ?? '{}';
		var userInfoObj=JSON.parse(userIn!);
		const refPath=userInfoObj.company+'/OriginalData'+'/'+b[4];
		const postListRef = ref(db, refPath);
		const newPostRef = push(postListRef);
		obj['A0_When']=timeStr;
		obj['A1_ByWhoAdd']=userInfoObj.username;
		if(b[55]=='Finished' || b[55]=='Terminated'){
			
		}else{
			obj['L0_LastStep']='UnDispatch';
		}
		
	

		set(newPostRef, obj)
		.then(() => {
			// Data saved successfully!
			window.alert( 'Data saved successfully!');
			var y = document.getElementById('itemEdit'); 
    y!.style.display = "none";
		})
		.catch((error) => {
			console.log(error);	
		});

	}
	
export {writeDataBase,signIn,dispatchAll,unDispatchSp,writeChange}