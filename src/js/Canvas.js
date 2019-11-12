function scaleCanvas (canvas, ctx, width, height) {
  // assume the device pixel ratio is 1 if the browser doesn't specify it
  const devicePixelRatio = window.devicePixelRatio || 1

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio = (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1
  )

  // determine the actual ratio we want to draw at
  const ratio = devicePixelRatio / backingStoreRatio

  if (devicePixelRatio !== backingStoreRatio) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio
    canvas.height = height * ratio

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
  } else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width
    canvas.height = height
    canvas.style.width = ''
    canvas.style.height = ''
  }

  // scale the drawing context so everything will work at the higher ratio
  ctx.scale(ratio, ratio)
}


function Canvas (sketch, settings) {
  settings = {
    element: 'canvas',
    width: 500,
    height: 500,
    full: false,
    background: 'white',
    resize: false,
    ...settings
  }

  let canvas, ctx

  canvas = document.querySelector(settings.element)

  if (!canvas) {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
  }

  ctx = canvas.getContext('2d')

  if (settings.full) {
    settings.width = window.innerWidth
    settings.height = window.innerHeight
    window.addEventListener('resize', () => {
      settings.width = window.innerWidth
      settings.height = window.innerHeight
      scaleCanvas(canvas, ctx, window.innerWidth, window.innerHeight)
    })
  }

  scaleCanvas(canvas, ctx, settings.width, settings.height)

  const clear = (width, height) => {
    const { fillStyle }  = ctx
    ctx.fillStyle = settings.background
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = fillStyle
  }

  const loop = sketch({
    ...settings,
    canvas,
    ctx
  })

  const render = (step) => {
    clear(settings.width, settings.height)
    loop(step)
    requestAnimationFrame(render)
  }

  render()
}

export default Canvas
