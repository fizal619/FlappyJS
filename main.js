let mainState = {
	preload: function() {
		// load the bird
		game.load.image('bird', 'assets/bird.png');

		// load the pipes
		game.load.image('pipe', 'assets/pipe.png');
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
	},

	update: function() {
		// restart game if bird is out of frame
		if (this.bird.y < 0 || this.bird.y > 490){
			this.restartGame();
		}
	},

	jump: function() {
		// make the bird jump
		this.bird.body.velocity.y = -350;
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
};

let game = new Phaser.Game(400, 490);

game.state.add('main', mainState);

game.state.start('main');