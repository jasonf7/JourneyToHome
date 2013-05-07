// game resources
var g_resources= [
    {name:"land-tiles-simple",type:"image",src:"img/land-tiles-simple.png"},
    {name:"land-tiles-client",type:"image",src:"img/land-tiles-client.png"},
    {name:"land-tiles-simple",type:"tsx",src:"data/land-tiles-simple.tsx"},
    {name:"land-tiles-client",type:"tsx",src:"data/land-tiles-client.tsx"},
    {name:"level1",type:"tmx",src:"data/level1.tmx"},
    {name:"level2",type:"tmx",src:"data/level2.tmx"},
    {name:"chimpy",type:"image",src:"img/chimpy.png"},
    {name:"acorn",type:"image",src:"img/acorn.png"},
    {name:"fail_wolf",type:"image",src:"img/fail_wolf.png"},    
    {name:"croc",type:"image",src:"img/croc.png"},
    {name:"food-apple",type:"image",src:"img/food-apple.png"},
    {name:"food-banana",type:"image",src:"img/food-banana.png"},
    {name:"food-drumstick",type:"image",src:"img/food-drumstick.png"},
    {name:"food-fish",type:"image",src:"img/food-fish.png"},
    {name:"flag1x2",type:"image",src:"img/flag1x2.png"}
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
//		me.state.change(me.state.LOADING);
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
  //me.debug.renderHitBox = true; //TEMPORARY
        // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

   onResetEvent: function()	{	
      // stuff to reset on state change
        //Load a level
        me.levelDirector.loadLevel("level"+localStorage.currentLevel);
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
    if(!started){
        started = true;
    }
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
