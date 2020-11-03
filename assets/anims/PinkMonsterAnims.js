export default function PinkMonsterAnim(scene){
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
