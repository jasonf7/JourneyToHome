// game resources
var g_resources= [
    {name:"land-tiles",type:"image",src:"img/land-tiles.png"},
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
        me.entityPool.add("acornEntity", AcornEntity);
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
    
    // $("#up").bind('touchstart', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.UP, true);
    // }).bind('touchend', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.UP, false);
    // }).bind('touchmove', function(e) {
    //     me.input.triggerKeyEvent(me.input.KEY.UP, false);
    // });
    // 
    // $("#left").bind('touchstart', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
    // }).bind('touchend', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
    // }).bind('touchmove', function(e) {
    //     eme.input.triggerKeyEvent(me.input.KEY.LEFT, false);
    // });
    // 
    // $("#right").bind('touchstart', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
    // }).bind('touchend', function(){
    //     me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
    // }).bind('touchmove', function(e) {
    //     me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
    // });
            
    document.addEventListener('touchstart', function(e) {doTouch(e);}, false);
    document.addEventListener('touchmove', function(e) {doTouch(e);}, false);
});

function doTouch(e) {
    e.preventDefault();
    var out = "";
    for(var i = 0; i < e.touches.length; i++){
        var touch = e.touches[i];
    
        var x = touch.clientX;
        var y = touch.clientY;
        out+=x+", "+y+"\n";
    }
    alert(out);    
}
