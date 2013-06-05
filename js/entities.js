var PlayerEntity = me.ObjectEntity.extend({
    
    /**
    * Constructor
    */
    init:function(x,y,settings){
        this.parent(x,y,settings);
        this.updateColRect(5,30,5,30);
        var xspeed = 4;
        if(useroptions.speed){
            xspeed = 7;
        }
        if(useroptions.jump){
            this.gravity=0.6;
            this.setVelocity(xspeed,22);
        }else{
            this.gravity=0.75; //This is the default, change if needed.            
            this.setVelocity(xspeed,15);
        }
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        var lastX = this.pos.x;
        var savedX =0, savedY = 0;
    },
    
    update:function(){ 
        if($("#math-info").is(":visible") || $("#off_game_screen").css("display")!="none"){
           return false;
        }
        
       var block = me.game.currentLevel.getLayerByName("collision").layerData[Math.round((this.pos.x+10)/40)][Math.ceil((this.pos.y+10)/40)+1];
        // console.log("x: "+this.pos.x+", y: "+this.pos.y);
        // console.log("("+Math.floor((this.pos.x+10)/40)+","+Math.floor((this.pos.y+10)/40)+")");
        if(block != null && typeof block !== 'undefined'){
            savedX = this.pos.x;
            savedY = this.pos.y;
        }
        
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
            }
 
        }
        if(this.pos.x != lastX){
            distance++;
            lastX = this.pos.x;
            if(useroptions.potion){
                var percent = 100 - Math.round((distance/300)*100);   
                $("#energybar").css('background','-webkit-linear-gradient(left, #FDD017, #FDD017 '+percent+'%, #A8DFEE '+percent+'%, #A8DFEE)');
                if(distance>=300){
                    useroptions.potion=false;
                    $("#energybar").css('background','rgba(255,255,255,0.5)');
                }
            }else if(distance%4 === 0){
                energy --;
                if(energy%2===0){
                    updateEnergy();
                }
                //If they're gonna die... QUESTION!
                if(energy < 10){
                    mathMax = 1;
                    popup(true);
                }
            }
        }
        
        if(this.pos.y > 650){
            if(useroptions.sub){
                this.pos.y = savedY;
                this.pos.x = savedX;
            }else{
                sessionStorage.state = 1;
                changeState();
                $("#off_game_screen").show();  
                energy = 100;
            }
        }
        // check & update player movement
        this.updateMovement();
        var res = me.game.collide(this);
        
        // update animation if necessary
        if (this.vel.x!==0 || this.vel.y!==0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }    
});

/**
 * THE ACORN!!
 */
var AcornEntity = me.CollectableEntity.extend({
    
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.targetX = 0;
        this.targetY = 0;
        this.incX =0 ;  this.incY =0;
        this.gravity=0;
    },
 
    onCollision: function() {
        acorns++;      
        if(useroptions.double){
            acorns++;
        }
       //remove it
        this.collidable = false;
        me.game.remove(this);
    },
    
    update:function(){
        if(!useroptions.magnet){
            return false;
        }
        if(this.inViewport ){
            this.targetX =  me.game.getEntityByName("mainPlayer")[0].pos.x;
            this.targetY =  me.game.getEntityByName("mainPlayer")[0].pos.y;
            this.incX = Math.abs(this.targetX - this.pos.x)/30;
            this.incY = Math.abs(this.targetY - this.pos.y)/30;
            if(this.incX < 5){
                this.incX = 5;
            }
        }        
        
        if(this.pos.x > this.targetX){
            this.pos.x-= this.incX;
        }else{
            this.pos.x+= this.incX;
        }
        
        if(this.pos.y > this.targetY){
            this.pos.y-=this.incY;
        }else{
            this.pos.y+=this.incY;
        }
        
        
        if(this.targetX!==0  && (this.pos.x < this.targetX + 2) && (this.pos.x > this.targetX-2)){
            acorns++;      
            if(useroptions.double){
                acorns++;
            }
            me.game.remove(this);
            this.targetX = 0;
            return false;
        }
        
        this.updateMovement();             
        // update animation if necessary
        if (this.targetX!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});

/**
 *  FOOOD!
 */
var FoodEntity = me.CollectableEntity.extend({
    
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.targetX = 0;
        this.targetY = 0;
        this.incX =0 ;  this.incY =0;
        this.gravity=0;
    },
 
    onCollision: function() {
        mathMax = 1;
        popup(true);        
    
        //remove it
        this.collidable = false;
        me.game.remove(this);
    } ,
    
    update:function(){
        if(!useroptions.magnet){
            return false;
        }
        if(this.inViewport ){
            this.targetX =  me.game.getEntityByName("mainPlayer")[0].pos.x;
            this.targetY =  me.game.getEntityByName("mainPlayer")[0].pos.y;
            this.incX = Math.abs(this.targetX - this.pos.x)/30;
            this.incY = Math.abs(this.targetY - this.pos.y)/30;
            if(this.incX < 5){
                this.incX = 5;
            }
        }        
        
        if(this.pos.x > this.targetX){
            this.pos.x-= this.incX;
        }else{
            this.pos.x+= this.incX;
        }
        
        if(this.pos.y > this.targetY){
            this.pos.y-=this.incY;
        }else{
            this.pos.y+=this.incY;
        }
        
        
        if(this.targetX!==0  && (this.pos.x < this.targetX + 2) && (this.pos.x > this.targetX-2)){
            me.game.remove(this);
            this.targetX = 0;
            return false;
        }
        
        this.updateMovement();             
        // update animation if necessary
        if (this.targetX!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return true;
    }
});

/**
 *  THE END!
 */
var FlagEntity = me.CollectableEntity.extend({
    
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },
 
    onCollision: function() {
        if(localStorage.sound === 'undefined' || localStorage.sound == "true"){
            myAudio.pause();
            var won = new Audio('data/finish.mp3'); 
            won.play();
        }
        sessionStorage.state = 2;
        changeState();
        $("#off_game_screen").show();       
        localStorage.acorns = acorns;
        this.collidable = false;
    }
});

