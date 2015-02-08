/*

	Frack-A-Mole
	
*/

var frackamole = new Object({
    'count': 10, // total count (auto set on create)
    'seconds': 0, // start
    'time': 20, // max seconds
    'timeout': 1000, // timeout id
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
            }
        }
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
        this.protest();
    },

    'resetGame': function() {
        clearTimeout(this.timeout);
        this.seconds = 0;
        this.points = 0;
        this.duration = 2000;
        document.getElementById('score').innerHTML = 0;
        this.resetHoles();
    }
});


frackamole.createHoles();