var useroptions = {"jump":false, "fly":false, "sub":false, "speed":false,
                    "invisible":false,"acorn":false,"powacorn":false,"fire":false,
                    "ice":false,"potion":false,"magnet":false,"double":false};
//DONE: jump, sub, speed, invisible, potion, magnet, double, fly, acorn, powacorn
//SORTA DONE:  fire, ice
if(typeof localStorage.useroptions === 'undefined'){
    saveOptions();
}else{
    var savedOptions = localStorage.useroptions;
    useroptions = JSON.parse(savedOptions);
}

function saveOptions(){
    localStorage.useroptions = JSON.stringify(useroptions); 
}

function changeSound(){
    if(localStorage.sound === 'undefined' || localStorage.sound == "true"){
        localStorage.sound = "false";
        setSound();
    }else{
        localStorage.sound = "true";
        setSound();
    }
}

function setSound(){
    if(localStorage.sound === 'undefined' || localStorage.sound == "true"){
        $("#sound:hover").css("background-color","rgba(10, 133, 10,0.8)");
        $("#sound:active").css("background-color","rgba(10, 133, 10,0.8)");
        $("#sound").css("background-color","rgba(0,200,0,0.3)");
        $("#sound").html("Sonore Oui");
    }else{
        $("#sound:hover").css("background-color","rgba(150, 11, 11,0.8)");
        $("#sound:active").css("background-color","rgba(150, 11, 11,0.8)");        
        $("#sound").css("background-color","rgba(200,0,0,0.3)");
        $("#sound").html("Sonore Non");
    }
}