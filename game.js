import PinkMonsterAnim from "./assets/anims/PinkMonsterAnims.js";
import OwletMonsterAnim from "./assets/anims/OwletMonsterAnim.js";

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
    this.load.spritesheet('pink_monster_hurt', 'assets/sprites/pink_monster/Pink_Monster_Hurt_4.png', {frameWidth: 32, frameHeight: 32});

    this.load.spritesheet('owlet_monster', 'assets/sprites/owlet_monster/Owlet_Monster_Idle_4.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('owlet_monster_walk', 'assets/sprites/owlet_monster/Owlet_Monster_Walk_6.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('owlet_monster_run', 'assets/sprites/owlet_monster/Owlet_Monster_Run_6.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('owlet_monster_hurt', 'assets/sprites/owlet_monster/Owlet_Monster_Hurt_4.png', {frameWidth: 32, frameHeight: 32});

    this.load.spritesheet('run_dust', 'assets/sprites/pink_monster/Walk_Run_Push_Dust_6.png', {frameWidth: 32, frameHeight: 32});



    // this.player1 = this.input.keyboard.createCursorKeys();
    this.player1 = this.input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

    this.player2 = this.input.keyboard.addKeys(
        {
            up2: Phaser.Input.Keyboard.KeyCodes.UP,
            down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space2: Phaser.Input.Keyboard.KeyCodes.SPACE
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

    this.owlet_monster = this.physics
        .add.sprite(350,160,'owlet_monster', 0)
        .setSize(18,29)
        .setOffset(7,4);

    this.owlet_monster.flipX = true;

    PinkMonsterAnim(this);
    OwletMonsterAnim(this);

    this.physics.add.collider(this.pink_monster, collisions);
    this.physics.add.collider(this.owlet_monster, collisions);
    this.physics.add.collider(this.pink_monster, this.owlet_monster);

    //this.physics.add.overlap(this.pink_monster, this.owlet_monster, gotTagged);

    this.physics.world.setBounds(0,0,400,420);



}

function selectTagger(player1, player2){
    window.playerSelect = Math.floor((Math.random() * 2) + 1);
    window.taggerP1 = false;
    window.taggerP2 = false;
    console.log(playerSelect);

    if (playerSelect === 1)
    {
        taggerP1 = true;
        player1.play('hurt', true);
        console.log(taggerP1);
    }
    else if (playerSelect === 2)
    {
        taggerP2 = true;
        player2.play('owlet-hurt', true);
        console.log(taggerP2);
    }

}




function gotTagged(player1, player2){
    if (this.taggerP1 == true)
    {
        player2.play('owlet-hurt', true);
        this.taggerP1 = false;
        this.taggerP2 = true;
    }
    else if (this.taggerP2 == true)
    {
        player1.play('hurt', true);
        this.taggerP2 = false;
        this.taggerP1 = true;
    }
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


function update (time,delta)
{
    this.pink_monster.body.setVelocity(0);
    this.owlet_monster.body.setVelocity(0);
    var speed = 70;
    var speed2 = 70;



//player1
    if (this.player1.left.isDown)
    {

        moveCharacterLeft(this.pink_monster.body, speed);

    }
    else if (this.player1.right.isDown)
    {

        moveCharacterRight(this.pink_monster.body, speed);

    }
    if (this.player1.up.isDown)
    {

        moveCharacterUp(this.pink_monster.body, speed);

    }
    else if (this.player1.down.isDown)
    {
        moveCharacterDown(this.pink_monster.body, speed);

    }

    if (this.player1.shift.isDown)
    {
        speed = speed * 2;
        this.pink_monster.play('run',true);


        if (this.player1.left.isDown)
        {
            this.pink_monster.flipX = true;
        }
        else if (this.player1.right.isDown)
        {
            this.pink_monster.flipX = false;
        }

    }


    else if (this.player1.left.isDown)
    {

        this.pink_monster.flipX = true;
        this.pink_monster.play('walk',true);

    }
    else if (this.player1.right.isDown)
    {

        this.pink_monster.flipX = false;
        this.pink_monster.play('walk',true);

    }
    else if (this.player1.up.isDown)
    {

        this.pink_monster.play('walk', true);

    }
    else if (this.player1.down.isDown)
    {
        this.pink_monster.play('walk', true);
    }
    else
    {
        this.pink_monster.play('stand', true);
    }

//player 2

    if (this.player2.left2.isDown)
    {

        moveCharacterLeft(this.owlet_monster.body, speed2);

    }
    else if (this.player2.right2.isDown)
    {

        moveCharacterRight(this.owlet_monster.body, speed2);

    }


    if (this.player2.up2.isDown)
    {

        moveCharacterUp(this.owlet_monster.body, speed2);

    }
    else if (this.player2.down2.isDown)
    {
        moveCharacterDown(this.owlet_monster.body, speed2);

    }

    if (this.player2.space2.isDown)
    {
        speed2 = speed2 * 2.2;
        this.owlet_monster.play('owlet-run',true);


        if (this.player2.left2.isDown)
        {
            this.owlet_monster.flipX = true;
        }
        else if (this.player2.right2.isDown)
        {
            this.owlet_monster.flipX = false;
        }

    }
    else if (this.player2.left2.isDown)
    {

        this.owlet_monster.flipX = true;
        this.owlet_monster.play('owlet-walk',true);

    }
    else if (this.player2.right2.isDown)
    {

        this.owlet_monster.flipX = false;
        this.owlet_monster.play('owlet-walk',true);

    }
    else if (this.player2.up2.isDown)
    {

        this.owlet_monster.play('owlet-walk', true);

    }
    else if (this.player2.down2.isDown)
    {
        this.owlet_monster.play('owlet-walk', true);
    }
    else
    {
        this.owlet_monster.play('owlet-stand', true);
    }

    this.pink_monster.body.velocity.normalize().scale(speed); // keeps sprite from moving faster at diagonals
    this.owlet_monster.body.velocity.normalize().scale(speed2);
}


