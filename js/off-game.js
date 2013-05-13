var PAUSE=0, GAME_OVER=1, VICTORY=2;

function exitGame(buttonNum){
    $("#off_game_screen").hide();
    if(buttonNum==2){ //LEvel selection
        document.location.href = "level.html";
    }else if(buttonNum == 3){ // Main menu screen
        document.location.href = "mainmenu.html";        
    }else{ // Button 1
        if(sessionStorage.state=='1'){ //They lost, reload level
            me.levelDirector.loadLevel("level"+localStorage.currentLevel);
            
        }else if(sessionStorage.state=='2'){ //They beat the level
            if(localStorage.currentLevel < 13){
                if(done.indexOf(localStorage.currentLevel)<0){        
                    done.push(localStorage.currentLevel);        
                    saveProgress();
                }
                
                var tempLevel =  localStorage.currentLevel;
                tempLevel++;
                localStorage.currentLevel = tempLevel;                
                me.levelDirector.loadLevel("level"+localStorage.currentLevel);
            }else{ //Beat the game!!
                //Beat the game!                
                document.location.href = "level.html";
            }            
        }
    }
}

function saveProgress(){
    var out = "";
    for(var i=0;i< done.length;i++){
        out+=done[i]+" ";
    }
    localStorage.done = out;
}

$(document).ready(function() {
    sessionStorage.state=0;  
    changeState();
});

function changeState(){
    if(sessionStorage.state==='0'){
        $("#screen_title").html("Pause");        
        $("#off_game_screen").css("background-color","rgba(0,0,0,0.5)");
        $("#screen_button1").html('Resume');
    }
    else if(sessionStorage.state=='1'){
        $("#screen_title").html("Game Over!");
        $("#off_game_screen").css("background-color","rgba(100,0,0,0.5)");
        $("#screen_button1").html('Restart Level');
        console.log("Changed text...");
    }
    else{
        $("#screen_title").html("Victory!");        
        $("#off_game_screen").css("background-color","rgba(0,100,0,0.5)");
        $("#screen_button1").html('Next Level');
    }
}
