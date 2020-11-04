import { IntVariable } from '../rt';
import { CRuntime, Variable, ArrayVariable, FloatVariable } from '../rt';

export = {
    load(rt: CRuntime) {
        const canvas = document.getElementById("gamecanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const resourceRegistry = {
            totalResources: 0,
            loadedResources: 0,
            promises: [] as Promise<unknown>[]
        };

        const keyState = {} as {[index: string]: boolean};
        canvas.addEventListener("keyup", (e: KeyboardEvent) => {
            keyState[e.key] = false;
        });
        canvas.addEventListener("keydown", (e: KeyboardEvent) => {
            e.preventDefault();
            if (!e.repeat) {
                keyState[e.key] = true;
            }
        });

        let lastKeyPressed: string = undefined;

        const _alo = function(rt: CRuntime, _this: Variable) {
            window.alert("Alo mundo");
        }
        rt.regFunc(_alo, "global", "alo", [], rt.voidTypeLiteral);

        const _readKey = function(rt: CRuntime, _this: Variable) {
            (<any>window).debuggerPromise = new Promise((resolve, reject) => {
                canvas.addEventListener("keydown", (e: KeyboardEvent) => {
                    lastKeyPressed = e.key;
                    window.removeEventListener("keydown", this);
                    resolve()
                }, {once: true});
            })
        }
        rt.regFunc(_readKey, "global", "readKey", [], rt.voidTypeLiteral);

        const _lastKey = function(rt: CRuntime, _this: Variable) {
            return rt.makeCharArrayFromString(lastKeyPressed);
        }
        rt.regFunc(_lastKey, "global", "lastKey", [], rt.normalPointerType(rt.charTypeLiteral));

        const _canvasWidth = function(rt: CRuntime, _this: Variable) {
            return rt.val(rt.doubleTypeLiteral, canvas.width);
        }
        rt.regFunc(_canvasWidth, "global", "canvasWidth", [], rt.doubleTypeLiteral);

        const _canvasHeight = function(rt: CRuntime, _this: Variable) {
            return rt.val(rt.doubleTypeLiteral, canvas.height);
        }
        rt.regFunc(_canvasHeight, "global", "canvasHeight", [], rt.doubleTypeLiteral);

        const _clear = function(rt: CRuntime, _this: Variable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            ctx.fillStyle = colorValue
            ctx.beginPath()
            ctx.rect(0, 0, canvas.width, canvas.height)
            ctx.fill()
        }
        rt.regFunc(_clear, "global", "clear", [rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral); 

        const _isKeyDown = function(rt: CRuntime, _this: Variable, key: ArrayVariable) {
            const keyValue = rt.getStringFromCharArray(key);
            const ret = keyState[keyValue] ? true : false;
            return rt.val(rt.boolTypeLiteral, ret);
        }
        rt.regFunc(_isKeyDown, "global", "isKeyDown", [rt.normalPointerType(rt.charTypeLiteral)], rt.boolTypeLiteral);

        const _clearKey = function(rt: CRuntime, _this: Variable, key: ArrayVariable) {
            const keyValue = rt.getStringFromCharArray(key);
            if (keyState.hasOwnProperty(keyValue)) {
                keyState[keyValue] = false;
            }
        }
        rt.regFunc(_clearKey, "global", "clearKey", [rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral);

        const _fillRect = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            ctx.fillStyle = colorValue
            ctx.beginPath()
            ctx.rect(x.v, y.v, w.v, h.v)
            ctx.fill()
        }
        rt.regFunc(_fillRect, "global", "fillRect", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawRect = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            ctx.lineWidth = 1
            ctx.strokeStyle = colorValue
            ctx.beginPath()
            ctx.rect(x.v, y.v, w.v, h.v)
            ctx.stroke()
        }
        rt.regFunc(_drawRect, "global", "drawRect", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawLine = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            ctx.lineWidth = 1
            ctx.strokeStyle = colorValue
            ctx.beginPath()
            ctx.moveTo(x.v, y.v)
            ctx.lineTo(w.v, h.v)
            ctx.stroke()
        }
        rt.regFunc(_drawLine, "global", "drawLine", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawImage = function (rt: CRuntime, _this: Variable, image: ArrayVariable, x: FloatVariable, y: FloatVariable) {
            const imageValue = rt.getStringFromCharArray(image)
            const imageElem = document.getElementById(imageValue) as CanvasImageSource;
            if (imageElem) {
                ctx.beginPath()
                ctx.drawImage(imageElem, x.v, y.v);
                ctx.fill()
            } else {
                console.error(`Image "${imageValue}" not found.`);
            }
        }
        rt.regFunc(_drawImage, "global", "drawImage", [rt.normalPointerType(rt.charTypeLiteral), rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral)

        const doDrawText = function (text: string, x: number, y: number, size: number, color: string) {
            ctx.fillStyle = color
            ctx.font = "" + size + "px Arial"
            ctx.fillText(text, x, y)
        }

        const _drawText = function (rt: CRuntime, _this: Variable, text: ArrayVariable, x: FloatVariable, y: FloatVariable, size: FloatVariable, color: ArrayVariable) {
            const textValue = rt.getStringFromCharArray(text)
            const colorValue = rt.getStringFromCharArray(color)
            doDrawText(textValue, x.v, y.v, size.v, colorValue);
        }
        rt.regFunc(_drawText, "global", "drawText", [rt.normalPointerType(rt.charTypeLiteral), rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawTextDouble = function (rt: CRuntime, _this: Variable, text: IntVariable, x: FloatVariable, y: FloatVariable, size: FloatVariable, color: ArrayVariable) {
            const textValue = "" + text.v;
            const colorValue = rt.getStringFromCharArray(color)
            doDrawText(textValue, x.v, y.v, size.v, colorValue);
        }
        rt.regFunc(_drawTextDouble, "global", "drawText", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _waitUntilResourcesLoad = function (rt: CRuntime, _this: Variable) {
            (<any>window).debuggerPromise = Promise.all(resourceRegistry.promises);
        }
        rt.regFunc(_waitUntilResourcesLoad, "global", "waitUntilResourcesLoad", [], rt.voidTypeLiteral)

        const _loadImage = function (rt: CRuntime, _this: Variable, id: ArrayVariable, url: ArrayVariable) {
            const idValue = rt.getStringFromCharArray(id)
            const urlValue = rt.getStringFromCharArray(url)
            if (document.getElementById(idValue)) {
                console.error(`Id "${idValue}" already exists on page.`)
            } else {
                var elem = document.createElement("img") as HTMLImageElement
                elem.src = urlValue
                elem.setAttribute("id", idValue);
                elem.setAttribute("style", "display: none")
                document.body.appendChild(elem)

                resourceRegistry.totalResources++;
                resourceRegistry.promises.push(
                    new Promise((resolve, reject) => {
                        elem.onload = function () {
                            resourceRegistry.loadedResources++;
                            resolve();
                        };
                    })
                )
            }
        }
        rt.regFunc(_loadImage, "global", "loadImage", [rt.normalPointerType(rt.charTypeLiteral), rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _delay = function(rt: CRuntime, _this: Variable, ms: IntVariable) {
            (<any>window).debuggerPromise = new Promise(f => setTimeout(f, ms.v));
        }
        rt.regFunc(_delay, "global", "delay", [rt.intTypeLiteral], rt.voidTypeLiteral);
    }
};

