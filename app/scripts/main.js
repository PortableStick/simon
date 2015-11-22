function GameController(){
    return{
        compMoves:  [],
        playerMoves: [],
        isSounding: false,
        playerHasMadeSelection: false,
        playingTimers: [],
        isPlaying   : false,
        strictMode  : false,
        computerMovePlayTimer: 1000,//default 1000, fastest 600
        soundingTimer: 600,
        sounds:{
            '#0': new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/sound1.mp3'),
            '#1': new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/sound2.mp3'),
            '#2': new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/sound3.mp3'),
            '#3': new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/sound4.mp3'),
            error: new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/error.mp3'),
            victory: new Audio('https://dl.dropboxusercontent.com/u/4223104/simongamesounds/victory.mp3')
        },
        init: function(){
            var context = this;
            $('.box').click(this.playerMakeSelection.bind(this));            
            $('#start').html('Start').click(this.startGame.bind(this));
            $('#strictMode').change(function(){
                if($(this).is(':checked') == true){
                    context.strictMode = true;
                    $('.feedback').html("Strict on");
                } else {
                    context.strictMode = false;
                    $('.feedback').html("Strict off");
                }
            });
        },
        resetTimers:function(){
            for(var i = 0; i < this.playingTimers.length; i++){
                clearInterval(this.playingTimers[i]);
            }
            this.playingTimers = [];
        },
        reset: function(){
            $('.box').removeClass('sounding');
            if(this.playingTimers.length > 0){
                this.resetTimers();
            }
            this.compMoves      = [];
            this.playerMoves    = [];
            $('.feedback').html('Ready?');
            $('#start').html('Start').off().click(this.startGame.bind(this));
        },
        startGame: function(){
            this.isPlaying = true;
            this.newCompMove();
            $('.feedback').html("Here we go!");
            $('#start').html('Reset').off().click(this.reset.bind(this));
            var timer = setTimeout(this.playCompMoves.bind(this), 1800);
            this.playingTimers.push(timer);
        },
        playerMakeSelection: function(event){
            if(this.isSounding || this.playerHasMadeSelection || !this.isPlaying){
                return;
            }
            var currentId   = event.target.id;
            this.playerMoves.push(currentId);
            this.makeSound('#' + currentId);
            $(".feedback").html(this.playerMoves.length + '/' + this.compMoves.length);
            if(this.checkLastMove() === true){
               if(this.strictMode === false){
                    //try again
                    this.playerHasMadeSelection = true;
                    var timer = setTimeout(this.playCompMoves.bind(this), 1500);
                    this.playingTimers.push(timer);
                    $('.feedback').html("Try again!");
                    this.stopSounds();
                    this.sounds.error.play();
                } else if(this.strictMode === true){
                    $('.feedback').html("Game over!");
                    setTimeout(this.reset.bind(this), 3000);
                    this.stopSounds();
                    this.sounds.error.play();
                }
            } else {
                if(this.playerMoves.length === this.compMoves.length){
                    this.playerHasMadeSelection = true;
                    this.playerMoves = [];
                    this.newCompMove();
                    this.computerMovePlayTimer = 1000 - (150 * Math.floor(this.compMoves.length/5));
                    this.soundingTimer = this.computerMovePlayTimer * (.6);
                    var timer = setTimeout(this.playCompMoves.bind(this), 1700);
                    this.playingTimers.push(timer);
                }
            }
            
        },
        playCompMoves: function(counter){
            this.resetTimers(); 
            if(this.compMoves.length === 21){ 
                $('.feedback').html("You win!!");
                setTimeout(this.reset.bind(this), 4000);
                this.stopSounds();
                this.sounds.victory.play();
                return;
            } else {
                var counter         = counter || 0,
                currentPlay         = this.compMoves[counter],
                context             = this;
                this.isSounding     = true;
                this.playerMoves    = [];
                if(counter >= this.compMoves.length){
                    this.isSounding             = false;
                    this.playerHasMadeSelection = false;
                    return;
                } else {
                    this.makeSound('#' + currentPlay);
                    $('.feedback').html("Level " + this.compMoves.length);
                    var timer = setTimeout(function(){
                        context.playCompMoves(counter + 1);
                    }, this.computerMovePlayTimer);
                    this.playingTimers.push(timer);
                }
            }
        },
        newCompMove: function(){
            var newNum      = Math.floor(Math.random() * 4);
            this.compMoves.push(newNum);
        },
        makeSound: function(targetId){
            this.sounding = true;
            $(targetId).addClass('sounding');
            this.sounds[targetId].play();
            var timer = setTimeout(function(){
                $(targetId).removeClass('sounding');
                this.sounding = false;
            },600);
            this.playingTimers.push(timer);
        },
        stopSounds: function(){
            for(sound in this.sounds){
                this.sounds[sound].pause();
                this.sounds[sound].currentTime = 0;
            }
        },
        checkLastMove: function(){
            var indexOfLastPlayerMove    = this.playerMoves.length - 1;
                if(this.compMoves[indexOfLastPlayerMove] != this.playerMoves[indexOfLastPlayerMove]) {
                    return true;
                } 
        }   
    }
}
