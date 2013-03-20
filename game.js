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
            //They are all in the game-tiles class and have the id xy
            tableHtml+="<td class='game-tiles-container'><img class='game-tiles' id='"+i+"-"+j+"' src='images/paper-ody-back.png' alt=''"
            //Give it the right height/width
            tableHtml+="height='"+($(window).height()/height)+"' width='"+($("#map").width()/width)+"'></td>";
        }
        tableHtml+="</tr>";
    }    
    $("#map").append(tableHtml);
    $("#0-1").attr("src","images/canada-map.png");
}

$("img").error(function () { 
	$(this).css({visibility:"hidden"}); 
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