var PlayerEntity = me.ObjectEntity.extend({
    
    /**
    * Constructor
    */
    init:function(x,y,settings){
        this.parent(x,y,settings);
        this.setVelocity(3,15);
        this.gravity=0.75; //This is the default, change if needed..
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        lastX = this.pos.x;
    },
    
    update:function(){ 
        if($("#math-info").is(":visible") || $("#off_game_screen").css("display")!="none"){
           return false;
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
            if(distance%4 === 0){
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
            sessionStorage.state = 1;
            changeState();
            $("#off_game_screen").show();  
        }
        // check & update player movement
        this.updateMovement();
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.COLLECTABLE_OBJECT) {
            }
        }
        
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
    },
 
    onCollision: function() {
        // ADD COINS... EVENTUALLY        
        //remove it
        this.collidable = false;
        me.game.remove(this);
    } 
});

/**
 *  FOOOD!
 */
var FoodEntity = me.CollectableEntity.extend({
    
    init: function(x, y, settings) {
        this.parent(x, y, settings);
    },
 
    onCollision: function() {
        mathMax = 1;
        popup(true);        
    
        //remove it
        this.collidable = false;
        me.game.remove(this);
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
        sessionStorage.state = 2;
        changeState();
        $("#off_game_screen").show();        
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
            //MATH QUESTIONS! YAY     
            mathMax = 3;
            popup(true);        
        
            //remove it
            this.collidable = false;
            me.game.remove(this);
        },
        // manage the enemy movement
        update: function() {  
            if($("#off_game_screen").css("display") !="none"){
                return false;
            }
            var playerRadius = 30;
            var player = me.game.getEntityByName("mainPlayer")[0];
            // do nothing if not visible
            if (!this.inViewport)
                return false;
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
