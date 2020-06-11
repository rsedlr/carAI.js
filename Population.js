class Population {
  constructor(size) {
    this.cars = []
    this.bestCar
    this.bestCarNo = new int[3]()
    this.gen = 1

    for (var i = 0; i < size; i++) {
      cars[i] = new Car()
    }
  }

  updateAlive() {
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].alive) {
        cars[i].look()
        cars[i].think()
        cars[i].move()
        if (!showBest || i == 0) cars[i].draw()
      }
    }
  }

  setBestCars() {
    // selects best 3 cars
    bestCarNo = new int[3]() // cant be all 0 as 0 is usually best car from that gen
    bestCarNo[0] = cars.length - 1
    bestCarNo[1] = bestCarNo[0]
    bestCarNo[2] = bestCarNo[0]
    //println("****************");
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].fitness > cars[bestCarNo[0]].fitness) {
        bestFitness = cars[i].fitness
        bestCarNo[2] = bestCarNo[1]
        bestCarNo[1] = bestCarNo[0]
        bestCarNo[0] = i
      } else if (cars[i].fitness > cars[bestCarNo[1]].fitness) {
        bestCarNo[2] = bestCarNo[1]
        bestCarNo[1] = i
      } else if (cars[i].fitness > cars[bestCarNo[2]].fitness) {
        bestCarNo[2] = i
      }
    }
    bestCar = cars[bestCarNo[0]].clone()
    if (saveBest) {
      saveGen(cars.length / 3)
      //saveGen(3);  // saves best 3 cars
      saveBest = false
    }
    //println(bestCarNo);
  }

  // saveGen(limit) {
  //   for (var i = 0; i < limit; i++) {
  //     saveTable(
  //       cars[i].brain.NetToTable(),
  //       'data/gen' + gen + '-fit' + bestFitness + '/car-' + i + '.csv'
  //     )
  //   }
  // }

  done() {
    // returns true if all players are dead
    alive = 0
    for (var i = 0; i < cars.length; i++) {
      if (cars[i].alive) alive++
    }
    if (alive > 0) return false
    return true
  }

  naturalSelection() {
    var newCars = []
    setBestCars()
    newCars[0] = cars[bestCarNo[0]].clone() // top 3 survive to next
    newCars[1] = cars[bestCarNo[1]].clone()
    newCars[2] = cars[bestCarNo[2]].clone()

    newCars[3] = cars[bestCarNo[0]].clone() // and mutate
    newCars[4] = cars[bestCarNo[1]].clone()
    newCars[5] = cars[bestCarNo[2]].clone()
    newCars[3].mutate(true)
    newCars[4].mutate(true)
    newCars[5].mutate(true)
    //newCars[3] = cars[bestCarNo[0]].crossover(cars[bestCarNo[1]]);  // they also get crossed
    //newCars[4] = cars[bestCarNo[0]].crossover(cars[bestCarNo[2]]);
    //newCars[5] = cars[bestCarNo[1]].crossover(cars[bestCarNo[2]]);

    //newCars[6] = cars[bestCarNo[0]].crossover(cars[bestCarNo[1]]);  // and crossed + mutated
    //newCars[7] = cars[bestCarNo[0]].crossover(cars[bestCarNo[1]]);
    //newCars[8] = cars[bestCarNo[0]].crossover(cars[bestCarNo[1]]);

    for (var i = 6; i < cars.length; i++) {
      if (i < cars.length / 3) {
        // length/2
        newCars[i] = selectCar().clone()
      } else {
        newCars[i] = selectCar().crossover(selectCar())
      }
      newCars[i].mutate(false)
    }
    cars = newCars.clone()
    gen++
  }

  selectCar() {
    var fitnessSum = 0 // long
    for (var i = 0; i < cars.length; i++) {
      fitnessSum += cars[i].fitness
    }

    var rand = floor(random(fitnessSum))
    var runningSum = 0
    for (var i = 0; i < cars.length; i++) {
      runningSum += cars[i].fitness
      if (runningSum > rand) {
        return cars[i]
      }
    }
    return cars[0] // unreachable code to keep the parser happy
  }

  mutate() {
    for (var i = 0; i < cars.length; i++) {
      cars[i].mutate(false)
    }
  }

  calculateFitness() {
    for (var i = 0; i < cars.length; i++) {
      cars[i].calculateFitness()
    }
  }
}
