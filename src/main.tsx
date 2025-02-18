
import {moveData,signIn,getData,readDispatchRule,render2comp,readUnDisSpRule,dataMap} from "./components/baseinit";
import { createRoot } from 'react-dom/client'
import DriversLi from "./components/driverList";
import {  writeDataBase,writeChange} from './components/writeDb'
//var readTarget="initial";


render2comp();

moveData();

signIn();


getData();

const renderHandle = () => {
  // if(readTarget=="initial"){
  //   render2comp();
  // }else if(readTarget=="refresh"){
  //   window.dispatchEvent(new Event("sideDate-refresh")); 
  // } 
  window.localStorage.setItem('afterChoose', 'refresh');
  window.localStorage.setItem('newDate', 'all days');
	 window.localStorage.setItem('newLast', 'all data');
	 window.localStorage.setItem('newSearch', 'nothing');
  window.dispatchEvent(new Event("sideDate-refresh")); 
}
window.addEventListener('3dataReady', renderHandle);









 

const handlebot = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "block";
} 

const handleall = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='all data';
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'all data');
  window.dispatchEvent(new Event("custom-storage"));
} 

const handleundispatch = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='undispatch';
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'UnDispatch');
  window.dispatchEvent(new Event("custom-storage"));
} 

const handledispatch = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='dispatched'; 
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'Dispatched');
  window.dispatchEvent(new Event("custom-storage"));
} 

const handletrouble = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='trouble';
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'MeetTrouble');
  window.dispatchEvent(new Event("custom-storage"));
} 

const handlefinish = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='finished';
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'Finished');
  window.dispatchEvent(new Event("custom-storage"));
} 

const handletered = () => {
  var x = document.getElementById('downCon'); 
  x!.style.display = "none";
  document.getElementById("downBut")!.textContent='terminated';
  window.localStorage.setItem('afterChoose', 'newLast');
	window.localStorage.setItem('newLast', 'terminated');
  window.dispatchEvent(new Event("custom-storage"));
} 

document.getElementById('downBut')?.addEventListener("click",handlebot);
document.getElementById('alldata')?.addEventListener("click",handleall);
document.getElementById('undispatch')?.addEventListener("click",handleundispatch);
document.getElementById('dispatched')?.addEventListener("click",handledispatch);
document.getElementById('trouble')?.addEventListener("click",handletrouble);
document.getElementById('finished')?.addEventListener("click",handlefinish);
document.getElementById('terminated')?.addEventListener("click",handletered);

const handlebotton = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "block";
}

const handleref = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  // readTarget="refresh";
  getData();
  (document.getElementById("searchID") as HTMLInputElement).value='';
  document.getElementById("downBut")!.textContent='all data';
   window.localStorage.setItem('afterChoose', 'refresh');  
	 window.localStorage.setItem('newDate', 'all days');
	 window.localStorage.setItem('newLast', 'all data');
	 window.localStorage.setItem('newSearch', 'nothing');
}

    var winStatus=0;
const handledis = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handledis2, 10);   
}
const handledis2 = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
			//menubar=no,toolbar=no,status=no
	if(a.length>0){
		if(winStatus==0){
		const navDomNode = document.getElementById('win');
		const navRoot = createRoot(navDomNode!); 
		navRoot.render(<DriversLi />);
		winStatus=1;
		}else{
			window.dispatchEvent(new Event("showWin"));
		}
		
	}else{
		window.alert("Please choose items first!");
	}
}


function myFunction2(item:string) {  
  if (confirm(item) == true) {
    let text = "You pressed OK!";
    console.log('alert: ', text);
  window.localStorage.setItem('action', 'undispatch');  
  window.localStorage.setItem('toWho', 'nobody');

    writeDataBase();
  } else {
    let text = "You canceled!";
    console.log('alert: ', text);
  }
}
const handleundis = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handleundis2, 10); 
}
const handleundis2 = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
			//menubar=no,toolbar=no,status=no
	if(a.length>0){
		let item = "Do you want to undispatch these items? ";
		myFunction2(item);
	}else{
		window.alert("Please choose items first!");
	}
}

