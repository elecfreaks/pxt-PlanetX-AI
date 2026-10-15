/**
 * This extension is designed to programme and drive the Smart AI Lens(二郎神)
 */
//% color=#0031AF icon="\uf06e" 
//% groups='["Basic", "Ball", "Face", "Card", "Color", "Tracking", "Learn", "Basic settings", "Ball recognition", "Card recognition", "Code recognition", "Color recognition", "Face recognition", "Expression recognition", "Gesture recognition", "Posture recognition", "Object recognition", "Object tracking", "Line recognition", "OCR", "Self learning", "Rhythm recognition", "IIC Port"]'
//% block="PlanetX_AI-Lens"
namespace PlanetX_AILens {
    const CameraAdd = 0X14;
    let DataBuff = pins.createBuffer(9);
    /**
    * Status List of Ball
    */
    export enum FuncList {
        //% block="Card recognition"
        Card = 2,
        //% block="Face recognition" 
        Face = 6,
        //% block="Ball recognition"
        Ball = 7,
        //% block="Tracking recognition"
        Tracking = 8,
        //% block="Color recognition"
        Color = 9,
        //% block="Learn Object"
        Things = 10
    }
    /**
    * Status List of Ball
    */
    export enum Ballstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Ball ID"
        ID = 8
    }
    /**
    * Status List of Face
    */
    export enum Facestatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Face ID"
        ID = 8
    }
    /**
    * Status List of Card
    */
    export enum Cardstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Card ID"
        ID = 8
    }
    /**
    * Status List of Color
    */
    export enum Colorstatus {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="Size"
        Size = 4,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Color ID"
        ID = 8
    }
    /**
    * Status List of Color
    */
    export enum ColorLs {
        //% block="Black"
        black = 4,
        //% block="Blue"
        blue = 2,
        //% block="Green"
        green = 1,
        //% block="Red"
        red = 5,
        //% block="White"
        white = 6,
        //% block="Yellow"
        yellow = 3
    }

    export enum Linestatus {
        //% block="Angle"
        angle = 1,
        //% block="Width"
        width = 2,
        //% block="Len"
        len = 3
    }
    export enum LineTrend {
        //% block="Left"
        left,
        //% block="Right"
        right,
        //% block="Front"
        front,
        //% block="None"
        none
    }
    /**
    * Number Cards List
    */
    export enum numberCards {
        //% block="0"
        zero = 1,
        //% block="1"
        one = 2,
        //% block="2"
        two = 3,
        //% block="3"
        three = 4,
        //% block="4"
        four = 5,
        //% block="5"
        five = 6,
        //% block="6"
        six = 7,
        //% block="7"
        seven = 8,
        //% block="8"
        eight = 9,
        //% block="9"
        nine = 10
    }
    /*
    * Letters Cards List
    */
    export enum letterCards {
        //% block="A"
        A = 1,
        //% block="B"
        B = 2,
        //% block="C"
        C = 3,
        //% block="D"
        D = 4,
        //% block="E"
        E = 5
    }
    /*
    * Traffic Cards List
    */
    export enum trafficCards {
        //% block="Forward"
        forward = 18,
        //% block="Back"
        back = 20,
        //% block="Stop"
        stop = 19,
        //% block="Turn left"
        turnleft = 16,
        //% block="Turn right"
        turnright = 17
    }
    /*
    * Other Cards List
    */
    export enum otherCards {
        //% block="Mouse"
        mouse = 1,
        //% block="micro:bit"
        microbit = 2,
        //% block="Ruler"
        ruler = 3,
        //% block="Cat"
        cat = 4,
        //% block="Pear"
        pear = 5,
        //% block="Ship"
        ship = 6,
        //% block="Apple"
        apple = 7,
        //% block="Car"
        car = 8,
        //% block="Pen"
        pen = 9,
        //% block="Dog"
        dog = 10,
        //% block="Umbrella"
        umbrella = 11,
        //% block="Airplane"
        airplane = 12,
        //% block="Clock"
        clock = 13,
        //% block="Grape"
        grape = 14,
        //% block="Cup"
        cup = 15
    }
    export enum learnID {
        ID1 = 1,
        ID2 = 2,
        ID3 = 3,
        ID4 = 4,
        ID5 = 5
    }
    export enum ballColorList {
        //% block="Red"
        Red = 2,
        //% block="Blue"
        Blue = 1
    }
    /**
    * TODO: Waiting for module initialize.
    */
    //% block="Initialize AI-Lens"
    //% group="Basic" weight=100 subcategory="AI Lens"
    //% color=#00B1ED
    export function initModule(): void {
        let timeout = input.runningTime()
        while (!(pins.i2cReadNumber(CameraAdd, NumberFormat.Int8LE))) {
            if (input.runningTime() - timeout > 30000) {
                while (true) {
                    basic.showString("Init AILens Error!")
                }
            }
        }
    }
    /**
    * TODO: Switch recognition objects.
    * @param fun Function list 
    */
    //% block="Switch function as %fun"
    //% fun.fieldEditor="gridpicker"
    //% fun.fieldOptions.columns=3
    //% group="Basic" weight=95 subcategory="AI Lens"
    //% color=#00B1ED
    export function switchfunc(fun: FuncList): void {
        let funcBuff = pins.i2cReadBuffer(CameraAdd, 9)
        funcBuff[0] = 0x20
        funcBuff[1] = fun
        pins.i2cWriteBuffer(CameraAdd, funcBuff)
    }

    /**
    * TODO: Get the image in a frame
    */
    //% block="Get one image from AI-Lens"
    //% group="Basic" weight=90 subcategory="AI Lens"
    //% color=#00B1ED
    export function cameraImage(): void {
        DataBuff = pins.i2cReadBuffer(CameraAdd, 9)
        basic.pause(30)
    }

    /**
    * TODO: Judge the image contains a ball
    */
    //% block="Image contains ball(s)"
    //% group="Ball" weight=85 subcategory="AI Lens"
    //% color=#00B1ED
    export function checkBall(): boolean {
        return DataBuff[0] == 7
    }
    //% block="Image contains %ballcolor ball"
    //% group="Ball" weight=84
    //% ballcolor.fieldEditor="gridpicker"
    //% ballcolor.fieldOptions.columns=2 subcategory="AI Lens"
    //% color=#00B1ED
    export function ballColor(ballcolor: ballColorList): boolean {
        if (DataBuff[0] == 7) {
            return ballcolor == DataBuff[1]
        }
        else {
            return false
        }
    }
    //% block="In the image get ball(s)' total"
    //% group="Ball" weight=83 subcategory="AI Lens"
    //% color=#00B1ED
    export function BallTotalNum(): number {
        if (DataBuff[0] == 7) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: In the image get ball(s)' info
    */
    //% block="In the image get ball(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Ball" weight=80 subcategory="AI Lens"
    //% color=#00B1ED
    export function ballData(status: Ballstatus): number {
        if (DataBuff[0] == 7) {
            switch (status) {
                case Ballstatus.X:
                    return DataBuff[2]
                    break
                case Ballstatus.Y:
                    return DataBuff[3]
                    break
                case Ballstatus.Size:
                    return DataBuff[4]
                    break
                case Ballstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Ballstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0;
            }
        }
        else {
            return 0
        }
    }


    /**
    * TODO: Judge whether there is a face in the picture
    */
    //% block="Image contains a face"
    //% group="Face" weight=75 subcategory="AI Lens"
    //% color=#00B1ED
    export function checkFace(): boolean {
        return DataBuff[0] == 6
    }
    //% block="In the image get face(s)' total"
    //% group="Face" weight=74 subcategory="AI Lens"
    //% color=#00B1ED
    export function faceTotalNum(): number {
        if (DataBuff[0] == 6) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Judge whether there is a face in the picture
    * @param status Facestatus
    */
    //% block="In the image get face(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Face" weight=70 subcategory="AI Lens"
    //% color=#00B1ED
    export function faceData(status: Facestatus): number {
        if (DataBuff[0] == 6) {
            switch (status) {
                case Facestatus.X:
                    return DataBuff[2]
                    break
                case Facestatus.Y:
                    return DataBuff[3]
                    break
                case Facestatus.W:
                    return DataBuff[4]
                    break
                case Facestatus.H:
                    return DataBuff[5]
                    break
                case Facestatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Facestatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Judge whether there is a digital card in the screen
    * @param status numberCards
    */
    //% block="Image contains number card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=65 subcategory="AI Lens"
    //% color=#00B1ED
    export function numberCard(status: numberCards): boolean {
        if (DataBuff[0] == 2) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a letter card in the screen
    * @param status letterCards
    */
    //% block="Image contains letter card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=60 subcategory="AI Lens"
    //% color=#00B1ED
    export function letterCard(status: letterCards): boolean {
        if (DataBuff[0] == 4) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a traffic card in the screen
    * @param status trafficCards
    */
    //% block="Image contains traffic card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=55 subcategory="AI Lens"
    //% color=#00B1ED
    export function trafficCard(status: trafficCards): boolean {
        if (DataBuff[0] == 3) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there is a other card in the screen
    * @param status otherCards
    */
    //% block="Image contains other card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" subcategory="AI Lens"
    //% color=#00B1ED
    export function otherCard(status: otherCards): boolean {
        if (DataBuff[0] == 3) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    //% block="In the image get Card(s)' total"
    //% group="Card" weight=49 subcategory="AI Lens"
    //% color=#00B1ED
    export function cardTotalNum(): number {
        if (DataBuff[0] == 2 || DataBuff[0] == 3 || DataBuff[0] == 4) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: Card parameters in the screen
    * @param status otherCards
    */
    //% block="In the image get Card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Card" weight=45 subcategory="AI Lens"
    //% color=#00B1ED
    export function CardData(status: Cardstatus): number {
        if (DataBuff[0] == 2 || DataBuff[0] == 3 || DataBuff[0] == 4) {
            switch (status) {
                case Cardstatus.X:
                    return DataBuff[2]
                    break
                case Cardstatus.Y:
                    return DataBuff[3]
                    break
                case Cardstatus.Size:
                    return DataBuff[4]
                    break
                case Cardstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Cardstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else
            return 0
    }
    /**
    * TODO: Judge whether there is a color in the screen
    * @param status ColorLs
    */
    //% block="Image contains color card(s): %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=30 subcategory="AI Lens"
    //% color=#00B1ED
    export function colorCheck(status: ColorLs): boolean {
        if (DataBuff[0] == 9) {
            return status == DataBuff[1]
        }
        else
            return false
    }
    //% block="In the image get color card(s)' total"
    //% group="Color" weight=29 subcategory="AI Lens"
    //% color=#00B1ED
    export function colorTotalNum(): number {
        if (DataBuff[0] == 9) {
            return DataBuff[7]
        }
        else {
            return 0
        }
    }
    /**
    * TODO: color parameters in the screen
    * @param status Colorstatus
    */
    //% block="In the image get color card(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Color" weight=25 subcategory="AI Lens"
    //% color=#00B1ED
    export function colorData(status: Colorstatus): number {
        if (DataBuff[0] == 9) {
            switch (status) {
                case Colorstatus.X:
                    return DataBuff[2]
                    break
                case Colorstatus.Y:
                    return DataBuff[3]
                    break
                case Colorstatus.Size:
                    return DataBuff[4]
                    break
                case Colorstatus.Confidence:
                    return 100 - DataBuff[6]
                    break
                case Colorstatus.ID:
                    return DataBuff[8]
                    break
                default:
                    return 0
            }
        }
        else {
            return 0
        }
    }
    /**
    * TODO: line parameters in the screen
    * @param status Linestatus
    */
    //% block="In the image get line(s)' info: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Tracking"
    //% weight=35 subcategory="AI Lens"
    //% color=#00B1ED
    export function lineData(status: Linestatus): number {
        if (DataBuff[0] == 8) {
            switch (status) {
                case Linestatus.angle:
                    return DataBuff[1]
                    break
                case Linestatus.width:
                    return DataBuff[2]
                    break
                case Linestatus.len:
                    return DataBuff[3]
                    break
                default:
                    return 0
            }
        }
        else
            return 0
    }
    /**
    * TODO: line parameters in the screen
    * @param status Linestatus
    */
    //% block="Image contains line's direction towards %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=2
    //% group="Tracking"
    //% weight=34 subcategory="AI Lens"
    //% color=#00B1ED
    export function lineDirection(status: LineTrend): boolean {
        if (DataBuff[0] == 8) {
            switch (status) {
                case LineTrend.none:
                    return false
                    break
                case LineTrend.left:
                    if (DataBuff[2] < 90) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
                case LineTrend.right:
                    if (DataBuff[2] > 130) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
                case LineTrend.front:
                    if (DataBuff[2] > 90 && DataBuff[2] < 130) {
                        return true
                    }
                    else {
                        return false
                    }
                    break
            }
        }
        else {
            if (status == LineTrend.none)
                return true
        }
        return false
    }

    /**
    * TODO: Learn an object in a picture
    * @param thingsID Edit a label for the object
    */
    //% block="Learn an object with: %thingsID"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Learn" weight=20 subcategory="AI Lens"
    //% color=#00B1ED
    export function learnObject(thingsID: learnID): void {
        let thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = thingsID
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    /**
    * TODO: Clear Learned Objects
    */
    //% block="Clear learned objects"
    //% group="Learn" weight=15 subcategory="AI Lens"
    //% color=#00B1ED
    export function ClearlearnObject(): void {
        let thingsBuf = pins.createBuffer(9)
        thingsBuf[0] = 10
        thingsBuf[1] = 10
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
    }
    /**
    * TODO: Judge whether there are any learned objects in the picture
    */
    //% block="Image contains learned objects: %status"
    //% status.fieldEditor="gridpicker"
    //% status.fieldOptions.columns=3
    //% group="Learn" weight=14 subcategory="AI Lens"
    //% color=#00B1ED
    export function objectCheck(status: learnID): boolean {
        if (DataBuff[0] == 10 && status == DataBuff[1]) {
            if (objectConfidence(status) >= 83) {
                return true
            }
            else {
                return false
            }
        }
        else
            return false
    }
    /**
    * TODO: Judge whether there are any learned objects in the picture
    */
    //% block="In the image get learn object %thingsID Confidence"
    //% group="Learn" weight=10 subcategory="AI Lens"
    //% color=#00B1ED
    export function objectConfidence(thingsID: learnID): number {
        if (DataBuff[0] == 10 && DataBuff[2] < 30) {
            if (DataBuff[1] == thingsID) {
                return 100 - DataBuff[2]
            }
            else {
                return 0
            }
        }
        return 0
    }
}

/************************************************************************
 * AI Lens Pro
 ************************************************************************/
namespace PlanetX_AILens {
    const UDEV_DEVICE_ADDR_DEFAULT = 0x60;

    const UART_CMD_SOUND_TOUCH_CTRL = 0x38;
    const UART_CMD_OCR_REGION = 0x45;
    const UART_CMD_FLASH_LIGHT = 0x46;
    const UART_CMD_OBJECT_TRACKING_CTRL = 0x47;
    const UART_CMD_SELF_LEARN_CTRL = 0x48;

    const REG_APP_ID = 0;
    const REG_RESULT_BASE = 100;
    const BALL_RESULT_HEAD_LEN = 2;
    const BALL_TARGET_STRIDE = 10;
    const BALL_MAX_TARGETS = 16;
    const HAND_RESULT_HEAD_LEN = 13;
    const LINE_RESULT_LEN = 20;
    const OCR_RESULT_HEAD_LEN = 3;
    const CODE_RESULT_HEAD_LEN = 14;
    const OBJECT_RESULT_HEAD_LEN = 2;
    const OBJECT_RECORD_HEAD_LEN = 11;
    const OBJECT_TARGET_STRIDE = 10;
    const OBJECT_MAX_TARGETS = 8;
    const OBJECT_MAX_LABEL_BYTES = 16;
    const TRACKING_RESULT_HEAD_LEN = 2;
    const TRACKING_TARGET_STRIDE = 11;
    const TRACKING_MAX_TARGETS = 1;
    const EXPRESSION_RESULT_HEAD_LEN = 2;
    const EXPRESSION_TARGET_STRIDE = 11;
    const EXPRESSION_RECORD_HEAD_LEN = 12;
    const EXPRESSION_MAX_FACES = 10;
    const EXPRESSION_MAX_LABEL_BYTES = 12;
    const POSTURE_RESULT_HEAD_LEN = 4;
    const POSTURE_TARGET_STRIDE = 79;
    const POSTURE_RECORD_HEAD_LEN = POSTURE_TARGET_STRIDE + 1;
    const POSTURE_MAX_LABEL_BYTES = 24;
    const POSTURE_MAX_PEOPLE = 1;
    const COLOR_MODE_LEARN = 0;
    const COLOR_MODE_RECOGNIZE = 1;
    const COLOR_RECOGNIZE_HEAD_LEN = 7;
    const COLOR_LEARN_RESULT_HEAD_LEN = 3;
    const COLOR_LEARN_TARGET_STRIDE = 14;
    const COLOR_LEARN_RECORD_HEAD_LEN = 15;
    const COLOR_MAX_TARGETS = 10;
    const COLOR_MAX_LABEL_BYTES = 12;
    const CARD_RESULT_HEAD_LEN = 2;
    const CARD_TARGET_STRIDE = 8;
    const CARD_MAX_TARGETS = 16;

    const WIFI_STATUS_ADDR = 0x0010;
    const WIFI_MAILBOX_IDLE = 0x00;
    const WIFI_MAILBOX_STATUS_READY = 0x11;
    const WIFI_MAILBOX_CONNECT_RECEIVED = 0x12;
    const WIFI_MAILBOX_ERROR = 0x13;
    const WIFI_MAILBOX_HEADER_LEN = 8;
    const WIFI_FLAG_IP_READY = 0x02;
    const WIFI_FLAG_PUBLIC_READY = 0x04;

    let deviceAddr = UDEV_DEVICE_ADDR_DEFAULT;

    let ioChunk = 10;
    let i2cTransactionBusy = false;
    let iicInitDone = false;
    let cameraOnline = false;
    let cameraReadFailCount = 0;
    let cameraLastRecoveryProbeMs = 0;

    let faceStatusCache = 0;
    let faceStateCache = 0;
    let faceIdCache = 0;
    let faceSimilarityCache = 0;
    let faceBlinkCache = 0;
    let faceMouthOpenCache = 0;
    let faceCoordValidCache = 0;
    let faceLeftTopXCache = 0;
    let faceLeftTopYCache = 0;
    let faceRightBottomXCache = 0;
    let faceRightBottomYCache = 0;
    let faceLabelCache = "";

    let selfLearnStatusCache = 0;
    let selfLearnIdCache = 0;
    let selfLearnSimilarityCache = 0;
    let selfLearnLabelCache = "";

    let handStatusCache = 0;
    let handIdCache = 0;
    let handSimilarityCache = 0;
    let handCenterXCache = 0;
    let handCenterYCache = 0;
    let handWidthCache = 0;
    let handHeightCache = 0;
    let handLabelCache = "";
    let handLabelBytesCache = pins.createBuffer(0);

    let soundTouchStatusCache = 0;
    let soundTouchBpmCache = 0;
    let soundTouchBeatCountCache = 0;
    let soundTouchDurationSecCache = 0;
    let soundTouchRecordingTaskActive = false;

    let ballCountCache = 0;
    let ballRecordCountCache = 0;
    let ballTargetsCache = pins.createBuffer(0);
    let ballRedDetectedCache = false;
    let ballBlueDetectedCache = false;
    let objectCountCache = 0;
    let objectRecordCountCache = 0;
    let objectTargetsCache = pins.createBuffer(0);
    let objectLabelsCache: string[] = [];
    let trackingCountCache = 0;
    let trackingRecordCountCache = 0;
    let trackingTargetsCache = pins.createBuffer(0);
    let expressionCountCache = 0;
    let expressionRecordCountCache = 0;
    let expressionTargetsCache = pins.createBuffer(0);
    let expressionLabelsCache: string[] = [];
    let postureStatusCache = 0;
    let postureCountCache = 0;
    let postureRecordCountCache = 0;
    let postureTargetsCache = pins.createBuffer(0);
    let postureLabelsCache: string[] = [];
    let colorModeCache = COLOR_MODE_LEARN;
    let colorCountCache = 0;
    let colorRecordCountCache = 0;
    let colorTargetsCache = pins.createBuffer(0);
    let colorLabelsCache: string[] = [];
    let colorCenterIdCache = 0;
    let colorCenterConfidenceCache = 0;
    let colorCenterRCache = 0;
    let colorCenterGCache = 0;
    let colorCenterBCache = 0;
    let colorCenterNameCache = "";
    let cardCountCache = 0;
    let cardRecordCountCache = 0;
    let cardTargetsCache = pins.createBuffer(0);
    let lineDetectedCache = 0;
    let lineResultCache = pins.createBuffer(LINE_RESULT_LEN);
    let ocrStatusCache = 0;
    let ocrConfidenceCache = 0;
    let ocrTextLengthCache = 0;
    let ocrTextCache = "";
    let ocrTextBytesCache = pins.createBuffer(0);
    let codeDetectedCache = 0;
    let codeTypeCache = 0;
    let codeContentCache = "";
    let codeContentBytesCache = pins.createBuffer(0);

    let wifiStateCache = 0;
    let wifiFlagsCache = 0;
    let wifiMailboxSeq = 0;
    let wifiMailboxTypeCache = WIFI_MAILBOX_IDLE;

    export enum AppMode {
        //% block="main menu"
        Launcher = 0x01,
        //% block="face recognition"
        FaceRecognize = 0x10,
        //% block="self learning"
        SelfLearn = 0x11,
        //% block="gesture recognition"
        HandRecognize = 0x12,
        //% block="remote file manager"
        RemoteFileManager = 0x13,
        //% block="photos"
        Photos = 0x14,
        //% block="camera"
        Camera = 0x15,
        //% block="settings"
        Settings = 0x16,
        //% block="rhythm recognition"
        SoundTouch = 0x1B,
        //% block="ball recognition"
        BallRecognition = 0x1E,
        //% block="object recognition"
        ObjectRecognition = 0x1F,
        //% block="OCR"
        McOcr = 0x20,
        //% block="line recognition"
        LineRecognition = 0x21,
        //% block="object tracking"
        ObjectTracking = 0x22,
        //% block="expression recognition"
        ExpressionRecognition = 0x23,
        //% block="posture recognition"
        PostureRecognition = 0x24,
        //% block="color recognition"
        ColorRecognition = 0x25,
        //% block="card recognition"
        CardRecognition = 0x26,
        //% block="code recognition"
        CodeRecognition = 0x27,
    }

    export enum FlashLightState {
        //% block="off"
        Off = 0,
        //% block="on"
        On = 1,
    }

    export enum TargetSelection {
        //% block="center"
        Center = 0,
        //% block="largest"
        Largest = 1,
    }

    enum WifiState {
        Unknown = 0,
        Connecting = 1,
        WaitingLocal = 2,
        WaitingPublic = 3,
        PublicReady = 4,
        Failed = 5,
    }

    export enum FaceValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="width"
        Width = 2,
        //% block="height"
        Height = 3,
        //% block="confidence"
        Confidence = 4,
        //% block="blink count"
        BlinkCount = 5,
        //% block="mouth open count"
        MouthOpenCount = 6,
    }

    export enum SelfLearnValue {
        //% block="id"
        Id = 0,
        //% block="confidence"
        Confidence = 1,
    }

    export enum HandValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="width"
        Width = 2,
        //% block="height"
        Height = 3,
        //% block="confidence"
        Confidence = 4,
        //% block="id"
        Id = 5,
    }

    export enum SoundTouchValue {
        //% block="bpm"
        Bpm = 0,
        //% block="beat count"
        BeatCount = 1,
        //% block="duration seconds"
        DurationSec = 2,
    }

    export enum BallValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="size"
        Size = 2,
        //% block="confidence"
        Confidence = 3,
    }

    export enum BallColor {
        //% block="any"
        Any = 0,
        //% block="red"
        Red = 1,
        //% block="blue"
        Blue = 2,
    }

    export enum BasicColor {
        //% block="red"
        Red = 1,
        //% block="green"
        Green = 2,
        //% block="blue"
        Blue = 3,
        //% block="white"
        White = 4,
        //% block="black"
        Black = 5,
        //% block="yellow"
        Yellow = 6,
    }

    export enum ObjectClass {
        //% block="any recognizable object"
        Any = 255,
        //% block="person"
        Person = 0,
        //% block="bicycle"
        Bicycle = 1,
        //% block="car"
        Car = 2,
        //% block="motorcycle"
        Motorcycle = 3,
        //% block="airplane"
        Airplane = 4,
        //% block="bus"
        Bus = 5,
        //% block="train"
        Train = 6,
        //% block="truck"
        Truck = 7,
        //% block="boat"
        Boat = 8,
        //% block="traffic light"
        TrafficLight = 9,
        //% block="fire hydrant"
        FireHydrant = 10,
        //% block="stop sign"
        StopSign = 11,
        //% block="parking meter"
        ParkingMeter = 12,
        //% block="bench"
        Bench = 13,
        //% block="bird"
        Bird = 14,
        //% block="cat"
        Cat = 15,
        //% block="dog"
        Dog = 16,
        //% block="horse"
        Horse = 17,
        //% block="sheep"
        Sheep = 18,
        //% block="cow"
        Cow = 19,
        //% block="elephant"
        Elephant = 20,
        //% block="bear"
        Bear = 21,
        //% block="zebra"
        Zebra = 22,
        //% block="giraffe"
        Giraffe = 23,
        //% block="backpack"
        Backpack = 24,
        //% block="umbrella"
        Umbrella = 25,
        //% block="handbag"
        Handbag = 26,
        //% block="tie"
        Tie = 27,
        //% block="suitcase"
        Suitcase = 28,
        //% block="frisbee"
        Frisbee = 29,
        //% block="skis"
        Skis = 30,
        //% block="snowboard"
        Snowboard = 31,
        //% block="sports ball"
        SportsBall = 32,
        //% block="kite"
        Kite = 33,
        //% block="baseball bat"
        BaseballBat = 34,
        //% block="baseball glove"
        BaseballGlove = 35,
        //% block="skateboard"
        Skateboard = 36,
        //% block="surfboard"
        Surfboard = 37,
        //% block="tennis racket"
        TennisRacket = 38,
        //% block="bottle"
        Bottle = 39,
        //% block="wine glass"
        WineGlass = 40,
        //% block="cup"
        Cup = 41,
        //% block="fork"
        Fork = 42,
        //% block="knife"
        Knife = 43,
        //% block="spoon"
        Spoon = 44,
        //% block="bowl"
        Bowl = 45,
        //% block="banana"
        Banana = 46,
        //% block="apple"
        Apple = 47,
        //% block="sandwich"
        Sandwich = 48,
        //% block="orange"
        Orange = 49,
        //% block="broccoli"
        Broccoli = 50,
        //% block="carrot"
        Carrot = 51,
        //% block="hot dog"
        HotDog = 52,
        //% block="pizza"
        Pizza = 53,
        //% block="donut"
        Donut = 54,
        //% block="cake"
        Cake = 55,
        //% block="chair"
        Chair = 56,
        //% block="couch"
        Couch = 57,
        //% block="potted plant"
        PottedPlant = 58,
        //% block="bed"
        Bed = 59,
        //% block="dining table"
        DiningTable = 60,
        //% block="toilet"
        Toilet = 61,
        //% block="television"
        Tv = 62,
        //% block="laptop"
        Laptop = 63,
        //% block="mouse"
        Mouse = 64,
        //% block="remote control"
        Remote = 65,
        //% block="keyboard"
        Keyboard = 66,
        //% block="cell phone"
        CellPhone = 67,
        //% block="microwave"
        Microwave = 68,
        //% block="oven"
        Oven = 69,
        //% block="toaster"
        Toaster = 70,
        //% block="sink"
        Sink = 71,
        //% block="refrigerator"
        Refrigerator = 72,
        //% block="book"
        Book = 73,
        //% block="clock"
        Clock = 74,
        //% block="vase"
        Vase = 75,
        //% block="scissors"
        Scissors = 76,
        //% block="teddy bear"
        TeddyBear = 77,
        //% block="hair drier"
        HairDrier = 78,
        //% block="toothbrush"
        Toothbrush = 79,
    }

    export enum ObjectValue {
        //% block="x coordinate"
        X = 1,
        //% block="y coordinate"
        Y = 2,
        //% block="width"
        Width = 3,
        //% block="height"
        Height = 4,
        //% block="confidence"
        Confidence = 5,
        //% block="id"
        Id = 0,
    }

    export enum ObjectTrackingValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="width"
        Width = 2,
        //% block="height"
        Height = 3,
        //% block="confidence"
        Confidence = 4,
    }

    export enum ExpressionValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="expression id"
        ExpressionId = 2,
        //% block="confidence"
        Confidence = 3,
        //% block="width"
        Width = 4,
        //% block="height"
        Height = 5,
    }

    export enum ExpressionType {
        //% block="any"
        Any = 255,
        //% block="happy"
        Happy = 0,
        //% block="sad"
        Sad = 1,
        //% block="angry"
        Angry = 2,
        //% block="surprise"
        Surprise = 3,
        //% block="fear"
        Fear = 4,
        //% block="disgust"
        Disgust = 5,
        //% block="neutral"
        Neutral = 6,
    }

    export enum PostureValue {
        //% block="id"
        Id = 0,
        //% block="confidence"
        Confidence = 1,
        //% block="center x"
        X = 2,
        //% block="center y"
        Y = 3,
        //% block="width"
        Width = 4,
        //% block="height"
        Height = 5,
        //% block="nose x"
        NoseX = 6,
        //% block="nose y"
        NoseY = 7,
        //% block="left eye x"
        LeftEyeX = 8,
        //% block="left eye y"
        LeftEyeY = 9,
        //% block="right eye x"
        RightEyeX = 10,
        //% block="right eye y"
        RightEyeY = 11,
        //% block="left ear x"
        LeftEarX = 12,
        //% block="left ear y"
        LeftEarY = 13,
        //% block="right ear x"
        RightEarX = 14,
        //% block="right ear y"
        RightEarY = 15,
        //% block="left shoulder x"
        LeftShoulderX = 16,
        //% block="left shoulder y"
        LeftShoulderY = 17,
        //% block="right shoulder x"
        RightShoulderX = 18,
        //% block="right shoulder y"
        RightShoulderY = 19,
        //% block="left elbow x"
        LeftElbowX = 20,
        //% block="left elbow y"
        LeftElbowY = 21,
        //% block="right elbow x"
        RightElbowX = 22,
        //% block="right elbow y"
        RightElbowY = 23,
        //% block="left wrist x"
        LeftWristX = 24,
        //% block="left wrist y"
        LeftWristY = 25,
        //% block="right wrist x"
        RightWristX = 26,
        //% block="right wrist y"
        RightWristY = 27,
        //% block="left buttock x"
        LeftButtockX = 28,
        //% block="left buttock y"
        LeftButtockY = 29,
        //% block="right buttock x"
        RightButtockX = 30,
        //% block="right buttock y"
        RightButtockY = 31,
        //% block="left knee x"
        LeftKneeX = 32,
        //% block="left knee y"
        LeftKneeY = 33,
        //% block="right knee x"
        RightKneeX = 34,
        //% block="right knee y"
        RightKneeY = 35,
        //% block="left ankle x"
        LeftAnkleX = 36,
        //% block="left ankle y"
        LeftAnkleY = 37,
        //% block="right ankle x"
        RightAnkleX = 38,
        //% block="right ankle y"
        RightAnkleY = 39,
    }

    export enum PostureType {
        //% block="standing"
        Standing = 1,
        //% block="hand up"
        HandUp = 2,
        //% block="both hands up"
        BothHandsUp = 3,
        //% block="squatting"
        Squatting = 4,
        //% block="bending"
        Bending = 5,
        //% block="sitting"
        Sitting = 6,
        //% block="falling"
        Falling = 7,
        //% block="kneeling"
        Kneeling = 8,
        //% block="running"
        Running = 9,
    }

    export enum ColorRecognitionMode {
        //% block="learn mode"
        Learn = 0,
        //% block="recognize mode"
        Recognize = 1,
    }

    export enum ColorValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="id"
        Id = 2,
        //% block="confidence"
        Confidence = 3,
        //% block="width"
        Width = 4,
        //% block="height"
        Height = 5,
        //% block="r"
        R = 6,
        //% block="g"
        G = 7,
        //% block="b"
        B = 8,
    }

    export enum ColorCenterValue {
        //% block="r"
        R = 0,
        //% block="g"
        G = 1,
        //% block="b"
        B = 2,
    }

    export enum NumberCard {
        //% block="0"
        Zero = 0,
        //% block="1"
        One = 1,
        //% block="2"
        Two = 2,
        //% block="3"
        Three = 3,
        //% block="4"
        Four = 4,
        //% block="5"
        Five = 5,
        //% block="6"
        Six = 6,
        //% block="7"
        Seven = 7,
        //% block="8"
        Eight = 8,
        //% block="9"
        Nine = 9,
    }

    export enum LetterCard {
        //% block="A"
        A = 10,
        //% block="B"
        B = 11,
        //% block="C"
        C = 12,
        //% block="D"
        D = 13,
        //% block="E"
        E = 14,
    }

    export enum TrafficCard {
        //% block="forward"
        Front = 15,
        //% block="turn around"
        Back = 16,
        //% block="left"
        Left = 17,
        //% block="right"
        Right = 18,
        //% block="stop"
        Stop = 19,
    }

    export enum GeneralCard {
        //% block="cat"
        Cat = 20,
        //% block="dog"
        Dog = 21,
        //% block="mouse"
        Mouse = 22,
        //% block="apple"
        Apple = 23,
        //% block="pear"
        Pear = 24,
        //% block="grapes"
        Grapes = 25,
        //% block="airplane"
        Airplane = 26,
        //% block="car"
        Car = 27,
        //% block="ship"
        Ship = 28,
        //% block="pen"
        Pen = 29,
        //% block="ruler"
        Ruler = 30,
        //% block="microbit"
        Microbit = 31,
        //% block="clock"
        Clock = 32,
        //% block="cup"
        Cup = 33,
        //% block="umbrella"
        Umbrella = 34,
    }

    export enum CardSelection {
        //% block="largest"
        Largest = 255,
        //% block="0"
        Zero = 0,
        //% block="1"
        One = 1,
        //% block="2"
        Two = 2,
        //% block="3"
        Three = 3,
        //% block="4"
        Four = 4,
        //% block="5"
        Five = 5,
        //% block="6"
        Six = 6,
        //% block="7"
        Seven = 7,
        //% block="8"
        Eight = 8,
        //% block="9"
        Nine = 9,
        //% block="A"
        A = 10,
        //% block="B"
        B = 11,
        //% block="C"
        C = 12,
        //% block="D"
        D = 13,
        //% block="E"
        E = 14,
        //% block="forward"
        Front = 15,
        //% block="turn around"
        Back = 16,
        //% block="left"
        Left = 17,
        //% block="right"
        Right = 18,
        //% block="stop"
        Stop = 19,
        //% block="cat"
        Cat = 20,
        //% block="dog"
        Dog = 21,
        //% block="mouse"
        Mouse = 22,
        //% block="apple"
        Apple = 23,
        //% block="pear"
        Pear = 24,
        //% block="grapes"
        Grapes = 25,
        //% block="airplane"
        Airplane = 26,
        //% block="car"
        Car = 27,
        //% block="ship"
        Ship = 28,
        //% block="pen"
        Pen = 29,
        //% block="ruler"
        Ruler = 30,
        //% block="microbit"
        Microbit = 31,
        //% block="clock"
        Clock = 32,
        //% block="cup"
        Cup = 33,
        //% block="umbrella"
        Umbrella = 34,
    }

    export enum CardValue {
        //% block="x coordinate"
        X = 0,
        //% block="y coordinate"
        Y = 1,
        //% block="size"
        Size = 2,
        //% block="confidence"
        Confidence = 3,
        //% block="card id"
        CardId = 4,
    }

    export enum LineDirection {
        //% block="left"
        Left = 0,
        //% block="right"
        Right = 1,
        //% block="center"
        Center = 2,
    }

    export enum LineValue {
        //% block="angle"
        Angle = 0,
        //% block="distance"
        Distance = 1,
    }

    export enum OcrValue {
        //% block="length"
        Length = 0,
        //% block="confidence"
        Confidence = 1,
    }

    export enum CodeType {
        //% block="any code"
        Any = 0,
        //% block="QR code"
        QrCode = 1,
        //% block="barcode"
        Barcode = 2,
    }

    let currentMode: AppMode = AppMode.Launcher;

    function minNumber(a: number, b: number): number {
        return a < b ? a : b;
    }

    function maxNumber(a: number, b: number): number {
        return a > b ? a : b;
    }

    function clampByte(v: number): number {
        let x = v | 0;
        if (x < 0) {
            x = 0;
        }
        if (x > 255) {
            x = 255;
        }
        return x;
    }

    function normalizeAddr7(v: number): number {
        let a = v | 0;
        if (a < 1) {
            a = 1;
        }
        if (a > 127) {
            a = 127;
        }
        return a;
    }

    function normalizeChunk(v: number): number {
        let n = v | 0;
        if (n < 1) {
            n = 1;
        }
        if (n > 32) {
            n = 32;
        }
        return n;
    }

    function utf8Encode(text: string): Buffer {
        return control.createBufferFromUTF8(text);
    }

    function utf8DecodePart(buf: Buffer, offset: number, len: number): string {
        if (!buf || len <= 0 || offset < 0 || offset + len > buf.length) {
            return "";
        }
        const out = pins.createBuffer(len);
        for (let i = 0; i < len; i++) {
            out[i] = buf[offset + i];
        }
        return out.toString();
    }

    function utf8BytesMatchText(bytes: Buffer, text: string): boolean {
        let byteOffset = 0;
        let textOffset = 0;
        while (byteOffset < bytes.length) {
            const first = bytes[byteOffset] & 0xFF;
            let code = 0;
            let byteCount = 0;
            if (first < 0x80) {
                code = first;
                byteCount = 1;
            } else if ((first & 0xE0) == 0xC0 && byteOffset + 1 < bytes.length) {
                const second = bytes[byteOffset + 1] & 0xFF;
                if ((second & 0xC0) != 0x80) {
                    return false;
                }
                code = ((first & 0x1F) << 6) | (second & 0x3F);
                byteCount = 2;
            } else if ((first & 0xF0) == 0xE0 && byteOffset + 2 < bytes.length) {
                const second = bytes[byteOffset + 1] & 0xFF;
                const third = bytes[byteOffset + 2] & 0xFF;
                if ((second & 0xC0) != 0x80 || (third & 0xC0) != 0x80) {
                    return false;
                }
                code = ((first & 0x0F) << 12)
                    | ((second & 0x3F) << 6)
                    | (third & 0x3F);
                byteCount = 3;
            } else {
                return false;
            }

            if (textOffset >= text.length
                || (text.charCodeAt(textOffset) & 0xFF) != (code & 0xFF)) {
                return false;
            }
            byteOffset += byteCount;
            textOffset++;
        }
        return textOffset == text.length;
    }

    function u16le(buf: Buffer, offset: number): number {
        if (!buf || offset < 0 || offset + 1 >= buf.length) {
            return 0;
        }
        return ((buf[offset + 1] & 0xFF) << 8) | (buf[offset] & 0xFF);
    }

    function clampU16(v: number): number {
        let x = v | 0;
        if (x < 0) {
            x = 0;
        }
        if (x > 65535) {
            x = 65535;
        }
        return x;
    }

    function i16le(buf: Buffer, offset: number): number {
        let value = u16le(buf, offset);
        if (value >= 0x8000) {
            value -= 0x10000;
        }
        return value;
    }

    function crc8(data: Buffer, length: number): number {
        let crc = 0;
        const n = minNumber(length, data.length);
        for (let i = 0; i < n; i++) {
            crc = (crc ^ (data[i] & 0xFF)) & 0xFF;
            for (let b = 0; b < 8; b++) {
                if ((crc & 0x80) != 0) {
                    crc = (((crc << 1) & 0xFF) ^ 0x07) & 0xFF;
                } else {
                    crc = (crc << 1) & 0xFF;
                }
            }
        }
        return crc & 0xFF;
    }

    function buildUDevicePacket(command: number, params: Buffer): Buffer {
        const pLen = params ? params.length : 0;
        const packet = pins.createBuffer(pLen + 4);
        packet[0] = 0xAA;
        packet[1] = clampByte(command);
        packet[2] = clampByte(pLen);
        for (let i = 0; i < pLen; i++) {
            packet[3 + i] = params[i];
        }
        packet[3 + pLen] = crc8(packet, pLen + 3);
        return packet;
    }

    function acquireI2cTransaction(waitMs: number = 100): boolean {
        const start = input.runningTime();
        const timeout = maxNumber(1, waitMs | 0);
        while (i2cTransactionBusy) {
            if (input.runningTime() - start >= timeout) {
                return false;
            }
            basic.pause(1);
        }
        i2cTransactionBusy = true;
        return true;
    }

    function releaseI2cTransaction(): void {
        i2cTransactionBusy = false;
    }

    function hardDelayMs(ms: number): void {
        const delay = maxNumber(0, ms | 0);
        const start = input.runningTime();
        while (input.runningTime() - start < delay) {
        }
    }

    function deviceWrite(command: number, params: Buffer, retryCount: number = 1): boolean {
        const packet = buildUDevicePacket(command, params);
        const retry = maxNumber(1, retryCount | 0);
        for (let i = 0; i < retry; i++) {
            if (!acquireI2cTransaction()) {
                basic.pause(1);
                continue;
            }
            pins.i2cWriteBuffer(deviceAddr, packet, false);
            hardDelayMs(2);
            releaseI2cTransaction();
            return true;
        }
        return false;
    }

    function deviceRead(command: number, params: Buffer, readLen: number): Buffer {
        if (readLen <= 0) {
            return pins.createBuffer(0);
        }

        const packet = buildUDevicePacket(command, params);
        if (!acquireI2cTransaction()) {
            return pins.createBuffer(0);
        }
        pins.i2cWriteBuffer(deviceAddr, packet, false);

        hardDelayMs(2); 

        const raw = pins.i2cReadBuffer(deviceAddr, (readLen | 0) + 1, false);
        releaseI2cTransaction();
        if (!raw || raw.length < readLen + 1) {
            return pins.createBuffer(0);
        }

        const calc = crc8(raw, readLen);
        const recv = raw[readLen] & 0xFF;
        if (calc != recv) {
            return pins.createBuffer(0);
        }

        const out = pins.createBuffer(readLen);
        for (let i = 0; i < readLen; i++) {
            out[i] = raw[i];
        }
        return out;
    }

    function buildUartFrame(command: number, payload: Buffer): Buffer {
        const bodyLen = payload ? payload.length : 0;
        const frame = pins.createBuffer(4 + bodyLen);
        frame[0] = 0xFF;
        frame[1] = 0xF9;
        frame[2] = clampByte(command);
        frame[3] = clampByte(bodyLen);
        for (let i = 0; i < bodyLen; i++) {
            frame[4 + i] = payload[i];
        }
        return frame;
    }

    function writeUartFrame(frame: Buffer): boolean {
        if (!frame || frame.length <= 0) {
            return false;
        }

        // u_device uses a one-byte param_len. Command 0x30 carries [0, frame_len, frame...].
        // Therefore 2 + frame_len must not exceed 255, so frame_len is limited to 253.
        if (frame.length > 253) {
            return false;
        }

        const params = pins.createBuffer(2 + frame.length);
        params[0] = 0;
        params[1] = frame.length & 0xFF;
        for (let i = 0; i < frame.length; i++) {
            params[2 + i] = frame[i];
        }

        return deviceWrite(0x30, params, 3);
    }

    function sendUartCommandArray(command: number, params: number[]): boolean {
        const payload = pins.createBuffer(params.length);
        for (let i = 0; i < params.length; i++) {
            payload[i] = clampByte(params[i]);
        }
        const frame = buildUartFrame(command, payload);
        return writeUartFrame(frame);
    }

    function sendUartCommandBuffer(command: number, payload: Buffer): boolean {
        const frame = buildUartFrame(command, payload);
        return writeUartFrame(frame);
    }

    function putU16le(buf: Buffer, offset: number, value: number): void {
        const v = clampU16(value);
        buf[offset] = v & 0xFF;
        buf[offset + 1] = (v >> 8) & 0xFF;
    }

    function sendOcrRegion(x1: number, y1: number, x2: number, y2: number): boolean {
        const payload = pins.createBuffer(9);
        payload[0] = 1;
        putU16le(payload, 1, minNumber(maxNumber(0, x1 | 0), 480));
        putU16le(payload, 3, minNumber(maxNumber(0, y1 | 0), 640));
        putU16le(payload, 5, minNumber(maxNumber(0, x2 | 0), 480));
        putU16le(payload, 7, minNumber(maxNumber(0, y2 | 0), 640));
        return sendUartCommandBuffer(UART_CMD_OCR_REGION, payload);
    }

    function clearOcrRegionInternal(): boolean {
        return sendUartCommandArray(UART_CMD_OCR_REGION, [0]);
    }

    function regReadOnce(addr: number, length: number): Buffer {
        const req = pins.createBuffer(4);
        req[0] = (addr >> 8) & 0xFF;
        req[1] = addr & 0xFF;
        req[2] = 0;
        req[3] = length & 0xFF;
        return deviceRead(0x21, req, length);
    }

    function regReadRetry(addr: number, length: number, retry: number = 3): Buffer {
        let last = pins.createBuffer(0);
        const times = maxNumber(1, retry | 0);
        for (let i = 0; i < times; i++) {
            const ret = regReadOnce(addr, length);
            last = ret;
            if (ret && ret.length >= length) {
                return ret;
            }
            basic.pause(2);
        }
        return last;
    }

    function regReadBytes(addr: number, totalLen: number, chunkSize: number = 10, retry: number = 3): Buffer {
        if (totalLen <= 0) {
            return pins.createBuffer(0);
        }

        const normalizedChunk = normalizeChunk(chunkSize);
        const out = pins.createBuffer(totalLen);
        let offset = 0;

        while (offset < totalLen) {
            const n = minNumber(normalizedChunk, totalLen - offset);
            const part = regReadRetry(addr + offset, n, retry);
            if (!part || part.length < n) {
                break;
            }

            for (let i = 0; i < n; i++) {
                out[offset + i] = part[i];
            }

            offset += n;
            if (offset < totalLen) {
                hardDelayMs(2);
            }
        }

        if (offset >= totalLen) {
            return out;
        }

        const partial = pins.createBuffer(offset);
        for (let i = 0; i < offset; i++) {
            partial[i] = out[i];
        }
        return partial;
    }

    function regWriteBytes(addr: number, data: Buffer, chunkSize: number = 10, gapMs: number = 1): boolean {
        if (!data || data.length <= 0) {
            return false;
        }

        const normalizedChunk = normalizeChunk(chunkSize);
        const normalizedGap = maxNumber(0, gapMs | 0);

        let offset = 0;
        const total = data.length;

        while (offset < total) {
            const n = minNumber(normalizedChunk, total - offset);
            const payload = pins.createBuffer(4 + n);
            payload[0] = ((addr + offset) >> 8) & 0xFF;
            payload[1] = (addr + offset) & 0xFF;
            payload[2] = 0;
            payload[3] = n & 0xFF;
            for (let i = 0; i < n; i++) {
                payload[4 + i] = data[offset + i];
            }

            if (!deviceWrite(0x20, payload, 1)) {
                return false;
            }

            offset += n;
            if (offset < total && normalizedGap > 0) {
                basic.pause(normalizedGap);
            }
        }

        return true;
    }

    function nextWifiMailboxSeq(): number {
        wifiMailboxSeq = (wifiMailboxSeq + 1) & 0xFF;
        if (wifiMailboxSeq == 0) {
            wifiMailboxSeq = 1;
        }
        return wifiMailboxSeq;
    }

    function isValidWifiState(state: number): boolean {
        const s = state & 0xFF;
        return s == (WifiState.Unknown as number) ||
            s == (WifiState.Connecting as number) ||
            s == (WifiState.WaitingLocal as number) ||
            s == (WifiState.WaitingPublic as number) ||
            s == (WifiState.PublicReady as number) ||
            s == (WifiState.Failed as number);
    }

    function isValidWifiMailbox(mailboxType: number, state: number, flags: number, textLen: number): boolean {
        const mt = mailboxType & 0xFF;
        const st = state & 0xFF;
        const fl = flags & 0xFF;

        if (mt != WIFI_MAILBOX_IDLE &&
            mt != WIFI_MAILBOX_STATUS_READY &&
            mt != WIFI_MAILBOX_CONNECT_RECEIVED &&
            mt != WIFI_MAILBOX_ERROR) {
            return false;
        }
        if (!isValidWifiState(st)) {
            return false;
        }
        if ((fl & (~0x0F & 0xFF)) != 0) {
            return false;
        }
        if (textLen < 0 || textLen > 72) {
            return false;
        }
        if (st == (WifiState.WaitingLocal as number) && (fl & WIFI_FLAG_PUBLIC_READY) != 0) {
            return false;
        }
        if (st == (WifiState.WaitingPublic as number) && (fl & WIFI_FLAG_IP_READY) == 0) {
            return false;
        }
        if (st == (WifiState.PublicReady as number)) {
            const required = 0x01 | WIFI_FLAG_IP_READY | WIFI_FLAG_PUBLIC_READY;
            if ((fl & required) != required) {
                return false;
            }
        }
        if (st == (WifiState.Failed as number) && (fl & WIFI_FLAG_PUBLIC_READY) != 0) {
            return false;
        }
        return true;
    }

    function applyWifiStatus(state: number, flags: number): void {
        wifiStateCache = state & 0xFF;
        wifiFlagsCache = flags & 0xFF;
    }

    function sendWifiMailboxAck(mailboxType: number, seq: number): boolean {
        return sendUartCommandArray(0x43, [
            mailboxType & 0xFF,
            seq & 0xFF
        ]);
    }

    function readWifiMailbox(expectedType: number, expectedSeq: number, timeoutMs: number): boolean {
        if (!isCameraReady()) {
            return false;
        }

        const deadline = input.runningTime() + maxNumber(50, timeoutMs | 0);
        while (input.runningTime() < deadline) {
            const head = regReadRetry(WIFI_STATUS_ADDR, WIFI_MAILBOX_HEADER_LEN, 2);
            if (!head || head.length < WIFI_MAILBOX_HEADER_LEN) {
                basic.pause(20);
                continue;
            }

            const magic = head[0] & 0xFF;
            const version = head[1] & 0xFF;
            const mailboxType = head[2] & 0xFF;
            const mailboxSeq = head[3] & 0xFF;
            const state = head[4] & 0xFF;
            const flags = head[5] & 0xFF;
            const textLen = ((head[6] & 0xFF) << 8) | (head[7] & 0xFF);

            if (magic != 0xA5 || version != 0x01) {
                basic.pause(20);
                continue;
            }
            if (mailboxType == WIFI_MAILBOX_IDLE) {
                basic.pause(20);
                continue;
            }
            if (expectedType >= 0 && mailboxType != (expectedType & 0xFF)) {
                basic.pause(20);
                continue;
            }
            if (expectedSeq >= 0 && mailboxSeq != (expectedSeq & 0xFF)) {
                basic.pause(20);
                continue;
            }
            if (!isValidWifiMailbox(mailboxType, state, flags, textLen)) {
                basic.pause(20);
                continue;
            }

            if (textLen > 0) {
                const textBytes = regReadBytes(WIFI_STATUS_ADDR + 8, textLen, ioChunk, 2);
                if (!textBytes || textBytes.length < textLen) {
                    basic.pause(20);
                    continue;
                }
            }

            wifiMailboxTypeCache = mailboxType;
            applyWifiStatus(state, flags);
            sendWifiMailboxAck(mailboxType, mailboxSeq);
            return true;
        }

        return false;
    }

    function refreshWifiStatusInternal(waitMs: number = 450): boolean {
        if (!isCameraReady()) {
            return false;
        }

        const seq = nextWifiMailboxSeq();
        if (!sendUartCommandArray(0x42, [seq])) {
            return false;
        }
        return readWifiMailbox(WIFI_MAILBOX_STATUS_READY, seq, waitMs);
    }

    function wifiPublicReadyCached(): boolean {
        return wifiStateCache == (WifiState.PublicReady as number) &&
            (wifiFlagsCache & WIFI_FLAG_PUBLIC_READY) != 0;
    }

    function sendWifiConnectRequest(seq: number, ssid: string, password: string): boolean {
        const ssidBytes = utf8Encode(ssid);
        const passwordBytes = utf8Encode(password);
        const ssidLen = ssidBytes.length;
        const passwordLen = passwordBytes.length;

        if (ssidLen <= 0 || ssidLen > 127 || passwordLen > 119 || ssidLen + passwordLen > 246) {
            return false;
        }

        const payload = pins.createBuffer(3 + ssidLen + passwordLen);
        payload[0] = seq & 0xFF;
        payload[1] = ssidLen & 0xFF;
        payload[2] = passwordLen & 0xFF;
        for (let i = 0; i < ssidLen; i++) {
            payload[3 + i] = ssidBytes[i];
        }
        for (let i = 0; i < passwordLen; i++) {
            payload[3 + ssidLen + i] = passwordBytes[i];
        }

        const frame = buildUartFrame(0x41, payload);
        return writeUartFrame(frame);
    }

    function waitWifiConnectReceipt(seq: number): boolean {
        const deadline = input.runningTime() + 3500;
        while (input.runningTime() < deadline) {
            if (!readWifiMailbox(-1, seq, 650)) {
                basic.pause(80);
                continue;
            }
            if (wifiMailboxTypeCache == WIFI_MAILBOX_CONNECT_RECEIVED) {
                return true;
            }
            if (wifiMailboxTypeCache == WIFI_MAILBOX_ERROR) {
                return false;
            }
        }
        return false;
    }

    function connectWifiInternal(ssid: string, password: string, timeoutMs: number): boolean {
        if (!isCameraReady()) {
            return false;
        }

        const ssidText = ("" + ssid).trim();
        const passwordText = "" + password;
        if (!ssidText) {
            applyWifiStatus(WifiState.Failed as number, 0);
            return false;
        }

        const seq = nextWifiMailboxSeq();
        let accepted = false;
        for (let i = 0; i < 5; i++) {
            if (sendWifiConnectRequest(seq, ssidText, passwordText) && waitWifiConnectReceipt(seq)) {
                accepted = true;
                break;
            }
            basic.pause(120);
        }
        if (!accepted) {
            return false;
        }

        const deadline = input.runningTime() + maxNumber(1000, timeoutMs | 0);
        while (input.runningTime() < deadline) {
            refreshWifiStatusInternal(600);
            if (wifiPublicReadyCached()) {
                return true;
            }
            if (wifiStateCache == (WifiState.Failed as number)) {
                return false;
            }
            basic.pause(400);
        }
        return false;
    }

    function modeName(mode: AppMode): string {
        if (mode == AppMode.Launcher) {
            return "main menu";
        }
        if (mode == AppMode.FaceRecognize) {
            return "face";
        }
        if (mode == AppMode.SelfLearn) {
            return "self";
        }
        if (mode == AppMode.HandRecognize) {
            return "hand";
        }
        if (mode == AppMode.RemoteFileManager) {
            return "file";
        }
        if (mode == AppMode.Photos) {
            return "photos";
        }
        if (mode == AppMode.Camera) {
            return "camera";
        }
        if (mode == AppMode.Settings) {
            return "settings";
        }
        if (mode == AppMode.SoundTouch) {
            return "sound touch";
        }
        if (mode == AppMode.BallRecognition) {
            return "ball";
        }
        if (mode == AppMode.ObjectRecognition) {
            return "object";
        }
        if (mode == AppMode.McOcr) {
            return "ocr";
        }
        if (mode == AppMode.LineRecognition) {
            return "line";
        }
        if (mode == AppMode.ObjectTracking) {
            return "tracking";
        }
        if (mode == AppMode.ExpressionRecognition) {
            return "expression";
        }
        if (mode == AppMode.PostureRecognition) {
            return "posture";
        }
        if (mode == AppMode.ColorRecognition) {
            return "color";
        }
        if (mode == AppMode.CardRecognition) {
            return "card";
        }
        if (mode == AppMode.CodeRecognition) {
            return "code";
        }
        return "unknown";
    }

    function updateCurrentModeById(appId: number): boolean {
        const id = appId & 0xFF;
        if (id == (AppMode.Launcher as number)) {
            currentMode = AppMode.Launcher;
            return true;
        }
        if (id == (AppMode.FaceRecognize as number)) {
            currentMode = AppMode.FaceRecognize;
            return true;
        }
        if (id == (AppMode.SelfLearn as number)) {
            currentMode = AppMode.SelfLearn;
            return true;
        }
        if (id == (AppMode.HandRecognize as number)) {
            currentMode = AppMode.HandRecognize;
            return true;
        }
        if (id == (AppMode.RemoteFileManager as number)) {
            currentMode = AppMode.RemoteFileManager;
            return true;
        }
        if (id == (AppMode.Photos as number)) {
            currentMode = AppMode.Photos;
            return true;
        }
        if (id == (AppMode.Camera as number)) {
            currentMode = AppMode.Camera;
            return true;
        }
        if (id == (AppMode.Settings as number)) {
            currentMode = AppMode.Settings;
            return true;
        }
        if (id == (AppMode.SoundTouch as number)) {
            currentMode = AppMode.SoundTouch;
            return true;
        }
        if (id == (AppMode.BallRecognition as number)) {
            currentMode = AppMode.BallRecognition;
            return true;
        }
        if (id == (AppMode.ObjectRecognition as number)) {
            currentMode = AppMode.ObjectRecognition;
            return true;
        }
        if (id == (AppMode.McOcr as number)) {
            currentMode = AppMode.McOcr;
            return true;
        }
        if (id == (AppMode.LineRecognition as number)) {
            currentMode = AppMode.LineRecognition;
            return true;
        }
        if (id == (AppMode.ObjectTracking as number)) {
            currentMode = AppMode.ObjectTracking;
            return true;
        }
        if (id == (AppMode.ExpressionRecognition as number)) {
            currentMode = AppMode.ExpressionRecognition;
            return true;
        }
        if (id == (AppMode.PostureRecognition as number)) {
            currentMode = AppMode.PostureRecognition;
            return true;
        }
        if (id == (AppMode.ColorRecognition as number)) {
            currentMode = AppMode.ColorRecognition;
            return true;
        }
        if (id == (AppMode.CardRecognition as number)) {
            currentMode = AppMode.CardRecognition;
            return true;
        }
        if (id == (AppMode.CodeRecognition as number)) {
            currentMode = AppMode.CodeRecognition;
            return true;
        }
        return false;
    }

    function markCameraOnline(): void {
        cameraOnline = true;
        cameraReadFailCount = 0;
    }

    function markCameraOffline(): void {
        cameraReadFailCount += 1;
        if (cameraReadFailCount >= 3) {
            cameraOnline = false;
        }
    }

    function isCameraReady(): boolean {
        if (!iicInitDone) {
            return false;
        }
        if (cameraOnline) {
            return true;
        }

        const now = input.runningTime();
        if (now - cameraLastRecoveryProbeMs < 200) {
            return false;
        }
        cameraLastRecoveryProbeMs = now;
        return probeCamera(3);
    }

    function probeCamera(retry: number = 2): boolean {
        const cur = regReadRetry(REG_APP_ID, 1, retry);
        if (cur && cur.length >= 1) {
            const id = cur[0] & 0xFF;
            if (updateCurrentModeById(id)) {
                markCameraOnline();
                return true;
            }
        }
        markCameraOffline();
        return false;
    }

    function detectModeIdFromDevice(): number {
        if (!isCameraReady()) {
            return currentMode as number;
        }

        const cur = regReadRetry(REG_APP_ID, 1, 2);
        if (cur && cur.length >= 1) {
            const id = cur[0] & 0xFF;
            if (updateCurrentModeById(id)) {
                markCameraOnline();
                return id;
            }
        }
        markCameraOffline();
        return currentMode as number;
    }

    function tryReadModeId(retry: number = 2): number {
        if (!isCameraReady()) {
            return -1;
        }

        const cur = regReadRetry(REG_APP_ID, 1, retry);
        if (cur && cur.length >= 1) {
            const id = cur[0] & 0xFF;
            if (updateCurrentModeById(id)) {
                markCameraOnline();
                return id;
            }
        }
        markCameraOffline();
        return -1;
    }

    function switchModeInternal(mode: AppMode, retryAfterFirst: number = 3, timeoutMs: number = 6000): boolean {
        if (!isCameraReady()) {
            return false;
        }

        const target = mode as number;
        const totalAttempts = 1 + maxNumber(0, retryAfterFirst | 0);

        // Return immediately when the device is already in the target mode.
        const currentId = tryReadModeId(2);
        if (currentId == (target & 0xFF)) {
            currentMode = mode;
            return true;
        }

        // Fall back to the cached mode when the device mode cannot be read.
        if (currentId < 0 && ((currentMode as number) & 0xFF) == (target & 0xFF)) {
            return true;
        }

        for (let attempt = 0; attempt < totalAttempts; attempt++) {
            if (!sendUartCommandArray(target, [0])) {
                markCameraOffline();
                return false;
            }
            const deadline = input.runningTime() + timeoutMs;
            let missCount = 0;

            while (input.runningTime() < deadline) {
                basic.pause(20);
                const id = tryReadModeId(1);
                if (id == (target & 0xFF)) {
                    currentMode = mode;
                    return true;
                }
                if (id < 0) {
                    missCount += 1;
                    if (missCount >= 3) {
                        markCameraOffline();
                        return false;
                    }
                } else {
                    missCount = 0;
                }
            }

            if (attempt + 1 < totalAttempts) {
                basic.pause(120);
            }
        }

        return false;
    }

    function parseFacePacket(raw: Buffer): boolean {
        if (!raw || raw.length < 15) {
            return false;
        }

        faceStateCache = raw[0] & 0xFF;
        faceIdCache = raw[1] & 0xFF;
        if (faceIdCache == 0xFF) {
            faceIdCache = 0;
        }
        faceSimilarityCache = minNumber((raw[2] & 0xFF) / 100.0, 1.0);
        faceBlinkCache = raw[3] & 0xFF;
        faceMouthOpenCache = raw[4] & 0xFF;
        const coordValid = raw[5] & 0xFF;
        const nextLeftTopX = u16le(raw, 6);
        const nextLeftTopY = u16le(raw, 8);
        const nextRightBottomX = u16le(raw, 10);
        const nextRightBottomY = u16le(raw, 12);
        const isDegenerateBox = nextLeftTopX == nextRightBottomX && nextLeftTopY == nextRightBottomY;

        if (isDegenerateBox) {
            faceCoordValidCache = 0;
        } else {
            if (coordValid != 0) {
                faceLeftTopXCache = nextLeftTopX;
                faceLeftTopYCache = nextLeftTopY;
                faceRightBottomXCache = nextRightBottomX;
                faceRightBottomYCache = nextRightBottomY;
                faceCoordValidCache = 1;
            } else {
                faceCoordValidCache = 0;
            }
        }
        const labelLen = raw[14] & 0xFF;
        if (labelLen > 0 && raw.length >= 15 + labelLen) {
            faceLabelCache = utf8DecodePart(raw, 15, labelLen);
        } else {
            faceLabelCache = "";
        }
        const faceCountOffset = 15 + labelLen;
        if (raw.length > faceCountOffset) {
            faceStatusCache = raw[faceCountOffset] & 0xFF;
        } else {
            faceStatusCache = faceCoordValidCache != 0 ? 1 : 0;
        }
        return true;
    }

    function parseSelfLearnPacket(raw: Buffer): boolean {
        if (!raw || raw.length < 4) {
            return false;
        }

        selfLearnStatusCache = raw[0] & 0xFF;
        selfLearnIdCache = raw[1] & 0xFF;
        selfLearnSimilarityCache = minNumber((raw[2] & 0xFF) / 100.0, 1.0);

        const labelLen = raw[3] & 0xFF;
        if (labelLen > 0 && raw.length >= 4 + labelLen) {
            selfLearnLabelCache = utf8DecodePart(raw, 4, labelLen);
        } else {
            selfLearnLabelCache = "";
        }
        return true;
    }

    function parseHandPacket(raw: Buffer): boolean {
        if (!raw || raw.length < HAND_RESULT_HEAD_LEN) {
            return false;
        }

        handStatusCache = raw[0] & 0xFF;
        handIdCache = raw[1] & 0xFF;
        handSimilarityCache = minNumber((raw[2] & 0xFF) / 100.0, 1.0);
        handCenterXCache = u16le(raw, 4);
        handCenterYCache = u16le(raw, 6);
        handWidthCache = u16le(raw, 8);
        handHeightCache = u16le(raw, 10);

        const labelLen = raw[12] & 0xFF;
        if (labelLen > 0 && raw.length >= HAND_RESULT_HEAD_LEN + labelLen) {
            handLabelBytesCache = pins.createBuffer(labelLen);
            for (let i = 0; i < labelLen; i++) {
                handLabelBytesCache[i] = raw[HAND_RESULT_HEAD_LEN + i];
            }
            handLabelCache = handLabelBytesCache.toString();
        } else {
            handLabelBytesCache = pins.createBuffer(0);
            handLabelCache = "";
        }
        return true;
    }

    function parseSoundTouchPacket(raw: Buffer): boolean {
        if (!raw || raw.length < 7) {
            return false;
        }

        soundTouchStatusCache = raw[0] & 0xFF;
        soundTouchBpmCache = ((raw[2] & 0xFF) << 8) | (raw[1] & 0xFF);
        soundTouchBeatCountCache = ((raw[4] & 0xFF) << 8) | (raw[3] & 0xFF);
        const durationDs = ((raw[6] & 0xFF) << 8) | (raw[5] & 0xFF);
        soundTouchDurationSecCache = durationDs / 10.0;

        return true;
    }

    function parseBallPacket(raw: Buffer): boolean {
        if (!raw || raw.length < BALL_RESULT_HEAD_LEN) {
            ballRedDetectedCache = false;
            ballBlueDetectedCache = false;
            return false;
        }

        ballCountCache = raw[0] & 0xFF;
        const flags = raw[1] & 0xFF;
        ballRedDetectedCache = (flags & 0x40) != 0;
        ballBlueDetectedCache = (flags & 0x80) != 0;
        let recordCount = flags & 0x1F;
        recordCount = minNumber(recordCount, ballCountCache);
        recordCount = minNumber(recordCount, BALL_MAX_TARGETS);
        const availableRecords = ((raw.length - BALL_RESULT_HEAD_LEN) / BALL_TARGET_STRIDE) | 0;
        recordCount = minNumber(recordCount, availableRecords);
        ballRecordCountCache = recordCount;

        const targets = pins.createBuffer(recordCount * BALL_TARGET_STRIDE);
        for (let i = 0; i < targets.length; i++) {
            targets[i] = raw[BALL_RESULT_HEAD_LEN + i] & 0xFF;
        }
        ballTargetsCache = targets;
        return true;
    }

    function parseCardPacket(raw: Buffer): boolean {
        if (!raw || raw.length < CARD_RESULT_HEAD_LEN) {
            return false;
        }

        cardCountCache = raw[0] & 0xFF;
        let recordCount = raw[1] & 0xFF;
        recordCount = minNumber(recordCount, cardCountCache);
        recordCount = minNumber(recordCount, CARD_MAX_TARGETS);
        const availableRecords = ((raw.length - CARD_RESULT_HEAD_LEN) / CARD_TARGET_STRIDE) | 0;
        recordCount = minNumber(recordCount, availableRecords);
        cardRecordCountCache = recordCount;

        const targets = pins.createBuffer(recordCount * CARD_TARGET_STRIDE);
        for (let i = 0; i < targets.length; i++) {
            targets[i] = raw[CARD_RESULT_HEAD_LEN + i] & 0xFF;
        }
        cardTargetsCache = targets;
        return true;
    }

    function parseObjectPacket(raw: Buffer): boolean {
        if (!raw || raw.length < OBJECT_RESULT_HEAD_LEN) {
            return false;
        }

        objectCountCache = raw[0] & 0xFF;
        let recordCount = raw[1] & 0xFF;
        recordCount = minNumber(recordCount, objectCountCache);
        recordCount = minNumber(recordCount, OBJECT_MAX_TARGETS);

        const targets = pins.createBuffer(recordCount * OBJECT_TARGET_STRIDE);
        const labels: string[] = [];
        let offset = OBJECT_RESULT_HEAD_LEN;
        let parsedCount = 0;

        for (let i = 0; i < recordCount; i++) {
            if (offset + OBJECT_RECORD_HEAD_LEN > raw.length) {
                break;
            }

            const id = raw[offset] & 0xFF;
            const confidence = raw[offset + 1] & 0xFF;
            const out = parsedCount * OBJECT_TARGET_STRIDE;
            targets[out] = id;
            targets[out + 1] = confidence;
            for (let j = 0; j < 8; j++) {
                targets[out + 2 + j] = raw[offset + 2 + j] & 0xFF;
            }
            let labelLen = raw[offset + 10] & 0xFF;
            if (labelLen > OBJECT_MAX_LABEL_BYTES) {
                labelLen = OBJECT_MAX_LABEL_BYTES;
            }
            offset += OBJECT_RECORD_HEAD_LEN;

            if (offset + labelLen > raw.length) {
                break;
            }

            labels.push(labelLen > 0 ? utf8DecodePart(raw, offset, labelLen) : "");
            offset += labelLen;
            parsedCount += 1;
        }

        objectRecordCountCache = parsedCount;
        objectTargetsCache = targets;
        objectLabelsCache = labels;
        return true;
    }

    function parseTrackingPacket(raw: Buffer): boolean {
        if (!raw || raw.length < TRACKING_RESULT_HEAD_LEN) {
            return false;
        }

        trackingCountCache = raw[0] & 0xFF;
        let recordCount = raw[1] & 0xFF;
        recordCount = minNumber(recordCount, TRACKING_MAX_TARGETS);
        const availableRecords = ((raw.length - TRACKING_RESULT_HEAD_LEN) / TRACKING_TARGET_STRIDE) | 0;
        recordCount = minNumber(recordCount, availableRecords);
        trackingRecordCountCache = recordCount;

        const targets = pins.createBuffer(recordCount * TRACKING_TARGET_STRIDE);
        for (let i = 0; i < targets.length; i++) {
            targets[i] = raw[TRACKING_RESULT_HEAD_LEN + i] & 0xFF;
        }
        trackingTargetsCache = targets;
        return true;
    }

    function clearTrackingResultCache(): void {
        trackingCountCache = 0;
        trackingRecordCountCache = 0;
        trackingTargetsCache = pins.createBuffer(0);
    }

    function parseExpressionPacket(raw: Buffer): boolean {
        if (!raw || raw.length < EXPRESSION_RESULT_HEAD_LEN) {
            return false;
        }

        expressionCountCache = raw[0] & 0xFF;
        let recordCount = raw[1] & 0xFF;
        recordCount = minNumber(recordCount, expressionCountCache);
        recordCount = minNumber(recordCount, EXPRESSION_MAX_FACES);

        const targets = pins.createBuffer(recordCount * EXPRESSION_TARGET_STRIDE);
        const labels: string[] = [];
        let offset = EXPRESSION_RESULT_HEAD_LEN;
        let parsedCount = 0;

        for (let i = 0; i < recordCount; i++) {
            if (offset + EXPRESSION_RECORD_HEAD_LEN > raw.length) {
                break;
            }

            const out = parsedCount * EXPRESSION_TARGET_STRIDE;
            targets[out] = raw[offset] & 0xFF;
            targets[out + 1] = raw[offset + 1] & 0xFF;
            targets[out + 2] = raw[offset + 2] & 0xFF;
            targets[out + 3] = raw[offset + 3] & 0xFF;
            targets[out + 4] = raw[offset + 4] & 0xFF;
            targets[out + 5] = raw[offset + 5] & 0xFF;
            targets[out + 6] = raw[offset + 6] & 0xFF;
            targets[out + 7] = raw[offset + 7] & 0xFF;
            targets[out + 8] = raw[offset + 8] & 0xFF;
            targets[out + 9] = raw[offset + 9] & 0xFF;
            targets[out + 10] = raw[offset + 10] & 0xFF;

            let labelLen = raw[offset + 11] & 0xFF;
            if (labelLen > EXPRESSION_MAX_LABEL_BYTES) {
                labelLen = EXPRESSION_MAX_LABEL_BYTES;
            }
            offset += EXPRESSION_RECORD_HEAD_LEN;

            if (offset + labelLen > raw.length) {
                break;
            }

            labels.push(labelLen > 0 ? utf8DecodePart(raw, offset, labelLen) : "");
            offset += labelLen;
            parsedCount += 1;
        }

        expressionRecordCountCache = parsedCount;
        expressionTargetsCache = targets;
        expressionLabelsCache = labels;
        return true;
    }

    function parsePosturePacket(raw: Buffer): boolean {
        if (!raw || raw.length < POSTURE_RESULT_HEAD_LEN) {
            return false;
        }

        if ((raw[0] & 0xFF) != 0x02) {
            postureStatusCache = 0;
            postureCountCache = 0;
            postureRecordCountCache = 0;
            postureTargetsCache = pins.createBuffer(0);
            postureLabelsCache = [];
            return false;
        }

        postureStatusCache = raw[1] & 0xFF;
        postureCountCache = postureStatusCache == 0x01 ? (raw[2] & 0xFF) : 0;
        let recordCount = raw[3] & 0xFF;
        recordCount = minNumber(recordCount, postureCountCache);
        recordCount = minNumber(recordCount, POSTURE_MAX_PEOPLE);

        const targets = pins.createBuffer(recordCount * POSTURE_TARGET_STRIDE);
        const labels: string[] = [];
        let offset = POSTURE_RESULT_HEAD_LEN;
        let parsedCount = 0;

        for (let i = 0; i < recordCount; i++) {
            if (offset + POSTURE_RECORD_HEAD_LEN > raw.length) {
                break;
            }

            const out = parsedCount * POSTURE_TARGET_STRIDE;
            for (let j = 0; j < POSTURE_TARGET_STRIDE; j++) {
                targets[out + j] = raw[offset + j] & 0xFF;
            }

            let labelLen = raw[offset + POSTURE_TARGET_STRIDE] & 0xFF;
            if (labelLen > POSTURE_MAX_LABEL_BYTES) {
                labelLen = POSTURE_MAX_LABEL_BYTES;
            }
            offset += POSTURE_RECORD_HEAD_LEN;

            if (offset + labelLen > raw.length) {
                break;
            }

            labels.push(labelLen > 0 ? utf8DecodePart(raw, offset, labelLen) : "");
            offset += labelLen;
            parsedCount += 1;
        }

        postureRecordCountCache = parsedCount;
        postureTargetsCache = targets;
        postureLabelsCache = labels;
        return true;
    }

    function parseColorPacket(raw: Buffer): boolean {
        if (!raw || raw.length < 1) {
            return false;
        }

        colorModeCache = raw[0] & 0xFF;
        if (colorModeCache == COLOR_MODE_RECOGNIZE) {
            if (raw.length < COLOR_RECOGNIZE_HEAD_LEN) {
                return false;
            }

            colorCenterIdCache = raw[1] & 0xFF;
            colorCenterConfidenceCache = minNumber((raw[2] & 0xFF) / 100.0, 1.0);
            colorCenterRCache = raw[3] & 0xFF;
            colorCenterGCache = raw[4] & 0xFF;
            colorCenterBCache = raw[5] & 0xFF;

            let labelLen = raw[6] & 0xFF;
            if (labelLen > COLOR_MAX_LABEL_BYTES) {
                labelLen = COLOR_MAX_LABEL_BYTES;
            }
            if (COLOR_RECOGNIZE_HEAD_LEN + labelLen > raw.length) {
                return false;
            }
            colorCenterNameCache = labelLen > 0 ? utf8DecodePart(raw, COLOR_RECOGNIZE_HEAD_LEN, labelLen) : "";
            colorCountCache = colorCenterIdCache > 0 ? 1 : 0;
            colorRecordCountCache = 0;
            colorTargetsCache = pins.createBuffer(0);
            colorLabelsCache = [];
            return true;
        }

        if (raw.length < COLOR_LEARN_RESULT_HEAD_LEN) {
            return false;
        }

        colorModeCache = COLOR_MODE_LEARN;
        colorCountCache = raw[1] & 0xFF;
        let recordCount = raw[2] & 0xFF;
        recordCount = minNumber(recordCount, colorCountCache);
        recordCount = minNumber(recordCount, COLOR_MAX_TARGETS);

        const targets = pins.createBuffer(recordCount * COLOR_LEARN_TARGET_STRIDE);
        const labels: string[] = [];
        let offset = COLOR_LEARN_RESULT_HEAD_LEN;
        let parsedCount = 0;

        for (let i = 0; i < recordCount; i++) {
            if (offset + COLOR_LEARN_RECORD_HEAD_LEN > raw.length) {
                break;
            }

            const out = parsedCount * COLOR_LEARN_TARGET_STRIDE;
            targets[out] = raw[offset] & 0xFF;
            targets[out + 1] = raw[offset + 1] & 0xFF;
            targets[out + 2] = raw[offset + 2] & 0xFF;
            targets[out + 3] = raw[offset + 3] & 0xFF;
            targets[out + 4] = raw[offset + 4] & 0xFF;
            targets[out + 5] = raw[offset + 5] & 0xFF;
            targets[out + 6] = raw[offset + 6] & 0xFF;
            targets[out + 7] = raw[offset + 7] & 0xFF;
            targets[out + 8] = raw[offset + 8] & 0xFF;
            targets[out + 9] = raw[offset + 9] & 0xFF;
            targets[out + 10] = raw[offset + 10] & 0xFF;
            targets[out + 11] = raw[offset + 11] & 0xFF;
            targets[out + 12] = raw[offset + 12] & 0xFF;
            targets[out + 13] = raw[offset + 13] & 0xFF;

            let labelLen = raw[offset + 14] & 0xFF;
            if (labelLen > COLOR_MAX_LABEL_BYTES) {
                labelLen = COLOR_MAX_LABEL_BYTES;
            }
            offset += COLOR_LEARN_RECORD_HEAD_LEN;

            if (offset + labelLen > raw.length) {
                break;
            }

            labels.push(labelLen > 0 ? utf8DecodePart(raw, offset, labelLen) : "");
            offset += labelLen;
            parsedCount += 1;
        }

        colorRecordCountCache = parsedCount;
        colorTargetsCache = targets;
        colorLabelsCache = labels;
        colorCenterIdCache = 0;
        colorCenterConfidenceCache = 0;
        colorCenterRCache = 0;
        colorCenterGCache = 0;
        colorCenterBCache = 0;
        colorCenterNameCache = "";
        return true;
    }

    function parseLinePacket(raw: Buffer): boolean {
        if (!raw || raw.length < LINE_RESULT_LEN) {
            return false;
        }

        const result = pins.createBuffer(LINE_RESULT_LEN);
        for (let i = 0; i < LINE_RESULT_LEN; i++) {
            result[i] = raw[i] & 0xFF;
        }
        lineResultCache = result;

        lineDetectedCache = lineResultCache[0] & 0xFF;
        return true;
    }

    function parseOcrPacket(raw: Buffer): boolean {
        if (!raw || raw.length < OCR_RESULT_HEAD_LEN) {
            return false;
        }

        ocrStatusCache = raw[0] & 0xFF;
        ocrConfidenceCache = minNumber((raw[1] & 0xFF) / 100.0, 1.0);

        let textLen = raw[2] & 0xFF;
        if (textLen > raw.length - OCR_RESULT_HEAD_LEN) {
            textLen = raw.length - OCR_RESULT_HEAD_LEN;
        }
        if (textLen > 0) {
            ocrTextBytesCache = pins.createBuffer(textLen);
            ocrTextLengthCache = 0;
            for (let i = 0; i < textLen; i++) {
                ocrTextBytesCache[i] = raw[OCR_RESULT_HEAD_LEN + i];
                if ((ocrTextBytesCache[i] & 0xC0) != 0x80) {
                    ocrTextLengthCache++;
                }
            }
            ocrTextCache = ocrTextBytesCache.toString();
        } else {
            ocrTextLengthCache = 0;
            ocrTextBytesCache = pins.createBuffer(0);
            ocrTextCache = "";
        }
        return true;
    }

    function parseCodePacket(raw: Buffer): boolean {
        if (!raw || raw.length < CODE_RESULT_HEAD_LEN) {
            return false;
        }

        codeDetectedCache = raw[0] & 0xFF;
        codeTypeCache = raw[1] & 0xFF;

        let contentLen = raw[12] & 0xFF;
        if (contentLen > raw.length - CODE_RESULT_HEAD_LEN) {
            contentLen = raw.length - CODE_RESULT_HEAD_LEN;
        }
        if (contentLen > 0) {
            codeContentBytesCache = pins.createBuffer(contentLen);
            for (let i = 0; i < contentLen; i++) {
                codeContentBytesCache[i] = raw[CODE_RESULT_HEAD_LEN + i] & 0xFF;
            }
            codeContentCache = codeContentBytesCache.toString();
        } else {
            codeContentBytesCache = pins.createBuffer(0);
            codeContentCache = "";
        }
        return true;
    }

    function ballTargetOffset(objectIndex: number): number {
        let index = objectIndex | 0;
        if (index < 1 || index > ballRecordCountCache) {
            return -1;
        }
        return (index - 1) * BALL_TARGET_STRIDE;
    }

    function squaredDistanceToScreenCenter(x: number, y: number): number {
        const dx = x - 320;
        const dy = y - 240;
        return dx * dx + dy * dy;
    }

    function selectedBallOffset(selection: TargetSelection): number {
        let bestOffset = -1;
        let bestMetric = 0;
        for (let i = 0; i < ballRecordCountCache; i++) {
            const offset = i * BALL_TARGET_STRIDE;
            let metric = squaredDistanceToScreenCenter(
                u16le(ballTargetsCache, offset + 2),
                u16le(ballTargetsCache, offset + 4));
            if (selection == TargetSelection.Largest) {
                metric = u16le(ballTargetsCache, offset + 6) * u16le(ballTargetsCache, offset + 8);
                if (bestOffset < 0 || metric > bestMetric) {
                    bestOffset = offset;
                    bestMetric = metric;
                }
            } else if (bestOffset < 0 || metric < bestMetric) {
                bestOffset = offset;
                bestMetric = metric;
            }
        }
        return bestOffset;
    }

    function cardTargetOffset(objectIndex: number): number {
        let index = objectIndex | 0;
        if (index < 1 || index > cardRecordCountCache) {
            return -1;
        }
        return (index - 1) * CARD_TARGET_STRIDE;
    }

    function cardOffsetById(cardId: number): number {
        const wantedId = cardId & 0xFF;
        let bestOffset = -1;
        let bestDistance2 = 0;
        for (let i = 0; i < cardRecordCountCache; i++) {
            const offset = i * CARD_TARGET_STRIDE;
            if ((cardTargetsCache[offset] & 0xFF) == wantedId) {
                const distance2 = squaredDistanceToScreenCenter(
                    u16le(cardTargetsCache, offset + 2),
                    u16le(cardTargetsCache, offset + 4));
                if (bestOffset < 0 || distance2 < bestDistance2) {
                    bestOffset = offset;
                    bestDistance2 = distance2;
                }
            }
        }
        return bestOffset;
    }

    function largestCardOffset(): number {
        let bestOffset = -1;
        let bestSize = -1;
        for (let i = 0; i < cardRecordCountCache; i++) {
            const offset = i * CARD_TARGET_STRIDE;
            const size = u16le(cardTargetsCache, offset + 6);
            if (size > bestSize) {
                bestSize = size;
                bestOffset = offset;
            }
        }
        return bestOffset;
    }

    function objectTargetOffset(objectIndex: number): number {
        let index = objectIndex | 0;
        if (index < 1 || index > objectRecordCountCache) {
            return -1;
        }
        return (index - 1) * OBJECT_TARGET_STRIDE;
    }

    function nearestObjectOffset(): number {
        let bestOffset = -1;
        let bestDistance2 = 0;
        for (let i = 0; i < objectRecordCountCache; i++) {
            const offset = i * OBJECT_TARGET_STRIDE;
            const distance2 = squaredDistanceToScreenCenter(
                u16le(objectTargetsCache, offset + 2),
                u16le(objectTargetsCache, offset + 4));
            if (bestOffset < 0 || distance2 < bestDistance2) {
                bestOffset = offset;
                bestDistance2 = distance2;
            }
        }
        return bestOffset;
    }

    function objectOffsetByClass(objectClass: ObjectClass): number {
        if (objectClass == ObjectClass.Any) {
            return nearestObjectOffset();
        }
        const wantedId = objectClass as number;
        let bestOffset = -1;
        let bestDistance2 = 0;
        for (let i = 0; i < objectRecordCountCache; i++) {
            const offset = i * OBJECT_TARGET_STRIDE;
            if ((objectTargetsCache[offset] & 0xFF) != wantedId) {
                continue;
            }
            const distance2 = squaredDistanceToScreenCenter(
                u16le(objectTargetsCache, offset + 2),
                u16le(objectTargetsCache, offset + 4));
            if (bestOffset < 0 || distance2 < bestDistance2) {
                bestOffset = offset;
                bestDistance2 = distance2;
            }
        }
        return bestOffset;
    }

    function trackingTargetOffset(objectIndex: number): number {
        let index = objectIndex | 0;
        if (index < 1 || index > trackingRecordCountCache) {
            return -1;
        }
        return (index - 1) * TRACKING_TARGET_STRIDE;
    }

    function expressionTargetOffset(expressionIndex: number): number {
        let index = expressionIndex | 0;
        if (index < 1 || index > expressionRecordCountCache) {
            return -1;
        }
        return (index - 1) * EXPRESSION_TARGET_STRIDE;
    }

    function nearestExpressionTargetOffset(): number {
        let bestOffset = -1;
        let bestDistance2 = 0;
        for (let i = 0; i < expressionRecordCountCache; i++) {
            const offset = i * EXPRESSION_TARGET_STRIDE;
            const distance2 = squaredDistanceToScreenCenter(
                u16le(expressionTargetsCache, offset + 3),
                u16le(expressionTargetsCache, offset + 5));
            if (bestOffset < 0 || distance2 < bestDistance2) {
                bestOffset = offset;
                bestDistance2 = distance2;
            }
        }
        return bestOffset;
    }

    function postureTargetOffsetById(personId: number): number {
        const id = personId | 0;
        if (id < 1) {
            return -1;
        }
        for (let i = 0; i < postureRecordCountCache; i++) {
            const offset = i * POSTURE_TARGET_STRIDE;
            if ((postureTargetsCache[offset] & 0xFF) == id) {
                return offset;
            }
        }
        return -1;
    }

    function nearestPostureTargetOffset(): number {
        let bestOffset = -1;
        let bestDistance2 = 0;
        for (let i = 0; i < postureRecordCountCache; i++) {
            const offset = i * POSTURE_TARGET_STRIDE;
            const centerX = postureCoordValue(offset + 3);
            const centerY = postureCoordValue(offset + 5);
            if (centerX < 0 || centerY < 0) {
                continue;
            }
            const dx = centerX - 320;
            const dy = centerY - 240;
            const distance2 = dx * dx + dy * dy;
            if (bestOffset < 0 || distance2 < bestDistance2) {
                bestOffset = offset;
                bestDistance2 = distance2;
            }
        }
        return bestOffset;
    }

    function postureCoordValue(offset: number): number {
        const value = u16le(postureTargetsCache, offset);
        return value == 0xFFFF ? -1 : value;
    }

    function postureKeypointOffset(data: PostureValue): number {
        const value = data as number;
        if (value < (PostureValue.NoseX as number) || value > (PostureValue.RightAnkleY as number)) {
            return -1;
        }
        return 11 + (value - (PostureValue.NoseX as number)) * 2;
    }

    function postureValueAt(offset: number, data: PostureValue): number {
        if (offset < 0) {
            return -1;
        }
        if (data == PostureValue.Id) {
            return postureTargetsCache[offset] & 0xFF;
        }
        if (data == PostureValue.Confidence) {
            return minNumber((postureTargetsCache[offset + 2] & 0xFF) / 100.0, 1.0);
        }
        if (data == PostureValue.X) {
            return postureCoordValue(offset + 3);
        }
        if (data == PostureValue.Y) {
            return postureCoordValue(offset + 5);
        }
        if (data == PostureValue.Width) {
            return postureCoordValue(offset + 7);
        }
        if (data == PostureValue.Height) {
            return postureCoordValue(offset + 9);
        }
        const keypointOffset = postureKeypointOffset(data);
        if (keypointOffset < 0) {
            return -1;
        }
        return postureCoordValue(offset + keypointOffset);
    }

    function postureNameAt(offset: number): string {
        if (offset < 0) {
            return "";
        }
        const index = (offset / POSTURE_TARGET_STRIDE) | 0;
        return index < postureLabelsCache.length ? postureLabelsCache[index] : "";
    }

    function colorTargetOffset(colorIndex: number): number {
        let index = colorIndex | 0;
        if (index < 1 || index > colorRecordCountCache) {
            return -1;
        }
        return (index - 1) * COLOR_LEARN_TARGET_STRIDE;
    }

    function colorTargetOffsetById(colorId: number): number {
        const wantedId = colorId | 0;
        if (wantedId < 1 || wantedId > 30) {
            return -1;
        }
        for (let i = 0; i < colorRecordCountCache; i++) {
            const offset = i * COLOR_LEARN_TARGET_STRIDE;
            if (u16le(colorTargetsCache, offset) == wantedId) {
                return offset;
            }
        }
        return -1;
    }

    function expressionTypeId(expression: ExpressionType): number {
        if (expression == ExpressionType.Happy) {
            return 3;
        }
        if (expression == ExpressionType.Sad) {
            return 4;
        }
        if (expression == ExpressionType.Angry) {
            return 0;
        }
        if (expression == ExpressionType.Surprise) {
            return 5;
        }
        if (expression == ExpressionType.Fear) {
            return 2;
        }
        if (expression == ExpressionType.Disgust) {
            return 1;
        }
        return 6;
    }

    function postureTypeId(posture: PostureType): number {
        return posture as number;
    }

    function refreshFaceResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, 15, 2);
        if (!head || head.length < 15) {
            return false;
        }

        const labelLen = head[14] & 0xFF;
        const totalLen = 16 + labelLen;
        let raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        if (!raw || raw.length < totalLen) {
            raw = regReadBytes(REG_RESULT_BASE, 15 + labelLen, ioChunk, 3);
        }
        return parseFacePacket(raw);
    }

    function refreshSelfLearnResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, 4, 2);
        if (!head || head.length < 4) {
            return false;
        }

        const labelLen = head[3] & 0xFF;
        const totalLen = 4 + labelLen;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseSelfLearnPacket(raw);
    }

    function refreshHandResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, HAND_RESULT_HEAD_LEN, 2);
        if (!head || head.length < HAND_RESULT_HEAD_LEN) {
            return false;
        }

        const labelLen = head[12] & 0xFF;
        const totalLen = HAND_RESULT_HEAD_LEN + labelLen;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseHandPacket(raw);
    }

    function refreshSoundTouchResultInternal(): boolean {
        const raw = regReadRetry(REG_RESULT_BASE, 7, 2);
        return parseSoundTouchPacket(raw);
    }

    function refreshBallResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, BALL_RESULT_HEAD_LEN, 2);
        if (!head || head.length < BALL_RESULT_HEAD_LEN) {
            ballRedDetectedCache = false;
            ballBlueDetectedCache = false;
            return false;
        }

        let recordCount = head[1] & 0x1F;
        recordCount = minNumber(recordCount, head[0] & 0xFF);
        recordCount = minNumber(recordCount, BALL_MAX_TARGETS);
        const totalLen = BALL_RESULT_HEAD_LEN + recordCount * BALL_TARGET_STRIDE;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseBallPacket(raw);
    }

    function refreshCardResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, CARD_RESULT_HEAD_LEN, 2);
        if (!head || head.length < CARD_RESULT_HEAD_LEN) {
            return false;
        }

        let recordCount = head[1] & 0xFF;
        recordCount = minNumber(recordCount, head[0] & 0xFF);
        recordCount = minNumber(recordCount, CARD_MAX_TARGETS);
        const totalLen = CARD_RESULT_HEAD_LEN + recordCount * CARD_TARGET_STRIDE;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseCardPacket(raw);
    }

    function refreshObjectResultInternal(): boolean {
        const raw = regReadBytes(REG_RESULT_BASE,
            OBJECT_RESULT_HEAD_LEN + OBJECT_MAX_TARGETS * (OBJECT_RECORD_HEAD_LEN + OBJECT_MAX_LABEL_BYTES), ioChunk, 3);
        return parseObjectPacket(raw);
    }

    function refreshTrackingResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, TRACKING_RESULT_HEAD_LEN, 2);
        if (!head || head.length < TRACKING_RESULT_HEAD_LEN) {
            clearTrackingResultCache();
            return false;
        }

        let recordCount = head[1] & 0xFF;
        recordCount = minNumber(recordCount, TRACKING_MAX_TARGETS);
        const totalLen = TRACKING_RESULT_HEAD_LEN + recordCount * TRACKING_TARGET_STRIDE;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        if (!parseTrackingPacket(raw)) {
            clearTrackingResultCache();
            return false;
        }
        return true;
    }

    function refreshExpressionResultInternal(): boolean {
        const raw = regReadBytes(REG_RESULT_BASE,
            EXPRESSION_RESULT_HEAD_LEN + EXPRESSION_MAX_FACES * (EXPRESSION_RECORD_HEAD_LEN + EXPRESSION_MAX_LABEL_BYTES), ioChunk, 3);
        return parseExpressionPacket(raw);
    }

    function refreshPostureResultInternal(): boolean {
        const raw = regReadBytes(REG_RESULT_BASE,
            POSTURE_RESULT_HEAD_LEN + POSTURE_MAX_PEOPLE *
                (POSTURE_RECORD_HEAD_LEN + POSTURE_MAX_LABEL_BYTES), ioChunk, 3);
        return parsePosturePacket(raw);
    }

    function refreshColorResultInternal(): boolean {
        const raw = regReadBytes(REG_RESULT_BASE,
            COLOR_LEARN_RESULT_HEAD_LEN + COLOR_MAX_TARGETS * (COLOR_LEARN_RECORD_HEAD_LEN + COLOR_MAX_LABEL_BYTES), ioChunk, 3);
        return parseColorPacket(raw);
    }

    function refreshLineResultInternal(): boolean {
        const raw = regReadRetry(REG_RESULT_BASE, LINE_RESULT_LEN, 2);
        return parseLinePacket(raw);
    }

    function refreshOcrResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, OCR_RESULT_HEAD_LEN, 2);
        if (!head || head.length < OCR_RESULT_HEAD_LEN) {
            return false;
        }

        const textLen = head[2] & 0xFF;
        const totalLen = OCR_RESULT_HEAD_LEN + textLen;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseOcrPacket(raw);
    }

    function refreshCodeResultInternal(): boolean {
        const head = regReadRetry(REG_RESULT_BASE, CODE_RESULT_HEAD_LEN, 2);
        if (!head || head.length < CODE_RESULT_HEAD_LEN) {
            return false;
        }

        const contentLen = head[12] & 0xFF;
        const totalLen = CODE_RESULT_HEAD_LEN + contentLen;
        const raw = regReadBytes(REG_RESULT_BASE, totalLen, ioChunk, 3);
        return parseCodePacket(raw);
    }

    function initializeCameraInternal(): void {
        deviceAddr = UDEV_DEVICE_ADDR_DEFAULT;
        iicInitDone = true;
        cameraOnline = false;
        cameraReadFailCount = 0;
        cameraLastRecoveryProbeMs = 0;
        const timeout = input.runningTime();
        while (!probeCamera(1)) {
            if (input.runningTime() - timeout > 990) {
                while (true) {
                    basic.showString("Init AIcamera Error!");
                }
            }
            basic.pause(20);
        }
    }

    function refreshCurrentResultInternal(): void {
        if (!isCameraReady()) {
            return;
        }
        const modeId = detectModeIdFromDevice();
        if (modeId == (AppMode.FaceRecognize as number)) {
            refreshFaceResultInternal();
            return;
        }
        if (modeId == (AppMode.SelfLearn as number)) {
            refreshSelfLearnResultInternal();
            return;
        }
        if (modeId == (AppMode.HandRecognize as number)) {
            refreshHandResultInternal();
            return;
        }
        if (modeId == (AppMode.SoundTouch as number)) {
            refreshSoundTouchResultInternal();
            return;
        }
        if (modeId == (AppMode.BallRecognition as number)) {
            refreshBallResultInternal();
            return;
        }
        if (modeId == (AppMode.ObjectRecognition as number)) {
            refreshObjectResultInternal();
            return;
        }
        if (modeId == (AppMode.McOcr as number)) {
            refreshOcrResultInternal();
            return;
        }
        if (modeId == (AppMode.LineRecognition as number)) {
            refreshLineResultInternal();
            return;
        }
        if (modeId == (AppMode.ObjectTracking as number)) {
            refreshTrackingResultInternal();
            return;
        }
        if (modeId == (AppMode.ExpressionRecognition as number)) {
            refreshExpressionResultInternal();
            return;
        }
        if (modeId == (AppMode.PostureRecognition as number)) {
            refreshPostureResultInternal();
            return;
        }
        if (modeId == (AppMode.ColorRecognition as number)) {
            refreshColorResultInternal();
            return;
        }
        if (modeId == (AppMode.CardRecognition as number)) {
            refreshCardResultInternal();
            return;
        }
        if (modeId == (AppMode.CodeRecognition as number)) {
            refreshCodeResultInternal();
        }
    }

    function hasValidFaceCenterData(): boolean {
        if (faceCoordValidCache == 0) {
            return false;
        }
        return !(faceLeftTopXCache == faceRightBottomXCache && faceLeftTopYCache == faceRightBottomYCache);
    }

    function faceCenterX(): number {
        if (!hasValidFaceCenterData()) {
            return 0;
        }
        return (faceLeftTopXCache + faceRightBottomXCache) >> 1;
    }

    function faceCenterY(): number {
        if (!hasValidFaceCenterData()) {
            return 0;
        }
        return (faceLeftTopYCache + faceRightBottomYCache) >> 1;
    }

    function faceWidth(): number {
        if (!hasValidFaceCenterData()) {
            return 0;
        }
        return maxNumber(0, faceRightBottomXCache - faceLeftTopXCache);
    }

    function faceHeight(): number {
        if (!hasValidFaceCenterData()) {
            return 0;
        }
        return maxNumber(0, faceRightBottomYCache - faceLeftTopYCache);
    }

    //% block="set color recognition mode to %mode"
    //% mode.defl=PlanetX_AILens.ColorRecognitionMode.Learn
    //% weight=84
    //% group="Color recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function setColorRecognitionMode(mode: ColorRecognitionMode = ColorRecognitionMode.Learn): void {
        if (!isCameraReady()) {
            return;
        }

        const modeValue = mode == ColorRecognitionMode.Recognize ? COLOR_MODE_RECOGNIZE : COLOR_MODE_LEARN;
        const modeId = detectModeIdFromDevice();
        if (modeId != (AppMode.ColorRecognition as number)) {
            if (!switchModeInternal(AppMode.ColorRecognition, 2, 6000)) {
                return;
            }
        }
        if (sendUartCommandArray(0x44, [modeValue])) {
            colorModeCache = modeValue;
            basic.pause(30);
            refreshColorResultInternal();
        }
    }

    //% block="initialize AI Lens Pro"
    //% weight=100
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function initAiLensPro(): void {
        initializeCameraInternal();
    }

    //% block="switch function to %mode"
    //% mode.defl=PlanetX_AILens.AppMode.Launcher
    //% mode.fieldEditor="gridpicker"
    //% mode.fieldOptions.columns=3
    //% weight=99
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function switchApp(mode: AppMode = AppMode.Launcher): void {
        if (!isCameraReady()) {
            return;
        }
        switchModeInternal(mode, 3, 6000);
    }

    //% block="set flashlight %state || brightness %brightness \\%"
    //% state.defl=PlanetX_AILens.FlashLightState.On
    //% brightness.min=5 brightness.max=100 brightness.defl=80
    //% inlineInputMode=inline
    //% weight=98
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function setFlashLight(state: FlashLightState = FlashLightState.On, brightness: number = 80): void {
        if (!isCameraReady()) {
            return;
        }
        let level = brightness | 0;
        if (state == FlashLightState.Off || level == 0) {
            sendUartCommandArray(UART_CMD_FLASH_LIGHT, [0, 0]);
            return;
        }
        level = minNumber(100, maxNumber(5, level));
        sendUartCommandArray(UART_CMD_FLASH_LIGHT, [state as number, level]);
    }

    //% block="get one frame from AI Lens Pro"
    //% weight=97
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function getOneFrame(): void {
        refreshCurrentResultInternal();
        basic.pause(1);
    }

    //% block="AI Lens Pro connect WiFi name %ssid password %password"
    //% ssid.defl="wifi name"
    //% password.defl="password"
    //% weight=96
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function connectCameraWifi(ssid: string, password: string): void {
        connectWifiInternal(ssid, password, 60000);
    }

    //% block="AI Lens Pro WiFi connected"
    //% weight=95
    //% group="Basic settings"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function isCameraWifiConnected(): boolean {
        refreshWifiStatusInternal(450);
        return wifiPublicReadyCached();
    }

    //% block="image contains %color ball"
    //% color.defl=PlanetX_AILens.BallColor.Any
    //% color.fieldEditor="gridpicker"
    //% color.fieldOptions.columns=3
    //% weight=90
    //% group="Ball recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsBall(color: BallColor = BallColor.Any): boolean {
        if (color == BallColor.Any) {
            return ballCountCache > 0;
        }
        return color == BallColor.Red ? ballRedDetectedCache : ballBlueDetectedCache;
    }

    //% block="get total number of balls from image"
    //% weight=89
    //% group="Ball recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageBallCount(): number {
        return ballCountCache;
    }

    //% block="get %selection ball %data value from image"
    //% selection.defl=PlanetX_AILens.TargetSelection.Center
    //% data.defl=PlanetX_AILens.BallValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=88
    //% group="Ball recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function selectedBallValue(selection: TargetSelection = TargetSelection.Center,
                                      data: BallValue = BallValue.X): number {
        const offset = selectedBallOffset(selection);
        if (offset < 0) {
            return 0;
        }
        if (data == BallValue.X) {
            return u16le(ballTargetsCache, offset + 2);
        }
        if (data == BallValue.Y) {
            return u16le(ballTargetsCache, offset + 4);
        }
        if (data == BallValue.Confidence) {
            return minNumber((ballTargetsCache[offset + 1] & 0xFF) / 100.0, 1.0);
        }
        return u16le(ballTargetsCache, offset + 8);
    }

    //% block="image contains %card number card"
    //% card.defl=PlanetX_AILens.NumberCard.Zero
    //% card.fieldEditor="gridpicker"
    //% card.fieldOptions.columns=3
    //% weight=90
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsNumberCard(card: NumberCard = NumberCard.Zero): boolean {
        return cardOffsetById(card as number) >= 0;
    }

    //% block="image contains %card letter card"
    //% card.defl=PlanetX_AILens.LetterCard.A
    //% card.fieldEditor="gridpicker"
    //% card.fieldOptions.columns=3
    //% weight=89
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsLetterCard(card: LetterCard = LetterCard.A): boolean {
        return cardOffsetById(card as number) >= 0;
    }

    //% block="image contains %card traffic sign card"
    //% card.defl=PlanetX_AILens.TrafficCard.Front
    //% card.fieldEditor="gridpicker"
    //% card.fieldOptions.columns=3
    //% weight=88
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsTrafficCard(card: TrafficCard = TrafficCard.Front): boolean {
        return cardOffsetById(card as number) >= 0;
    }

    //% block="image contains %card item card"
    //% card.defl=PlanetX_AILens.GeneralCard.Cat
    //% card.fieldEditor="gridpicker"
    //% card.fieldOptions.columns=3
    //% weight=87
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsItemCard(card: GeneralCard = GeneralCard.Cat): boolean {
        return cardOffsetById(card as number) >= 0;
    }

    //% block="get total number of cards from image"
    //% weight=86
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageCardCount(): number {
        return cardCountCache;
    }

    //% block="get %card card %data value from image"
    //% card.defl=PlanetX_AILens.CardSelection.Largest
    //% data.defl=PlanetX_AILens.CardValue.X
    //% card.fieldEditor="gridpicker"
    //% card.fieldOptions.columns=3
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=85
    //% group="Card recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function selectedCardValue(card: CardSelection = CardSelection.Largest,
                                      data: CardValue = CardValue.X): number {
        const offset = card == CardSelection.Largest ? largestCardOffset() : cardOffsetById(card as number);
        if (offset < 0) {
            return 0;
        }
        if (data == CardValue.X) {
            return u16le(cardTargetsCache, offset + 2);
        }
        if (data == CardValue.Y) {
            return u16le(cardTargetsCache, offset + 4);
        }
        if (data == CardValue.Confidence) {
            return minNumber((cardTargetsCache[offset + 1] & 0xFF) / 100.0, 1.0);
        }
        if (data == CardValue.Size) {
            return u16le(cardTargetsCache, offset + 6);
        }
        return cardTargetsCache[offset] & 0xFF;
    }

    //% block="image color is %color"
    //% color.defl=PlanetX_AILens.BasicColor.Red
    //% color.fieldEditor="gridpicker"
    //% color.fieldOptions.columns=3
    //% weight=90
    //% group="Color recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageColorIs(color: BasicColor = BasicColor.Red): boolean {
        return colorModeCache == COLOR_MODE_RECOGNIZE && colorCenterIdCache == (color as number);
    }

    //% block="get image color %data value"
    //% data.defl=PlanetX_AILens.ColorCenterValue.R
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=89
    //% group="Color recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageRgbValue(data: ColorCenterValue = ColorCenterValue.R): number {
        if (data == ColorCenterValue.R) {
            return colorCenterRCache;
        }
        if (data == ColorCenterValue.G) {
            return colorCenterGCache;
        }
        return colorCenterBCache;
    }

    //% block="image contains learned color ID %ID"
    //% ID.min=1 ID.max=30 ID.defl=1
    //% weight=88
    //% group="Color recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsLearnedColor(ID: number = 1): boolean {
        return colorModeCache == COLOR_MODE_LEARN && colorTargetOffsetById(ID) >= 0;
    }

    //% block="get learned color ID %ID %data value from image"
    //% ID.min=1 ID.max=30 ID.defl=1
    //% data.defl=PlanetX_AILens.ColorValue.R
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=87
    //% group="Color recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function learnedColorValue(ID: number = 1, data: ColorValue = ColorValue.R): number {
        const offset = colorTargetOffsetById(ID);
        if (offset < 0) {
            return 0;
        }
        if (data == ColorValue.X) {
            return u16le(colorTargetsCache, offset + 3);
        }
        if (data == ColorValue.Y) {
            return u16le(colorTargetsCache, offset + 5);
        }
        if (data == ColorValue.Id) {
            return u16le(colorTargetsCache, offset);
        }
        if (data == ColorValue.Confidence) {
            return minNumber((colorTargetsCache[offset + 2] & 0xFF) / 100.0, 1.0);
        }
        if (data == ColorValue.Width) {
            return u16le(colorTargetsCache, offset + 7);
        }
        if (data == ColorValue.Height) {
            return u16le(colorTargetsCache, offset + 9);
        }
        if (data == ColorValue.R) {
            return colorTargetsCache[offset + 11] & 0xFF;
        }
        if (data == ColorValue.G) {
            return colorTargetsCache[offset + 12] & 0xFF;
        }
        return colorTargetsCache[offset + 13] & 0xFF;
    }

    //% block="image contains face"
    //% weight=90
    //% group="Face recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsFace(): boolean {
        return faceCoordValidCache != 0;
    }

    //% block="get total number of faces from image"
    //% weight=89
    //% group="Face recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageFaceCount(): number {
        return faceStatusCache;
    }

    //% block="get face %data value from image"
    //% data.defl=PlanetX_AILens.FaceValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=88
    //% group="Face recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerFaceValue(data: FaceValue = FaceValue.X): number {
        if (data == FaceValue.X) {
            return faceCenterX();
        }
        if (data == FaceValue.Y) {
            return faceCenterY();
        }
        if (data == FaceValue.Width) {
            return faceWidth();
        }
        if (data == FaceValue.Height) {
            return faceHeight();
        }
        if (data == FaceValue.Confidence) {
            return faceSimilarityCache;
        }
        if (data == FaceValue.BlinkCount) {
            return faceBlinkCache;
        }
        return faceMouthOpenCache;
    }

    //% block="get learned face confidence from image"
    //% weight=87
    //% group="Face recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function learnedFaceConfidence(): number {
        return faceStateCache == 1 && faceIdCache > 0 ? faceSimilarityCache : 0;
    }

    //% block="get learned face name from image"
    //% weight=86
    //% group="Face recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function learnedFaceName(): string {
        return faceStateCache == 1 && faceIdCache > 0 ? faceLabelCache : "";
    }

    //% block="image contains %expression expression"
    //% expression.defl=PlanetX_AILens.ExpressionType.Any
    //% expression.fieldEditor="gridpicker"
    //% expression.fieldOptions.columns=3
    //% weight=90
    //% group="Expression recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsExpression(expression: ExpressionType = ExpressionType.Any): boolean {
        if (expression == ExpressionType.Any) {
            return expressionRecordCountCache > 0;
        }
        const wantedId = expressionTypeId(expression);
        for (let i = 0; i < expressionRecordCountCache; i++) {
            const offset = i * EXPRESSION_TARGET_STRIDE;
            if ((expressionTargetsCache[offset + 1] & 0xFF) == wantedId) {
                return true;
            }
        }
        return false;
    }

    //% block="get total number of expressions from image"
    //% weight=89
    //% group="Expression recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageExpressionCount(): number {
        return expressionCountCache;
    }

    //% block="get expression name from image"
    //% weight=88
    //% group="Expression recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerExpressionName(): string {
        const offset = nearestExpressionTargetOffset();
        if (offset < 0) {
            return "";
        }
        const index = (offset / EXPRESSION_TARGET_STRIDE) | 0;
        return index < expressionLabelsCache.length ? expressionLabelsCache[index] : "";
    }

    //% block="image contains learned gesture"
    //% weight=90
    //% group="Gesture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsLearnedGesture(): boolean {
        return handStatusCache != 0 && handIdCache > 0;
    }

    //% block="image contains gesture %name"
    //% name.defl="gesture name"
    //% weight=89
    //% group="Gesture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsGesture(name: string): boolean {
        if (!imageContainsLearnedGesture()) {
            return false;
        }
        return utf8BytesMatchText(handLabelBytesCache, name);
    }

    //% block="get gesture %data value from image"
    //% data.defl=PlanetX_AILens.HandValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=88
    //% group="Gesture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerGestureValue(data: HandValue = HandValue.X): number {
        if (data == HandValue.X) {
            return handCenterXCache;
        }
        if (data == HandValue.Y) {
            return handCenterYCache;
        }
        if (data == HandValue.Width) {
            return handWidthCache;
        }
        if (data == HandValue.Height) {
            return handHeightCache;
        }
        if (data == HandValue.Confidence) {
            return handSimilarityCache;
        }
        return handIdCache;
    }

    //% block="get gesture name from image"
    //% weight=87
    //% group="Gesture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerGestureName(): string {
        return handLabelCache;
    }

    //% block="image contains human posture"
    //% weight=90
    //% group="Posture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsPosture(): boolean {
        return postureRecordCountCache > 0;
    }

    //% block="posture from image is %posture"
    //% posture.defl=PlanetX_AILens.PostureType.Standing
    //% posture.fieldEditor="gridpicker"
    //% posture.fieldOptions.columns=3
    //% weight=89
    //% group="Posture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerPostureIs(posture: PostureType = PostureType.Standing): boolean {
        const offset = nearestPostureTargetOffset();
        return offset >= 0 && (postureTargetsCache[offset + 1] & 0xFF) == postureTypeId(posture);
    }

    //% block="get human posture %data value from image"
    //% data.defl=PlanetX_AILens.PostureValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=88
    //% group="Posture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerPostureValue(data: PostureValue = PostureValue.X): number {
        return postureValueAt(nearestPostureTargetOffset(), data);
    }

    //% block="get human posture name from image"
    //% weight=87
    //% group="Posture recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerPostureName(): string {
        return postureNameAt(nearestPostureTargetOffset());
    }

    //% block="image contains %objectClass"
    //% objectClass.defl=PlanetX_AILens.ObjectClass.Any
    //% objectClass.fieldEditor="gridpicker"
    //% objectClass.fieldOptions.columns=6
    //% weight=90
    //% group="Object recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsObject(objectClass: ObjectClass = ObjectClass.Any): boolean {
        return objectOffsetByClass(objectClass) >= 0;
    }

    //% block="get total number of recognized objects from image"
    //% weight=89
    //% group="Object recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageObjectCount(): number {
        return objectCountCache;
    }

    //% block="get object %data value from image"
    //% data.defl=PlanetX_AILens.ObjectValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=88
    //% group="Object recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerObjectValue(data: ObjectValue = ObjectValue.X): number {
        const offset = nearestObjectOffset();
        if (offset < 0) {
            return 0;
        }
        if (data == ObjectValue.X) {
            return u16le(objectTargetsCache, offset + 2);
        }
        if (data == ObjectValue.Y) {
            return u16le(objectTargetsCache, offset + 4);
        }
        if (data == ObjectValue.Width) {
            return u16le(objectTargetsCache, offset + 6);
        }
        if (data == ObjectValue.Height) {
            return u16le(objectTargetsCache, offset + 8);
        }
        if (data == ObjectValue.Confidence) {
            return minNumber((objectTargetsCache[offset + 1] & 0xFF) / 100.0, 1.0);
        }
        return objectTargetsCache[offset] & 0xFF;
    }

    //% block="get object name from image"
    //% weight=87
    //% group="Object recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function centerObjectName(): string {
        const offset = nearestObjectOffset();
        if (offset < 0) {
            return "";
        }
        const index = (offset / OBJECT_TARGET_STRIDE) | 0;
        return index < objectLabelsCache.length ? objectLabelsCache[index] : "";
    }

    //% block="start tracking selected object top left X %x1 top left Y %y1 bottom right X %x2 bottom right Y %y2"
    //% x1.min=0 x1.max=640 x1.defl=220
    //% y1.min=0 y1.max=480 y1.defl=140
    //% x2.min=0 x2.max=640 x2.defl=420
    //% y2.min=0 y2.max=480 y2.defl=340
    //% weight=90
    //% group="Object tracking"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function startObjectTracking(x1: number = 220, y1: number = 140,
                                        x2: number = 420, y2: number = 340): void {
        if (!isCameraReady()) {
            return;
        }
        const left = minNumber(640, maxNumber(0, x1 | 0));
        const top = minNumber(480, maxNumber(0, y1 | 0));
        const right = minNumber(640, maxNumber(0, x2 | 0));
        const bottom = minNumber(480, maxNumber(0, y2 | 0));
        const payload = pins.createBuffer(9);
        payload[0] = 1;
        putU16le(payload, 1, left);
        putU16le(payload, 3, top);
        putU16le(payload, 5, right);
        putU16le(payload, 7, bottom);
        clearTrackingResultCache();
        sendUartCommandBuffer(UART_CMD_OBJECT_TRACKING_CTRL, payload);
    }

    //% block="stop object tracking"
    //% weight=89
    //% group="Object tracking"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function stopObjectTracking(): void {
        if (!isCameraReady()) {
            return;
        }
        sendUartCommandArray(UART_CMD_OBJECT_TRACKING_CTRL, [0]);
        clearTrackingResultCache();
    }

    //% block="object tracking is running"
    //% weight=88
    //% group="Object tracking"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function objectTrackingRunning(): boolean {
        return trackingRecordCountCache > 0;
    }

    //% block="object tracking target is lost"
    //% weight=87
    //% group="Object tracking"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function objectTrackingTargetLost(): boolean {
        const offset = trackingTargetOffset(1);
        return offset >= 0 && (trackingTargetsCache[offset + 2] & 0xFF) != 0;
    }

    //% block="get object tracking target %data value"
    //% data.defl=PlanetX_AILens.ObjectTrackingValue.X
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=86
    //% group="Object tracking"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function trackingTargetValue(data: ObjectTrackingValue = ObjectTrackingValue.X): number {
        const offset = trackingTargetOffset(1);
        if (offset < 0) {
            return 0;
        }
        if (data == ObjectTrackingValue.X) {
            return u16le(trackingTargetsCache, offset + 3);
        }
        if (data == ObjectTrackingValue.Y) {
            return u16le(trackingTargetsCache, offset + 5);
        }
        if (data == ObjectTrackingValue.Width) {
            return u16le(trackingTargetsCache, offset + 7);
        }
        if (data == ObjectTrackingValue.Height) {
            return u16le(trackingTargetsCache, offset + 9);
        }
        return minNumber((trackingTargetsCache[offset + 1] & 0xFF) / 100.0, 1.0);
    }

    //% block="get black line offset %data value from image"
    //% data.defl=PlanetX_AILens.LineValue.Angle
    //% weight=90
    //% group="Line recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function blackLineValue(data: LineValue = LineValue.Angle): number {
        return data == LineValue.Angle ? i16le(lineResultCache, 16) : i16le(lineResultCache, 14);
    }

    //% block="image contains black line offset %direction || center range ± %centerRange degrees"
    //% direction.defl=PlanetX_AILens.LineDirection.Center
    //% direction.fieldEditor="gridpicker"
    //% direction.fieldOptions.columns=3
    //% centerRange.min=0 centerRange.max=90 centerRange.defl=10
    //% inlineInputMode=inline
    //% weight=89
    //% group="Line recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsBlackLine(direction: LineDirection = LineDirection.Center,
                                           centerRange: number = 10): boolean {
        if (lineDetectedCache == 0) {
            return false;
        }
        const range = minNumber(90, maxNumber(0, centerRange | 0));
        const angle = i16le(lineResultCache, 16);
        if (direction == LineDirection.Center) {
            return angle >= -range && angle <= range;
        }
        return direction == LineDirection.Left ? angle < -range : angle > range;
    }

    //% block="image contains text"
    //% weight=90
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsText(): boolean {
        return ocrStatusCache == 1 && ocrTextCache.length > 0;
    }

    //% block="text content from image is %text"
    //% text.defl="text"
    //% weight=89
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageTextEquals(text: string): boolean {
        return imageContainsText() && utf8BytesMatchText(ocrTextBytesCache, text);
    }

    //% block="get text content %data value from image"
    //% data.defl=PlanetX_AILens.OcrValue.Length
    //% weight=88
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageTextValue(data: OcrValue = OcrValue.Length): number {
        return data == OcrValue.Confidence ? ocrConfidenceCache : ocrTextLengthCache;
    }

    //% block="get text content from image"
    //% weight=87
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageText(): string {
        return imageContainsText() ? ocrTextCache : "";
    }

    //% block="image contains %type"
    //% type.defl=PlanetX_AILens.CodeType.Any
    //% type.fieldEditor="gridpicker"
    //% type.fieldOptions.columns=3
    //% weight=90
    //% group="Code recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsCode(type: CodeType = CodeType.Any): boolean {
        if (codeDetectedCache == 0 || codeContentBytesCache.length == 0) {
            return false;
        }
        return type == CodeType.Any || codeTypeCache == (type as number);
    }

    //% block="recognized code content is %content"
    //% content.defl="text"
    //% weight=89
    //% group="Code recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageCodeEquals(content: string): boolean {
        return imageContainsCode(CodeType.Any)
            && utf8BytesMatchText(codeContentBytesCache, content);
    }

    //% block="get recognized code content"
    //% weight=88
    //% group="Code recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageCode(): string {
        return imageContainsCode(CodeType.Any) ? codeContentCache : "";
    }

    //% block="set OCR region top left X %x1 top left Y %y1 bottom right X %x2 bottom right Y %y2"
    //% x1.min=0 x1.max=640 x1.defl=0
    //% y1.min=0 y1.max=480 y1.defl=0
    //% x2.min=0 x2.max=640 x2.defl=640
    //% y2.min=0 y2.max=480 y2.defl=480
    //% weight=86
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function setOcrRegion(x1: number = 0, y1: number = 0,
                                 x2: number = 640, y2: number = 480): void {
        if (!isCameraReady()) {
            return;
        }
        sendOcrRegion(x1, y1, x2, y2);
    }

    //% block="clear OCR region"
    //% weight=85
    //% group="OCR"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function resetOcrRegion(): void {
        if (!isCameraReady()) {
            return;
        }
        clearOcrRegionInternal();
    }

    //% block="learn center object as ID %ID"
    //% ID.min=1 ID.max=30 ID.defl=1
    //% weight=90
    //% group="Self learning"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function learnCenterObjectAs(ID: number = 1): void {
        if (!isCameraReady()) {
            return;
        }
        const targetId = ID | 0;
        if (targetId < 1 || targetId > 30) {
            return;
        }
        sendUartCommandArray(UART_CMD_SELF_LEARN_CTRL, [1, targetId]);
    }

    //% block="clear learned object %ID"
    //% ID.min=0 ID.max=30 ID.defl=0
    //% weight=89
    //% group="Self learning"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function clearLearnedObject(ID: number = 0): void {
        if (!isCameraReady()) {
            return;
        }
        const targetId = ID | 0;
        if (targetId < 0 || targetId > 30) {
            return;
        }
        sendUartCommandArray(UART_CMD_SELF_LEARN_CTRL, [2, targetId]);
    }

    //% block="image contains learned object %ID"
    //% ID.min=0 ID.max=30 ID.defl=0
    //% weight=88
    //% group="Self learning"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function imageContainsLearnedObject(ID: number = 0): boolean {
        const targetId = ID | 0;
        if (targetId == 0) {
            return selfLearnStatusCache != 0 && selfLearnIdCache > 0;
        }
        return selfLearnStatusCache != 0 && selfLearnIdCache == targetId;
    }

    //% block="get learned object %data value from image"
    //% data.defl=PlanetX_AILens.SelfLearnValue.Id
    //% weight=87
    //% group="Self learning"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function learnedObjectValue(data: SelfLearnValue = SelfLearnValue.Id): number {
        return data == SelfLearnValue.Confidence ? selfLearnSimilarityCache : selfLearnIdCache;
    }

    //% block="recognize audio at path %path"
    //% path.defl="/sound_touch/test.wav"
    //% weight=90
    //% group="Rhythm recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function recognizeAudioPath(path: string): void {
        if (!isCameraReady()) {
            return;
        }
        const text = ("" + path).trim();
        if (!text) {
            return;
        }
        const body = utf8Encode(text);
        const bodyLen = minNumber(248, body.length);
        const payload = pins.createBuffer(1 + bodyLen);
        payload[0] = bodyLen & 0xFF;
        for (let i = 0; i < bodyLen; i++) {
            payload[i + 1] = body[i];
        }
        if (sendUartCommandBuffer(0x37, payload)) {
            basic.pause(30);
            sendUartCommandArray(0x3A, [1]);
        }
    }

    //% block="record for %seconds seconds and recognize"
    //% seconds.min=0 seconds.max=25 seconds.defl=10
    //% weight=89
    //% group="Rhythm recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function recordAndRecognizeRhythm(seconds: number = 10): void {
        if (!isCameraReady() || soundTouchRecordingTaskActive) {
            return;
        }
        const duration = minNumber(25, maxNumber(0, seconds | 0));
        if (duration == 0) {
            return;
        }
        soundTouchRecordingTaskActive = true;
        control.inBackground(function () {
            sendUartCommandArray(UART_CMD_SOUND_TOUCH_CTRL, [0x03]);
            basic.pause(duration * 1000);
            sendUartCommandArray(UART_CMD_SOUND_TOUCH_CTRL, [0x02]);
            soundTouchRecordingTaskActive = false;
        });
    }

    //% block="rhythm recognition succeeded"
    //% weight=88
    //% group="Rhythm recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function rhythmRecognitionSucceeded(): boolean {
        return soundTouchStatusCache == 1;
    }

    //% block="current rhythm %data value"
    //% data.defl=PlanetX_AILens.SoundTouchValue.Bpm
    //% data.fieldEditor="gridpicker"
    //% data.fieldOptions.columns=3
    //% weight=87
    //% group="Rhythm recognition"
    //% subcategory="AI Lens Pro"
    //% color=#1C7ED6
    export function currentRhythmValue(data: SoundTouchValue = SoundTouchValue.Bpm): number {
        if (data == SoundTouchValue.Bpm) {
            return soundTouchBpmCache;
        }
        if (data == SoundTouchValue.BeatCount) {
            return soundTouchBeatCountCache;
        }
        return soundTouchDurationSecCache;
    }
}

