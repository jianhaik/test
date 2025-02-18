//import React from "react"
import { useEffect, useState } from "react";
//import {allDate} from "./baseinit";


const datesinit:string[] = ['all days'];
const DateLi = () => { 
  const [selectedItem, setSelectedItem] = useState<string>('all days')
  const [dates, setDates] = useState<string[]>(datesinit);

  useEffect(() => {
      //  var allDate = window.sessionStorage.getItem('allDate') ;                    
      //  var a=JSON.parse(allDate!);
      //  console.log(a);
      // setDates(a);    
  }, []);

  const handleRefresh = () => {       
      var allDate = window.sessionStorage.getItem('allDate') ;             
      var a=JSON.parse(allDate!);
      // var a=allDate;
       console.log(a);
      setDates(a);
      setSelectedItem('all days');
        
      window.dispatchEvent(new Event("custom-storage"));    
  }
  window.addEventListener('sideDate-refresh', handleRefresh);

  const handleClick = (item:string) => {
    setSelectedItem(item)
    // filter newDate
  window.localStorage.setItem('afterChoose', 'newDate');
	window.localStorage.setItem('newDate', item);
  window.dispatchEvent(new Event("custom-storage"));
  }

  return (
    
    <ul style={{ 
      listStyle: 'none',
      padding:0,
      margin:0,
      backgroundColor: 'skyblue',
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      position:'relative'
    }}  >
      {dates.map((item) => {
        return (
          <li style={
                { backgroundColor: item === selectedItem ? 'yellow' : 'orange',
                  fontSize: 20, 
                  color: item === selectedItem ? 'blue' : 'green',
                  borderRadius:20,
                  borderWidth:2,
                  borderColor:'Red',
                  alignItems:'center',
                  textAlign: 'center',
                  paddingLeft:15,
                  paddingRight:15,
                  margin:25
                }
                
            }
              onClick={() => handleClick(item)}
              key={item}
            >
              {item}
            </li>        
        )
      })}
    </ul>
    // </div>
  )
}

export default DateLi;