function myFunction3(item:string) {
  
  if (confirm(item) == true) {
    let text = "You pressed OK!";
    console.log('alert: ', text);
  window.localStorage.setItem('action', 'dispatchAll');  
  window.localStorage.setItem('toWho', 'byRule');
  readDispatchRule();
  } else {
    let text = "You canceled!";
    console.log('alert: ', text);
  }
}
const handledisall = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handledisall2, 10); 
}
const handledisall2 = () => {
  var curDate = window.localStorage.getItem('newDate') ?? '';
  if(curDate=='all days'){
    window.alert("Please choose one date, then continue!");
  }else{
    let item = "Do you want to dispatch all undispatched items by pre-set rule? ";
    myFunction3(item);
  }  
}

function myFunction4(item:string) {
  
  if (confirm(item) == true) {
    let text = "You pressed OK!";
    console.log('alert: ', text);
  window.localStorage.setItem('action', 'unDispatchSp');  
  window.localStorage.setItem('toWho', 'unDisSpRule');
  readUnDisSpRule();
  } else {
    let text = "You canceled!";
    console.log('alert: ', text);
  }
}
const handleundissp = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handleundissp2, 10); 
}
const handleundissp2 = () => {
  var curDate = window.localStorage.getItem('newDate') ?? '';
  if(curDate=='all days'){
    window.alert("Please choose one date, then continue!");
  }else{
    let item = "Do you want to undispatch special items by pre-set rule? ";
    myFunction4(item);
  }
}

const handlerowedit2 = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
	if(a.length==1){
		var y = document.getElementById('itemEdit'); 
    y!.style.display = "block";
    setTimeout(fillInput, 10);  
	}else{
		window.alert("Please choose only one item first!");
	}
}
const handlerowedit = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handlerowedit2, 10);   
}

function myFunction6(item:string) {
  
  if (confirm(item) == true) {
    let text = "You pressed OK!";
    console.log('alert: ', text);
  window.localStorage.setItem('action', 'deleteItems');  
  window.localStorage.setItem('toWho', 'deleteRows');
  writeDataBase();
  } else {
    let text = "You canceled!";
    console.log('alert: ', text);
  }
}
const handledelitems = () => {
  var x = document.getElementById('downContent'); 
  x!.style.display = "none";
  setTimeout(handledelitems2, 10);
}
const handledelitems2 = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
			//menubar=no,toolbar=no,status=no
	if(a.length>0){
		let item = "Do you want to delete these items? ";
		myFunction6(item);
	}else{
		window.alert("Please choose items first!");
	}
}

function myFunction7(item:string) {
  
  if (confirm(item) == true) {
    let text = "You pressed OK!";
    console.log('alert: ', text);
  window.localStorage.setItem('action', 'terminateItems');  
  
  //writeDataBase();
  var x = document.getElementById('actionItems');   //enter any tag id name which u want to hide
  x!.style.display = "block";
  } else {
    let text = "You canceled!";
    console.log('alert: ', text);
  }
}
const handleterminate = () => {
  var x = document.getElementById('downContent');   //enter any tag id name which u want to hide
  x!.style.display = "none";
  setTimeout(handleterminate2, 10);
}
const handleterminate2 = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
			//menubar=no,toolbar=no,status=no
	if(a.length>0){
		let item = "Do you want to terminate these items? ";
		myFunction7(item);
	}else{
		window.alert("Please choose items first!");
	}
}
document.getElementById('downButton')?.addEventListener("click",handlebotton);
document.getElementById('refresh')?.addEventListener("click",handleref);
document.getElementById('dispatchTo')?.addEventListener("click",handledis);
document.getElementById('unDispatch')?.addEventListener("click",handleundis);
document.getElementById('dispatchAll')?.addEventListener("click",handledisall);
document.getElementById('unDispatchSpecial')?.addEventListener("click",handleundissp);
document.getElementById('oneRowEdit')?.addEventListener("click",handlerowedit);
document.getElementById('deleteItems')?.addEventListener("click",handledelitems);
document.getElementById('terminate')?.addEventListener("click",handleterminate);


