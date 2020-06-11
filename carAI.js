var heldKeys = [false, false, false, false] // up, down, left, right
var track = new Track('')
var humanCar
var paused = false
var hud = new HUD()

function setup() {
  createCanvas(1200, 800)
  frameRate(60)
  rectMode(CENTER)
  humanCar = new Car(track)
}

function draw() {
  if (!paused) {
    background(0, 130, 0)
    track.draw()
    if (humanCar.alive) {
      hud.draw1(
        humanCar.lap,
        humanCar.time,
        humanCar.lapTime,
        humanCar.bestTime
      )
      if (heldKeys[0]) humanCar.accelerate()
      if (heldKeys[1]) humanCar.brake()
      if (heldKeys[2]) humanCar.turn('left')
      if (heldKeys[3]) humanCar.turn('right')
      humanCar.move()
      humanCar.draw()
    } else {
      humanCar = new Car(track)
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    heldKeys[0] = true
  } else if (keyCode === DOWN_ARROW) {
    heldKeys[1] = true
  } else if (keyCode === LEFT_ARROW) {
    heldKeys[2] = true
  } else if (keyCode === RIGHT_ARROW) {
    heldKeys[3] = true
  } else if (keyCode === 32) {
    // space bar
    paused = !paused
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    heldKeys[0] = false
  } else if (keyCode === DOWN_ARROW) {
    heldKeys[1] = false
  } else if (keyCode === LEFT_ARROW) {
    heldKeys[2] = false
  } else if (keyCode === RIGHT_ARROW) {
    heldKeys[3] = false
  }
}
