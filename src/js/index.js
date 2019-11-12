import Canvas from './Canvas'

const settings = {
  full: true,
  background: 'hsl(200, 30%, 40%)'
}

const sketch = ({ ctx, width, height }) => {
  const distance = 100
  const size = 50
  let speed = 8
  let dir = 1
  let dots = []

  const initial = (width, height) => {
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

  initial(width, height)

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

Canvas(sketch, settings)
