var height = 7, width= 7;

//var code = "0000000000000000000000000000000000000000000000000000000000000";
var grid = new Array(height);

//Add items here as necessary
var items = 6;
var EMPTY = 0, HERO = 1, FLAG = 2, PREDATOR = 3, BUSH = 4, FOOD = 5;

//hero at 0,0 with default health of 10
var hero = {x:0,y:0,health:10};
createTable();
/**
 * Create the table to display the map
 */
function createTable(){
    var tableHtml = "";
    for(var i=0;i<height;i++){
        tableHtml+="<tr>";
        for(var j=0;j<width;j++){
            //Creates an table data cell with an img inside
            //They are all in the game-tiles class and have the id x-y
            tableHtml+="<td class='game-tiles-container'><img class='game-tiles' id='"+i+"-"+j+"' src='images/canada-map.png'";
            //Give it the right height/width
            tableHtml+="height='"+($(window).height()/height)+"' width='"+($("#map").width()/width)+"'></td>";
        }
        tableHtml+="</tr>";
    }    
    $("#map").append(tableHtml);
    $("#0-1").attr("src","images/canada-map.png"); //Just for testing
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
            console.log(item);
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

function moveHero(direction){
    //Check if direction is legal first
    var newx = hero.x, newy = hero.y;
    if(direction =="up"){
        newy+= 1;
    }else if(direction == "down"){
        newy-= 1;
    }else if(direction == "left"){
        newx-= 1;
    }else if(direction == "right"){
        newx+= 1;
    }            
    if(newx >= height || newy >= width || newx < 0 || newy < 0){
        return; //Not a legal move, give up.
    }          
          
    grid[hero.x][hero.y]=EMPTY;    
    hero.x = newx;
    hero.y = newy;
    grid[hero.x][hero.y]=HERO;
    //Update pictures here
}
var firstNum = 0, secondNum = 0, answer=0;
var ADD = 0, SUBTRACT = 1, MULTIPLY = 2, DIVIDE = 3;
var operation = ADD;
sessionStorage.difficulty=1;
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