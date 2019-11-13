import CanvasSetup from './CanvasSetup'

const settings = {
  full: true,
  onResize ({ width, height }) {
    startPoint(width, height)
  }
}

let distance, size, speed, dir, dots

const startPoint = (width, height) => {
  distance = 100
  size = 50
  speed = 8
  dir = 1
  dots = []
  for (let i = size; i < width; i += distance) {
    for (let j = size; j < height; j += distance) {
      dots.push({
        x: i,
        y: j
      })
    }
  }
}

const sketch = ({ ctx, width, height }) => {
  const draw = () => {
    dots.forEach(dot => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, size, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
    })
  }

  const update = () => {
    const centerDot = dots[Math.floor(dots.length / 2)]
    if (centerDot.x > width || centerDot.x < 0) dir *= -1
    dots.forEach(dot => {
      dot.x = dot.x + dir * speed
      dot.y = dot.y + dir * 2 * Math.cos(dot.x / 200)
    })
  }

  startPoint(width, height)

  return () => {
    draw()
    update()
  }
}

CanvasSetup(sketch, settings)
