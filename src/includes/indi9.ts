import { CRuntime, Variable, ArrayVariable, FloatVariable } from '../rt';

export = {
    load(rt: CRuntime) {
        const canvas = document.getElementById("gamecanvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        const _alo = function(rt: CRuntime, _this: Variable) {
            window.alert("Alo mundo");
        }
        rt.regFunc(_alo, "global", "alo", [], rt.voidTypeLiteral);

        const _fillRect = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            console.log("fillRect: ", x.v, y.v, w.v, h.v, colorValue);
            ctx.fillStyle = colorValue
            ctx.beginPath()
            ctx.rect(x.v, y.v, w.v, h.v)
            ctx.fill()
        }
        rt.regFunc(_fillRect, "global", "fillRect", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawRect = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            console.log("drawRect: ", x.v, y.v, w.v, h.v, colorValue);
            ctx.lineWidth = 1
            ctx.strokeStyle = colorValue
            ctx.beginPath()
            ctx.rect(x.v, y.v, w.v, h.v)
            ctx.stroke()
        }
        rt.regFunc(_drawRect, "global", "drawRect", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

        const _drawLine = function (rt: CRuntime, _this: Variable, x: FloatVariable, y: FloatVariable, w: FloatVariable, h: FloatVariable, color: ArrayVariable) {
            const colorValue = rt.getStringFromCharArray(color)
            console.log("drawLine: ", x.v, y.v, w.v, h.v, colorValue);
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
            console.log("drawImage", imageValue, x.v, y.v)
            const imageElem = document.getElementById(imageValue) as CanvasImageSource;
            ctx.beginPath()
            ctx.drawImage(imageElem, x.v, y.v);
            ctx.fill()
        }
        rt.regFunc(_drawImage, "global", "drawImage", [rt.normalPointerType(rt.charTypeLiteral), rt.doubleTypeLiteral, rt.doubleTypeLiteral], rt.voidTypeLiteral)

        const _drawText = function (rt: CRuntime, _this: Variable, text: ArrayVariable, x: FloatVariable, y: FloatVariable, size: FloatVariable, color: ArrayVariable) {
            const textValue = rt.getStringFromCharArray(text)
            const colorValue = rt.getStringFromCharArray(color)
            console.log("drawText", textValue, x.v, y.v, size.v, colorValue)
            
            ctx.fillStyle = colorValue
            ctx.font = "" + size.v + "px Arial"
            ctx.fillText(textValue, x.v, y.v)
        }
        rt.regFunc(_drawText, "global", "drawText", [rt.normalPointerType(rt.charTypeLiteral), rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)

    }
};

