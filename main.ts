let player: game.LedSprite = null
function makeEnemies () {
    for (let index = 0; index <= 4; index++) {
        let enemies: game.LedSprite[] = []
        enemies.push(game.createSprite(index, 0))
    }
}
function startGame () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.LoopingInBackground)
    for (let index = 0; index <= 2; index++) {
        basic.pause(500)
        basic.showNumber(3 - index)
    }
}
input.onButtonPressed(Button.A, function () {
    if (game.isRunning()) {
        movePlayer(-1)
    } else {
        startGame()
        player = game.createSprite(2, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (game.isRunning()) {
        movePlayer(1)
    }
})
function sendEnemy (sprite: game.LedSprite, speed: number) {
    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
    for (let index = 0; index < 4; index++) {
        sprite.change(LedSpriteProperty.Y, 1)
        basic.pause(speed)
    }
    if (sprite.isTouching(player)) {
        music.stopAllSounds()
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
        player.delete()
        game.gameOver()
        basic.showIcon(IconNames.Skull)
    }
    game.addScore(1)
    sprite.delete()
}
function movePlayer (step: number) {
    music.play(music.createSoundExpression(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    player.change(LedSpriteProperty.X, step)
}
loops.everyInterval(randint(100, 200), function () {
    if (game.isRunning()) {
        sendEnemy(game.createSprite(randint(0, 5), 0), randint(1, 5) * 100)
    }
})
