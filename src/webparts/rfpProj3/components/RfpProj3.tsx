import * as React from 'react';
import styles from './RfpProj3.module.scss';
import { IRfpProj3Props } from './IRfpProj3Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

//import { IStackTokens, Stack,IStackStyles,StackItem } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
//import{DatePicker} from 'office-ui-fabric-react/lib/DatePicker';
import { Button,PrimaryButton } from 'office-ui-fabric-react/lib/Button';


import {Icon} from 'office-ui-fabric-react/lib/Icon';

//import IconButton from '@material-ui/core/IconButton';

import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';

import { DatePickerComponent,DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

import { ChoiceGroup,IChoiceGroupOption, textAreaProperties,Stack, IStackTokens, StackItem,IStackStyles } from 'office-ui-fabric-react'; 

import Service from './Service';

//import {Stack, IStackTokens, StackItem,IStackStyles} from '@fluentui/react';

//#region GlobalVaraibles
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };
const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };

// const sectionStackTokens: IStackTokens = { childrenGap: 10 };
// const sectionStackTokens1: IStackTokens = { childrenGap: 5 };
// const stackTokens = { childrenGap: 80 };
// const stackStyles: Partial<IStackStyles> = { root: { padding: 10 } };
// const stackButtonStyles: Partial<IStackStyles> = { root: { Width: 20 } };

let defaultState = { data: null, error: null };

const RadioNewExsis: IChoiceGroupOption[] = 

[  { key: "New", text: "New" , },  { key: "Existing", text: "Existing" },];  

const RadioNonDiclosure: IChoiceGroupOption[] = 

[  { key: "Yes", text: "Yes" , },  { key: "No", text: "No" },];  

const RadioSubcontract: IChoiceGroupOption[] = 

[  { key: "Yes", text: "Yes" , },  { key: "No", text: "No" },];  

const RadioPersonalData: IChoiceGroupOption[] = 

[  { key: "Yes", text: "Yes" , },  { key: "No", text: "No" },];  

let ClientPartnerName='';

let ProjectManagerName='';

let Exsistingtxt='Existing';
  
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  let RootUrl = '';

  let myreturnval='';
//#endregion

//region Interface

export interface IFieldUpload1ControlFieldsState{
  operation:any;
  BussinessUnitListItems: any;
  MyBussinesUnitVal: any;
  MyBusinessUnitKey:any;
  RequesTypeListItems:any;
  MyRequestVal:any;
  ClientName: any;
  ClientPatnerName:any;
  ProjectManagerName:any;
  CitOppId:any;
  ProjName:any;
  DurationProj:any;
  DurationProjListItems:any;
  Approiateamt:any;
  CurrencyListItems:any;
  CurrencyVal:any;
  Applicationval:any;
  ApplicationListItems:any;
  RiskListItems:any;
  RiskVal:any;
  ProjDelv:any;
  ProjDelListItems:any;
  file:any;
  filePickerResult:any;
  flag: boolean;
  dtsubdate:Date;
  MyBrief:any;
  StartDate: any;
  EndDate: any;
  MaximumDate:any;
  MinDate:any;
  NeworExsis:string;
  NonDisclosure:any;
  subcontract:any;
  PersonalData:any;
  selectedOption:any;
  divHide:boolean;
  Addcomments:string;
  FileValue:any;
  disableFileUpload:boolean;
  userval:any;
  userval1:any;

}

//EndRegion

export default class RfpProj3 extends React.Component<IRfpProj3Props, IFieldUpload1ControlFieldsState> {

  public _service: any;
  public GlobalService: any;
  protected ppl;

