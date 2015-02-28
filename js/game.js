/*
	Frack-A-Mole	
*/

var frackamole = new Object({
    'count': 10, // total count (auto set on create)
    'seconds': 0, // start
    'time': 7, // max seconds
    'timeout': 0, // timeout id
    'duration': 2000, // ms protest appears - actually set at the end at reset
    'difficulty': 30, // time changes per protest 
    'points': 0,

    // Initialise the holes on the UK map
    'createHoles': function() {
        var m = document.getElementById('map');
        var e = null, id = 1; // element and it's id
            for (var c = 0; c < this.count; c++) {
                e = document.createElement('div'); // create element
                e.className = 'hole';
                e.id = 'hole-' + id;
                m.appendChild(e); // add to map
                // add onclick event
                if (e.attachEvent) {
                    td.attachEvent('onclick', 'frackamole.clickHole(' + id + ')');
                } else {
                    e.setAttribute('onclick', 'frackamole.clickHole(' + id + ')');
                }
                id++;
            }
    },

    'clickHole': function(id) {
        var hole = document.getElementById('hole-' + id);
        if (hole.className != 'hole') {
            this.points += 10;
            document.getElementById('score').innerHTML = this.points;
            hole.className = 'hole on splat'; // click to splat
        }
    },

    // no params - initialize
    'protest': function(id, toggle) {
        if (typeof id === 'undefined') {
            // initialize
            id = this.generateRandom();
            toggle = 'on';
        }
        toggle = toggle || 'off';

        var frackingProtest = (toggle == 'on' ? ' on' : '');
        var hole = document.getElementById('hole-' + id);
        hole.className = 'hole' + frackingProtest;

        if (toggle == 'on') {
            // clear after interval
            this.seconds++;
            this.timeout = setTimeout(function() {
                frackamole.protest(id)
            }, this.duration);
            console.log(this.duration);
            this.duration -= difficulty;
        } else {
            // highlight new hole
            var rand = this.generateRandom();
            if (this.seconds < this.time) {
                this.timeout = setTimeout(function() {
                    frackamole.protest(rand, 'on')
                }, 500);
            } else {
                this.bigCountdown(-1);
            }
        }
    },

    'updateTimer': function(){
        $timer = $('#timer div');
        var percentageLeft = 100*(1 - this.seconds/this.time);

        if (percentageLeft < 25) {
            $timer
                .removeClass('progress-bar-success')
                .addClass('progress-bar-warning');
        }

        $timer.css('width',percentageLeft + '%');
        console.log('timer', percentageLeft);
    },

    'resetHoles': function() {
        for (var i = 1; i <= this.count; i++) {
            document.getElementById('hole-' + i).className = 'hole';
        };
    },

    // return number betwenn 1 and 'count'
    'generateRandom': function() {
        return Math.floor((Math.random() * this.count) + 1);
    },

    'newGame': function() {
        this.resetGame();

        // set cursor to fracking rig

        var $el = $('<div id="fracking-rig">&nbsp;</div>').appendTo('body');

        $('#map, #fracking-rig').on('mousemove', function(e){
            $el.css({
                left:  e.pageX - 100,
                top:   e.pageY - 240
            });
        });

        setInterval(function(){frackamole.updateTimer();}, 200);

        this.protest();        
    },

    'resetGame': function() {
        clearTimeout(this.timeout);
        this.seconds = 0;
        this.points = 0;
        this.duration = 2000;
        document.getElementById('score').innerHTML = 0;
        this.resetHoles();
    },

    'bigCountdown': function(i){
        if (i > 0) {
            var $el = $('<div class="big-number">'+i+'</div>');
        } else if (i == -1) {
            var $el = $('<div class="big-number">TIME UP</div>');
        } else {
            var $el = $('<div class="big-number">FRACK</div>');
        }
        
        var frackamole = this;

        // stop scroll bars
        $('body').css({'overflow':'hidden'});

        $el.appendTo($('body'));
        $el.animate({'font-size': '12000%', opacity: 0},{
            duration: 350,
            step: function(){
                $(this).css({
                    left: ($(window).width() - $el.outerWidth()) / 2,
                    top: ($(window).height() - $el.outerHeight()) / 2
                });
            },
            complete: function(){
                $(this).remove();
                if (i>0){
                    setTimeout(function(){frackamole.bigCountdown(i-1);},650);
                } else if (i == -1) {
                    setTimeout(function(){location.href='thanks.html';},650);
                } else {
                    //Give back scroll bars
                    $('body').css({'overflow':'inherit'});
                    setTimeout(function(){frackamole.newGame();},1000);
                }
            },
            easing: 'linear'
        });
    }
});

$(document).ready(function(){
    frackamole.createHoles();
    setTimeout(function(){frackamole.bigCountdown(3);},1000);
});
