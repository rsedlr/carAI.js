class HUD {
  constructor() {
    this.yOffset = 40
    this.lapPos = 1050
    this.timePos = 50
    this.prevTimePos = 350
    this.bestTimePos = 680

    this.x0 = 30
    this.x1 = 260
    this.x2 = 455
    this.x3 = 700
  }

  draw1(lap, time, prevTime, bestTime) {
    // draw method for human player
    prevTime = Math.round(prevTime / 1000)
    bestTime = Math.round(bestTime / 1000)
    fill(0)
    textSize(32)
    text(
      'Time: ' + str(Math.round(((millis() - time) / 1000) * 100) / 100),
      this.timePos,
      this.yOffset
    )
    text('prev time: ' + str(prevTime), this.prevTimePos, this.yOffset)
    text('best time: ' + str(bestTime), this.bestTimePos, this.yOffset)
    text('Lap: ' + str(lap), this.lapPos, this.yOffset)
  }

  draw2(str1, str2, str3, str4) {
    // draw method for AI
    fill(0)
    textSize(32)
    text(str1, this.x0, this.yOffset)
    text(str2, this.x1, this.yOffset)
    text(str3, this.x2, this.yOffset)
    text(str4, this.x3, this.yOffset)
  }
}