/************************************************************************
 * ASR
 ************************************************************************/
namespace PlanetX_AILens {
    export enum vocabularyList {
        //% block="Hi, Shaun"
        Hi_Shaun = 1,
        //% block="Lights on"
        Turn_on_lights = 16,
        //% block="Lights off"
        Turn_off_lights = 17,
        //% block="Turn left"
        Turn_left = 18,
        //% block="Turn right"
        Turn_right = 19,
        //% block="Full speed ahead"
        Go_forward = 20,
        //% block="Reversing"
        Go_Backwards = 21,
        //% block="Line Tracking"
        Line_tacking = 22,
        //% block="Avoid object"
        Avoid_object = 23,
        //% block="Stop"
        Stop_car = 24,
        //% block="Start device"
        Start_device = 32,
        //% block="Turn off device"
        Close_device = 33,
        //% block="Pause"
        Pause_device = 34,
        //% block="Keep going"
        Keep_going = 35,
        //% block="Raise a level"
        Add_a_level = 36,
        //% block="Lower a level"
        Lower_a_level = 37,
        //% block="Music on"
        Music_on = 38,
        //% block="Music off"
        Music_off = 39,
        //% block="Switch music"
        Switch_music = 40,
        //% block="Execute function one"
        Execute_function_one = 49,
        //% block="Execute function two"
        Execute_function_two = 50,
        //% block="Learning entry 1"
        Learning_entry_1 = 80,
        //% block="Learning entry 2"
        Learning_entry_2 = 81,
        //% block="Learning entry 3"
        Learning_entry_3 = 82,
        //% block="Learning entry 4"
        Learning_entry_4 = 83,
        //% block="Learning entry 5"
        Learning_entry_5 = 84,
        //% block="Learning entry 6"
        Learning_entry_6 = 85,
        //% block="Learning entry 7"
        Learning_entry_7 = 86,
        //% block="Learning entry 8"
        Learning_entry_8 = 87,
        //% block="Learning entry 9"
        Learning_entry_9 = 88,
        //% block="Learning entry 10"
        Learning_entry_10 = 89
    }