const inputChange = () => { 
  let x = (document.getElementById("searchID") as HTMLInputElement).value;
  //window.alert(x); 
  window.localStorage.setItem('afterChoose', 'newSearch');
	window.localStorage.setItem('newSearch', x);
  window.dispatchEvent(new Event("custom-storage"));
}
document.getElementById('searchID')?.addEventListener("keyup",inputChange);






const closeWinF = () => {
  var x = document.getElementById('actionItems');   //enter any tag id name which u want to hide
  x!.style.display = "none";
  window.localStorage.setItem('toWho', 'terminateCancel');
}

const returnF = () => {
  var x = document.getElementById('actionItems');   //enter any tag id name which u want to hide
  x!.style.display = "none";
  window.localStorage.setItem('toWho', 'return');
  writeDataBase();
}

const destroyF = () => {
  var x = document.getElementById('actionItems');   //enter any tag id name which u want to hide
  x!.style.display = "none";
  window.localStorage.setItem('toWho', 'destroy');
  writeDataBase();
}

const sellF = () => {
  var x = document.getElementById('actionItems');   //enter any tag id name which u want to hide
  x!.style.display = "none";
  window.localStorage.setItem('toWho', 'sell');
  writeDataBase();
}

document.getElementById('close-button')?.addEventListener("click",closeWinF);
document.getElementById('return')?.addEventListener("click",returnF);
document.getElementById('destroyItem')?.addEventListener("click",destroyF);
document.getElementById('sell')?.addEventListener("click",sellF);

