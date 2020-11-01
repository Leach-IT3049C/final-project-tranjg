let gameScene = new Phaser.Scene('Game');

var config = {
    type: Phaser.AUTO,// Phaser.CANVAS, // previous value Phaser.AUTO,
    width: 400, // window.innerWidth * window.devicePixelRatio, // previous value 400,
    height: 320,// window.innerHeight * window.devicePixelRatio, // previous value 320,
    zoom: 3,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tiles', 'assets/tiles/Tilemapnew.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    this.load.tilemapTiledJSON('map','assets/tiles/woods-02.json');
    this.load.spritesheet('pink_monster', 'assets/sprites/pink_monster/Pink_Monster_Idle_4.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('pink_monster_walk', 'assets/sprites/pink_monster/Pink_Monster_Walk_6.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('pink_monster_run', 'assets/sprites/pink_monster/Pink_Monster_Run_6.png', {frameWidth: 32, frameHeight: 32});

    // this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            spacebar: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

}

function create ()
{


    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('woods-02', 'tiles');

    const grass = map.createStaticLayer('grass', tileset, 0, 0);
    const path = map.createStaticLayer('path', tileset, 0, 0);
    const flowers = map.createStaticLayer('flowers', tileset, 0, 0);
    const collisions = map.createStaticLayer('collisions', tileset);

    collisions.setCollisionByProperty({collides: true});
    collisions.setDepth(10);


       const debugGraphics = this.add.graphics().setAlpha(0.75);
       collisions.renderDebug(debugGraphics, {
           tileColor: null,
           collidingTileColor: new Phaser.Display.Color(243,234,48,255),
           faceColor: new Phaser.Display.Color(40,39,37,255)
       });


    this.pink_monster = this.physics
        .add.sprite(50, 160, 'pink_monster', 0)
        .setSize(18,30)
        .setOffset(7,3);

   // this.pink_monster_walk = this.physics
   //     .add.sprite(50, 160, 'pink_monster_walk', 0)
   //     .setSize(18,30)
   //     .setOffset(7,3);

   // this.pink_monster_run = this.physics
   //     .add.sprite(50,160, 'pink_monster_run', 0)
   //     .setSize(18,30)
   //     .setOffset(7,3);

   // this.pink_monster_walk.visible = false;
   // this.pink_monster_run.visible = false;

  //  this.physics.add.collider(this.pink_monster_walk, collisions);
    this.physics.add.collider(this.pink_monster, collisions);
   // this.physics.add.collider(this.pink_monster_run, collisions);

    this.physics.world.setBounds(0,0,400,420);

    this.anims.create({
        key: 'walk',
        repeat: -1,
        frameRate: 10,
        frames: this.anims.generateFrameNames('pink_monster_walk', {start: 1, end: 6})
    });

    this.anims.create({
        key: 'stand',
        repeat: -1,
        frameRate: 5,
        frames: this.anims.generateFrameNames('pink_monster', {start: 1, end: 6})
    });

    this.anims.create({
        key: 'run',
        repeat: -1,
        frameRate: 12,
        frames: this.anims.generateFrameNames('pink_monster_run', {start: 1, end: 6})
    });

    // var timedEvent = this.time.addEvent({ delay: 1000, callback: updateRunMeter, callbackScope: this, loop: true });

    // pink_monster.setPosition(width / 2, height/ 2);
    // pink_monster.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);


}


function moveCharacterLeft (characterBody, speed)
{
    characterBody.setVelocityX(-speed);
}

function moveCharacterRight (characterBody, speed)
{
    characterBody.setVelocityX(speed);
}

function moveCharacterUp (characterBody, speed)
{
    characterBody.setVelocityY(-speed);
}

function moveCharacterDown (characterBody, speed)
{
    characterBody.setVelocityY(speed);
}

function visibilityBool (characterVis, boolean)
{
    characterVis = boolean;
}

function flipBool (characterFlipX, boolean) // flips sprite on horizontal axis
{
    characterFlipX = boolean;
}


var runMeter = 5;
function updateRunMeter ()
{
    runMeter--;
    console.log(runMeter);
}

function update (time,delta)
{
    //this.pink_monster_walk.body.setVelocity(0);
    this.pink_monster.body.setVelocity(0);
    //this.pink_monster_run.body.setVelocity(0);
    //const prevVelocity = this.pink_monster_walk.body.velocity.clone();
    var speed = 70;


    if (this.cursors.left.isDown)
    {

        moveCharacterLeft(this.pink_monster.body, speed);



    }
    else if (this.cursors.right.isDown)
    {

        moveCharacterRight(this.pink_monster.body, speed);



    }
    if (this.cursors.up.isDown)
    {
       // moveCharacterUp(this.pink_monster_run.body, speed);
       // moveCharacterUp(this.pink_monster_walk.body, speed);
        moveCharacterUp(this.pink_monster.body, speed);

        // this.pink_monster_walk.setVelocityY(-speed);

        // this.pink_monster.setVelocityY(-speed);

        // this.pink_monster_run.setVelocityY(-speed);

    }
    else if (this.cursors.down.isDown)
    {
        moveCharacterDown(this.pink_monster.body, speed);

    }

    if (this.cursors.spacebar.isDown)
    {
        speed = speed * 1.2;
        this.pink_monster.play('run',true);


        if (this.cursors.left.isDown)
        {
            this.pink_monster.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.pink_monster.flipX = false;
        }

    }


    else if (this.cursors.left.isDown)
    {

        this.pink_monster.flipX = true;
        this.pink_monster.play('walk',true);

    }
    else if (this.cursors.right.isDown)
    {

        this.pink_monster.flipX = false;
        this.pink_monster.play('walk',true);

    }
    else if (this.cursors.up.isDown)
    {

        this.pink_monster.play('walk', true);

    }
    else if (this.cursors.down.isDown)
    {
        this.pink_monster.play('walk', true);
    }
    else
    {
        this.pink_monster.play('stand', true);
    }


    this.pink_monster.body.velocity.normalize().scale(speed);
}


