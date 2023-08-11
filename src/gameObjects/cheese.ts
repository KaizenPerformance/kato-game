import Phaser from 'phaser'

export default class Cheese {

    public image: Phaser.Physics.Arcade.Image
    public body: Phaser.Physics.Arcade.Body

    private scene: Phaser.Scene
    private speed: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, speed: number = -1) {
        this.scene = scene
        this.speed = speed
        
        let imageWithBody = scene.physics.add.image(x, y, texture)
        this.image = imageWithBody
        this.body = imageWithBody.body

        this.initialize()
    }

    private initialize() {
        this.body.setAllowGravity(false)
        this.body.setSize(26, 24)
        this.resetCheese(24)
    }

    public move(speedIncrease: number) {
        if(this.image.x <= -this.image.width / 2) {
            let offset = Phaser.Math.Between(0, 150)
            this.resetCheese(offset)
        }
        
        this.image.x += this.speed + speedIncrease
    }

    public resetCheese(offset: number = 0) {
        this.image.x = this.scene.sys.game.canvas.width + offset

        let imageIndex = Phaser.Math.Between(0, 1)

        if(imageIndex == 0) {
            this.image.setTexture('cheese1')
            this.body.setSize(26, 24)
        } else {
            this.image.setTexture('cheese2')
            this.body.setSize(20, 22)
        }

    }
}