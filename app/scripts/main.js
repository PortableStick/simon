function GameController(){
    return{
        compMoves:  [],
        playerMoves: [],
        isSounding: false,
        init: function(){
            $('.box').click(this.playerMakeSelection.bind(this));
            this.newCompMove();
            this.playCompMoves();
        },
        playerMakeSelection: function(){
            var currentId  = event.target.id;
            this.playerMoves.push(currentId);
            console.log(this.playerMoves);
        },
        playCompMoves: function(){ 
            
            var counter     = 0,
                context     = this,
                interval    = setInterval(function(){
                    if(counter === context.compMoves.length){
                        clearInterval(interval);
                        context.isSounding = false;
                        return;
                    }
                    context.isSounding  = true;
                    var targetClass     = '#' + context.compMoves[counter];
                    context.makeSound(targetClass);                    
                    counter++;
                },1000); 
        },
        newCompMove: function(){
            var newNum      = Math.floor(Math.random() * 4),
                targetClass = '#' + newNum;
            this.compMoves.push(newNum);
            this.makeSound(targetClass);
        },
        makeSound: function(targetClass){
           $(targetClass).addClass('sounding');
           setTimeout(function(){
            $(targetClass).removeClass('sounding');
           }, 1000);
        }
    }
}