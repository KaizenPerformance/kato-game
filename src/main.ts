import Phaser from "phaser"

import PlayScene from "./scenes/playScene"
import GameoverScene from "./scenes/gameoverScene"

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,	
	backgroundColor: '#1A1D21',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scale: {
		parent: 'kato-game',
		mode: Phaser.Scale.NONE,
		width: 16 * 35,
        height: 9 * 35,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [PlayScene, GameoverScene],

}

export default new Phaser.Game(config)