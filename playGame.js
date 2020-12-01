function PinkMonsterAnim(scene){
    scene.anims.create({
        key: 'walk',
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNames('pink_monster_walk', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'stand',
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNames('pink_monster', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'run',
        repeat: -1,
        frameRate: 12,
        frames: scene.anims.generateFrameNames('pink_monster_run', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'hurt',
        repeat: 0,
        frameRate: 12,
        frames: scene.anims.generateFrameNames('pink_monster_hurt', {start: 1, end: 6})
    });
}

function OwletMonsterAnim(scene){
    scene.anims.create({
        key: 'owlet-walk',
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNames('owlet_monster_walk', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'owlet-stand',
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNames('owlet_monster', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'owlet-run',
        repeat: -1,
        frameRate: 12,
        frames: scene.anims.generateFrameNames('owlet_monster_run', {start: 1, end: 6})
    });

    scene.anims.create({
        key: 'owlet-hurt',
        repeat: 0,
        frameRate: 12,
        frames: scene.anims.generateFrameNames('owlet_monster_hurt', {start: 1, end: 6})
    });
}

function textVisibleOff(){
    this.text1.setVisible(false);
    this.text2.setVisible(false);
}

function makeBar(x, y,color) {
    //draw the bar
    const bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    bar.fillRect(0, 0, 200, 50);

    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
}
function setValue(bar,percentage) {
    //scale the bar
    bar.scaleX = percentage/100;
    //console.log(bar.scaleX);
    if (bar.scaleX <= 0)
    {
        bar.scaleX = 0;
    }
}

function gotTagged(player1, player2) {
    player1.setPosition(50,160);
    player2.setPosition(350,160);
    if (this.taggerP1 == true)
    {
        this.taggerP2 = true;
        this.taggerP1 = false;
        player2.play('owlet-hurt', true);
        console.log('p2 is it');
        this.text2.setVisible(true);
        this.time.delayedCall(2000, textVisibleOff, null, this);
    }
    else if (this.taggerP2 == true)
    {
        this.taggerP1 = true;
        this.taggerP2 = false;
        player1.play('hurt', true);
        console.log('p1 is it');
        this.text1.setVisible(true);
        this.time.delayedCall(2000, textVisibleOff, null, this);
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

class playGame extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload(){
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

    create() {
        var map = this.make.tilemap({key: 'map'});
        var tileset = map.addTilesetImage('woods-02', 'tiles');

        const grass = map.createStaticLayer('grass', tileset, 0, 0);
        const path = map.createStaticLayer('path', tileset, 0, 0);
        const flowers = map.createStaticLayer('flowers', tileset, 0, 0);
        const collisions = map.createStaticLayer('collisions', tileset);

        collisions.setCollisionByProperty({collides: true});
        collisions.setDepth(10);

        //const sprintBar= makeBar(140,100,0x2ecc71);


        //   const debugGraphics = this.add.graphics().setAlpha(0.75);
        //   collisions.renderDebug(debugGraphics, {
        //       tileColor: null,
        //       collidingTileColor: new Phaser.Display.Color(243,234,48,255),
        //       faceColor: new Phaser.Display.Color(40,39,37,255)
        //   });


        this.pink_monster = this.physics
            .add.sprite(50, 160, 'pink_monster', 0)
            .setSize(18, 30) //last value - (18,12)
            .setOffset(7, 3); //last value - (7,19)


        this.owlet_monster = this.physics
            .add.sprite(350, 160, 'owlet_monster', 0)
            .setSize(18, 29) //original value - (18,12)
            .setOffset(7, 4); //original value - (7,19)

        this.owlet_monster.flipX = true;

        PinkMonsterAnim(this);
        OwletMonsterAnim(this);

        this.physics.add.collider(this.pink_monster, collisions);
        this.physics.add.collider(this.owlet_monster, collisions);
        this.physics.add.collider(this.pink_monster, this.owlet_monster, gotTagged, null, this);


        this.physics.world.setBounds(0, 0, 400, 420);

        this.text1 = this.add.text(30, 130, `You're it!`, {
            fontFamily: 'ValMore'
        });
        this.text1.setOrigin(.7, 3);
        this.text1.setVisible(false);
        this.text1.setDepth(20);

        this.text2 = this.add.text(330, 130, `You're it!`, {
            fontFamily: 'ValMore'
        });
        this.text2.setOrigin(.7, 3);
        this.text2.setVisible(false);
        this.text2.setDepth(20);

        //draw the bar
        this.bar = this.add.graphics();
        //color the bar
        this.bar.fillStyle(0xFFFFFF, 1);
        //fill the bar with a rectangle
        this.bar.fillRect(0, 0, 25, 3);
        this.barPercentage = 100;
        setValue(this.bar, this.barPercentage);

        //draw the bar
        this.bar2 = this.add.graphics();
        //color the bar
        this.bar2.fillStyle(0xFFFFFF, 1);
        //fill the bar with a rectangle
        this.bar2.fillRect(0, 0, 25, 3);
        this.bar2Percentage = 100;
        setValue(this.bar2, this.bar2Percentage);


        this.playerSelect = Math.floor((Math.random() * 2) + 1);
        this.taggerP1 = false;
        this.taggerP2 = false;
        this.speed = 70;
        this.speed2 = 70;


        // select tagger at start of game
        if (this.playerSelect === 1) {
            this.taggerP1 = true;
            this.pink_monster.play('hurt', true);
            this.speed = 73;
            this.speed2 = 70;
            console.log('p1 is it');
            this.text1.setVisible(true);
            this.time.delayedCall(2000, textVisibleOff, null, this);
        } else if (this.playerSelect === 2) {
            this.taggerP2 = true;
            this.owlet_monster.play('owlet-hurt', true);
            this.speed = 70;
            this.speed2 = 73;
            console.log('p2 is it');
            this.text2.setVisible(true);
            this.time.delayedCall(2000, textVisibleOff, null, this);
        }
    }

    update(time, delta) {
        this.pink_monster.body.setVelocity(0);
        this.owlet_monster.body.setVelocity(0);
        var speed = this.speed;//original this.speed = 70
        var speed2 = this.speed2; //original this.speed: 73
        var canSprint;
        var canSprint2;
        var barPercentage = this.barPercentage;

//player1
        if (this.player1.left.isDown) {

            moveCharacterLeft(this.pink_monster.body, speed);

        } else if (this.player1.right.isDown) {

            moveCharacterRight(this.pink_monster.body, speed);

        }
        if (this.player1.up.isDown) {

            moveCharacterUp(this.pink_monster.body, speed);

        } else if (this.player1.down.isDown) {
            moveCharacterDown(this.pink_monster.body, speed);

        }
        if (barPercentage == 100) {
            canSprint = true;
        } else if (barPercentage == 0) {
            canSprint = false;
        }
        if (this.player1.shift.isDown) {
            speed = speed * 2;
            this.pink_monster.play('run', true);
            barPercentage += Math.floor(-.5 * this.player1.shift.getDuration() / 10);
            console.log(barPercentage);
            setValue(this.bar, barPercentage);


            if (this.player1.left.isDown) {
                this.pink_monster.flipX = true;
            } else if (this.player1.right.isDown) {
                this.pink_monster.flipX = false;
            }

        } else if (this.player1.left.isDown) {

            this.pink_monster.flipX = true;
            this.pink_monster.play('walk', true);

        } else if (this.player1.right.isDown) {

            this.pink_monster.flipX = false;
            this.pink_monster.play('walk', true);

        } else if (this.player1.up.isDown) {

            this.pink_monster.play('walk', true);

        } else if (this.player1.down.isDown) {
            this.pink_monster.play('walk', true);
        } else {
            this.pink_monster.play('stand', true);
            if (this.bar.scaleX = 0) {
                this.barPercentage = 0;
                this.barPercentage = this.barPercentage + 1;
                setValue(this.bar, this.barPercentage);
            } else if (this.bar.scaleX = 1) {
                this.barPercentage = 100;
                //this.barPercentage = this.barPercentage + 0;
                setValue(this.bar, this.barPercentage);
            }

        }

//player 2

        if (this.player2.left2.isDown) {

            moveCharacterLeft(this.owlet_monster.body, speed2);

        } else if (this.player2.right2.isDown) {

            moveCharacterRight(this.owlet_monster.body, speed2);

        }


        if (this.player2.up2.isDown) {

            moveCharacterUp(this.owlet_monster.body, speed2);

        } else if (this.player2.down2.isDown) {
            moveCharacterDown(this.owlet_monster.body, speed2);

        }

        if (this.player2.space2.isDown) {
            speed2 = speed2 * 2;
            this.owlet_monster.play('owlet-run', true);


            if (this.player2.left2.isDown) {
                this.owlet_monster.flipX = true;
            } else if (this.player2.right2.isDown) {
                this.owlet_monster.flipX = false;
            }

        } else if (this.player2.left2.isDown) {

            this.owlet_monster.flipX = true;
            this.owlet_monster.play('owlet-walk', true);

        } else if (this.player2.right2.isDown) {

            this.owlet_monster.flipX = false;
            this.owlet_monster.play('owlet-walk', true);

        } else if (this.player2.up2.isDown) {

            this.owlet_monster.play('owlet-walk', true);

        } else if (this.player2.down2.isDown) {
            this.owlet_monster.play('owlet-walk', true);
        } else {
            this.owlet_monster.play('owlet-stand', true);
        }

        this.pink_monster.body.velocity.normalize().scale(speed); // keeps sprite from moving faster at diagonals
        this.owlet_monster.body.velocity.normalize().scale(speed2);

        //text, sprint bar and, sprite move together
        this.text1.x = Math.floor(this.pink_monster.x + this.pink_monster.width / 2);
        this.text1.y = Math.floor(this.pink_monster.y + this.pink_monster.height / 2);
        this.text2.x = Math.floor(this.owlet_monster.x + this.owlet_monster.width / 2);
        this.text2.y = Math.floor(this.owlet_monster.y + this.owlet_monster.height / 2);
        this.bar.x = this.pink_monster.x - 12;
        this.bar.y = this.pink_monster.y + 23;
        this.bar2.x = this.owlet_monster.x - 12;
        this.bar2.y = this.owlet_monster.y + 23;
    }
}
