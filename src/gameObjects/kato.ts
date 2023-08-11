import Phaser from 'phaser'

export default class Kato {

    public image: Phaser.Physics.Arcade.Sprite
    public body: Phaser.Physics.Arcade.Body

    private scene: Phaser.Scene
    private groundLevel: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, groundLevel: number) {
        this.scene = scene
        this.groundLevel = groundLevel

        let imageWithBody = scene.physics.add.sprite(x, y, texture)
        this.image = imageWithBody
        this.body = imageWithBody.body

        this.initialize()
    }

    private initialize() {
        if(!this.scene.anims.exists('k_ato_idle_anim')) {
            this.scene.anims.create({
                key: 'k_ato_idle_anim',
                frames: this.scene.anims.generateFrameNumbers('k_ato', { frames: [0, 1] }),
                frameRate: 5,
                repeat: -1
            })
        }
        if(!this.scene.anims.exists('k_ato_jump_anim')) {
            this.scene.anims.create({
                key: 'k_ato_jump_anim',
                frames: this.scene.anims.generateFrameNumbers('k_ato', { frames: [2] }),
                frameRate: 1,
                repeat: -1
            })
        }

        this.body.setCollideWorldBounds(true)
        this.image.play('k_ato_idle_anim')
        this.image.setSize(32, 48)
    }

    public jump(isJumping: boolean) {
        let collidingWithGround = this.body.y >= this.groundLevel - this.body.height / 2

        if(collidingWithGround) {
            this.image.play('k_ato_idle_anim', true)

            if(isJumping)
                this.body.setVelocityY(-220)
        }
        else
            this.image.play('k_ato_jump_anim')
    }
}