function doneShopping(){


}
    
window.onload=function(){
    /**
     *      Not sure how to fix anything here but these should be done:
     *      1. Align price under the picture (center of picture)
     *      2. Push column 1,2,3 so that the distance from the picture is like
     *          column 4
     *      3. Left Align the title (with column 1)
     */
     
    for(var i=1; i<5; i++){
        $("#upgrade"+i).css('top', '10px');
        $("#upgrade"+(i+4)).css('top', '57px');
        $("#upgrade"+(i+8)).css('top', '104px');
        
        $("#price"+i).css('top', '105px');
        $("#price"+(i+4)).css('top', '250px');
        $("#price"+(i+8)).css('top', '395px');
        
        $("#name"+i).css('top', '0px');
        $("#name"+(i+4)).css('top', '145px');
        $("#name"+(i+8)).css('top', '295px');
        
        $("#desc"+i).css('top', '40px');
        $("#desc"+(i+4)).css('top', '180px');
        $("#desc"+(i+8)).css('top', '330px');
        
        if(i != 1){
            if(i == 2){
                $("#upgrade"+i).css('left', '152px');
                $("#upgrade"+(i+4)).css('left', '152px');
                $("#upgrade"+(i+8)).css('left', '152px');
                
                $("#name"+i).css('left', '355px');
                $("#name"+(i+4)).css('left', '355px');
                $("#name"+(i+8)).css('left', '355px');
                
                $("#desc"+i).css('left', '353px');
                $("#desc"+(i+4)).css('left', '353px');
                $("#desc"+(i+8)).css('left', '353px');
            }
            else if(i == 3){
                $("#upgrade"+i).css('left', '294px');
                $("#upgrade"+(i+4)).css('left', '294px');
                $("#upgrade"+(i+8)).css('left', '294px');
                
                $("#name"+i).css('left', '595px');
                $("#name"+(i+4)).css('left', '595px');
                $("#name"+(i+8)).css('left', '595px');
                
                $("#desc"+i).css('left', '595px');
                $("#desc"+(i+4)).css('left', '595px');
                $("#desc"+(i+8)).css('left', '595px');
            }
            else{
                $("#upgrade"+i).css('left', '435px');
                $("#upgrade"+(i+4)).css('left', '435px');
                $("#upgrade"+(i+8)).css('left', '435px');
                
                $("#name"+i).css('left', '840px');
                $("#name"+(i+4)).css('left', '840px');
                $("#name"+(i+8)).css('left', '840px');
                
                $("#desc"+i).css('left', '840px');
                $("#desc"+(i+4)).css('left', '840px');
                $("#desc"+(i+8)).css('left', '840px');
            }
        }
        else{
            $("#name"+i).css('left', '120px');
            $("#name"+(i+4)).css('left', '120px');
            $("#name"+(i+8)).css('left', '120px');
            
            $("#desc"+i).css('left', '115px');
            $("#desc"+(i+4)).css('left', '115px');
            $("#desc"+(i+8)).css('left', '115px');
        }
        
    }
};
