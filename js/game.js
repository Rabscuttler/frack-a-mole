/*

	Frack-A-Mole
	
*/

var frackamole = new Object({
    'count': 10, // total count (auto set on create)
    'seconds': 0, // start
    'time': 20, // max seconds
    'timeout': null, // timeout id
    'duration': 2000, // how many ms hole will be on
    'difficulty': 10, // how many ms hole-on-duration will decrease each step 
    'points': 0,

// Initialise the holes in predetermined positions on the map

    // Put the holes on the UK map
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
            // hole.className = 'Splat' + id ; 
            hole.className = 'hole'; //Prevents doubleclicking
            frackamole.clearBubble(id)
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
        // frackamole.addBubble(id); // broken broken broken broken broken 
        if (toggle == 'on') {
            // clear after interval
            this.seconds++;
            this.timeout = setTimeout(function() {
                frackamole.highlightHole(id)
                // frackamole.clearBubble(id) /// BROKEN BROKEN BROKEN 
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

    'addBubble': function(id){
    var img = new Image();
    img.src = 'images/SpeechBubbles'+id+'.png';

	document.getElementById("hole-" + id).appendChild(img);
    },

    'clearBubble': function(id){
    	var element = document.getElementById('bubble' + id);
    	element.parentNode.removeChild(element);
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