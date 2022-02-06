import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }



   public async GetAllBussinessUnits():Promise<any>
   {

    return await sp.web.lists.getByTitle("BusinessUnit").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }


   public async GetAllRequesTypes():Promise<any>
   {

    return await sp.web.lists.getByTitle("RequestTypes").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }

   public async GetAllDurationProjects():Promise<any>
   {

    return await sp.web.lists.getByTitle("DurationofProject").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }


   public async GetAllCuurency():Promise<any>
   {

    return await sp.web.lists.getByTitle("NewValueProjects").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }
   public async GetAllApplications():Promise<any>
   {

    return await sp.web.lists.getByTitle("ApplicationUsedProject").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }

   public async GetAllRiskSolutions():Promise<any>
   {

    return await sp.web.lists.getByTitle("RiskSolutionApplications").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }


   public async GetAllProjects():Promise<any>
   {

    return await sp.web.lists.getByTitle("ProjectDelivered").items.select('Title','ID').expand().get().then(function (data) {

    return data;


    });


   }


   private async Save(MyBussineesUintVal:string,MyRequesTypeVal:string,MyClientName:string,MyClientNameExisornew:string,MyNonDisclsure:string,MyClienPatName:string,MyProjMangName,MyCITOppId:string,MyProjectName:string,MySubmissionDealine:string,MyBriefSync:string,MyDurationProj:string,MyAppamt:string,MyNewValueProjectCurrencyId:string,MyApplicationProjId:string,MyRiskSolotionApplicationId:string,MyPersonalData:string,Mysubcontract:string,MyProjDelv:string,MyAddcomments:string,MyAttachmanets:any):Promise<any>     {       
  
    let Filemal=[];

    let one=MyAttachmanets;


    for(var count=0;count<MyAttachmanets.length;count++)
    {
   
        Filemal=MyAttachmanets[count];

    }


    if(MyClientNameExisornew=='')
    {

    MyClientNameExisornew='Exsisting';
    }
    
    if(Mysubcontract=='')
    {

    Mysubcontract='Yes';
    }

    if(MyPersonalData=='')
    {

    MyPersonalData='Yes';
    }

    if(MyClientNameExisornew=='New')
    {

        if(MyNonDisclsure=='')
        {

            alert('Please select Non Disclosure value');
            return false;
            
        }

    
    }

   
    await sp.web.lists.getByTitle('RFPRequests').items.add({    

    BussinessUnitId:MyBussineesUintVal,
    RequestTypeId:MyRequesTypeVal,
    ClientName:MyClientName,
    ClientNameExisornew:MyClientNameExisornew,
    NonDisclouserAgreement:MyNonDisclsure,
    Client_x0020_Partner:MyClienPatName,
    Project_x0020_Manager:MyProjMangName,
    CITOppurtunityID:MyCITOppId,
    ProjectName:MyProjectName,
    SubmissionDealine:MySubmissionDealine,
    BreifSynopssisofProj:MyBriefSync,
    DurationofProjectId:MyDurationProj,
    ValueofProjAmount:MyAppamt,
    NewValueProjectCurrencyId:MyNewValueProjectCurrencyId,
    ApplicationProjId:MyApplicationProjId,
    RiskSolotionApplicationId:MyRiskSolotionApplicationId,
    VendorPersonalData:MyPersonalData,
    SubContractorsProj:Mysubcontract,
    ProjectsDeliveryId:MyProjDelv,
    UserComments:MyAddcomments,
    Attachments:one
    
   
    });

    
  
  }

  public async getUserByLogin(LoginName:string):Promise<any>{
    try{
        const user = await sp.web.siteUsers.getByLoginName(LoginName).get();
        return user;
    }catch(error){
        console.log(error);
    }
}



 

 private async onDrop (MyBussineesUintVal:string,MyRequesTypeVal:string,MyClientName:string,MyClientNameExisornew:string,MyNonDisclsure:string,MyCITOppId:string,MyProjectName:string,MySubmissionDealine:string,MyBriefSync:string,MyDurationProj:string,MyAppamt:string,MyNewValueProjectCurrencyId:string,MyApplicationProjId:string,MyRiskSolotionApplicationId:string,MyPersonalData:string,Mysubcontract:string,MyProjDelv:string,MyAddcomments:string,MyClientPatName:string,MyProjectmangName,acceptedFiles)  {

    let Myval='Completed';

    try
    {

    let Filemal=[];

    if(MyClientNameExisornew=='')
    {

    MyClientNameExisornew='Existing';
    }
    
    if(Mysubcontract=='')
    {

    Mysubcontract='Yes';
    }

    if(MyPersonalData=='')
    {

    MyPersonalData='Yes';
    }

    if(MyClientNameExisornew=='New')
    {

        if(MyNonDisclsure=='')
        {

            alert('Please select Non Disclosure value');
            return false;
            
        }

    
    }

      let file=acceptedFiles;

      let Varmyval= await sp.web.lists.getByTitle("RFPRequests").items.add({

  
        BussinessUnitId:MyBussineesUintVal,
        RequestTypeId:MyRequesTypeVal,
        ClientName:MyClientName,
        ClientNameExisornew:MyClientNameExisornew,
        NonDisclouserAgreement:MyNonDisclsure,
        CITOppurtunityID:MyCITOppId,
        ProjectName:MyProjectName,
        SubmissionDealine:MySubmissionDealine,
        BreifSynopssisofProj:MyBriefSync,
        DurationofProjectId:MyDurationProj,
        ValueofProjAmount:MyAppamt,
        NewValueProjectCurrencyId:MyNewValueProjectCurrencyId,
        ApplicationProjId:MyApplicationProjId,
        RiskSolotionApplicationId:MyRiskSolotionApplicationId,
        VendorPersonalData:MyPersonalData,
        SubContractorsProj:Mysubcontract,
        ProjectsDeliveryId:MyProjDelv,
        UserComments:MyAddcomments,
        Client_x0020_PartnerId:MyClientPatName,
        Project_x0020_ManagerId:MyProjectmangName,
        Title: "Request Created"
      

    }).then (async r => {
      // this will add an attachment to the item we just created to push t sharepoint list

    for(var count=0;count<file.length;count++)
    {
     await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
    console.log(result);

      })

    }

    return Myval;



    })

    

    return Varmyval;

    
  }



  catch (error) {
    console.log(error);
  }


  
 }
 



}

