var EASY = 1; 
var MEDIUM = 2; 
var HARD = 3;
var done = [1];
var available = [];

function setDifficulty(buttonNumber){
    // EASY: 1-3 YK,NWT,BC 
    // MEDIUM: 4-9 NVT,ALB,SAS,NB,PEI,NS
    // HARD: 10-13 QC, NFL, MAN, ON
    if(buttonNumber<=3){
        sessionStorage.difficulty = 1;
    }
    else{
        if(buttonNumber <= 9){
            sessionStorage.difficulty = 2;
        }
        else{
            sessionStorage.difficulty = 3;
        }
    }
}

function updateGame(finishedPlaces, availablePlaces){
    
}

$(document).ready(function() {
    $('.map_buttons').css('height', $(".map_buttons").width());
    $(".map_buttons").css('border-radius', $(".map_buttons").width()/2);
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
        window.scroll(0,0);
        return false;
    });
});