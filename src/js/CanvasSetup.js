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

function CanvasSetup (sketch, settings) {
  settings = {
    element: null,
    width: 640,
    height: 480,
    full: false,
    bg: 'hsl(90, 90%, 90%)',
    resize: true,
    clear: true,
    loop: true,
    onResize() {},
    ...settings
  }

  let canvas, ctx, width, height

  if (settings.element !== null) {
    canvas = document.querySelector(settings.element)
    if (!canvas) {
      throw Error (`Element "${settings.element}" was not found`)
    }
  } else {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
  }

  ctx = canvas.getContext('2d')

  if (settings.full) {
    width = window.innerWidth
    height = window.innerHeight
  } else {
    width = settings.width > window.innerWidth ? window.innerWidth : settings.width
    height = width * settings.height / settings.width
  }

  scaleCanvas(canvas, ctx, width, height)

  const args = {
    ...settings,
    canvas,
    ctx,
    width,
    height
  }

  // Added Events on resize
  if (settings.full) {
    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      scaleCanvas(canvas, ctx, width, height)
      settings.onResize({ ...args, width, height })
    })
  } else if (settings.resize) {
    window.addEventListener('resize', () => {
      width = settings.width > window.innerWidth ? window.innerWidth : settings.width
      height = width * settings.height / settings.width
      scaleCanvas(canvas, ctx, width, height)
      settings.onResize({ ...args, width, height })
    })
  }

  const clearCanvas = (width, height) => {
    const { fillStyle }  = ctx
    ctx.fillStyle = settings.bg
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = fillStyle
  }

  const main = sketch(args)

  const render = (step) => {
    if (settings.clear) clearCanvas(width, height)
    main(step)
    if (settings.loop) requestAnimationFrame(render)
  }

  clearCanvas(width, height)
  render()
}

export default CanvasSetup
