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
        
        switch(i)
        {
        case 1:
            $("#price"+i).css('left', '40px');
            $("#price"+(i+4)).css('left', '40px');
            $("#price"+(i+8)).css('left', '40px');
            
            $("#name"+i).css('left', '120px');
            $("#name"+(i+4)).css('left', '120px');
            $("#name"+(i+8)).css('left', '120px');
            
            $("#desc"+i).css('left', '118px');
            $("#desc"+(i+4)).css('left', '118px');
            $("#desc"+(i+8)).css('left', '118px');
            break;
        case 2:
            $("#upgrade"+i).css('left', '152px');
            $("#upgrade"+(i+4)).css('left', '152px');
            $("#upgrade"+(i+8)).css('left', '152px');
                    
            $("#price"+i).css('left', '275px');
            $("#price"+(i+4)).css('left', '275px');
            $("#price"+(i+8)).css('left', '275px');
                    
            $("#name"+i).css('left', '358px');
            $("#name"+(i+4)).css('left', '358px');
            $("#name"+(i+8)).css('left', '358px');
                    
            $("#desc"+i).css('left', '357px');
            $("#desc"+(i+4)).css('left', '357px');
            $("#desc"+(i+8)).css('left', '357px');
            break;
        case 3:
            $("#upgrade"+i).css('left', '294px');
            $("#upgrade"+(i+4)).css('left', '294px');
            $("#upgrade"+(i+8)).css('left', '294px');
                
            $("#price"+i).css('left', '525px');
            $("#price"+(i+4)).css('left', '525px');
            $("#price"+(i+8)).css('left', '525px');
                
            $("#name"+i).css('left', '600px');
            $("#name"+(i+4)).css('left', '600px');
            $("#name"+(i+8)).css('left', '600px');
                
            $("#desc"+i).css('left', '598px');
            $("#desc"+(i+4)).css('left', '598px');
            $("#desc"+(i+8)).css('left', '598px');
            break;
        case 4:
            $("#upgrade"+i).css('left', '435px');
            $("#upgrade"+(i+4)).css('left', '435px');
            $("#upgrade"+(i+8)).css('left', '435px');
                
            $("#price"+i).css('left', '760px');
            $("#price"+(i+4)).css('left', '760px');
            $("#price"+(i+8)).css('left', '760px');
                
            $("#name"+i).css('left', '842px');
            $("#name"+(i+4)).css('left', '842px');
            $("#name"+(i+8)).css('left', '842px');
                
            $("#desc"+i).css('left', '840px');
            $("#desc"+(i+4)).css('left', '840px');
            $("#desc"+(i+8)).css('left', '840px');
            break;
        default:
            console.log("How is this possible?");
            break;
        }
        
    }
};
