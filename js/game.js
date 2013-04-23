var firstNum = 0, secondNum = 0, answer=0, userAnswer = "";
var ADD = 0, SUBTRACT = 1, MULTIPLY = 2, DIVIDE = 3;
var operation = ADD; 

window.onload=function(){        
    if(isNaN(sessionStorage.difficulty)){
        sessionStorage.difficulty=1;
    }    
};

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
    console.log(firstNum);
    console.log(secondNum);
    displayMath();
}
var wrong = false; var mathCount = 0;
/**
 * Take button number input
 */
function takeInput(num){
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
            if(mathCount == 3){
                popup(false);
                mathCount=0;
            }
                       
            return;
        }else{
            $("#question").css('background','-webkit-radial-gradient(circle, #FF9966, #CC3300)');
            wrong = true;            
            mathCount=0;
            if(mathCount === 0){
                mathCount = -1;
            }
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
        $("#math-popup").animate({
            width:"toggle"
        });
        generateNewQuestion();        
    }else{
        $("#math-popup").animate({
          width:"toggle"
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