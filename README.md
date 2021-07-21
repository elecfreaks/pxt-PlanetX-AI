![](https://img.shields.io/badge/Plantfrom-Micro%3Abit-red) ![](https://img.shields.io/travis/com/elecfreaks/pxt-PlanetX-AI) ![](https://img.shields.io/github/v/release/elecfreaks/pxt-PlanetX-AI) ![](https://img.shields.io/github/last-commit/elecfreaks/pxt-PlanetX-AI) ![](https://img.shields.io/github/languages/top/elecfreaks/pxt-PlanetX-AI) ![](https://img.shields.io/github/issues/elecfreaks/pxt-PlanetX-AI) ![](https://img.shields.io/github/license/elecfreaks/pxt-PlanetX-AI) 

# AiLens Package

![](/image.jpg/)

This extension is designed to programme and drive the AiLens.

The AI Lens is able to achieve the functions of face recognition, balls tracking, cards recognition and characteristics acquisition.

## Get Product

You can [get AiLens from the Elecfreaks store](https://www.elecfreaks.com/elecfreaks-smart-ai-lens-kit.html)

## Use Tutorial

You can get a detailed tutorial on how to use it here [ELECFREAKS WIKI](
https://elecfreaks.com/learn-en/microbitplanetX/ai/index.html)
### Block
* Initialize AI Lens and wait for AIlens to upload IIC data
```JavaScript
PlanetX_AILens.initModule()
```
* Switch ailens function, including, card, ball, color, line inspection, feature learning
```JavaScript
PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Card)
```
* Get the data of current frame from ailens
```JavaScript
PlanetX_AILens.cameraImage()
```
* Process the data of small ball in the screen (if the screen contains small ball and the function is selected as small ball)
```Javascript
PlanetX_AILens.checkBall()
PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Red)
PlanetX_AILens.BallTotalNum()
PlanetX_AILens.ballData(PlanetX_AILens.Ballstatus.X)
```
* Process the data of face in the picture (if the picture contains face and the function is face)
```JavaScript
PlanetX_AILens.checkFace()
PlanetX_AILens.faceTotalNum()
PlanetX_AILens.faceData(PlanetX_AILens.Facestatus.X)
```
* Process the card data in the screen (if the screen contains cards and the function is selected as card)
```javascript
PlanetX_AILens.numberCard(numberCards.1)
PlanetX_AILens.letterCard(letterCards.A)
PlanetX_AILens.trafficCard(trafficCards.forward)
PlanetX_AILens.otherCard(otherCards.cat)
PlanetX_AILens.cardTotalNum()
PlanetX_AILens.CardData(Cardstatus.X)
```
* Process the data of line segments in the screen (if the screen contains line segments and the function is tracking)

```javascript
PlanetX_AILens.lineData(Linestatus.angle)
PlanetX_AILens.lineDirection(Linestatus.angle)
```

* Learn the characteristics of the object in the current picture, and record and save
```javascript
PlanetX_AILens.learnObject(1)
```
* Remove all learned objects
```javascript
PlanetX_AILens.ClearlearnObject()
```
* Deal with the confidence of the learned object in the picture
```javascript
PlanetX_AILens.objectCheck(PlanetX_AILens.learnID.ID1)
PlanetX_AILens.objectConfidence(PlanetX_AILens.learnID.ID1)
```

## Supported targets
for PXT/microbit

## License
MIT

