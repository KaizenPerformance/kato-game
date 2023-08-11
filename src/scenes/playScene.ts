import Phaser from 'phaser'
import Cheese from '../gameObjects/cheese'
import Kato from '../gameObjects/kato'

export default class PlayScene extends Phaser.Scene {

    groundLevel!: number
    score: number = 0
    cheese!: Cheese
    kato!: Kato

    scoreText!: Phaser.GameObjects.BitmapText
    
    jumpKey!: Phaser.Input.Keyboard.Key

    constructor() {
        super('playScene')
    }

    public preload() {
        this.load.spritesheet({
            key: 'k_ato',
            url: 'k_ato/k_ato.png',
            frameConfig: {
                frameWidth: 16 * 3,
                frameHeight: 16 * 3
            }
        })
        
        this.load.bitmapFont('pixel-verdana', 'pixel-verdana/pixel-verdana.png', 'pixel-verdana/pixel-verdana.fnt')

        this.load.image('cheese', 'cheese/cheese.png')
        this.groundLevel = this.sys.game.canvas.height - 24
    }

    public create() {
        this.cheese = new Cheese(this, 250, this.groundLevel, 'cheese')
        this.kato = new Kato(this, 100, this.groundLevel, 'k_ato', this.groundLevel)
        this.physics.add.collider(this.cheese.image, this.kato.image, this.gameover, undefined, this)

        this.score = 0
        this.scoreText = this.add.bitmapText(this.sys.game.canvas.width / 2,  32, 'pixel-verdana', 'Score: 0', 24)
            .setOrigin(0.5, 0.5)

        this.jumpKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)!
    }

    public update(_time: number, delta: number) {
        const jumpButtons = Phaser.Input.Keyboard.JustDown(this.jumpKey)

        this.kato.jump(jumpButtons)
        this.cheese.move()
        
        this.score += delta / 1000
        this.scoreText.setText(`Score: ${Math.round(this.score)}`)
    }

    private gameover(_cheese: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, _kato: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        this.scene.launch('gameoverScene')
        this.scene.pause()
    }
}