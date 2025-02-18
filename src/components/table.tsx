import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import {  useState } from "react";
import {columns1,rows2} from "./readDb";
import { useEffect } from "react";
//import DateLi from "./dateList";
//import {chooseStatus} from "../main";

//import { RowState } from "react-data-table-component/dist/DataTable/types";
//const columns =columns1;
// const rows3 = rows2();
// console.log('rows3: ', rows3);

const rows = [
   {
		
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
	
		 }
]
var newRows1 = new Array();
var newRows2= new Array();
var newRows3= new Array();
var currentDate:string="all days";
var currentLast:string="all data";
var currentSearch:string="nothing";
var count:number = 1;
var priDiffId:number=0;
var priRows:Array<any>[] = [];
var diff:Array<any>[] = [];
var clickState:string="";
var shiftStatus: boolean = false;
const handleKeyDown = (event: { key: string; }) => {
  if (event.key === 'Control') {
    shiftStatus=true;
    
  }
}
document.addEventListener('keydown', handleKeyDown)

const handleKeyUp = (event: { key: string; }) => {
  if (event.key === 'Control') {
    shiftStatus=false;
  }
}
document.addEventListener('keyup', handleKeyUp)


function Table() {

const [data, setData] = useState(rows);
const [id, setID] = useState<string[]>([]);



useEffect(() => {
  // const rows3:any[] = rows2();

  // if(rows3.length>0){
  //   setData(rows3);
  // }else{
  //   setData(rows);
  // }
  
}, []);

const handleStorage = () => {
   var chooseStatus=localStorage.getItem('afterChoose');
   console.log(chooseStatus);
   currentDate=localStorage.getItem('newDate')!;
   currentLast=localStorage.getItem('newLast')!;
   var targetValue=localStorage.getItem('newSearch')!; 
   if(targetValue==''){
     currentSearch='nothing';
   }else{
     currentSearch=targetValue;
   }


  if(chooseStatus=='newDate'){    
    handleSearch(currentDate);
  }else if(chooseStatus=='newLast'){    
    handleSearch(currentLast);
  }else if(chooseStatus=='newSearch'){    
    handleSearch(currentSearch);
  }else if(chooseStatus=='refresh'){
    const rows3 = rows2();

    if(rows3.length>0){
      setData(rows3);
      setID([]);
    }else{
      setData(rows);
      setID([]);
    }
    
  }
}
window.addEventListener('custom-storage', handleStorage);



const rowSelectCritera = (row: { id: string }) =>  id.includes(row.id);//row.personID > 6;


const handleChange = ({ selectedRows }:any) => {
  // You can set state or dispatch with something like Redux so we can use the retrieved data
 //cycle=cycle+1;
 //console.log('cycle: ', cycle);
 if(count===1){
  //console.log('count: ', count);
  console.log('Selected Rows: ', selectedRows);
  if(selectedRows.length === 0){
      if(priRows.length === 0){
         diff=[];
        clickState="noClick";
      }else{
         diff = priRows.filter((e: any[]) => !selectedRows.includes(e)); 
         clickState="reduce"
      }

  }else{
    if(selectedRows.length>priRows.length){
      diff = selectedRows.filter((e: any[]) => !priRows.includes(e)); 
     clickState="add"

   }else{
      diff = priRows.filter((e: any[]) => !selectedRows.includes(e)); 
     clickState="reduce"

   }
  }
  console.log('diff= ', diff);
  console.log('clickState: ', clickState);
  if(diff.length>0){
    console.log('diffId= ', Object.values(diff['0'])[28]);
  }
 
  
  if(shiftStatus && priDiffId>0){
    
    var a:number=priDiffId;
    var b:number=Number(Object.values(diff['0'])[28]);
    console.log('a:', a);
    console.log('b:', b);
    var selRows:Array<number> = [];
    if(a>b){
      for (let i = b; i <= a; i++) {
        selRows.push(i);
      }
    }
    if(a<b){
      for (let j = a; j <= b; j++) {
        selRows.push(j);
      }
    }

    if(a=b){
      
    }

    let newArr = selectedRows.map((e:any) =>Number( e.id)) //将数组中每一个元素
    console.log('newArr:', newArr);
    console.log('selRows: ',  selRows);
    //var result:Array<number> = [];
    let result: number[] = [];
    if(clickState==="add" && selRows.length>0 ){
       let priResult = Array.from(new Set([...selRows, ...newArr]));
       let showArr = data.map((e:any) => Number( e.id));
       result = priResult.filter((e:number) => showArr.includes(e));
       
    }
    if(clickState==="reduce"){
       result = newArr.filter((e:number) => !selRows.includes(e)); 
    }

    if(selRows.length>0){
     
      count=0;
      shiftStatus=false;
      setID(result.map(String));
      console.log('id: ',  result);
      
    }
  }

  if(diff.length>0){
    priDiffId=Number(Object.values(diff['0'])[28]);
  }
  priRows=selectedRows;
 }else{
  priRows=selectedRows;
  count=1;
 }

 
 let newArr22 = selectedRows.map((e:any) => e.id)
 var json4 = JSON.stringify(newArr22);//or priRows
 let newArr33 = selectedRows.map((e:any) => e.B2_Barcode)
 var json5 = JSON.stringify(newArr33);//or priRows
 console.log('id222: ',  newArr22);
 window.localStorage.setItem('selRowsId', json4);
 window.localStorage.setItem('selRows', json5);
};


  // Handle Search is the same as Handle Filter
  const handleSearch = (e: String) => {
    console.log(e);
    console.log(currentDate);
    console.log(currentLast);
    console.log(currentSearch);
    
    let rows4 = rows2();
    console.log(rows4);
    
      if(currentDate=="all days"){
        //console.log("///");
        newRows1=[];
        newRows1 =  rows4.slice(0);
        //console.log(newRows1);
      }else{
        console.log("=/=");
        newRows1=[];
        newRows1 = rows4.filter((row) => {
          return row.B4_ScheduledDate
          .toString()
          .toLowerCase()
          .includes(currentDate.toString().toLowerCase());
        });
      }
      //console.log(newRows1);
      //console.log(newRows1.length);
      if(newRows1.length==0){
        newRows1=rows.slice(0);
      }
     // console.log(newRows1);
          

      if(currentLast=="all data"){
        newRows2=newRows1.slice(0);
      }else{
         newRows2 = newRows1.filter((row) => {
          return  row.L0_LastStep
          .toString()
          .toLowerCase()
          .includes(currentLast.toString().toLowerCase());
       });
      }
      if(newRows2.length==0){
        newRows2=rows.slice(0);
      }
      console.log(newRows2);
      
      if(currentSearch=='nothing'){
        newRows3=newRows2.slice(0);
      }else{
            newRows3 = newRows2.filter((row) => {
            var x:string = row.B2_Barcode+','+row.F2_ToWho+','+row.B7_Weight+','+row.C0_Company+','+row.C1_Address1
            return  x
            .toString()
            .toLowerCase()
            .includes(currentSearch.toString().toLowerCase());
         });

        
      }
      
      
      if(newRows3.length==0){
        newRows3=rows.slice(0);
      }      
      console.log(newRows3);

      setData(newRows3);
  };
  
  // let rows11:any = rows9(data);
  // console.log(rows11);
  // console.log(data);
 // const ExpandedComponent = ({data}:any) => <pre>{JSON.stringify(data, null, 22) }</pre>;

 type DataRow = {
  A0_When:string;
  A1_ByWhoAdd:string;
  B0_JobID:string;
  B1_ModeID:string;
  B2_Barcode:string;
  B3_CarrierRef:string;
  B4_ScheduledDate:string;
  B5_BTACC:string;
  B6_ServiceType:string;
  B7_Weight:string;
  B8_Unit:string;
  B9_Route:string;
  C0_Company:string;
  C1_Address1:string;
  C2_Address2:string;
  C3_Address3:string;
  C4_Receiver:string;
  C5_City:string;
  C6_ProvState:string;
  C7_PostalCode:string;
  C8_Phone:string;
  C9_Email:string;
  D0_When:string;
  D1_ByWhoPrice:string;
  D2_WhatType:string;
  D3_Size:string;
  D4_HowMany:string;
  D5_ExtraFee:string;
  id:string;
  D7_What:string;
  D8_StartTime:string;
  D9_EndTime:string;
  E0_When:string;
  E1_ByWhoReceive:string;
  F0_When:string;
  F1_ByWhoDispatch:string;
  F2_ToWho:string;
  G0_When:string;
  G1_ByWhoLoad:string;
  H0_When:string;
  H1_ByWhoTrouble:string;
  H2_TroubleReason:string;
  H3_Comment:string;
  H4_Photo:string;
  I0_When:string;
  I1_ByWhoFinish:string;
  I2_Receiver:string;
  I3_Comment:string;
  I4_Photo:string;
  J0_When:string;
  J1_ByWhoTerminate:string;
  J2_TerminateAction:string;
  K0_When:string;
  K1_ByWhoGroup:string;
  K2_GroupCode:string;
  L0_LastStep:string;

};

  // const ExpandedComponent : React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
  //   return <pre>{JSON.stringify(data, null, 2)}</pre>;
  // };
  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
    return (
        <pre>
           <table style={{ 
      
      padding:0,
      marginLeft:30,
      backgroundColor: 'pink',
       width: '100%',
      
      position:'relative'
    }}>
     <tbody>
  <tr>
    <td>id:{data.id}</td>
    <td>JobID:{data.B0_JobID}</td>
    <td>Company:{data.C0_Company}</td>
    <td>WhenTrouble:{data.H0_When}</td>
  </tr>
  <tr >
    <td>ByWhoAdd:{data.A1_ByWhoAdd}</td>
    <td>ModeID:{data.B1_ModeID}</td>
    <td>Address1:{data.C1_Address1}</td>
    <td>WhoHasTrouble:{data.H1_ByWhoTrouble}</td>
  </tr>
  <tr>
    <td>ByWhoReceive:{data.E1_ByWhoReceive}</td>
    <td>Barcode:{data.B2_Barcode}</td>
    <td>Address2:{data.C2_Address2}</td>
    <td>TroubleReason:{data.H2_TroubleReason}</td>
  </tr>
  <tr>
    <td>DispatchTo:{data.F2_ToWho}</td>
    <td>CarrierRef:{data.B3_CarrierRef}</td>
    <td>Address3:{data.C3_Address3}</td>
    <td>TroubleComment:{data.H3_Comment}</td>
  </tr>
  <tr>
    <td>ByWhoLoad:{data.G1_ByWhoLoad}</td>
    <td>ScheduledDate:{data.B4_ScheduledDate}</td>
    <td>Receiver:{data.C4_Receiver}</td>
    <td>TroublePhoto:{data.H4_Photo}</td>
  </tr>
  <tr>
    <td>GroupCode:{data.K2_GroupCode}</td>
    <td>BTACC:{data.B5_BTACC}</td>
    <td>City:{data.C5_City}</td>
    <td>WhenFinish:{data.I0_When}</td>
  </tr>
  <tr>
    <td>ByWhoTrouble:{data.H1_ByWhoTrouble}</td>
    <td>ServiceType:{data.B6_ServiceType}</td>
    <td>ProvState:{data.C6_ProvState}</td>
    <td>WhoDidFinish:{data.I1_ByWhoFinish}</td>
  </tr>
  <tr>
    <td>ByWhoFinish:{data.I1_ByWhoFinish}</td>
    <td>Weight:{data.B7_Weight}</td>
    <td>PostalCode:{data.C7_PostalCode}</td>
    <td>Receiver:{data.I2_Receiver}</td>
  </tr>
  <tr>
    <td>WhoTerminate:{data.J1_ByWhoTerminate}</td>
    <td>Unit:{data.B8_Unit}</td>
    <td>Phone#:{data.C8_Phone}</td>
    <td>FinishComment:{data.I3_Comment}</td>
  </tr>
  <tr>
    <td>LastStep:{data.L0_LastStep}</td>
    <td>Route:{data.B9_Route}</td>
    <td>Email:{data.C9_Email}</td>
    <td>FinishPhoto:....</td>
  </tr>
  </tbody>
</table>
            
        </pre>
    );
};

 //const ExpandedComponent = ({data}:any) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  
 return (
    <> 
      <div className="container" style={{ 
      
      padding:0,
      margin:0,
      backgroundColor: 'white',
      // width: '100%',
      height: '100%',
      overflowY: 'scroll',
      position:'relative'
    }}
      
      >
        
        <DataTable style={{backgroundColor:"yellowgreen"}}
          columns={columns1}
          data={data}
          fixedHeader={true}
          //title="React-Data-Table-Component Tutorial."
          pagination
          paginationPerPage={15}
          paginationRowsPerPageOptions={[14,15,16,17,18]}
          selectableRows
          dense
          highlightOnHover
          selectableRowsHighlight={true}
          selectableRowsSingle={false}
          onSelectedRowsChange={handleChange}  
          selectableRowSelected={rowSelectCritera}
          expandableRows={true}
          expandOnRowDoubleClicked={true}
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
  }

export default Table;
//export {handleFilter}