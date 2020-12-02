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
            //    debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [loadAssets,startGame, playGame],
    render: {
        pixelArt: true
    }
}

var game = new Phaser.Game(config);
