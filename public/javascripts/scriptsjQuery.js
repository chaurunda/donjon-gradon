$('document').ready(function(){
    $('#create').click(function(){
        var playerName = $('#name'),
            playerClass = $('#class'),
            createError = $('#createError');
        if(playerName.val() == ''){
            playerName.addClass('error');
            createError.show();
            if(playerClass.val() == ''){
                playerClass.addClass('error');
                createError.show();
            }
        }
        else {
            player.init();
        }
    });
})
