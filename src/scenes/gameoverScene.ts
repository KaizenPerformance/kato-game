import Phaser from 'phaser'

export default class GameoverScene extends Phaser.Scene {

    spaceKey!: Phaser.Input.Keyboard.Key

    constructor() {
        super('gameoverScene')
    }

    public preload() {
        this.load.bitmapFont('pixel-verdana', 'pixel-verdana/pixel-verdana.png', 'pixel-verdana/pixel-verdana.fnt')
    }

    public create() {
        this.add.bitmapText(this.sys.game.canvas.width / 2,  24 * 4, 'pixel-verdana', 'Game Over', 32).setOrigin(0.5, 0.5)
        this.add.bitmapText(this.sys.game.canvas.width / 2,  24 * 5.5, 'pixel-verdana', '"Espaco" para continuar', 24).setOrigin(0.5, 0.5)
    
        this.spaceKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!
    }

    public update() {
        const resumeButton = Phaser.Input.Keyboard.JustDown(this.spaceKey)
        if(resumeButton) {
            let playScene = this.scene.get('playScene')
            playScene.scene.restart()
            
            this.scene.stop()
        }
    }
}