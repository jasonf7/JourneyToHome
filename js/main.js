// game resources
var g_resources= [
    {name:"land-tiles",type:"image",src:"img/land-tiles.png"},
    {name:"land-tiles-simple",type:"image",src:"img/land-tiles-simple.png"},
    {name:"level1",type:"tmx",src:"data/level1.tmx"},
    {name:"chimpy",type:"image",src:"img/chimpy.png"},
    {name:"acorn",type:"image",src:"img/acorn.png"}
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
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,     "jump", true);
 //   me.debug.renderHitBox = true; //TEMPORARY
        // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

   onResetEvent: function()	{	
      // stuff to reset on state change
        //Load a level
        me.levelDirector.loadLevel("level1");
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
    if($("#math-popup").css("display") !="none"){
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
    // //Reset triggers
    // me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
    // me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
    // me.input.triggerKeyEvent(me.input.KEY.UP, false);  
}
