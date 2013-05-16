var useroptions = {"jump":false, "fly":false, "sub":false, "speed":false,
                    "invis":false,"acorn":false,"pacorn":false,"fire":false,
                    "ice":false,"potion":false,"magnet":false,"double":false};
                    
$(document).ready(function() {
    if(typeof localStorage.useroptions === 'undefined'){
        saveOptions();
    }else{
        var savedOptions = localStorage.useroptions;
        useroptions = JSON.parse(savedOptions);
    }
});

function saveOptions(){
    localStorage.useroptions = JSON.stringify(useroptions); 
}
