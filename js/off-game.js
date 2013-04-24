var PAUSE=0, GAME_OVER=1, VICTORY=2;

function exitGame(buttonNum){
    $("#off_game_screen").hide();
    if(buttonNum!==1){
        if(buttonNum===2){
            document.location.href = "level.html";
        }
        else{
            document.location.href = "start.html";
        }
    }
}

window.onload=(function(){
    console.log("GG"+sessionStorage.state);
    if(sessionStorage.state==="0"){
        $("#screen_title").html("Pause Screen");
        $("#screen_button1").show();
    }
    else if(sessionStorage.state===GAME_OVER){
        $("#screen_title").html("Game Over!");
        $("#screen_button1").hide();
    }
    else{
        console.log("why");
        $("#screen_title").html("Victory!");
        $("#screen_button1").hide();
    }
});