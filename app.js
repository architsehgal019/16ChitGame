
var express = require('express');
var app = express();
var serv = require('http').Server(app);
 connections = [];
onlineusers = [];
var client = {};
room_object = {};
arrayobj = [];
a = 0;
cards_sent =[];
arr = ["Audi", "BMW", "Ferrari", "Porsche","Audi", "BMW", "Ferrari", "Porsche","Audi", "BMW", "Ferrari", "Porsche","Audi", "BMW", "Ferrari", "Porsche"];
cards = [];
 call = 4;
incrementor = 0;
user_inc = 0;

n=0;//global
m = 0;// bhkkk

rooms = [];

aur_beta = [];
player = 0;
player_1 = 1;


app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
serv.listen(2000);
console.log("Server started.");
 
//var SOCKET_LIST = {};
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
   
    
    //this function is called when a user enters his name
    socket.on('idname',function(data){
         
    console.log(socket.id);
    socket.username = data;
    console.log(data+ " Joined");        
    connections.push(socket);
        //Join Room
        
                
    console.log('Connected: %s sockets connected', connections.length);
         
    name = socket.username;
    id = socket.id;
        
        //Room Creation And Assigning
      if(connections.length==4*n+1){//1,5,9
	     socket.room = "room_" + Math.random();
         socket_room = socket.room;
         rooms.push(socket_room);
         console.log("Socket.room is :"+ socket.room);
	       
//       
          //Create Gobal Room Object (Multidimensional Object)
          
          room_object[rooms[n]] = [{
                                    name: name,
                                    id: id
                                            }]
      
          ro = room_object[rooms[n]];
          onlineusers.push(ro[0].name);
          
          console.log("Name is :"+ro[0].name);
          console.log(onlineusers);
          console.log(room_object);

          
          //End objects
          //Call for common function
          common(rooms[n]);
          
        m = n;//m=0
	    n++;	
	    call =4;
        incrementor = 0;
     }
        else if(connections.length<4*n){//2,3...6,7...10,11,12
	   
             
                
              //call for room_object_push()
              room_object_push();
              common(rooms[m]);
            
        
            }//End if

             else if((connections.length)%4==0){//4,8,12
                        room_object_push();
                        common(rooms[m]);
                        //End

                        cards = shuffle(arr);
                        
                       io.to(rooms[m]).emit('shuffle_timer',{timer:5});
                        
                    setTimeout(function() {
                    card_sender(call,rooms[m]);
                    io.to(rooms[m]).emit('visible',{display:"inline-block"});
                     starttimer(rooms[m]);
                }, 5000)
                 
                 

                }
    });
    
    
    

    //added this below
   

//    console.log(socket.id);
    
//  
    
    socket.on('otheruser_cards', function(data){
       
        console.log(socket.username+" "+data); 
        console.log("Players are in room: "+room_global);
//        socket.broadcast.to(room_global).emit('message', 'Cards remaining with '+socket.username+' = '+ data);
        io.in(room_global).emit('message', {id:socket.username,card_left:data});
        
    });
    
    
     function starttimer(room){
                        console.log("Starttimer called");
                        var players = room_object[room];
        
                        console.log("Current player is: "+player)
                        io.to(players[player].id).emit('chance_timer',{timer:15});
                        if(player < 3){
                         player++;
                        console.log("Next player is: "+player);
                        }else{
                           player = 0;
                            
                        }
                        
                    };
    socket.on('change_timer',function(data){
                    starttimer(socket_room);
    });
    
     socket.on('passer',function(data){
                    card_passer(data,socket_room);
    });
    function card_passer(passing_card,room){
            
             console.log("Card Passer called");
                        var players = room_object[room];
                        
                        
//                        console.log("player id"+player);
                       console.log("Current player is: "+player)
                        io.to(players[player_1].id).emit('card_received',passing_card);
                        if(player_1 < 3){
                         player_1++;
                        console.log("Next player is: "+player);
                        }else{
                            if(player_1 == 3){
                           player_1 = 0;
                            }
                        }
                        
    }
    
    function common(room_fake){
        
        room_global = room_fake;
        console.log("Room_fake is : "+room_fake);    
        socket.join(room_fake);
        client_array = room_object[room_fake];  

        io.to(room_fake).emit('connector', client_array);
         io.to(room_fake).emit('room', room_fake);
        
    }
    function room_object_push(){
                other_client = {name:name,id:id}
                ro.push(other_client);
                onlineusers.push(other_client.name);
                console.log(onlineusers);
                console.log(room_object);   
        
    }
    
    function shuffle(array) {
  var currentIndex = array.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
   
    
    
    
    function card_sender(call,room_called){
        console.log("Card_sender Called");   
        cards_sent = [];
//        console.log(cards);
//        console.log("Initial Card_sent array is: "+cards_sent);
        if(call<=cards.length)
        {
           

        
        while(incrementor<call){ 
//          cards_sent = [];
//            console.log("Entered while");
              cards_sent.push(cards[incrementor]);

              incrementor++;
           
        }
            
            console.log("While exit");
                    
            client_id = room_object[room_called][user_inc].id;
            
//            console.log(Array.isArray(aur_beta));
             io.to(client_id).emit('client_cards',cards_sent);

            if(user_inc < room_object[room_called].length){
                user_inc++;
            }else{
                user_inc = 0;
            }
            console.log("user_inc is :"+user_inc);
            incrementor = call;
            console.log("incrementor is :"+incrementor);
            call= call + 4;
            console.log("Call is :"+call);
        
            card_sender(call,room_called);
        } // end if
        
        else
           {    console.log("If statement not valid");
                user_inc = 0;
                call = 4;
                incrementor = 0;

           }
    } // end function card_sender
   


    
   
    
    socket.on('chitclick',function(data){
//    for(var i in SOCKET_LIST){
//        var socket = SOCKET_LIST[i];
        
         var clicked = data;
         console.log(data);
         io.sockets.emit('chitclicked',{click: clicked,whoclicked: socket.username}); 
   
    
    });
    socket.on("cardno",function(data){
    console.log(data);
    console.log(socket.id);
        socket.broadcast.to(socket.room).emit('display_no',data);
    });
   
    /*
    function card_no_sender(card_number, socket.id)
    {
        
    }
    */
    
    socket.on('disconnect',function(){
        
//        delete SOCKET_LIST[socket.id];
        
//        delete room_object[room_id];
        for(i in room_object){
           console.log("Rooms  after disconnecting are: "+i);

            var disconnected = room_object[i].filter(p => p.id == socket.id);//
            console.log(disconnected[0]);
            
           
            if(disconnected.length == 1){
           room_object[i].splice(room_object[i].indexOf(disconnected[0]),1);
                common(i);
                io.to(i).emit('visible',{display:"none"});
                io.to(i).emit('lost',{name: socket.username});
           } 
            console.log(room_object);
            if(room_object[i].length==0){
                delete room_object[i];
                console.log(room_object);
            }
            
        }
        
        console.log("Client disconnected from room :"+ socket_room)
            console.log("Connection lost with " + socket.username);
        
        
        //Total Users Connected
        onlineusers.splice(onlineusers.indexOf(socket.username), 1);
//        io.sockets.emit('connector',onlineusers);
        
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);

       //added this below
//    io.sockets.emit ('totalUsers', {count: connections.length});
        
    });
});
   




 
