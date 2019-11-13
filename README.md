# Start Canvas

Function that helps to quickly prepare canvas for creating ideas

## Quick start
```js
import CanvasSetup from './CanvasSetup'

const sketch = ({ ctx, width, height }) => {
  let x = 0
  return () => {
    ctx.fillRect(x++, height / 2, 100, 100)
  }
}

CanvasSetup(sketch, {})
```

## Settings
```js
const settings = {
    element: null,    // element of canvas
    width:   640,     // width of canvas
    height:  480,     // height of canvas
    bg:      'white', // default background of canvas
    full:    false,   // canvas on full screen
    resize:  true,    // resize 
    clear:   true,    // clear canvas on every loop
    loop:    true,    // infinity loop on requestAnimationFrame
    onResize() {}     // method 
}
```

### Example: on full screen
```js
import CanvasSetup from './CanvasSetup'

const settings = {
  full: true,
  clear: false,
  onResize ({ width, height }) {
    startPoint(width, height)
  }
}

let screenX, screenY, x, y, dirX, dirY, speed, size
const startPoint = (width, height) => {
  [x, y, dirX, dirY, speed, size] = [0, 0, 1, 1, 8, 100]
  screenX = width
  screenY = height
}

const sketch = ({ ctx, width, height }) => {
  const draw = () => {
    ctx.strokeRect(x, y, 100, 100)
  }

  const update = () => {
    if (x > screenX - size || x < 0) dirX *= -1
    if (y > screenY - size || y < 0) dirY *= -1
    x = x + dirX * speed
    y = y + dirY * speed
  }

  startPoint(width, height)

  return () => {
    draw()
    update()
  }
}

CanvasSetup(sketch, settings)
```
