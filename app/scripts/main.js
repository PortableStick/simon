function GameController(){
    return{
        compMoves:  [],
        playerMoves: [],
        isSounding: false,
        playerHasMadeSelection: false,
        playingTimer: null,
        isPlaying   : false,
        init: function(){
            $('.box').click(this.playerMakeSelection.bind(this));            
            $('#start').html('Start').click(this.startGame.bind(this));
        },
        reset: function(){
            if(this.playingTimer){
                clearInterval(this.playingTimer);
            }
            this.compMoves      = [];
            this.playerMoves    = [];
            $('.feedback').html('Ready?')
            $('#start').html('Start').off().click(this.startGame.bind(this));
        },
        startGame: function(){
            this.isPlaying = true;
            this.newCompMove();
            $('.feedback').html("Here we go!")
            $('#start').html('Reset').off().click(this.reset.bind(this));
            this.playingTimer = setTimeout(this.playCompMoves.bind(this), 1800);
        },
        playerMakeSelection: function(){
            if(this.isSounding || this.playerHasMadeSelection || !this.isPlaying){
                return;
            }
            var currentId   = event.target.id;
            this.playerMoves.push(currentId);
            this.makeSound('#' + currentId);
            $(".feedback").html(this.playerMoves.length + '/' + this.compMoves.length)
            this.checkLastMove();
            if(this.playerMoves.length === this.compMoves.length){
                this.playerHasMadeSelection = true;
                this.playerMoves = [];
                this.newCompMove();
                setTimeout(this.playCompMoves.bind(this), 1700);
            }
        },
        playCompMoves: function(counter){ 
            var counter         = counter || 0,
                currentPlay     = this.compMoves[counter],
                context         = this;
                this.isSounding = true;
                if(counter >= this.compMoves.length){
                    this.isSounding             = false;
                    this.playerHasMadeSelection = false;
                    return;
                } else {
                    this.makeSound('#' + currentPlay);
                    $('.feedback').html("Level " + this.compMoves.length);
                    setTimeout(function(){
                        context.playCompMoves(counter + 1);
                    }, 1000)
                }
        },
        newCompMove: function(){
            var newNum      = Math.floor(Math.random() * 4);
            this.compMoves.push(newNum);
        },
        makeSound: function(targetId){
            this.sounding = true;
           $(targetId).addClass('sounding');
           setTimeout(function(){
                $(targetId).removeClass('sounding');
                this.sounding = false;
           },600)
        },
        checkLastMove: function(){
            var indexOfLastPlayerMove    = this.playerMoves.length - 1;
                
                if(this.compMoves[indexOfLastPlayerMove] != this.playerMoves[indexOfLastPlayerMove]) {
                    //try again
                    this.playerMoves = [];
                    setTimeout(this.playCompMoves.bind(this), 1000);
                    $('.feedback').html("Try again!");
                } 
        }   
    }
}