class Car {
  constructor() {
    this.wid = 16
    this.hei = 26
    this.x = 100
    this.y = 100
    // this.x = track.start.x
    // this.y = track.start.y
    this.drag = 0.05
    this.speed = 0
    this.maxSpeed = 8 + this.drag
    this.acceleration = 1
    // this.angle = track.startAngle
    this.angle = 0
    this.lap = 1
    this.time = 0
    this.lapTime = 0
    this.bestTime = 0
    this.col = color(255, 0, 0)
    this.alive = true
    this.onFinishLine = true
    this.preFinLine = false
    // this.cpLen = track.pointLen // replace with track.pointlen
    this.cp = []
    this.edges = [
      createVector(this.wid / 2, this.hei / 2),
      createVector(this.wid / 2, -this.hei / 2),
    ]

    this.rotateVectors(this.angle)
  }

  draw() {
    push()
    fill(this.col)
    stroke(this.col)
    strokeWeight(0)
    translate(this.x, this.y)
    rotate(this.angle)
    rect(0, 0, this.wid, this.hei)
    fill(255)
    rect(2, 0, 3, this.hei) // go faster stripes
    rect(-2, 0, 3, this.hei)
    fill(0)
    stroke(0)
    rect(0, -3, 12, 4) // windscreen
    rect(5, 0, 2, 10) // right side window
    rect(-5, 0, 2, 10) // left side window
    rect(this.wid / 2 + 1, this.hei / 2 - 4, 2, 8) // tyres
    rect(-this.wid / 2 - 1, this.hei / 2 - 4, 2, 8)
    rect(this.wid / 2 + 1, -this.hei / 2 + 4, 2, 8)
    rect(-this.wid / 2 - 1, -this.hei / 2 + 4, 2, 8)
    pop()
  }

  move() {
    if (this.speed - this.drag > 0) {
      this.speed -= this.drag
    } else {
      this.speed = 0
    }
    this.x -= this.speed * Math.sin(-this.angle)
    this.y -= this.speed * Math.cos(-this.angle)
    // if (!track.onTrack(this)) this.kill()
  }

  accelerate() {
    var curAcceleration = this.acceleration / (this.speed + 5)
    if (this.speed + curAcceleration < this.maxSpeed) {
      this.speed += curAcceleration
    } else {
      this.speed = this.maxSpeed
    }
  }

  brake() {
    if (this.speed > 0.07) {
      this.speed -= 0.07
    } else {
      this.speed = 0
    }
  }

  rotateVectors(angle) {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].rotate(angle)
    }
  }

  turn(dir) {
    if (this.speed > 0.02) {
      var amount = 1 / (this.speed * 6 + 10)
      if (dir == 'left') amount *= -1
      this.angle += amount
      this.rotateVectors(amount)
    }
  }

  newLap() {
    this.onFinishLine = true
    this.preFinLine = false
    this.lap++
    var curTime = new Date().getTime()
    if (lap > 1) {
      this.lapTime = curTime - this.time
    }
    this.time = curTime
    this.cp = []
  }

  kill() {
    this.alive = false
  }
}
