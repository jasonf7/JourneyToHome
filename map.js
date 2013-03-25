var EASY = 1; 
var MEDIUM = 2; 
var HARD = 3;

// changeDimensions();

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
    $('#yukon_button').css('height','30px');
    $("#yukon_button").css('border-radius', $("#yukon_button").width()/2);
});
