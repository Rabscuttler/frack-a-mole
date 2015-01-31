/*

	Frack-A-Mole
	
*/

var frackamole = new Object({
    'cols': 2,
    'rows': 5,
    'count': 0, // total count (auto set on create)
    'seconds': 0, // start
    'time': 20, // max seconds
    'timeout': null, // timeout id
    'duration': 1000, // how many ms hole will be on
    'difficulty': 10, // how many ms hole-on-duration will decrease each step 
    'points': 0,

// Initialise the holes in predetermined positions on the map

    // Put the holes on the UK map
    'createHoles': function() {
        var b = document.getElementById('map');
        b.style.width = this.cols * 56 + 'px';
        b.style.height = this.rows * 56 + 'px';

        var e = null, id = 1; // element and it's id
        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                e = document.createElement('div'); // create element
                e.className = 'hole';
                e.id = 'hole-' + id;
                b.appendChild(e); // add to map

                // add onclick event
                if (e.attachEvent) {
                    td.attachEvent('onclick', 'frackamole.clickHole(' + id + ')');
                } else {
                    e.setAttribute('onclick', 'frackamole.clickHole(' + id + ')');
                }

                id++;
            }
        }

        this.count = this.cols * this.rows; // set total hole count
    },

    'clickHole': function(id) {
        var hole = document.getElementById('hole-' + id);
        if (hole.className != 'hole') {
            this.points += 10;
            document.getElementById('score').innerHTML = this.points;
            hole.className = 'hole'; // prevent multiple clicking
        }
    },

    // no params - initialize
    'highlightHole': function(id, toggle) {
        if (typeof id === 'undefined') {
            // initialize
            id = this.generateRandom();
            toggle = 'on';
        }
        toggle = toggle || 'off';

        var colorClass = (toggle == 'on' ? ' on' : '');
        var hole = document.getElementById('hole-' + id);
        hole.className = 'hole' + colorClass;
        if (toggle == 'on') {
            // clear after interval
            this.seconds++;
            this.timeout = setTimeout(function() {
                frackamole.highlightHole(id)
            }, this.duration);
            this.duration -= this.difficulty;
        } else {
            // highlight new hole
            var rand = this.generateRandom();
            if (this.seconds < this.time) {
                this.timeout = setTimeout(function() {
                    frackamole.highlightHole(rand, 'on')
                }, 100);
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
        this.highlightHole();
    },

    'resetGame': function() {
        clearTimeout(this.timeout);
        this.seconds = 0;
        this.points = 0;
        this.duration = 1000;
        document.getElementById('score').innerHTML = 0;
        this.resetHoles();
    }
});


frackamole.createHoles();