import { TableColumn } from "react-data-table-component";

//import {dataArr} from "./baseinit";
let rows8:string[]=[];
let myMap = new Map();
const rows2 = () => {
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
	
	var dataArr = window.sessionStorage.getItem('dataArr') ;
	console.log('dataArr: ', dataArr);
	var a:[]=JSON.parse(dataArr!);
	//var a:[]=dataArr;
	var rows1 = new Array();
	myMap.clear();
	const matchKeys=Object.keys(matchObj);
	for (var i = 0; i < a.length; i++) {
		var obj:any = {};
		myMap.set(a[i][4], a[i]);
		for (var j = 0; j < matchKeys.length; j++) {
			var ab:string=matchKeys[j];
			obj[ab]=a[i][j];
		}
		var bb=i+1;	
		obj.id = bb.toString();
		rows1.push(obj);
	}
	rows8=rows1
	console.log('row2: ', rows1);
	console.log('map: ', myMap);
	return rows1
}

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

const columns1:TableColumn<DataRow>[] = [
	{
	  name: "ID",
	  selector: row => row.id,
	  sortable: true,
		width: "60px"
	},
	{
		name: "Barcode",
		selector: row => row.B2_Barcode,
		sortable: true,
		width: "150px"
	},
	{
	  name: "LastStep",
	  selector: row => row.L0_LastStep,
	  sortable: true,
	},
	{
	  name: "Deliver",
	  selector: row => row.F2_ToWho,
	  sortable: true,
	},
	{
		name: "Weight",
		selector: row => row.B7_Weight,
		sortable: true,
	},
	// {
	//   name: "A0_ByWhoAdd",
	//   selector: row => row.A0_ByWhoAdd,
	//   sortable: true,
	// },
	// {
	//   name: "A1_ByWhoReceive",
	//   selector: row => row.A1_ByWhoReceive,
	//   sortable: true,
	// },
	
	// {
	//   name: "A3_ByWhoLoad",
	//   selector: row => row.A3_ByWhoLoad,
	//   sortable: true,
	// },
	// {
	//   name: "A4_GroupCode",
	//   selector: row => row.A4_GroupCode,
	//   sortable: true,
	// },

	{
	  name: "WhoTrouble",
	  selector: row => row.H1_ByWhoTrouble,
	  sortable: true,
	},
	// {
	//   name: "A6_ByWhoFinish",
	//   selector: row => row.A6_ByWhoFinish,
	//   sortable: true,
	// },
	// {
	//   name: "A7_ByWhoTerminate",
	//   selector: row => row.A7_ByWhoTerminate,
	//   sortable: true,
	// },
	
	// {
	// 	name: "B0_JobID",
	// 	selector: row => row.B0_JobID,
	// 	sortable: true,
	// },
	// {
	// 	name: "B1_ModeID",
	// 	selector: row => row.B1_ModeID,
	// 	sortable: true,
	// },
	
	// {
	// 	name: "B3_CarrierRef",
	// 	selector: row => row.B3_CarrierRef,
	// 	sortable: true,
	// },
	// {
	// 	name: "B4_ScheduledDate",
	// 	selector: row => row.B4_ScheduledDate,
	// 	sortable: true,
	// },
	// {
	// 	name: "B5_BTACC",
	// 	selector: row => row.B5_BTACC,
	// 	sortable: true,
	// },
	// {
	// 	name: "B6_ServiceType",
	// 	selector: row => row.B6_ServiceType,
	// 	sortable: true,
	// },
	
	// {
	// 	name: "B8_Unit",
	// 	selector: row => row.B8_Unit,
	// 	sortable: true,
	// },
	// {
	// 	name: "B9_Route",
	// 	selector: row => row.B9_Route,
	// 	sortable: true,
	// },
	{
	  name: "Receiver",
	  selector: row => row.C0_Company,
	  sortable: true,
		width: "150px"
	},
	{
	  name: "Address",
	  selector: row => row.C1_Address1,
	  sortable: true,
		width: "150px"
	},
	// {
	//   name: "C2_Address2",
	//   selector: row => row.C2_Address2,
	//   sortable: true,
	// },
	// {
	//   name: "C3_Address3",
	//   selector: row => row.C3_Address3,
	//   sortable: true,
	// },
	// {
	//   name: "C4_Receiver",
	//   selector: row => row.C4_Receiver,
	//   sortable: true,
	// },
	// {
	//   name: "C5_City",
	//   selector: row => row.C5_City,
	//   sortable: true,
	// },
	// {
	//   name: "C6_ProvState",
	//   selector: row => row.C6_ProvState,
	//   sortable: true,
	// },
	// {
	//   name: "C7_PostalCode",
	//   selector: row => row.C7_PostalCode,
	//   sortable: true,
	// },
	// {
	//   name: "C8_Phone",
	//   selector: row => row.C8_Phone,
	//   sortable: true,
	// },
	// {
	//   name: "C9_Email",
	//   selector: row => row.C9_Email,
	//   sortable: true,
	// },
	// {
	//   name: "H0_When",
	//   selector: row => row.H0_When,
	//   sortable: true,
	// },
	// {
	//   name: "H1_ByWhoTrouble",
	//   selector: row => row.H1_ByWhoTrouble,
	//   sortable: true,
	// },
	// {
	//   name: "H2_TroubleReason",
	//   selector: row => row.H2_TroubleReason,
	//   sortable: true,
	// },
	// {
	//   name: "H3_Comment",
	//   selector: row => row.H3_Comment,
	//   sortable: true,
	// },
	// {
	//   name: "H4_Photo",
	//   selector: row => row.H4_Photo,
	//   sortable: true,
	// },
	// {
	//   name: "I0_When",
	//   selector: row => row.I0_When,
	//   sortable: true,
	// },
	// {
	//   name: "I1_ByWhoFinish",
	//   selector: row => row.I1_ByWhoFinish,
	//   sortable: true,
	// },
	// {
	//   name: "I2_Receiver",
	//   selector: row=> row.I2_Receiver,
	//   sortable: true,
	// },
	// {
	//   name: "I3_Comment",
	//   selector: row => row.I3_Comment,
	//   sortable: true,
	// },
	// {
	//   name: "I4_Photo",
	//   selector: row => row.I4_Photo,
	//   sortable: true,
	// },

  ];

export {columns1,rows2,rows8,myMap}

