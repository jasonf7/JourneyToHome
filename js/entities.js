var PlayerEntity = me.ObjectEntity.extend({
    
    /**
    * Constructor
    */
    init:function(x,y,settings){
        this.parent(x,y,settings);
        this.setVelocity(3,15);
        this.gravity=0.98; //This is the default, change if needed..
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    
    update:function(){
        
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
        popup();        
        //remove it
        this.collidable = false;
        me.game.remove(this);
    } 
});