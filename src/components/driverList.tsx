import React from "react"
import { useState,useEffect } from "react";
import {  writeDataBase} from './writeDb'


const DriversLi = () => { 
  const [selectedItem, setSelectedItem] = React.useState('')
  const [drivers, setDrivers] = useState<[]>([]);

  
  
   useEffect(() => {  
  var allDrivers = window.sessionStorage.getItem('driverArr') ;    
  var a=JSON.parse(allDrivers!);
  console.log(a);
  setDrivers(a);
   }, []);
  
  function myFunction(item:string) {
    
    const navDomNode = document.getElementById('win');
    navDomNode!.style.display='none';
   
    setTimeout(myFunction2, 100,item);
  }
  
  function myFunction2(item:string) {
    let text = "Do you want to dispatch these items to "+item +'?';
    if (confirm(text) == true) {
      text = "You pressed OK!";

    window.localStorage.setItem('action', 'dispatchTo');  
	  window.localStorage.setItem('toWho', item);
      
      // var targetValue=['dispatchTo',item];
      // var json3 =JSON.stringify(targetValue);				
			// window.localStorage.setItem('targetValue', json3); 

      writeDataBase();
    } else {
      text = "You canceled!";
      
    }
  }

  const handleClick = (item:string) => {
    setSelectedItem(item)
    setTimeout(myFunction, 1000,item);
    
  }

  const showDisplay = () => {
    const navDomNode = document.getElementById('win');
    navDomNode!.style.display='block';
    setSelectedItem('');
  }
  window.addEventListener('showWin', showDisplay);

  return (
    
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
      backgroundColor: 'skyblue',
      // width: '100%',
      // height: '100%',
      //overflowY: 'scroll',
      position: 'relative'
    }}>
      {drivers.map((item) => {
        return (
          <li style={{
            
            backgroundColor: item === selectedItem ? 'yellow' : 'orange',
            fontSize: 20,
            color: item === selectedItem ? 'blue' : 'green',
            borderRadius: 20,
            borderWidth: 2,
            borderColor: 'Red',
            alignItems: 'center',
            textAlign: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            margin: 25,
            
          }}
            onClick={() => handleClick(item)}
            key={item}
          >
            {item}
          </li>
        );
      })}
    </ul>
    
   
  )
}

export default DriversLi;
