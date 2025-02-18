import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import DateLi from "./dateList";
import { createRoot } from 'react-dom/client'
import Table from "./table.tsx";
import {dispatchAll,unDispatchSp} from './writeDb'

var dataArr = new Array();
var dataMap=new Map();
var ruleMap= new Map();
var allDate = new Array();
var spKeysArr = new Array();

const moveData = () => {
	var userIn = window.localStorage.getItem('userInfo') ?? '{}';
	window.sessionStorage.setItem('userInfo', userIn!);
	var dArr = window.localStorage.getItem('driverArr') ?? '[]';
	window.sessionStorage.setItem('driverArr', dArr);
	var userInfoObj=JSON.parse(userIn!);
	var companyName=document.getElementById("companyName");
	companyName!.innerHTML=userInfoObj.company;
}


  
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

const getData = () => {
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
		  var userIn = window.sessionStorage.getItem('userInfo') ?? '{}';
		  var userInfoObj=JSON.parse(userIn!);
		  const db = getDatabase(appInt);
		  var pathName = userInfoObj.company+"/OriginalData";
		  console.log(pathName);
		  onValue(ref(db, '/' + pathName), (snapshot) => {
			const pathObj = snapshot.val()  ;
			console.log(pathObj);
			preData(pathObj);
			// ...
		  }, {
			onlyOnce: true
		  });
			
	}

  
	function preData(origObj: any){
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
			L0_LastStep:"L0_LastStep",
			
			};
			//var dataArr2 = new Array();
			dataArr=[];
			//var dataMap2 = new Map();
			dataMap.clear;
			//var allDate2 = new Array();
			allDate=[];

			var matchKeys = new Array();
			var matchValues = new Array();
		 matchKeys=Object.keys(matchObj);
		 matchValues=Object.values(matchObj);
		 console.log(matchKeys);	
		 console.log(matchValues);
		 var barcoArr = new Array();
		 var keyArr=new Array();
		 barcoArr = Object.values(origObj);//barcodeArr=barcode's values
		var endDataArr = new Array();
		
		
		for (var i = 0; i < barcoArr.length; i++) {//i < barcodeArr.length
			//console.log('i='+i);
				 keyArr=Object.values(barcoArr[i]);//keyArr=key's values		
			//	console.log('keyArr='+keyArr);	
			//	console.log(keyArr);	
				 endDataArr=[];
				//maxArr=[];
				for (var n1 = 0; n1 < 56; n1++) {
					endDataArr.push('nil');
					
				}		
				
				
				for (var j = 0; j < keyArr.length; j++) {
	
					var endKeys=Object.keys(keyArr[j]);
					var endValues=Object.values(keyArr[j]);	
					// console.log(endKeys);
					// console.log(endValues);
					for (var k2 = 0; k2 < endKeys.length; k2++) {
	
	
						if(matchValues.includes(endKeys[k2])){
							var aaa=matchValues.indexOf(endKeys[k2]);
							var bbb=endKeys.indexOf(endKeys[k2]);
							// console.log(endKeys[k2]);
							// console.log(aaa);
							// console.log(endValues[aaa]);
							// console.log(endDataArr[aaa]);
							endDataArr[aaa]=endValues[bbb];
							//console.log(endDataArr[aaa]);
						}
					}
					
				}
				//endDataArr[0]=false;
				//console.log(matchObj);
					if(endDataArr[55]=='UnDispatch'){
						if(endDataArr[24]=='nil'){
							endDataArr[24]='Carton';
						}
						if(endDataArr[25]=='nil'){
							endDataArr[25]='Normal';
						}
						if(endDataArr[26]=='nil'){
							endDataArr[26]='1';
						}
						if(endDataArr[27]=='nil'){
							endDataArr[27]='0.00';
						}
						if(endDataArr[30]=='nil'){
							endDataArr[30]='6:00';
						}
						if(endDataArr[31]=='nil'){
							endDataArr[31]='6:00';
						}
						
						for (var n2 = 32; n2 < 55; n2++) {
							endDataArr[n2]='nil';
							
						}	
					}


				dataArr.push(endDataArr);
				dataMap.set(endDataArr[4],endDataArr);//endDataArr[12]=barcode				
		}
		
		console.log(dataMap);
		console.log(dataArr);
		
		for (var m = 0; m < dataArr.length; m++) {
			//if(dataArr[m][3]=="AddOrigData"){
				var deliverDate=dataArr[m][6];
				if(!allDate.includes(deliverDate)){
					allDate.push(deliverDate);
				}
			//}
		}
	
		allDate.sort();
		allDate.push("all days")
		allDate.reverse();
		//console.log(dataMap);
		var json3 = JSON.stringify(dataArr);//调用stringify()将一个JS对象转换为JSON
			window.sessionStorage.setItem('dataArr', json3);
		var json4 = JSON.stringify(allDate);//调用stringify()将一个JS对象转换为JSON
			window.sessionStorage.setItem('allDate', json4);
		
		 //dataArr = dataArr2;
		 //dataMap = dataMap2;
     //allDate = allDate2;
       
			window.dispatchEvent(new Event("3dataReady"));
			
	}

	const render2comp = () => {
		const navDomNode = document.getElementById('mySidenav');
		const navRoot = createRoot(navDomNode!); 
		navRoot.render(<DateLi />);

		const commentDomNode = document.getElementById('example');
		if(commentDomNode==null){
			console.log("commentDomNode==null");
		}else{
			const commentRoot = createRoot(commentDomNode); 
			console.log("commentDomNode==ok");
			commentRoot.render(<Table />);
		}
	}
	
	const readDispatchRule = () => {
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
		  var userIn = window.sessionStorage.getItem('userInfo') ?? '{}';
		  var userInfoObj=JSON.parse(userIn!);
		  const db = getDatabase(appInt);
		  var pathName = userInfoObj.company+"/DispatchRule/Dispatch/DispatchAll";
		  console.log(pathName);
		  onValue(ref(db, '/' + pathName), (snapshot) => {
			const ruleObj = snapshot.val()  ;
			console.log(ruleObj);
			var midValues:any[]=Object.values(ruleObj);	
			ruleMap.clear;
			for (var k = 0; k < midValues.length; k++) {
				var endValues:string[]=Object.values(midValues[k]);	
				ruleMap.set(endValues[2],endValues[1]);
			}
			console.log(ruleMap);
			dispatchAll();
		  }, {
			onlyOnce: true
		  });
			
	}

	const readUnDisSpRule = () => {
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
		  var userIn = window.sessionStorage.getItem('userInfo') ?? '{}';
		  var userInfoObj=JSON.parse(userIn!);
		  const db = getDatabase(appInt);
		  var pathName = userInfoObj.company+"/DispatchRule/UnDispatch/UnDispatchSpecial";
		  console.log(pathName);
		  onValue(ref(db, '/' + pathName), (snapshot) => {
			const ruleObj = snapshot.val()  ;
			console.log(ruleObj);
			spKeysArr=[];
			spKeysArr=Object.keys(ruleObj);	
			console.log(spKeysArr);
			unDispatchSp();
		  }, {
			onlyOnce: true
		  });
			
	}

  export {moveData,signIn,getData,readDispatchRule,render2comp,
		dataArr,dataMap,allDate,ruleMap,readUnDisSpRule,spKeysArr}