/**
 * THE PREDATOR
 */
function Predator(image,width){
    var x = me.ObjectEntity.extend({
        init: function(x, y, settings) {
            // define this here instead of tiled
            settings.image = image;
            settings.spritewidth = width;
     
            // call the parent constructor
            this.parent(x, y, settings);
     
            this.startX = x;
            this.endX = x + settings.width - settings.spritewidth;
     
            // make him start from the right
            this.pos.x = x;
            this.walkLeft = false;
            this.flipX(!this.walkLeft);
            // walking & jumping speed 
            this.setVelocity(2, 6);
     
            // make it collidable
            this.collidable = true;
            // make it a enemy object
            this.type = me.game.ENEMY_OBJECT;
            this.startPlayerPos = 0;
        },
     
        // call by the engine when colliding with another object
        // obj parameter corresponds to the other object (typically the player) touching this one
        onCollision: function(res, obj) {
            //INVISIBLE OR INVINCIBLE? NO MATH QUESTIONS HURRRRAY
            if(useroptions.acorn || useroptions.powacorn){
                me.game.remove(this);
                return;
            }else if(useroptions.invisible){
                return;
            }    
            //MATH QUESTIONS! YAY     
            mathMax = 3;
            popup(true);        
        
            //remove it
            this.collidable = false;
            me.game.remove(this);
        },
        // manage the enemy movement
        update: function() {  
            if($("#off_game_screen").css("display") !="none"||$("#math-info").css("display") !="none"){
                return true;
            }
            var playerRadius = 30;
            var player = me.game.getEntityByName("mainPlayer")[0];
            // do nothing if not visible
            if (!this.inViewport || useroptions.invisible){
                return false;
            }    
            
            
            if(this.startPlayerPos === 0)
                this.startPlayerPos = player.pos.x;
            if(this.startPlayerPos == player.pos.x){
                if(!this.falling){
                    return false;
                }
            }
     
            if (this.alive && !this.falling && !((player.pos.x+playerRadius>this.pos.x) && (player.pos.x-playerRadius<this.pos.x))) {
                if((this.pos.x+(this.width/2)) < player.pos.x-player.width){
                    this.walkLeft = false;
                }else if((this.pos.x-(this.width/2)) > player.pos.x){
                    this.walkLeft = true;
                }else{
                    return;
                }
                this.flipX(!this.walkLeft);
                this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                     
            } else {
                this.vel.x = 0;
            }
             
            // check and update movement
            this.updateMovement();
             
            // update animation if necessary
            if (this.vel.x!=0 || this.vel.y!=0) {
                // update object animation
                this.parent();
                return true;
            }
            return false;
        }
    });
    return x;
}
var WolfEntity = Predator("fail_wolf",80);
var CrocEntity = Predator("croc",120);
