
function dateToHowManyAgo(date:any){
      
  let formattedDate= '';
     if(date){

      const mydate = new Date(date);
    //const subbenddate =  mydate.toDateString();

    formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(mydate);

     }else{

       formattedDate = '';

     }

    

      

    return formattedDate;



   }
   export default dateToHowManyAgo;