(function () {
    'use strict';

    class die extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.tvS = null;
            this.liveTime = 0;
        }
        onAwake() {
            this.tvS = this.owner.getChildByName("tvvalue");
            this.tvS.text = "鑫荣活了：" + window.liveTime + "秒";
            window.liveTime = 0;
            var bt = this.owner.getChildByName("bt");
            bt.clickHandler = new Laya.Handler(this, this.onClickButton, [bt]);
        }
        onClickButton(button) {
            Laya.Scene.open("main.scene", true);
        }
        onEnable() {
        }
        onDisable() {
        }
    }

    class test extends Laya.Script {
        constructor() {
            super();
            this.speed = 5;
            this.wDown = false;
            this.sDown = false;
            this.aDown = false;
            this.dDown = false;
            this.spaceDown = false;
            this.liveStart = 0;
            this.lastTx = 0;
            this.lastTy = 0;
        }
        onAwake() {
            this.lab = this.owner;
            this.liveStart = new Date().getSeconds();
            console.log(this.liveStart);
            window.liveTime = 0;
        }
        onEnable() {
        }
        onDisable() {
        }
        onStageMouseMove(e) {
            if (this.lastTx == 0 && this.lastTy == 0) {
            }
            this.lab.x = e.stageX;
            this.lab.y = e.stageY;
        }
        onKeyDown(e) {
            switch (e.keyCode) {
                case 87:
                    this.wDown = true;
                    break;
                case 65:
                    this.aDown = true;
                    break;
                case 83:
                    this.sDown = true;
                    break;
                case 68:
                    this.dDown = true;
                    break;
            }
        }
        onKeyUp(e) {
            switch (e.keyCode) {
                case 87:
                    this.wDown = false;
                    break;
                case 65:
                    this.aDown = false;
                    break;
                case 83:
                    this.sDown = false;
                    break;
                case 68:
                    this.dDown = false;
                    break;
            }
        }
        onTriggerEnter(other, self, contact) {
            window.liveTime = new Date().getSeconds() - this.liveStart;
            Laya.Scene.open("die.scene", true, new Date().getMilliseconds() - this.liveStart);
        }
        onUpdate() {
            if (this.wDown) {
                this.lab.y -= this.speed;
            }
            else if (this.sDown) {
                this.lab.y += this.speed;
            }
            if (this.aDown) {
                this.lab.x -= this.speed;
            }
            else if (this.dDown) {
                this.lab.x += this.speed;
            }
        }
    }

    class init extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.zd = null;
            this.zdSet = new Set();
            this.times = 0;
            this.width = 640;
            this.height = 640;
            this.cd = 20;
        }
        onAwake() {
            console.log("init onAwake");
        }
        onEnable() {
        }
        onDisable() {
        }
        createZd() {
            var zdSprite = this.zd.create();
            var zdScript = zdSprite.getComponent(Laya.Script);
            zdScript.initPositon(this.width, this.height);
            this.zdSet.add(zdSprite);
            this.owner.addChild(zdSprite);
        }
        moveZd() {
            this.zdSet.forEach(function (item) {
            });
        }
        onUpdate() {
            this.times++;
            if (this.times % this.cd == 0) {
                this.createZd();
            }
            this.cd = 20 - Math.round(this.times / 300);
            console.log(this.cd);
            if (this.cd < 2) {
                this.cd = 2;
            }
            this.moveZd();
        }
    }

    class zd extends Laya.Script {
        constructor() {
            super();
            this.endY = 1000;
            this.endX = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.width = 0;
            this.height = 0;
            this.speed = 8;
            this.arrow = 0;
            this.startX = 0;
            this.startY = 0;
        }
        onAwake() {
            this.zdSprite = this.owner;
            var inX = Math.random() > 0.5;
            var inY = Math.random() > 0.5;
            if (inX) {
                this.startX = Math.random() * this.width;
                this.startY = inY ? 0 : this.height;
                this.endX = Math.random() * this.width;
                this.endY = inY ? this.height : 0;
            }
            else {
                this.startX = inY ? 0 : this.width;
                this.startY = Math.random() * this.height;
                this.endY = Math.random() * this.height;
                this.endX = inY ? this.width : 0;
            }
            this.zdSprite.x = this.startX;
            this.zdSprite.y = this.startY;
            this.arrow = Math.abs((this.zdSprite.x - this.zdSprite.y) / (this.endX - this.endY));
        }
        onEnable() {
        }
        onDisable() {
        }
        initPositon(width, height) {
            this.width = width;
            this.height = height;
        }
        onUpdate() {
            if (this.startX > this.endX) {
                this.zdSprite.x -= this.speed;
            }
            else {
                this.zdSprite.x += this.speed;
            }
            if (this.startY > this.endY) {
                this.zdSprite.y -= this.arrow * this.speed;
            }
            else {
                this.zdSprite.y += this.arrow * this.speed;
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("die.ts", die);
            reg("test.ts", test);
            reg("init.ts", init);
            reg("zd.ts", zd);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