  public constructor(props:IRfpProj3Props){
    super(props);
    this.state={
      
      operation:null,
      BussinessUnitListItems: [],
      MyBussinesUnitVal: null,
      RequesTypeListItems:[],
      MyRequestVal:null,
      ClientName:"",
      ClientPatnerName:"",
      ProjectManagerName:"",
      CitOppId:"",
      ProjName:"",
      DurationProjListItems:[],
      DurationProj:"",
      Approiateamt:"",
      CurrencyListItems:"",
      CurrencyVal:"",
      Applicationval:"",
      ApplicationListItems:[],
      RiskListItems:[],
      RiskVal:"",
      ProjDelv:"",
      ProjDelListItems:[],
      file:null,
      filePickerResult:null,
      flag: false,
      dtsubdate:null,
      MyBrief:"",
      StartDate: "",
      EndDate: "",
      MaximumDate:"",
      MinDate:"",
      MyBusinessUnitKey:"",
      NeworExsis:"",
      NonDisclosure:"",
      subcontract:"",
      PersonalData:"",
      selectedOption:"",
      divHide:false,
      Addcomments:"",
      FileValue:[],
      disableFileUpload:false,
      userval:[],
      userval1:[]


    };


    //region Calling urls and Functions


    RootUrl = this.props.url;

    this._service = new Service(this.props.url, this.props.context);

    this.GlobalService = new Service(this.props.url, this.props.context);

    this.getAllBussinessUnits();
    this.getAllRequesTypes();
    this.getAllDurationProjects();
    this.getAllCurrency();
    this.getAllApplicationProject();
    this.getAllRiskSolutions();
    this.getAllProjects();

    //End Regions
  }

  //Get all DroDownFunctions

  public async getAllBussinessUnits() {

    var myBussinesUnitLocal: any = [];

    var data = await this._service.GetAllBussinessUnits();

    console.log(data);

    var AllBussinessUnits: any = [];

    for (var k in data) {

      AllBussinessUnits.push({ key: data[k].ID, text: data[k].Title});
    }

    console.log(AllBussinessUnits);

    
   this.setState({ BussinessUnitListItems: AllBussinessUnits });
  

  }

  public async getAllRequesTypes() {

    var myRequestLocal: any = [];

    var data = await this._service.GetAllRequesTypes();

    console.log(data);

    var AllRequesTypes: any = [];

    for (var k in data) {

      AllRequesTypes.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllRequesTypes);

    this.setState({ RequesTypeListItems: AllRequesTypes });

  }

  public async getAllDurationProjects() {

    var myDurationLocal: any = [];

    var data = await this._service.GetAllDurationProjects();

    console.log(data);

    var AllDurationTypes: any = [];

    for (var k in data) {

      AllDurationTypes.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllDurationTypes);

     this.setState({ DurationProjListItems: AllDurationTypes });

  }


  public async getAllCurrency() {

    var myCurrencyLocal: any = [];

    var data = await this._service.GetAllCuurency();

    console.log(data);

    var AllCuurenctTypes: any = [];

    for (var k in data) {

      AllCuurenctTypes.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllCuurenctTypes);

    this.setState({ CurrencyListItems: AllCuurenctTypes });

  }


  public async getAllApplicationProject() {

    var mApplicationLocal: any = [];

    var data = await this._service.GetAllApplications();

    console.log(data);

    var AllApplicationTypes: any = [];

    for (var k in data) {

      AllApplicationTypes.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllApplicationTypes);

    this.setState({ ApplicationListItems: AllApplicationTypes });

  }



  public async getAllRiskSolutions() {

    var myRiskSolutionsLocal: any = [];

    var data = await this._service.GetAllRiskSolutions();

    console.log(data);

    var AllRiskTypes: any = [];

    for (var k in data) {

      AllRiskTypes.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllRiskTypes);

   this.setState({ RiskListItems: AllRiskTypes });

  }




  public async getAllProjects() {

    var myProjects: any = [];

    var data = await this._service.GetAllProjects();

    console.log(data);

    var AllProjects: any = [];

    for (var k in data) {

      AllProjects.push({ key: data[k].ID, text: data[k].Title });
    }

    console.log(AllProjects);

    
   this.setState({ ProjDelListItems: AllProjects });

  }


