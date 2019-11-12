## Start Canvas

```js
import CanvasSetup from './CanvasSetup'

const settings = {
  full: true // canvas on full screen
}

const sketch = ({ ctx, width, height }) => {
  const initial = (width, height) => {
    // for initial data
  }
  const draw = () => {
    // draw
  }

  const update = () => {
    // update data
  }

  initial(width, height)
  
  // Event listener for responsive canvas
  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    initial(width, height)
  })

  return () => {
    draw()
    update()
  }
}

CanvasSetup(sketch, settings)

```