    let asrEventId = 3500
    let lastvoc = 0
    let vocInitFlag = 0

    //% block="ASR sensor hear %vocabulary"
    //% subcategory=ASR group="IIC Port"
    //% vocabulary.fieldEditor="gridpicker" vocabulary.fieldOptions.columns=3
    //% color=#00B1ED
    export function onASR(vocabulary: vocabularyList, handler: () => void) {
        control.onEvent(asrEventId, vocabulary, handler);
        if (!vocInitFlag) {
            vocInitFlag = 1;
            control.inBackground(() => {
                while (true) {
                    const voc = pins.i2cReadNumber(0x0B, 1)
                    if (voc != lastvoc) {
                        lastvoc = voc
                        control.raiseEvent(asrEventId, lastvoc);
                    }
                    basic.pause(50);
                }
            })
        }
    }

    //% block="ASR sensor enter learning-model"
    //% subcategory=ASR group="IIC Port"
    //% color=#00B1ED
    export function setASRLearn(): void {
        pins.i2cWriteNumber(0x0B, 0x50, NumberFormat.Int8LE)
    }

    //% block="ASR sensor clear learned entrys"
    //% subcategory=ASR group="IIC Port"
    //% color=#00B1ED
    export function delASRLearn(): void {
        pins.i2cWriteNumber(0x0B, 0x60, NumberFormat.Int8LE)
    }
}
