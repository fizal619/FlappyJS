let mainState = {
	preload: function() {
		game.load.image('bird', 'assets/bird.png');
	},

	create : function() {
		game.state.backgroundColor = '#71c5cf';

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.bird = game.add.sprite(100, 245, 'bird');

		game.physics.arcade.enable(this.bird);

		this.bird.body.gravity.y = 1000;

		let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);
	},

	update: function() {

	},
};

let game = new Phaser.game(400, 490);

game.state.add('main', mainState);

game.state.start('main');