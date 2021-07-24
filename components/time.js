export const timeBefore=()=>{
    //현재시간
     var now = new Date(); 
    //기준시간 
    var writeDay = new Date('Thu Oct 20 2019 15:01:17 GMT+0900');
    var minus;
    var time = '';
    if(now.getFullYear() > writeDay.getFullYear()){
       minus= now.getFullYear()-writeDay.getFullYear();
       time += minus+"년 ";
    }
   if(now.getMonth() > writeDay.getMonth()){
      minus= now.getMonth()-writeDay.getMonth();
      time += minus+"달 ";
   }
   if(now.getDate() > writeDay.getDate()){
       minus= now.getDate()-writeDay.getDate();
      time +=  minus+"일 ";
   }
   
    if(now.getHours() > writeDay.getHours()){
        minus = now.getHours() - writeDay.getHours();
       time +=  minus+"시간 ";
      }
     
     if(now.getMinutes() > writeDay.getMinutes()){
        minus = now.getMinutes() - writeDay.getMinutes();
      time += minus+"분 ";
      }
     
     if(now.getSeconds() > writeDay.getSeconds()){
        minus = now.getSeconds() - writeDay.getSeconds();
        time += minus+"초";
      }
     
      time += "전";
     document.getElementsByClassName("sub")[0].innerHTML = time;
         
           
       }
   
   
     setInterval(timeBefore,1000);