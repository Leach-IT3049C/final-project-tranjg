class startGame extends Phaser.Scene {
    constructor() {
        super("startGame");
    }



    preload(){
        this.load.audio('title_music', 'assets/music/03-Chibi-Ninja.mp3');
        this.load.audio('title_music2', 'assets/music/titlemusic2.mp3');
        this.load.audio('start_game', 'assets/sfx/startgame.wav');
        this.load.audio('instructions', 'assets/sfx/instructions.wav');
        this.load.audio('closed', 'assets/sfx/closed.wav');
    }

    create(){

        this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 1)');
        this.titleMusic = this.sound.add('title_music', {
            volume: .2
        });
        //remove AudioContext warning
        this.titleMusic.pauseOnBlur = false;
        if (!this.sound.locked)
        {
            // already unlocked so play
            this.titleMusic.play();

        }
        else
        {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.titleMusic.play();
            })
        }

        this.playbtnSound = this.sound.add('start_game', {
            volume: .2
        });

        this.instructionsbtnSound = this.sound.add('instructions', {
            volume: .2
        });

        this.closedSound = this.sound.add('closed', {
            volume: .2
        });

        this.title = this.physics
            .add.sprite(this.cameras.main.worldView.x + this.cameras.main.width / 2 , this.cameras.main.worldView.y + this.cameras.main.height / 2 - 70, 'title', 0);
        this.anims.create({
            key: 'title',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('title', {start: 1, end: 20})
        });
        this.title.play('title', true);

        this.play = this.physics
            .add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2 - 30, this.cameras.main.worldView.y + this.cameras.main.height / 2 + 10, 'play', 0)
        this.play.setScale(.07);


        this.play2 = this.physics
            .add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2 - 30, this.cameras.main.worldView.y + this.cameras.main.height / 2 + 10, 'play2', 0)
        this.play2.setScale(.07);
        this.play2.setDepth(1);
        this.play2.visible = false;


        this.info = this.physics
            .add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2 + 30, this.cameras.main.worldView.y + this.cameras.main.height / 2 + 10, 'info', 0)
        this.info.setScale(.07);

        this.info2 = this.physics
            .add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2 + 30, this.cameras.main.worldView.y + this.cameras.main.height / 2 + 10, 'info2', 0)
        this.info2.setScale(.07);
        this.info2.setDepth(1);
        this.info2.visible = false;

        this.howto = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2 , this.cameras.main.worldView.y + this.cameras.main.height / 2 , 'howto', 0)
        this.howto.setDepth(2);
        this.howto.visible = false;

        this.play.setInteractive();

        this.play.on("pointerover", ()=>{

            this.play2.visible = true;
            this.play.visible = false;
        })

        this.play.on("pointerout", ()=>{

            this.play2.visible = false;
            this.play.visible = true;
        })
        this.play.on("pointerup", ()=>{
            this.playbtnSound.play();
            this.play2.visible = false;
            this.play.visible = true;
            this.titleMusic.stop();
            this.cameras.main.fadeOut(1000,0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playGame')
            })
        })

        this.play2.setInteractive();

        this.play2.on("pointerover", ()=>{

            this.play2.visible = true;
            this.play.visible = false;
        })

        this.play2.on("pointerout", ()=>{

            this.play2.visible = false;
            this.play.visible = true;
        })
        this.play2.on("pointerup", ()=>{
            this.playbtnSound.play();
            this.play2.visible = false;
            this.play.visible = true;
            this.titleMusic.stop();
            this.cameras.main.fadeOut(1000,0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playGame')
            })
            //this.scene.start("playGame");
        })

        this.info.setInteractive();

        this.info.on("pointerover", ()=>{

            this.info2.visible = true;
            this.info.visible = false;
        })

        this.play.on("pointerout", ()=>{

            this.info2.visible = false;
            this.info.visible = true;
        })
        this.info.on("pointerup", ()=>{
            this.closedSound.play();
            this.info2.visible = false;
            this.info.visible = true;
            this.howto.visible = true;
        })

        this.info2.setInteractive();

        this.info2.on("pointerover", ()=>{

            this.info2.visible = true;
            this.info.visible = false;
        })

        this.info2.on("pointerout", ()=>{

            this.info2.visible = false;
            this.info.visible = true;
        })
        this.info2.on("pointerup", ()=>{
            this.closedSound.play();
            this.info2.visible = false;
            this.info.visible = true;
            this.howto.visible = true;
        })

        this.howto.setInteractive();

        this.howto.on("pointerup", ()=>{
            this.howto.visible = false;
            this.instructionsbtnSound.play();
        })
    }
}
