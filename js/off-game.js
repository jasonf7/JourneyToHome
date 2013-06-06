var PAUSE=0, GAME_OVER=1, VICTORY=2;

function exitGame(buttonNum){
    $("#off_game_screen").hide();
    if(buttonNum==2){ //Level selection
        document.location.href = "level.html";
        resetUpgrades();
    }else if(buttonNum == 3){ // Main menu screen
        document.location.href = "mainmenu.html";
        resetUpgrades();
    }else{ // Button 1
        if(sessionStorage.state=='1'){ //They lost, reload level
            acorns = 0;
            me.levelDirector.loadLevel("level"+localStorage.currentLevel);
            updateEnergy();
        }else if(sessionStorage.state=='2'){ //They beat the level
            acorns = 0;
            resetUpgrades();
            document.location.href = "level.html";           
        }
    }
}

function resetUpgrades(){
    for(var b in useroptions){
        useroptions[b] = false;
    }
    saveOptions();
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
        $("#screen_button1").html('Reprendre');
    }
    else if(sessionStorage.state=='1'){
        $("#screen_title").html("Vous avez perdu!");
        $("#off_game_screen").css("background-color","rgba(100,0,0,0.5)");
        $("#screen_button1").html('Recommencez la Niveau');
    }
    else{
        $("#screen_title").html("Victoire!");        
        $("#off_game_screen").css("background-color","rgba(0,100,0,0.5)");
        $("#screen_button1").html('Prochaine Niveau');
        if(done.indexOf(localStorage.currentLevel)<0){        
            done.push(localStorage.currentLevel);        
            saveProgress();
        }
    }
}
