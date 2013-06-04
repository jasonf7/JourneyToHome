var money=0;
var acorns = -1;

function doneShopping(){    
    //save acorns and money changes
    localStorage.acorns = acorns;
    localStorage.money = money;
    document.location.href = "index.html";
}

function boughtUpgrade(num){
    var price = parseInt($("#price"+num).html().substring(1));
    if(price>money){
        return;
    }   
    switch (num) {
        case 1:
            if(useroptions.jump)
                return;
            else
                useroptions.jump = true;
            break;
        case 2:
            if(useroptions.fly)
                return;
            else
                useroptions.fly = true;
            break;
        case 3:
            if(useroptions.sub)
                return;
            else
                useroptions.sub = true;
            break;
        case 4:
            if(useroptions.speed)
                return;
            else
                useroptions.speed = true;
            break;
        case 5:
            if(useroptions.invisible)
                return;
            else
                useroptions.invisible = true;
            break;
        case 6:
            if(useroptions.acorn)
                return;
            else
                useroptions.acorn = true;
            break;
        case 7:
            if(useroptions.powacorn)
                return;
            else
                useroptions.powacorn = true;
            break;
        case 8:
            if(useroptions.fire)
                return;
            else
                useroptions.fire = true;
            break;
        case 9:
            if(useroptions.ice)
                return;
            else
                useroptions.ice = true;
            break;
        case 10:
            if(useroptions.potion)
                return;
            else
                useroptions.potion = true;
            break;
        case 11:
            if(useroptions.magnet)
                return;
            else
                useroptions.magnet = true;
            break;
        default: //BAD BUT ALY IS LAZY
            if(useroptions.double)
                return;
            else
                useroptions.double = true;
            break;
    }
    $("#shop-button"+num).css("background","rgba(55, 194, 0,0.3)");
    money -= price;
    $("#money-indicator").html("$"+money);
    saveOptions();
}
    
window.onload=function(){
    /**
     *      Not sure how to fix anything here but these should be done:
     *      1. Align price under the picture (center of picture)
     *      2. Push column 1,2,3 so that the distance from the picture is like
     *          column 4
     *      3. Left Align the title (with column 1)
     */
    //For testing...
    for(var b in useroptions){
        useroptions[b] = false;
    }
    saveOptions();
        
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
    if(typeof localStorage.acorns == 'undefined'){
        $("#acorn-indicator").html("x0");
        localStorage.acorns = 0;
    }else{
        acorns = 0;
        acorns = parseInt(localStorage.acorns);
        if(acorns < 0){
            acorns  =0;
        }
         $("#acorn-indicator").html("x"+acorns);
    }   
    if(typeof localStorage.money == 'undefined'){
        console.log("no money");
        localStorage.money = money;
    }else{
        money = parseInt(localStorage.money);
    }
    $("#money-indicator").html("$"+money);
};

function trade(){
    if(acorns <= 0) {
        return;
    }
    acorns--;
    money+=50;
    $("#acorn-indicator").html("x"+acorns);
    $("#money-indicator").html("$"+money);
}