const handleSave = () =>{
 // window.alert("you click save button!");
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
  var valueArr:string[]=dataMap.get(a[0]);
  var newArr:string[]= [];
  var positionArr:number[]= [];
  for (var i = 0; i < 56; i++) {
    newArr.push('nil')
  }
    newArr[4]=(document.getElementById("barcode") as HTMLInputElement).value;
    newArr[2]=(document.getElementById("jobID") as HTMLInputElement).value;
    newArr[3]=(document.getElementById("modeID") as HTMLInputElement).value;
    newArr[5]=(document.getElementById("carrierRef") as HTMLInputElement).value;
    newArr[6]=(document.getElementById("scheduledDate") as HTMLInputElement).value;
    newArr[7]=(document.getElementById("btacc") as HTMLInputElement).value;
    newArr[8]=(document.getElementById("serviceType") as HTMLInputElement).value;
    newArr[9]=(document.getElementById("weight") as HTMLInputElement).value;
    newArr[10]=(document.getElementById("unit") as HTMLInputElement).value;
    newArr[11]=(document.getElementById("route") as HTMLInputElement).value;

    newArr[12]=(document.getElementById("company") as HTMLInputElement).value;
    newArr[13]=(document.getElementById("address1") as HTMLInputElement).value;
    newArr[14]=(document.getElementById("address2") as HTMLInputElement).value;
    newArr[15]=(document.getElementById("address3") as HTMLInputElement).value;
    newArr[16]=(document.getElementById("receiver") as HTMLInputElement).value;
    newArr[17]=(document.getElementById("city") as HTMLInputElement).value;
    newArr[18]=(document.getElementById("provState") as HTMLInputElement).value;
    newArr[19]=(document.getElementById("postalCode") as HTMLInputElement).value;
    newArr[20]=(document.getElementById("phone") as HTMLInputElement).value;
    newArr[21]=(document.getElementById("email") as HTMLInputElement).value;

    newArr[24]=(document.getElementById("type") as HTMLInputElement).value;
    newArr[25]=(document.getElementById("size") as HTMLInputElement).value;
    newArr[26]=(document.getElementById("howmany") as HTMLInputElement).value;
    newArr[27]=(document.getElementById("extrafee") as HTMLInputElement).value;
    newArr[30]=(document.getElementById("starttime") as HTMLInputElement).value;
    newArr[31]=(document.getElementById("endtime") as HTMLInputElement).value;
    console.log( newArr);
    for (var j = 0; j < 32; j++) {
      if(newArr[j]!=='nil' && newArr[j]!==valueArr[j]){
          positionArr.push(j);
      }
    }
    newArr[55]=valueArr[55];
    console.log(positionArr);
    
    if(positionArr.length>0){
      writeChange(positionArr,newArr);
      console.log('alert: ', newArr);
    }

}
const closeRowEdit = () => {
  document.getElementById("itemEdit")!.style.display="none"
}
const fillInput = () => {
  var chooseStatus=localStorage.getItem('selRows');
	var a=JSON.parse(chooseStatus!);
  var valueArr:string[]=dataMap.get(a[0]);
  console.log('alert: ',a);
    (document.getElementById("barcode") as HTMLInputElement).value=valueArr[4];
    (document.getElementById("barcode") as HTMLInputElement).readOnly=true;
    (document.getElementById("jobID") as HTMLInputElement).value=valueArr[2];
    (document.getElementById("modeID") as HTMLInputElement).value=valueArr[3];
    (document.getElementById("carrierRef") as HTMLInputElement).value=valueArr[5];
    (document.getElementById("scheduledDate") as HTMLInputElement).value=valueArr[6];
    (document.getElementById("btacc") as HTMLInputElement).value=valueArr[7];
    (document.getElementById("serviceType") as HTMLInputElement).value=valueArr[8];
    (document.getElementById("weight") as HTMLInputElement).value=valueArr[9];
    (document.getElementById("unit") as HTMLInputElement).value=valueArr[10];
    (document.getElementById("route") as HTMLInputElement).value=valueArr[11];

    (document.getElementById("company") as HTMLInputElement).value=valueArr[12];
    (document.getElementById("address1") as HTMLInputElement).value=valueArr[13];
    (document.getElementById("address2") as HTMLInputElement).value=valueArr[14];
    (document.getElementById("address3") as HTMLInputElement).value=valueArr[15];
    (document.getElementById("receiver") as HTMLInputElement).value=valueArr[16];
    (document.getElementById("city") as HTMLInputElement).value=valueArr[17];
    (document.getElementById("provState") as HTMLInputElement).value=valueArr[18];
    (document.getElementById("postalCode") as HTMLInputElement).value=valueArr[19];
    (document.getElementById("phone") as HTMLInputElement).value=valueArr[20];
    (document.getElementById("email") as HTMLInputElement).value=valueArr[21];

    if(valueArr[24]!=='nil'){
      (document.getElementById("type") as HTMLInputElement).value=valueArr[24];
    }
    if(valueArr[25]!=='nil'){
      (document.getElementById("size") as HTMLInputElement).value=valueArr[25];
    }
    if(valueArr[26]!=='nil'){
      (document.getElementById("howmany") as HTMLInputElement).value=valueArr[26];
    }
    if(valueArr[27]!=='nil'){
      (document.getElementById("extrafee") as HTMLInputElement).value=valueArr[27];
    }
    if(valueArr[30]!=='nil'){
      (document.getElementById("starttime") as HTMLInputElement).value=valueArr[30];
    }
    if(valueArr[31]!=='nil'){
      (document.getElementById("endtime") as HTMLInputElement).value=valueArr[31];
    }
  document.getElementById("x-button")?.addEventListener("click",closeRowEdit)
  document.getElementById("save-button")?.addEventListener("click",handleSave)
  document.getElementById("cancel-button")?.addEventListener("click",closeRowEdit)
}





export {handleref}           





