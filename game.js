var height = 7, width= 7;

var code = "1000000000000000000000000000000000000000000000002";
var grid = new Array(height);
var cellH = 0, cellW=0;

//Add items here as necessary
var items = 6;
var EMPTY = 0, HERO = 1, FLAG = 2, PREDATOR = 3, BUSH = 4, FOOD = 5;

//hero at 0,0 with default health of 10
var hero = {x:0,y:0,health:10};

$(document).ready(function(){
    createGridFromCode(code);
    createTable();
    $("#hero").css("width",cellW);
    $("#hero").css("height",cellH);
});
/**
 * Create the table to display the map
 */
function createTable(){
    var tableHtml = "";
    cellH = Math.round(($("#page-main").height()/height)*0.95);
    cellW = Math.round(($("#page-main").width()/width)*0.92);
    $("#hero").css("height",""+cellH+"px");
    $("#hero").css("width",""+cellW+"px");
    $("#hero").css("background-size",cellW+"px "+cellH+"px");
    
    for(var i=0;i<height;i++){
        tableHtml+="<tr>";
        for(var j=0;j<width;j++){
            //Creates an table data cell with an img inside
            var image = "canada-map";
            if(grid[i][j] == FLAG){
                image = "flag";
            }
            
            //They are all in the game-tiles class and have the id x-y
            tableHtml+="<td class='game-tiles-container'><img class='game-tiles' id='"+i+"-"+j+"' src='images/"+image+".png'";
            //Give it the right height/width
            tableHtml+="height='"+cellH+"' width='"+cellW+"'></td>";            
        }
        tableHtml+="</tr>";
    }        
    $(".game-tiles").css("background-size",cellW+"px "+cellH+"px");
    $("#map").empty();
    $("#map").append(tableHtml);
}

$("img").error(function () { 
	$(this).css({display:"none"}); 
});

/**
 * Creates the grid from the height*width long code.
 */
function createGridFromCode(code){
    for(var i=0;i<height;i++){
        grid[i] = new Array(width);
        for(var j=0;j<width;j++){
            var item = this.code.substr(j+(i*height),1);
            if(item >= 0 && item < (items-1)){
                grid[i][j] = item;
                if(item == HERO){
                    hero.x = j;
                    hero.y = i;
                }
            }else{
                console.log("Unknown item in code!");
            }
        }
    }    
}
//RESIZE!
window.addEventListener('resize', createTable, false);
var gameCount = 0, mathCount = 0;

function moveHero(direction){
   //Check if direction is legal first
    var newx = hero.x, newy = hero.y;
    if(direction =="up"){
        newy-= 1;
    }else if(direction == "down"){
        newy+= 1;
    }else if(direction == "left"){
        newx-= 1;
    }else if(direction == "right"){
        newx+= 1;
    }            
    if(newx >= height || newy >= width || newx < 0 || newy < 0){
        return; //Not a legal move, give up.
    }                   
    
    $("#hero").promise().done(function(){
        grid[hero.y][hero.x]=EMPTY; 
        hero.x = newx;
        hero.y = newy;
        gameCount++;
        
        console.log(cellH+","+cellW);
        grid[hero.y][hero.x]=HERO;
        if(direction =="up"){       
        $("#hero:not(:animated)").animate({top: '-='+cellH},300);
        }else if(direction == "down"){        
            $("#hero:not(:animated)").animate({top: '+='+cellH},300);
        }else if(direction == "left"){        
            $("#hero:not(:animated)").animate({left: '-='+cellW},300);
        }else if(direction == "right"){            
            $("#hero:not(:animated)").animate({left: '+='+cellW},300);
        }  
    });  
    if(gameCount == 5){
        gameCount = 0;                
        $("#sidebar-math").css("display","block");
        generateNewQuestion();  
        $("#sidebar-math").animate({ height:'toggle'});         
        $("#sidebar-math").animate({ height:'toggle'}); 
        displayMath();
        $("#sidebar-move").animate({ height:'toggle'});         
        $("#sidebar-move").css("display","none");
    }
}

var firstNum = 0, secondNum = 0, answer=0, userAnswer = "";
var ADD = 0, SUBTRACT = 1, MULTIPLY = 2, DIVIDE = 3;
var operation = ADD;
sessionStorage.difficulty=2;
//temp
generateNewQuestion();
displayMath();
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
}
var wrong = false;
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
            $("#input").html("");
            userAnswer = "";                       
            $("#sidebar-math").animate({
              height:'toggle'
            });       
            
            if(mathCount == 2){
                mathCount = 0;                      
                $("#sidebar-move").animate({ height:'toggle'});  
                $("#sidebar-math").css("display","none");
                $("#sidebar-move").css("display","block");
                return;
            } 
            
            $("#sidebar-math").animate({
              height:'toggle'
            });            
            $("#sidebar-math").promise().done(function(){
                generateNewQuestion();  
                displayMath();
            });            
            mathCount++;            
            return;
        }else{
            $("#question").css('background','-webkit-radial-gradient(circle, #FF9966, #CC3300)');
            wrong = true;
        }
    }else if(num == -2){
        userAnswer = userAnswer.slice(0,userAnswer.length-1);
    }
    
    displayMath();
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