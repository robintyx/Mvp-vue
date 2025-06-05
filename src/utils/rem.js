// 设置 rem 函数 PC端
function setRem() {
  const baseSize = $config.pxtorem.baseSize
  const basePc = baseSize / $config.pxtorem.uiSize
  let vW = window.innerWidth
  const vH = window.innerHeight
  // 非正常屏幕下的尺寸换算
  const dueH = (vW * $config.pxtorem.uiHSize) / $config.pxtorem.uiSize
  if (vH < dueH) {
    // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
    vW = (vH * $config.pxtorem.uiSize) / $config.pxtorem.uiHSize
  }
  const rem = vW * basePc // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
  document.documentElement.style.fontSize = rem + 'px'
}
// 初始化
if ($config.pxtorem.open) {
  setRem()
}
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  if ($config.pxtorem.open) {
    setRem()
  }
}
