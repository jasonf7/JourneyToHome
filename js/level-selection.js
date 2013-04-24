var EASY = 1; 
var MEDIUM = 2; 
var HARD = 3;
var done = [];

function setDifficulty(buttonNumber){
    // 1-YK 2-NWT 3-BC 4-NVT 5-ALB 6-SAS 7-NB 8-PEI 9-NS 10-QC 11-NFL 12-MAN 13-ON
    // EASY: 1-YK 3-BC 5-ALB 9-NS 11-NFL
    // MEDIUM: 2-NWT 4-NVT 6-SAS 7-NB 8-PEI 
    // HARD: 10-QC 12-MAN 13-ON
    if(buttonNumber%2!==0){
        if(buttonNumber===7){
            sessionStorage.difficulty = MEDIUM;
        }
        else if(buttonNumber===13){
            sessionStorage.difficulty = HARD;
        }
        else{
            sessionStorage.difficulty = EASY;
        }
    }
    else{
        if(buttonNumber<10){
             sessionStorage.difficulty = MEDIUM;
        }
        else{
            sessionStorage.difficulty = HARD;
        }
    }
    
    localStorage.currentLevel=buttonNumber;
    if(done.indexOf(buttonNumber)<0){        
        done.push(buttonNumber);        
        saveProgress();
    }
}

function loadProgress(){
    var finding = true;
    var loaded = localStorage.done;
    if(typeof loaded === 'undefined' || loaded.length < 2){
        console.log("empty");
        //show 1....
        $("#button_1").show();
        return;
    }
    while(finding){
        var add = loaded.substr(0,loaded.indexOf(' '));
        done.push(parseInt(add));
        loaded = loaded.substr(loaded.indexOf(' ')+1,loaded.length);
        if(loaded.length<2){
            finding=false;
        }
    }    
}

function reset(){
    localStorage.done = "";
    done = [];
    location.reload(true);
}

function saveProgress(){
    var out = "";
    for(var i=0;i< done.length;i++){
        out+=done[i]+" ";
    }
    localStorage.done = out;
}

function updateGame(finishedPlaces){
    for(var i=1; i<14; i++){
        $("#button_"+i).hide();
    }
    
    if(done.length !== 0){
        for(var j=0; j<finishedPlaces.length; j++){
            $("#button_"+finishedPlaces[j]).show();

            $("#button_"+finishedPlaces[j]).html('&#10003;');
            $("#button_"+finishedPlaces[j]).css('font-size','150%');
        }
        for(var k=0; k<finishedPlaces.length; k++){
            switch(finishedPlaces[k]){
            case 1:
                if(finishedPlaces.indexOf(2)===-1){
                    $("#button_2").show();
                }
                if(finishedPlaces.indexOf(3)===-1){
                    $("#button_3").show();
                }
            break;
            
            case 2:
                if(finishedPlaces.indexOf(4)===-1){
                    $("#button_4").show();
                }
                if(finishedPlaces.indexOf(5)===-1){
                    $("#button_5").show();
                }
                if(finishedPlaces.indexOf(6)===-1){
                    $("#button_6").show();
                }
            break;
            
            case 3:
                if(finishedPlaces.indexOf(5)===-1){
                    $("#button_5").show();
                }
            break;
            
            case 4:
                if(finishedPlaces.indexOf(11)===-1){
                    $("#button_11").show();
                }
                if(finishedPlaces.indexOf(12)===-1){
                    $("#button_12").show();
                }
            break;
            
            case 5:
                if(finishedPlaces.indexOf(6)===-1){
                    $("#button_6").show();
                }
            break;
            
            case 6:
                if(finishedPlaces.indexOf(12)===-1){
                    $("#button_12").show();
                }
            break;
            
            // case 7: no need
            //     if(finishedPlaces.indexOf(12)===-1){
            //         $("#button_12").show();
            //     }
            // break;
            
            case 8:
                if(finishedPlaces.indexOf(9)===-1){
                    $("#button_9").show();
                }
            break;
            
            case 9:
                if(finishedPlaces.indexOf(7)===-1){
                    $("#button_7").show();
                }
            break;
            
            case 10:
                if(finishedPlaces.indexOf(7)===-1){
                    $("#button_7").show();
                }
                if(finishedPlaces.indexOf(13)===-1){
                    $("#button_13").show();
                }
            break;
            
            case 11:
                if(finishedPlaces.indexOf(8)===-1){
                    $("#button_8").show();
                }
                if(finishedPlaces.indexOf(10)===-1){
                    $("#button_10").show();
                }
            break;
            
            case 12:
                if(finishedPlaces.indexOf(4)===-1){
                    $("#button_4").show();
                }
                if(finishedPlaces.indexOf(13)===-1){
                    $("#button_13").show();
                }
            break;
            
            default:
                break;
            }
        }
    }
    else{
        $("#button_1").show();
    }
}

window.onload=function(){      
    loadProgress();
    updateGame(done);  
};