  //EndRegion


  //region PeoplePickeer and handleChange Events
  private async _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);

    if(items.length>0)
    {

    ClientPartnerName = items[0].text;

      let userInfo = this._service.getUserByLogin(items[0].loginName).then((info)=>{
      this.setState({userval:info});
      console.log(info);
 });

    }

    else
    {

      this.setState({userval:null});
    }

    //this.ppl.onChange([]);

  }


  private async _getPeoplePickerItems1(items: any[]) {
    console.log('Items:', items);

    if(items.length>0)
    {

    ProjectManagerName = items[0].text;
    

      let userInfo1 = this._service.getUserByLogin(items[0].loginName).then((info1)=>{
      this.setState({userval1:info1});
      console.log(info1);

    });

  }

  else
  {

  
  this.setState({userval1:null});
    
  }

    

  }


  private handleChangeBussinesUnit(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
    this.setState({ MyBussinesUnitVal:item.key });

    
  }

    private handleChangeRequesType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyRequestVal:item.key });
  
      }

      private handleChangeDurationProject(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
        this.setState({ DurationProj:item.key });
    
        }

      private handleChangeCurrency(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ CurrencyVal:item.key });
      
      }

      private handleChangeApplication(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ Applicationval:item.key });
        
      }

      private handleChangeRiskSolutions(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
        this.setState({ RiskVal:item.key });
          
        }

        private handleChangeProjects(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

        this.setState({ProjDelv: defaultState});
        
        this.setState({ ProjDelv: item.key });
            
      }


      public RdonChange=async(ev:React.FormEvent<HTMLInputElement>,option :IChoiceGroupOption):Promise<void>=> {

       
       this.setState({NeworExsis: option.key});

       if(option.key=='New')
       {
           
        this.setState({divHide:true});

       }

       else if(option.key=='Existing')
       {

        this.setState({divHide:false});

       }

      
     }

  public changeNonDisclosure=async(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): Promise<void>=> {  

          this.setState({  
  
            NonDisclosure: option.key  
      
            });  
  
          }

  public ChangePersonalData(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

            this.setState({  
    
              PersonalData: option.key  
        
              });  
    
            }


    public ChangeSubContractData(ev: React.FormEvent<HTMLInputElement>, option: any): void {  

              this.setState({  
      
                subcontract: option.key  
          
                });  
      
              }

    private changeClientName(data: any): void {

      this.setState({ ClientName: data.target.value });

    }

    private changeCItOppID(data: any): void {

      this.setState({ CitOppId: data.target.value });

    }

    private changeProjName(data: any): void {

      this.setState({ ProjName: data.target.value });

    }

    private changeApproteAmt(data: any): void {

      this.setState({ Approiateamt: data.target.value });

    }


    private changeBriefSummary(data: any): void {

      this.setState({ MyBrief: data.target.value });
    }

    private changeAddcomments(data: any): void {

      this.setState({ Addcomments: data.target.value });
    }

    public handlestartDateChange = (date: any) => {

      this.setState({ dtsubdate: date.value });
  
      
      }



  //EndRegions

  //DateFunction

  private GetStartDateandEndDate()
  {

    let StartAM='9:00 AM'
    let EndPm='5:00 PM'
    let now = new Date();
    now.setDate(now.getDate()+1)
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = (month) + "/" + (day) + "/" + now.getFullYear()+" "+" "+StartAM;
    let today1 = (month) + "/" + (day) + "/" + now.getFullYear()+" "+" "+EndPm;

    let now1 = new Date();
    now1.setDate(now1.getDate()+30)

    let day1 = ("0" + now1.getDate()).slice(-2);

    let month1=("0" + (now1.getMonth() + 1)).slice(-2);

   let todaymax=(month1) + "/" + (day1) + "/" + now1.getFullYear()+" "+" "+StartAM;

    let now2=new Date();
    now2.setDate(now2.getDate())

    let day2 = (now2.getDate());

    let month2=("0" + (now2.getMonth() + 1)).slice(-2);

    let todaymin=(month2) + "/" + (day2) + "/" + now2.getFullYear()+" "+" "+StartAM;

   this.setState({ StartDate: today });

   this.setState({ EndDate: today1 });

   this.setState({MaximumDate:todaymax});

   this.setState({MinDate:todaymin});


  }

  //EndRegion

