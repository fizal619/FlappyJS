let mainState = {
	preload: function() {
		// load the bird
		game.load.image('bird', 'assets/bird.png');

		// load the pipes
		game.load.image('pipe', 'assets/pipe.png');

		// load the jump sound
		game.load.audio('jump', 'assets/jump.wav');
	},

	create : function() {
		// set background color
		game.stage.backgroundColor = 'rgb(113, 197, 207)';

		// set physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// set bird starting position
		this.bird = game.add.sprite(100, 245, 'bird');

		// add physics and gravity to the bird
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		// set spacebar to call the jump action when pressed
		let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		// create empty group for pipes
		this.pipes = game.add.group();

		// add pipes on 1.5s timer
		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

		// display score
		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", {font: "30px Tahoma", fill: "#ffffff"});

		// change rotation anchor
		this.bird.anchor.setTo(-0.2, 0.5);

		// add jumpsound to game
		this.jumpSound = game.add.audio('jump');
	},

	update: function() {
		// restart game if bird is out of frame
		if (this.bird.y < 0 || this.bird.y > 490){
			this.restartGame();
		}

		// restart game when the bird collides with a pipe
		game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

		// make the bird rotate back to starting after a jump
		if(this.bird.angle < 20){
			this.bird.angle += 1;
		}

	},

	jump: function() {
		// if bird is dead, don't allow to jump
		if(this.bird.alive == false){
			return;
		}

		// make the bird jump
		this.bird.body.velocity.y = -350;

		// make an animation for the bird angling upward when jumping
		let animation = game.add.tween(this.bird).to({angle: -20}, 100).start();

		// play jump sound on jump
		this.jumpSound.play();
	},

	restartGame: function() {
		// restart game by reverting state to 'main'
		game.state.start('main');
	},

	addOnePipe: function(x,y) {
		// create a pipe at the given x and y
		let pipe = game.add.sprite(x, y, 'pipe');

		// add the pipe to the group created above
		this.pipes.add(pipe);

		// add physics and velocity to the pipes (velocity needed for scroll)
		game.physics.arcade.enable(pipe);
		pipe.body.velocity.x = -200;

		// remove pipe when its not on screen
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;
	},

	addRowOfPipes: function() {
		// randomly choose the empty position in the pipes for the bird to fly through
		let hole = Math.floor(Math.random() * 5) + 1;

		// add the pipes with the flythrough hole
		for(i = 0; i < 8; i++) {
			if(i != hole && i != hole + 1) {
				this.addOnePipe(400, i * 60 + 10);
			}
		}

		// increase score by 1 every time a new pipe is made
		this.score += 1;
		this.labelScore.text = this.score;
	},

	hitPipe: function() {
		// if the bird is already dead, do nothing
		if(this.bird.alive == false){
			return
		}

		// set the bird as dead, stop new pipes and stop existing pipe movement
		this.bird.alive = false;
		game.time.events.remove(this.timer);
		this.pipes.forEach(function(p){
			p.body.velocity.x = 0;
		}, this);
	},
};

let game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');