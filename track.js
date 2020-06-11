class Track {
  constructor(type) {
    this.outerPoints = []
    this.innerPoints = []
    this.preFinLine = []
    this.finishLine = []
    this.start
    this.startAngle = 0

    setPoints(
      type,
      this.innerPoints,
      this.outerPoints,
      this.finishLine,
      this.preFinLine
    )
    if (type == '' || type == 'default') {
      this.start = new p5.Vector(630, 725)
      this.startAngle = -Math.PI / 2
    } else if (type == 'new') {
      this.start = new p5.Vector(865, 737)
      this.startAngle = Math.PI / 2
    }

    this.pointLen = this.outerPoints.length
  }

  draw() {
    stroke(0)
    fill(50)
    strokeWeight(5)
    beginShape()
    for (var i = 0; i < this.pointLen; i++) {
      vertex(this.outerPoints[i].x, this.outerPoints[i].y)
    }
    endShape(CLOSE)

    fill(0, 130, 0)
    beginShape()
    for (var i = 0; i < this.pointLen; i++) {
      vertex(this.innerPoints[i].x, this.innerPoints[i].y)
    }
    endShape(CLOSE) // CLOSE

    stroke(255)
    line(
      this.finishLine[0].x,
      this.finishLine[0].y,
      this.finishLine[1].x,
      this.finishLine[1].y
    )
  }

  onTrack(car) {
    var x1 = car.x + car.edges[0].x
    var x2 = car.x + car.edges[1].x
    var x3 = car.x - car.edges[0].x
    var x4 = car.x - car.edges[1].x
    var y1 = car.y + car.edges[0].y
    var y2 = car.y + car.edges[1].y
    var y3 = car.y - car.edges[0].y
    var y4 = car.y - car.edges[1].y

    // check if touching finishLine lines
    if (
      this.lineTouch(
        x1,
        y1,
        x2,
        y2,
        this.finishLine[0].x,
        this.finishLine[0].y,
        this.finishLine[1].x,
        this.finishLine[1].y
      ) ||
      this.lineTouch(
        x3,
        y3,
        x4,
        y4,
        this.finishLine[0].x,
        this.finishLine[0].y,
        this.finishLine[1].x,
        this.finishLine[1].y
      )
    ) {
      if (car.preFinLine && !car.onFinishLine) car.newLap()
    } else {
      car.onFinishLine = false
    }
    if (
      this.lineTouch(
        x1,
        y1,
        x2,
        y2,
        this.preFinLine[0].x,
        this.preFinLine[0].y,
        this.preFinLine[1].x,
        this.preFinLine[1].y
      ) ||
      this.lineTouch(
        x3,
        y3,
        x4,
        y4,
        this.preFinLine[0].x,
        this.preFinLine[0].y,
        this.preFinLine[1].x,
        this.preFinLine[1].y
      )
    ) {
      car.preFinLine = true
    }

    //check if touching CP
    for (var i = 0; i < this.pointLen; i++) {
      if (
        this.lineTouch(
          x1,
          y1,
          x2,
          y2,
          this.outerPoints[i].x,
          this.outerPoints[i].y,
          this.innerPoints[i].x,
          this.innerPoints[i].y
        ) ||
        this.lineTouch(
          x3,
          y3,
          x4,
          y4,
          this.outerPoints[i].x,
          this.outerPoints[i].y,
          this.innerPoints[i].x,
          this.innerPoints[i].y
        )
      ) {
        car.cp[i] = true
      }
    }

    // check if on track
    // only works if outerlength == innerlength
    for (var i = 0; i < this.pointLen; i++) {
      var s = i + 1
      if (s == this.pointLen) s = 0
      if (
        this.lineTouch(
          x1,
          y1,
          x2,
          y2,
          this.outerPoints[i].x,
          this.outerPoints[i].y,
          this.outerPoints[s].x,
          this.outerPoints[s].y
        ) ||
        this.lineTouch(
          x3,
          y3,
          x4,
          y4,
          this.outerPoints[i].x,
          this.outerPoints[i].y,
          this.outerPoints[s].x,
          this.outerPoints[s].y
        ) ||
        this.lineTouch(
          x1,
          y1,
          x2,
          y2,
          this.innerPoints[i].x,
          this.innerPoints[i].y,
          this.innerPoints[s].x,
          this.innerPoints[s].y
        ) ||
        this.lineTouch(
          x3,
          y3,
          x4,
          y4,
          this.innerPoints[i].x,
          this.innerPoints[i].y,
          this.innerPoints[s].x,
          this.innerPoints[s].y
        )
      )
        return false
    }
    return true
  }

  lineTouch(x1, y1, x2, y2, x3, y3, x4, y4) {
    var uA =
      ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    var uB =
      ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
      ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) return true
    return false
  }
}
