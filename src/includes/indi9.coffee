module.exports = load: (rt) ->
  canvas = document.getElementById("gamecanvas")
  ctx = canvas.getContext("2d")

  _fillRect = (rt, _this, x, y, w, h, color) ->
    colorValue = rt.getStringFromCharArray(color)
    console.log("fillRect: ", x.v, y.v, w.v, h.v, colorValue)
    ctx.fillStyle = colorValue
    ctx.beginPath()
    ctx.rect(x.v, y.v, w.v, h.v)
    ctx.fill()
  rt.regFunc(_fillRect, "global", "fillRect", [rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.doubleTypeLiteral, rt.normalPointerType(rt.charTypeLiteral)], rt.voidTypeLiteral)
