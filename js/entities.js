var PlayerEntity = me.ObjectEntity.extend({
    
    /**
    * Constructor
    */
    init:function(x,y,settings){
        this.parent(x,y,settings);
        this.setVelocity(3,15);
        this.gravity=0.75; //This is the default, change if needed..
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update:function(){ 
        if($("#math-info").is(":visible")){
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
        // check & update player movement
        this.updateMovement();
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.COLLECTABLE_OBJECT) {
                console.log("Acorn Collected");
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
        console.log("acorn added");
        this.parent(x, y, settings);
    },
 
    onCollision: function() {
      //  popup(true);        
        //remove it
        this.collidable = false;
        me.game.remove(this);
    } 
});

/**
 * THE WOLF/PREDATOR
 */
var WolfEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "fail_wolf";
        settings.spritewidth = 64;
 
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
 
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
        //MATH QUESTIONS! YAY        
    },
    // manage the enemy movement
    update: function() {        
        var playerRadius = 50;
        var player = me.game.getEntityByName("mainPlayer")[0];
        // do nothing if not visible
        if (!this.inViewport)
            return false;
 
        if (this.alive && !((player.pos.x+playerRadius>this.pos.x) && (player.pos.x-playerRadius<this.pos.x))) {
            if(this.pos.x >= player.pos.x){
                this.walkLeft = true;
            }else{
                this.walkLeft = false;
            }
            // if (this.walkLeft && this.pos.x <= this.startX) {
            //     this.walkLeft = false;
            // } else if (!this.walkLeft && this.pos.x+1 >= this.endX){
            //     this.walkLeft = true;
            // }
            //console.log(this.pos.x+" / "+this.endX+" / "+this.startX);
            // make it walk
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
    