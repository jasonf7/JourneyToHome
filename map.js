var EASY = 1; 
var MEDIUM = 2; 
var HARD = 3;

function setDifficulty(buttonNumber){
    // 1-3 YK,NWT,BC 4-6 NVT,ALB,SAS 7-8 MAN, ON
    if(buttonNumber<=3){
        sessionStorage.difficulty = 1;
    }
    else{
        if(buttonNumber <= 6){
            sessionStorage.difficulty = 2;
        }
        else{
            sessionStorage.difficulty = 3;
        }
    }
    console.log(sessionStorage.difficulty);
}

$(document).ready(function() {
    $('.map_buttons').css('height', $(".map_buttons").width());
    $(".map_buttons").css('border-radius', $(".map_buttons").width()/2);
});
