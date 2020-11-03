export default function OwletMonsterAnim(scene){
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
