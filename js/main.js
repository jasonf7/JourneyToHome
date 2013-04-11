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
		if (!me.video.init('jsapp', 1024, 598, false, 1.0))
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
    //    me.debug.renderHitBox = true; //TEMPORARY
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
    popup(false);
    
    document.getElementById("jsapp").addEventListener('touchstart', function(e) {doTouch(e);}, false);
    document.getElementById("jsapp").addEventListener('touchmove', function(e) {doTouch(e);}, false);
    document.getElementById("jsapp").addEventListener('touchend', function(e) {clear();}, false);
});

function doTouch(e) {
    e.preventDefault();
    if(!$("#math-info").is(":visible")){
        clear(); 
        
        for(var i = 0; i < e.touches.length; i++){
            var touch = e.touches[i];
        
            var x = touch.clientX;
            var y = touch.clientY;
            if(y > 300){
                me.input.triggerKeyEvent(me.input.KEY.UP, true);
            }else if(x > 512){
                me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
            }else{
                me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
            }
        }
    }else{
        alert("shown");
    }
}

function clear(){
    //Reset triggers
    me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
    me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
    me.input.triggerKeyEvent(me.input.KEY.UP, false);  
}
