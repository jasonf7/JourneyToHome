var useroptions = {"jump":false, "fly":false, "sub":false, "speed":false,
                    "invisible":false,"acorn":false,"powacorn":false,"fire":false,
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
