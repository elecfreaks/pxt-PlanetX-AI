PlanetX_AILens.initModule()
PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Color)
basic.forever(function () {
    PlanetX_AILens.cameraImage()
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.black)) {
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.white)) {
        music.playTone(294, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.blue)) {
        music.playTone(330, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.green)) {
        music.playTone(349, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.yellow)) {
        music.playTone(392, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) {
        music.playTone(440, music.beat(BeatFraction.Whole))
        basic.pause(500)
    }
})
