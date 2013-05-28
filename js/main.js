var chimpysprite = "";
if(useroptions.invisible){
    chimpysprite = "-invisible";
}else if(useroptions.powacorn){
    chimpysprite = "-powacorn";
}else if(useroptions.acorn){
    chimpysprite = "-acorn";
}
// game resources
var g_resources= [
    
    //the tilesets
    {name:"land-tiles-simple",type:"image",src:"img/land-tiles-simple.png"},
    {name:"land-tiles-client",type:"image",src:"img/land-tiles-client.png"},
    {name:"land-tiles-simple-water",type:"image",src:"img/land-tiles-simple-water.png"},
    
    //tsx image files
    {name:"land-tiles-simple",type:"tsx",src:"data/land-tiles-simple.tsx"},
    {name:"land-tiles-client",type:"tsx",src:"data/land-tiles-client.tsx"},
    {name:"land-tiles-simple-water",type:"tsx",src:"data/land-tiles-simple-water.tsx"},
    
    //the levels!
    {name:"level1",type:"tmx",src:"data/level1.tmx"},
    {name:"level2",type:"tmx",src:"data/level2.tmx"},
    {name:"level3",type:"tmx",src:"data/level3.tmx"},
    {name:"level4",type:"tmx",src:"data/level4.tmx"},
    {name:"level5",type:"tmx",src:"data/level5.tmx"},
    
    //sprites
    {name:"chimpy",type:"image",src:"img/chimpy"+chimpysprite+"2.png"},
    {name:"acorn",type:"image",src:"img/acorn.png"},
    {name:"fail_wolf",type:"image",src:"img/fail_wolf.png"},    
    {name:"croc",type:"image",src:"img/croc.png"},
    {name:"food-apple",type:"image",src:"img/food-apple.png"},
    {name:"food-banana",type:"image",src:"img/food-banana.png"},
    {name:"food-drumstick",type:"image",src:"img/food-drumstick.png"},
    {name:"food-fish",type:"image",src:"img/food-fish.png"},
    {name:"flag1x2",type:"image",src:"img/flag1x2.png"},
    
    //the background
    {name:"bgclouds",type:"image",src:"img/bgclouds.png"},
    {name:"bgclouds-top",type:"image",src:"img/bgclouds-top.png"}
];


var jsApp	= 
{	
	/* Initialize the jsApp	*/
	onload: function(){
		
		// init the video
		if (!me.video.init('jsapp', 1024, 595, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
            return;
		}
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);
    
		// load everything & display a loading screen
		// me.state.change(me.state.LOADING);
	},
	
	
	/* callback when everything is loaded */
	loaded: function (){
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
        me.entityPool.add("mainPlayer",PlayerEntity);
        me.entityPool.add("AcornEntity", AcornEntity);
        me.entityPool.add("WolfEntity", WolfEntity);
        me.entityPool.add("FoodEntity", FoodEntity);
        me.entityPool.add("CrocEntity",CrocEntity);
        me.entityPool.add("FlagEntity",FlagEntity);
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,     "jump", true);
  // me.debug.renderHitBox = true; //TEMPORARY
        // start the game 
		me.state.change(me.state.PLAY);        
	}

}; // jsApp
var myAudio;
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

    onResetEvent: function()	{	
      // stuff to reset on state change
        myAudio = new Audio('data/jungle-run.mp3'); 
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        myAudio.play();
        //Load a level
        me.levelDirector.loadLevel("level"+localStorage.currentLevel);
        //if they skipped.. show victory..
        if(useroptions.fly){
            sessionStorage.state = 2;
            changeState();
            $("#off_game_screen").show(); 
        }
	},
		
	/* --- action to perform when game is finished (state change)---	*/
	onDestroyEvent: function(){
	
   }

});


//bootstrap :)
window.onReady(function(){    
	jsApp.onload();    
    document.getElementById("jsapp").addEventListener('touchstart', function(e) {doTouch(e);}, false);
   // document.getElementById("jsapp").addEventListener('touchmove', function(e) {doTouch(e);}, false);
    document.getElementById("jsapp").addEventListener('touchend', function(e) {clear(e);}, false);   
       
});

var touches = [];

function doTouch(e) {
    e.preventDefault();
   if($("#math-popup").css("display") !="none" ||
        $("#off_game_screen").css("display")!="none"){
        return;
    }
    var touchList = e.changedTouches;
    var touch;
    for(var i = 0; i < touchList.length; i++){
        var x = touchList[i].screenX, y = touchList[i].screenY;
        if(y < 400){
            me.input.triggerKeyEvent(me.input.KEY.UP, true);
        }else if(x > 512){
            me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
        }else{
            me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
        }
        touch = {x: touchList[i].screenX, y: touchList[i].screenY, id: touchList[i].identifier};
        touches.push(touch);
    }
}

function clear(e){
    var touchList = e.changedTouches;
    var touch;
    for(var i = 0; i < touchList.length; i++){
        touch = {x: touchList[i].screenX, y: touchList[i].screenY, id: touchList[i].identifier};
        for (var j = touches.length - 1; j >= 0 ; j--)
        {
              if (touches[j].id == touch.id)
            {
                if(touches[j].y < 400){
                    me.input.triggerKeyEvent(me.input.KEY.UP, false);
                }else if(touches[j].x > 512){
                    me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
                }else{
                    me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
                }
                touches.splice(j, 1);
             }
        }
    } 
}
