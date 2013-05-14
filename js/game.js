var firstNum = 0, secondNum = 0, answer=0, userAnswer = "";
var ADD = 0, SUBTRACT = 1, MULTIPLY = 2, DIVIDE = 3;
var operation = ADD; 
var energy = 100, distance = 0, lastX = 0;

$(document).ready(function() {
    if(isNaN(sessionStorage.difficulty) || typeof sessionStorage.difficulty === 'undefined'){
        sessionStorage.difficulty=1;
    }  
   updateEnergy();
});

/**
 * Generate random math questoin
 */
function generateNewQuestion(){    
    var randomOperation = Math.floor(Math.random()*4);
    operation = randomOperation;
    if(randomOperation==DIVIDE){
        answer = Math.ceil(Math.random()*Math.pow(3,sessionStorage.difficulty));
        secondNum = Math.ceil(Math.random()*Math.pow(3,sessionStorage.difficulty));
        firstNum = answer * secondNum;
    }else{        
        //random number from 1 to 10^difficulty
        firstNum = Math.ceil(Math.random()*(Math.pow(10,sessionStorage.difficulty)-1));
        if(sessionStorage.difficulty ==  1){
            secondNum = Math.ceil(Math.random()*10);        
        }else if(sessionStorage.difficulty == 2){            
            secondNum = Math.ceil(Math.random()*90)+9;       
        }else{            
            secondNum = Math.ceil(Math.random()*900)+99;         
        }  
        
        if(randomOperation == ADD){
            answer = firstNum + secondNum;
        }else if(randomOperation == SUBTRACT){
            var temp = firstNum;
            firstNum = Math.max(firstNum,secondNum);
            secondNum = Math.min(secondNum,temp);
            answer = firstNum - secondNum;
        }else{
            answer = firstNum * secondNum;
        }
    }
    displayMath();
}
var wrong = false; var mathCount = 0, mathMax=3;
/**
 * Take button number input
 */
function takeInput(num){
    console.log(energy);
    if(wrong){
        $("#question").css('background','-webkit-radial-gradient(circle, #97cc4e, #65ad49)');
        wrong = false;
    }
    
    if(num>=0 && userAnswer.length < 6){
        userAnswer += num+"";
    }else if(num == -1){
        if(userAnswer.trim() == answer){
            
            userAnswer = "";         
            $("#input").html("");
            $("#question").animate({
              opacity: 0.2
            });       
            $(".math-button").animate({
              opacity:0.2
            });           
            $("#question").animate({
              opacity:0.7
            });  
            $(".math-button").animate({
              opacity:0.7
            });  
            $("#question").promise().done(function(){
                generateNewQuestion();  
            });            
            mathCount++; 
            if(energy <= 75){
                energy += 45;
            }else if(energy <100){
                energy = 100;
            }
            updateEnergy();
            if(mathCount == mathMax){
                popup(false);
                mathCount=0;
            }
                       
            return;
        }else{
            $("#question").css('background','-webkit-radial-gradient(circle, #FF9966, #CC3300)');
            wrong = true;            
            mathCount=0;
            if(energy < 25){                    
                energy = 100; 
                userAnswer = "";
                popup(false);
                sessionStorage.state = 1;
                changeState();
                $("#off_game_screen").show(); 
                $("#question").css('background','-webkit-radial-gradient(circle, #97cc4e, #65ad49)');
            }else{
                energy -= 25;
            }
            updateEnergy();
        }
    }else if(num == -2){
        userAnswer = userAnswer.slice(0,userAnswer.length-1);
    }
    
    displayMath();
}

/**
 * Display the math popup
 * @param show - false = hide,true = show
 */
function popup(show){
    // console.log("SHOWING POPUp");
    if(show){
        $("#math-info").show();
        $("#math-info").animate({
            opacity:0.7
        });
        $("#math-popup").show();
        $("#math-popup").animate({
             opacity:1
        });
        generateNewQuestion();        
    }else{
        $("#math-popup").animate({
          opacity:0
        });
        $("#math-popup").promise().done(function(){
            $("#math-popup").hide();
        }); 
        $("#math-info").animate({
          opacity:0
        });
        $("#math-info").promise().done(function(){
            $("#math-info").hide();
        }); 
    }
}

/**
 * Set paragraph to question+answer
 */
function displayMath(){
    var display = firstNum + "";
    if (operation == ADD) {
        display+= " + ";        
    }else if(operation == SUBTRACT){
        display+= " - ";
    }else if(operation == MULTIPLY){
        display+= " &#10005; ";
    }else{
        display+= " &divide; ";
    }
    if(userAnswer.length === 0){
        display+=secondNum+"<br>&nbsp;";
    }else{
        display+=secondNum+"<br>"+userAnswer;
    }
    $("#input").html(display);
}

/** Updates energy bar **/
function updateEnergy(){
    var amount = 750 * (energy/100);
    $("#bar").css("clip","rect(0px,"+amount+"px,"+amount+"px,0px)")
}
