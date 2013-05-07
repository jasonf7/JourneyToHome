var PAUSE=0, GAME_OVER=1, VICTORY=2;

function exitGame(buttonNum){
    $("#off_game_screen").hide();
    console.log("Troll");
    if(buttonNum!==1){
        if(buttonNum===2){
            document.location.href = "level.html";
        }
        else{
            document.location.href = "start.html";
        }
    }
}

function changeState(){
    if(sessionStorage.state==='0'){
        $("#screen_title").html("Pause");        
        $("#off_game_screen").css("background-color","rgba(0,0,0,0.5)");
        $("#screen_button1").show();
    }
    else if(sessionStorage.state=='1'){
        $("#screen_title").html("Game Over!");
        $("#off_game_screen").css("background-color","rgba(100,0,0,0.5)");
        $("#screen_button1").hide();
    }
    else{
        $("#screen_title").html("Victory!");        
        $("#off_game_screen").css("background-color","rgba(0,100,0,0.5)");
        $("#screen_button1").hide();
    }
}

$(document).ready(function() {
    sessionStorage.state=0;  
    changeState();
});