//Button On Click and Validations

private changeFileupload(data: any) {

let LocalFileVal= this.state.FileValue;

 LocalFileVal.push(data.target.files[0]);


this.setState({FileValue:LocalFileVal});

if(this.state.FileValue.length>2)
{
this.setState({disableFileUpload:true});

}


}


private OnBtnRemove(data:any)
{

console.log(data.target.value);

}


private _removeItemFromDetail(Item: any) {
  console.log("itemId: " + Item.name); 

 let localFileValues=[];

 localFileValues=this.state.FileValue;

 if(localFileValues.length==1)
 {

  localFileValues=[];
 }


  for(var count=0;count<localFileValues.length;count++)
  {

    if(localFileValues[count].name==Item.name)
      {
        let Index=count;

        localFileValues.splice(Index,count);

      }

  }

  this.setState({FileValue:localFileValues,disableFileUpload:false});


}

  private OnBtnClick() :void {

    if (this.state.MyBussinesUnitVal == null  || this.state.MyBussinesUnitVal == '1' || this.state.MyBussinesUnitVal == 'Select  Business Unit') {

      alert('Please select Business Unit');
      this.setState({ flag: false });
     

    }

    else if (this.state.MyRequestVal == null  || this.state.MyRequestVal == '1' || this.state.MyRequestVal == 'Select Request Type') {

      alert('Please select Request Type');
      this.setState({ flag: false });

    }

    
    else if (this.state.ClientName == null  || this.state.ClientName == '') {

      alert('Please enter Client Name');
      this.setState({ flag: false });

    }

    else if(ClientPartnerName==null || ClientPartnerName=='')
     {

     alert('Please enter Client Partner Name');
     this.setState({ flag: false });

    }

     else if(ProjectManagerName==null || ProjectManagerName=='')
    {

       alert('Please enter Project Manager Name');
       this.setState({ flag: false });

    }

   else if (this.state.CitOppId == null  || this.state.CitOppId == '') {

      alert('Please enter Sales opportunity ID');
      this.setState({ flag: false });

    }

    else if (this.state.ProjName == null  || this.state.ProjName == '') {

      alert('Please enter Project Name');
      this.setState({ flag: false });

    }

   else if(this.state.dtsubdate==null)
    {

      alert('Please select Submission Date');
      this.setState({ flag: false });

    }

   
    else if(this.state.MyBrief==null || this.state.MyBrief == '')
    {

      alert('Please enter Brief Summary');
      this.setState({ flag: false });

    }

   else if (this.state.DurationProj == null  || this.state.DurationProj == 'Select' || this.state.DurationProj == 'Select Duration of Project' || this.state.DurationProj=='') {

      alert('Please select Duration of Project');
      this.setState({ flag: false });

    }

   else if (this.state.Approiateamt == null  || this.state.Approiateamt == '') {

      alert('Please enter Approximate Amount');
      this.setState({ flag: false });

    }

   else if (this.state.CurrencyVal == null  || this.state.CurrencyVal == '1' || this.state.CurrencyVal == 'Select Valuation of Project' || this.state.CurrencyVal=='') {

      alert('Please select Valuation of Project');
      this.setState({ flag: false });

    }

   else if (this.state.Applicationval == null  || this.state.Applicationval == '1' || this.state.Applicationval == 'Select Application Project'||this.state.Applicationval=='') {

      alert('Please select Application Project');
      this.setState({ flag: false });

    }

   else if (this.state.RiskVal == null  || this.state.RiskVal == '1' || this.state.RiskVal == 'Select Risk Solution Application'|| this.state.RiskVal=='') {

      alert('Please select Risk Solution Application');
      this.setState({ flag: false });

    }

   else if (this.state.ProjDelv == null  || this.state.ProjDelv == '1' || this.state.ProjDelv == 'Select Project Delivery' || this.state.ProjDelv ==''||this.state.ProjDelv == '1') {

      alert('Please select  Project Delivery');
      this.setState({ flag: false });

    }

    

    else {

    // this.setState({ flag: true });

    let date = new Date();

    date.setDate(this.state.dtsubdate.getDate());

    let month= (this.state.dtsubdate.getMonth()+1);

    let year =(this.state.dtsubdate.getFullYear());

    let finalSubmissionDate=this.state.dtsubdate.getDate()+'/' + month +'/' +year;

    //Single File

    //let myfile = (document.querySelector("#infringementFiles") as HTMLInputElement).files[0];    
    

    //End

    let myfiles=[];

    for(var count=0;count<this.state.FileValue.length;count++)
    {
      
      myfiles.push(this.state.FileValue[count]);
    }

    //alert('Test');

    this._service.onDrop(this.state.MyBussinesUnitVal,this.state.MyRequestVal,this.state.ClientName,this.state.NeworExsis,this.state.NonDisclosure,this.state.CitOppId,this.state.ProjName,finalSubmissionDate,this.state.MyBrief,this.state.DurationProj,this.state.Approiateamt,this.state.CurrencyVal,this.state.Applicationval,this.state.RiskVal,this.state.PersonalData,this.state.subcontract,this.state.ProjDelv,this.state.Addcomments,(this.state.userval == null ? 0:this.state.userval.Id),(this.state.userval1 == null ? 0:this.state.userval1.Id),myfiles).then(function (data)
    {

      console.log(data);

      alert('Record submitted successfully');

      window.location.replace("https://capcoinc.sharepoint.com/sites/CapcoEnterpriseRiskRFP/");

      


    });

    
    }

    
 
    

    
  }

  


 

 

  
   //EndRegion

  
  public render(): React.ReactElement<IRfpProj3Props> {


    return (

  
      <Stack tokens={stackTokens} styles={stackStyles} >
      <Stack>
        <b><label className={styles.labelsFonts}>1. Business Unit</label></b><br/>

          <Dropdown className={styles.onlyFont}
              placeholder="Select  Business Unit"
              options={this.state.BussinessUnitListItems}
              styles={dropdownStyles}
              selectedKey={this.state.MyBussinesUnitVal ? this.state.MyBussinesUnitVal : undefined} onChange={this.handleChangeBussinesUnit.bind(this)}/>
            <br/>
           
           <b><label className={styles.labelsFonts}>2. Request Type</label></b><br></br>
              <Dropdown className={styles.onlyFont}
              placeholder="Select Request Type"
              options={this.state.RequesTypeListItems}
              styles={dropdownStyles}
              selectedKey={this.state.MyRequestVal ? this.state.MyRequestVal : undefined} onChange={this.handleChangeRequesType.bind(this)}/>
            <br/>

            <b><label className={styles.labelsFonts}>3. Client Name</label></b><br></br>
            <b><label className={styles.labelsFonts}>a.Client Name</label></b><br/>
            <div> 
            <input type="text" name="txtClientName" value={this.state.ClientName} onChange={this.changeClientName.bind(this)} className={styles.boxsize}/>
            </div>
            <br/>
           
           <ChoiceGroup className={styles.onlyFont} onChange={this.RdonChange} options={RadioNewExsis} defaultSelectedKey='Existing'/>
            
            <br/>

            {this.state.divHide == true &&

            <div id="divdisclousure">  
            <b><label className={styles.labelsFonts}>Has a Non-Disclosure Agreement (NDA) been completed ?</label></b><br></br>
            <ChoiceGroup className={styles.onlyFont} options={RadioNonDiclosure}   onChange={this.changeNonDisclosure} />
            </div>

  }
            <br/>

            <b><label className={styles.labelsFonts}>4. Client Partner/Project Manager</label></b><br></br>
            <b><label className={styles.labelsFonts}> a.Client Partner</label></b><br/>
            <div className={styles.boxsize}>  
            <PeoplePicker 
                context={this.props.context}
                //titleText="User Name"
                personSelectionLimit={1}
                showtooltip={true}
                required={true}
                disabled={false}
                onChange={this._getPeoplePickerItems.bind(this)}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                defaultSelectedUsers={(this.state.ClientPatnerName && this.state.ClientPatnerName.length) ? [this.state.ClientPatnerName] : []}
                ref={c => (this.ppl = c)} 
                resolveDelay={1000} />  
                </div>
                <br/>

                <b><label className={styles.labelsFonts}>b.Project Manager</label></b><br/>
                <div className={styles.boxsize}>  
                <PeoplePicker
                context={this.props.context}
                //titleText="User Name"
                personSelectionLimit={1}
                showtooltip={true}
                required={true}
                disabled={false}
                onChange={this._getPeoplePickerItems1.bind(this)}
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                defaultSelectedUsers={(this.state.ProjectManagerName && this.state.ProjectManagerName.length) ? [this.state.ProjectManagerName] : []}
                ref={c => (this.ppl = c)} 
                resolveDelay={1000}     />
               </div> <br/>

            <b><label className={styles.labelsFonts}>5. Sales opportunity ID</label></b><br/>
            <div> 
            <input type="text" name="txtCITOppuId" value={this.state.CitOppId} onChange={this.changeCItOppID.bind(this)} className={styles.boxsize}/>
            </div><br/>

            <b><label className={styles.labelsFonts}>6. Project Name</label></b><br/>
            <div> 
            <input type="text" name="txtProjName" value={this.state.ProjName} onChange={this.changeProjName.bind(this)} className={styles.boxsize}/>
            </div><br/>

            <b><label className={styles.labelsFonts}>7. Submission Deadline</label></b><br/>
            <div className={styles.boxsize}> 
            
            <DatePickerComponent  value={this.state.dtsubdate} onChange={this.handlestartDateChange} ></DatePickerComponent><br/>
           
           </div> <br/>

           <b><label className={styles.labelsFonts}> 8. Brief Summary of Project</label></b><br/>
           <div>  
           <textarea id="txtsynopsis" value={this.state.MyBrief} onChange={this.changeBriefSummary.bind(this)} className={styles.textAreacss}></textarea>
           </div><br/>

           <b><label className={styles.labelsFonts}>9. Duration of Project</label></b><br></br>

          <Dropdown className={styles.onlyFont}
              placeholder="Select Duration of Project"
              options={this.state.DurationProjListItems}
              styles={dropdownStyles}
              selectedKey={this.state.DurationProj ? this.state.DurationProj : undefined} onChange={this.handleChangeDurationProject.bind(this)}/>
            <br/>

            <b><label className={styles.labelsFonts}>10. Value of Project</label></b><br></br>
            <b><label className={styles.labelsFonts}>a.Approximate Amount</label></b><br></br>
            <div> 
            <input type="text" name="txtApproraiteAmt" value={this.state.Approiateamt} onChange={this.changeApproteAmt.bind(this)} className={styles.boxsize}/><br/>
            </div><br/>

            <b><label className={styles.labelsFonts}>b.Currency</label></b><br></br>
            <Dropdown className={styles.onlyFont}
              placeholder="Select Valuation of Project"
              options={this.state.CurrencyListItems}
              styles={dropdownStyles}
              selectedKey={this.state.CurrencyVal ? this.state.CurrencyVal : undefined} onChange={this.handleChangeCurrency.bind(this)}/>
            <br/>

            <b><label className={styles.labelsFonts}>11. What Applications will be used in the Project ?</label></b><br/>
            <Dropdown className={styles.onlyFont}
              placeholder="Select Application Project"
              options={this.state.ApplicationListItems}
              styles={dropdownStyles}
              selectedKey={this.state.Applicationval ? this.state.Applicationval : undefined} onChange={this.handleChangeApplication.bind(this)}/>
              <br/>

            <b><label className={styles.labelsFonts}>12. Will you be using any Risk Solution Applications ?</label></b><br/>
            <Dropdown className={styles.onlyFont}
              placeholder="Select Risk Solution Application"
              options={this.state.RiskListItems}
              styles={dropdownStyles}
              selectedKey={this.state.RiskVal ? this.state.RiskVal : undefined} onChange={this.handleChangeRiskSolutions.bind(this)}/>
              <br/>
             
              <div> 
              <b><label className={styles.labelsFonts}>13. Will the proposal or project include processing of client or client’s client personal data ?</label></b>
              </div><br/>
              <div>
              <label className={styles.labelsFonts}><b>* Processing (NPI/PII); including collecting, recording, storing, using, transferring, analysing, combining, disclosing or deleting it. Personal Data; means information about a particular living individual. This might be anyone, including an employee, contractor, client,client’s customer, partner, business contact, public official or member of the public. It doesn’t need to be ‘private’ information – even information which is public knowledge or is about someone’s professional life can be personal data.</b> </label><br/>
             </div><br/>
             <div>
             <ChoiceGroup className={styles.onlyFont}  id="PersonalData"  name="PersonalData"  defaultSelectedKey='Yes' options={RadioPersonalData}   onChange={this.ChangePersonalData.bind(this)}  selectedKey={this.state.PersonalData}/>
             </div> <br/>

             <div> 
              <b><label className={styles.labelsFonts}>14. Will you be using Subcontractors in this Project ?   </label></b><br/>
             
             <ChoiceGroup className={styles.onlyFont}  id="SubContract"  name="SubContract"  defaultSelectedKey='Yes' options={RadioSubcontract}   onChange={this.ChangeSubContractData.bind(this)}  selectedKey={this.state.subcontract}/>
             </div> <br/>


             <b><label className={styles.labelsFonts}>15. How will the Project be Delivered  ?</label></b><br/>
            <Dropdown
              placeholder="Select Project Delivery"
              options={this.state.ProjDelListItems}
              styles={dropdownStyles}
              selectedKey={this.state.ProjDelv ? this.state.ProjDelv : undefined} onChange={this.handleChangeProjects.bind(this)}/>
              <br/>

           <b><label className={styles.labelsFonts}>16. Additional Comments</label></b><br/>
           <div>  
           <textarea id="txtAddCommenst" value={this.state.Addcomments} onChange={this.changeAddcomments.bind(this)} className={styles.textAreacss}></textarea>
           </div><br/>

           <b><label className={styles.labelsFonts}>Attach any relevant files</label></b><br/>
           <div> 

          <input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileupload.bind(this)} disabled={this.state.disableFileUpload}/>

         
           {this.state.FileValue.map((item,index) =>(

            <div className={styles.padcss}>  
            
            {item.name} <Icon iconName='Delete'  onClick={(event) => {this._removeItemFromDetail(item)}}/>

            </div>
             

))}


           </div>  <br/>

           <b><label className={styles.labelsFonts}>*A maximum of three files may be uploaded</label></b><br/>

           <b><label className={styles.labelsFonts}>It is best practice to use good naming conventions with your documentation. Please use the following format</label></b><br/>


           <b><label className={styles.labelsFonts}>Client Name_Document Title_yyyymmdd (i.e. HSBC Information Security VDD 20191126.xls)</label></b><br/>
           <div>  

           <PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.Mybutton}/>

           </div>
         
       </Stack>
       </Stack>
             



                   
      
    );
  }
}
