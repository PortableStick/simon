function GameController(){
    return{
        compMoves:  [],
        playerMoves: [],
        isSounding: false,
        init: function(){
            $('.box').click(this.playerMakeSelection.bind(this));
            this.playCompMoves();
        },
        playerMakeSelection: function(){
            if(this.isSounding){
                return;
            }
            var currentId  = event.target.id;
            this.playerMoves.push(currentId);
            this.makeSound('#' + currentId);
            if(this.checkLastMove()){
                console.log("Incorrect!");
            } else {
                console.log("Correct!");
            }
        },
        playCompMoves: function(counter){ 
            
            var counter     = counter || 0,
                currentPlay = this.compMoves[counter],
                context     = this;
                if(counter >= this.compMoves.length){
                    return;
                } else {
                    this.makeSound('#' + currentPlay);
                    setTimeout(function(){
                        context.playCompMoves(counter + 1);
                    }, 1000)
                }
                 
        },
        newCompMove: function(){
            var newNum      = Math.floor(Math.random() * 4);
            this.compMoves.push(newNum);
        },
        makeSound: function(targetClass){
           $(targetClass).addClass('sounding');
           setTimeout(function(){
                $(targetClass).removeClass('sounding');
           },600)
        },
        checkLastMove: function(){
            var playerMovesLastIndex    = this.playerMoves.length;
                console.log(playerMovesLastIndex);
                if(this.compMoves[playerMovesLastIndex] !== this.playerMoves[playerMovesLastIndex]){
                    return true;
                }
        }   
    }
}