
$(document).ready(function(){


    passing_card=[];
    received_card_array=[];

    var socket = io.connect('http://localhost:2000');
    
    function nithalla(){
        for(k=0;k<3;k++){
           console.log(k);
            var id = "div_"+k;
               // $("#div_1")
//           var final_id = $('"#div_'+i+'"');
            console.log(id);
//            if($("#cards_left").find(final_id).hasClass(data.id)){
//               final_id.attr("class",data.id);
//               final_id.text("ID: "+data.id+" cards: "+data.card_left);
//            }
        }
        }
    
    socket.on('message',function(data){
     console.log(data); 
    nithalla();
    });
    
    function assign(array) {
   
    temp_cards = [];
    for(i in array){
               
            temp_cards.push(array[i]);
    }
     
        console.log("Temp Cards Array is "+temp_cards);
        
        $('.chit').each( function (i) {
        
        $(this).text( array[i]);//text(cards_sent[i])
    });
    }       
    socket.on('client_cards',function(data){
        console.log("called");
        assign(data);
        console.log(data);
    });
    
    
    function take_name(){
       
        var person = prompt("Please enter your name");
        
        if (person != " ") {
            socket.emit('idname',person);
            console.log(person);

            }
        else{
            
           take_name();
        }
       
    }
   take_name();
    
   
    
  
    
    socket.on('connector',function(data){
        $('#output2').empty();
        $.each(data, function(index, value){
                       
            $('<div class="join_id">'+value.name+' '+'Joined'+'</div>').appendTo('#output2');
       
        });
        $("#users").html('Total connected users: '+data.length);
        
    });
    socket.on('shuffle_timer',function(data){
        
       
        var timeleft = data.timer;
        var downloadTimer = setInterval(function(){
        timeleft--;
        $(".timer").text("Shuffling cards in "+timeleft+" secs");
        
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        $(".timer").css("display","none");}
    },1000);
        
    });
     socket.on('visible',function(data){
        
        $(".chit").css("display",data.display);
       $(".chit").fadeIn();
        
    });
    
    function remove_from_array(array,element){
        array.splice(array.indexOf(element),1);
        console.log("Final Array After Passing :"+array);
        
    };
    
     /*  socket.on('chance_timer',function(data){
             $(".call_button").css("pointer-events","auto");
            $("#mycanvas").empty();
//            $(".timer1").css("display","block");
           $("#mycanvas").fadeIn();
           $(".chit").css("background-color","blue");
           $(".chit").css("pointer-events","auto");
           timeleft = data.timer;
           downloadTimer = setInterval(function(){
           timeleft--;
            
           // $(".timer1").text("Time Remaining: "+timeleft+" secs");
           if(timeleft > 0 && ($("#"+id).data('clicked'))){

        card_value = $("#"+passing_card[0]).html();
        remove_from_array(temp_cards,card_value);
        cardnumber_cal(temp_cards);
         
         console.log("You passed "+passing_card[0]);
        $(".chit").css("pointer-events","none");
        $("#"+id).fadeOut();
//        $("#"+id).remove();  
        check = false;
         if(temp_cards.length == 4){
         check = check_for_winner(temp_cards);
        }
            if(check){
                    
//                    console.log("You win");
                    $(".call_button").css("pointer-events","auto");
                    $(".call_button").css("opacity","1");
                    
//        socket.emit('chitclick',data); 
//        }
     
                    } else{
                        pass_card();
                    }
     }
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        default_pass();
        }
    },1000);
        
    });
    */
    
    // timer for passing cards 
    socket.on('chance_timer', function(data){
        $("#mycanvas").css("display","block");
        $(".chit").css("background-color","blue");
        $(".chit").css("pointer-events","auto");
        var counter=0;
        var countTo=15;
        var sec=0;
        var angle=270;
        var inc=360/countTo; 
        (function drawCanvas(){
               
               
  var canvas=document.getElementById('mycanvas');
  var ctx=canvas.getContext('2d');
  var cWidth=canvas.width;
  var cHeight=canvas.height;
  
  
  
  //var min=Math.floor(countTo/60);
  //var sec=countTo-(min*60);
  
  //var angle=270;
  //var inc=360/countTo; 
  
  drawScreen();
  function drawScreen() {
    
    
    
    //======= reset canvas
    
    ctx.fillStyle="#2e3032";
    ctx.fillRect(0,0,cWidth,cHeight);
    
    //========== base arc
    
    ctx.beginPath();
    ctx.strokeStyle="#252424";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();
    
    //========== dynamic arc
    
    ctx.beginPath();
    ctx.strokeStyle="#df8209";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*270,(Math.PI/180)*angle,false);
    ctx.stroke();
    ctx.closePath();
    
    //======== inner shadow arc
    
    grad=ctx.createRadialGradient(cWidth/2,cHeight/2,80,cWidth/2,cHeight/2,115);
    grad.addColorStop(0.0,'rgba(0,0,0,.4)');
    grad.addColorStop(0.5,'rgba(0,0,0,0)');
    grad.addColorStop(1.0,'rgba(0,0,0,0.4)');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();
    
    //======== bevel arc
    
    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'#6c6f72');
    grad.addColorStop(0.5,'#252424');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,93,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();
    
    //====== emboss arc
    
    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'transparent');
    grad.addColorStop(0.98,'#6c6f72');
    
    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,107,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();
    
    //====== Labels
    
    var textColor='#646464';
    var textSize="12";
    var fontFace="helvetica, arial, sans-serif";
    
    ctx.fillStyle=textColor;
    ctx.font=textSize+"px "+fontFace;
   // ctx.fillText('MIN',cWidth/2-46,cHeight/2-40);
    ctx.fillText('SEC',cWidth/2-10,cHeight/2-10);
    
    //====== Values
    
    
    
    ctx.fillStyle='#6292ae';
    
    
    ctx.font='50px '+fontFace;
    if (sec<15) {
      ctx.fillText(sec,cWidth/2-25,cHeight/2+35);
    } 
    else {
      ctx.fillText(sec,cWidth/2-25,cHeight/2+35);
    }
    
    
  }
            
            
            
    function check_for_winner(array) {
    isSame = true;
    
        for(var i=0; i < array.length; i++) {
       if(array[0] !== array[i]){
           isSame = false;
           break;
           
       }
           
        }
    
    check = isSame;
}
  
//  function verify_for_check(custom_function){
//        check = false;
////                if(temp_cards.length == 4){
////                    check = check_for_winner(temp_cards);
////                    console.log(check);
////                    
////                }
////                if(check){
////                    
//////                    console.log("You win");
////                    $(".call_button").css("pointer-events","auto");
////                    $(".call_button").css("opacity","1");
////                    
//////        socket.emit('chitclick',data); 
//////        }
////     
////                    } else{
////                       custom_function();
////                        $("#mycanvas").css("display","none");
////                    }
////    }
            
            
     var pass_card = ()=>{
                        $(".timer1").empty();
                        clearInterval(downloadTimer); 
                        socket.emit('change_timer',{player_no:1});
                        socket.emit('passer',card_value);
                        
                        $(".chit").data('clicked', false);
        };
    
     var default_pass = ()=>{
        
        socket.emit('passer',temp_cards[temp_cards.length - 1]);
        console.log("Card sent and removed(default) :"+temp_cards[temp_cards.length - 1]);
        remove_from_array(temp_cards,temp_cards[temp_cards.length - 1]);
        
          
         console.log("Default_function final array is "+temp_cards);
          
        cardnumber_cal(temp_cards); // counting number of cards when a card is passed
        $(".timer1").css("display","none");
        
        $(".chit").data('clicked', false);
        $(".chit").css("pointer-events","none");
        socket.emit('change_timer',{player_no:1});
        $('#cards .chit:last').fadeOut();
        
     };
    
    
    
            
            downloadTimer = setInterval(function(){
           
            
           // $(".timer1").text("Time Remaining: "+timeleft+" secs");
                
            
    if (counter<countTo) { //counter=0 countto=15
      angle+=inc;       //angle=270 inc=360/countto
      counter++;
      sec++;
      drawScreen();
          if(counter <= 15 && ($("#"+id).data('clicked'))){

            card_value = $("#"+passing_card[0]).html();
            remove_from_array(temp_cards,card_value);
            cardnumber_cal(temp_cards);
         
            console.log("You passed "+passing_card[0]);
            $(".chit").css("pointer-events","none");
            $("#"+id).fadeOut();
             
            check = false;
                if(temp_cards.length == 4){
                    check_for_winner(temp_cards);
                    console.log(check);
                    
                }
                if(check){
                    
//                    console.log("You win");
                    $(".call_button").css("pointer-events","auto");
                    $(".call_button").css("opacity","1");
                    
//        socket.emit('chitclick',data); 
//        }
     console.log(check);
                    } else{
                        console.log(check);
                        pass_card();
                        $("#mycanvas").css("display","none");
                    }
     } 
    } else
       {
        clearInterval(downloadTimer);
        console.log("Default function ran with counter"+counter);
//        $("#mycanvas").css("display","none");
//        default_pass();
            check = false;
                if(temp_cards.length == 4){
                    check_for_winner(temp_cards);
                    console.log(check);
                    
                }
                if(check){
                    
//                    console.log("You win");
                    $(".call_button").css("pointer-events","auto");
                    $(".call_button").css("opacity","1");
                    
//        socket.emit('chitclick',data); 
//        }
                    console.log(check);
     
                    } else{
                       console.log(check);
                       default_pass();
                        $("#mycanvas").css("display","none");
                    }
           
      }
            },1000);
           
                
//           
//    if(counter > 15){
//        clearInterval(downloadTimer);
//        console.log("Default function ran with counter"+counter);
//        $('#mycanvas').empty();
//        default_pass();
//        }
//    }
//  
})()
        
         
        
        
    });
    
    
   
    
    $(".call_button").click(function(){
        console.log("You called and won");
        clearInterval(downloadTimer);
    });
    
    $(document.body).click(function(e) {
        if( !$(e.target).is(".chit") ) {
            console.log("Clicked somwhere else");
            $(".chit").css("background-color","blue");
            passing_card.splice(0,passing_card.length);
            console.log(passing_card);
     }
   });
       
    socket.on('usersleft',function(data){
        $('#output2').empty();
        $.each(data, function(index, value){
                       
            $('<div class="join_id">'+value+' '+'Joined'+'</div>').appendTo('#output2');
       
        });
        
    });
     
    socket.on('room',function(data){

        $("#room").text("Room id : "+ data);
        
    });
    
    socket.on('lost',function(data){

        $('<div class="lost_id">'+data.name+' '+'Left'+'</div>').appendTo('#output3');
    
    });
    

    $('#cards').on('click', 'div', function(){
        
//        console.log("Clicked");
        var data = $(this).html();
        id = $(this).attr('id');
//        console.log(id);
        if(passing_card.length === 0){
//            $(this).slideUp();
            passing_card.push(id);
            console.log("First Click on :"+passing_card);
            $(this).css("background-color","green");
        }else {
            
            if(passing_card[0] == id){
                
                
                $("#"+id).data('clicked', true);
            console.log("Same card for second time :"+id);
                $(this).css("background-color","red");
                
            }
            else{
                passing_card[0] = id;
         console.log("Some other card 1st time :"+passing_card[0]);
                $(".chit").css("background-color","blue");
                $(this).css("background-color","green");
            }
//        socket.emit('chitclick',data); 
            }
    
    });  
    
    
    socket.on('card_received',function(data){
//        console.log("Received card: "+data);
        
        temp_cards.push(data);
        cardnumber_cal(temp_cards);
        received_card_array.push(data);
        $('<div class="chit" id="card_5" style = "background-color: yellow; display: inline-block;pointer-events:auto;">'+received_card_array[0]+'</div>').appendTo('#cards');
        
         console.log("Received Card array :"+received_card_array);
        remove_from_array(received_card_array,data);
         console.log("Final received Card array :"+received_card_array);

    socket.on("display_no",function(data){
      console.log("No of cards from server :"+data);   
    });
    
   
        
       

   }); 

     function cardnumber_cal(temp_cards)
        {
            var tmpnoofcards = temp_cards.length;
            console.log("no of cards left after passing or receiving"+tmpnoofcards);
            socket.emit('otheruser_cards', tmpnoofcards);
        };
    
    
});