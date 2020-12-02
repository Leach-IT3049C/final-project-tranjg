class loadAssets extends Phaser.Scene {
    constructor() {
        super("loadAssets");
    }

    preload(){
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
        this.load.spritesheet('title', 'assets/sprites/title/title.png', {frameWidth: 257, frameHeight: 63});
        this.load.image('play', 'assets/buttons/play-button-2.png');
        this.load.image('info', 'assets/buttons/information.png');
        this.load.image('play2', 'assets/buttons/play-button.png');
        this.load.image('info2', 'assets/buttons/information-2.png');
        this.load.image('howto', 'assets/howto/howto.png');

        this.load.audio('tagged','assets/sfx/tagged.wav');
        this.load.audio('woods_music','assets/music/06-School.mp3');

    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("startGame");
    }
}
