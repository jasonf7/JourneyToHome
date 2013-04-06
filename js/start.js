$(window).load(function(){
    var position = $("#logo").position();
    $("#logo-shadow").css("left",position.left);
    $("#logo-shadow").css("top",position.top);
    
    $("#logo-shadow").css("width",$("#logo").width());
    $("#logo-shadow").css("height",$("#logo").height());
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
        window.scroll(0,0);
        return false;
    });
});