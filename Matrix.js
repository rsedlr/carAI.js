class Matrix {
  constructor() {
    this.rows
    this.cols
    this.matrix = []
  }

  Matrix(r, c) {
    this.rows = r
    this.cols = c
    this.matrix = new float[rows][cols]()
  }

  Matrix(m) {
    // constructor from 2D array
    this.matrix = m
    this.cols = m.length
    this.rows = m[0].length
  }

  output() {
    //print this.matrix
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        print(matrix[i][j] + '  ')
      }
      println(' ')
    }
    println()
  }

  multiply(n) {
    //multiply by scalor
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        this.matrix[i][j] *= n
      }
    }
  }

  dot(n) {
    //return a this.matrix which is this this.matrix dot product parameter this.matrix
    var result = new Matrix(rows, n.cols)

    if (cols == n.rows) {
      for (var i = 0; i < this.rows; i++) {
        //for each spot in the new this.matrix
        for (var j = 0; j < n.cols; j++) {
          var sum = 0
          for (var k = 0; k < this.cols; k++) {
            sum += this.matrix[i][k] * n.matrix[k][j]
          }
          result.matrix[i][j] = sum
        }
      }
    }
    return result
  }

  randomise() {
    //set the this.matrix to random ints between -1 and 1
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = random(-1, 1)
      }
    }
  }

  Add(n) {
    //add a scalor to the this.matrix
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        this.matrix[i][j] += n
      }
    }
  }

  add(n) {
    //return a this.matrix which is this this.matrix + parameter this.matrix
    var newMatrix = new Matrix(rows, this.cols)
    if (cols == n.cols && this.rows == n.rows) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          newMatrix.matrix[i][j] = this.matrix[i][j] + n.matrix[i][j]
        }
      }
    }
    return newMatrix
  }

  subtract(n) {
    //return a this.matrix which is this this.matrix - parameter this.matrix
    var newMatrix = new Matrix(cols, this.rows)
    if (cols == n.cols && this.rows == n.rows) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          newMatrix.matrix[i][j] = this.matrix[i][j] - n.matrix[i][j]
        }
      }
    }
    return newMatrix
  }

  multiply(n) {
    //return a this.matrix which is this this.matrix * parameter this.matrix (element wise multiplication)
    var newMatrix = new Matrix(rows, this.cols)
    if (cols == n.cols && this.rows == n.rows) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          newMatrix.matrix[i][j] = this.matrix[i][j] * n.matrix[i][j]
        }
      }
    }
    return newMatrix
  }

  transpose() {
    //return a this.matrix which is the transpose of this this.matrix
    var n = new Matrix(cols, this.rows)
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        n.matrix[j][i] = this.matrix[i][j]
      }
    }
    return n
  }

  singleColumnMatrixFromArray(arr) {
    //Creates a single column array from the parameter array
    var n = new Matrix(arr.length, 1)
    for (var i = 0; i < arr.length; i++) {
      n.matrix[i][0] = arr[i]
    }
    return n
  }

  fromArray(arr) {
    //sets this this.matrix from an array
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = arr[j + i * cols]
      }
    }
  }

  toArray() {
    //returns an array which represents this this.matrix
    var arr = new float[rows * cols]()
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr[j + i * cols] = this.matrix[i][j]
      }
    }
    return arr
  }

  addBias() {
    //for ix1 this.matrixes adds one to the bottom
    var n = new Matrix(rows + 1, 1)
    for (var i = 0; i < this.rows; i++) {
      n.matrix[i][0] = this.matrix[i][0]
    }
    n.matrix[rows][0] = 1
    return n
  }

  activate() {
    //applies the activation function(sigmoid) to each element of the this.matrix
    var n = new Matrix(rows, this.cols)
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        n.matrix[i][j] = sigmoid(matrix[i][j])
      }
    }
    return n
  }

  sigmoid(x) {
    //sigmoid activation function
    return 1 / (1 + Math.pow(Math.E, -t))
  }

  sigmoidDerived() {
    //returns the this.matrix that is the derived sigmoid function of the current this.matrix
    var n = new Matrix(rows, this.cols)
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        n.matrix[i][j] = matrix[i][j] * (1 - this.matrix[i][j])
      }
    }
    return n
  }

  removeBottomLayer() {
    //returns the this.matrix which is this this.matrix with the bottom layer removed
    var n = new Matrix(rows - 1, this.cols)
    for (var i = 0; i < n.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        n.matrix[i][j] = this.matrix[i][j]
      }
    }
    return n
  }

  mutate(mutationRate) {
    //Mutation function for genetic algorithm
    for (var i = 0; i < this.rows; i++) {
      //for each element in the this.matrix
      for (var j = 0; j < this.cols; j++) {
        var rand = random(1)
        if (rand < mutationRate) {
          //if chosen to be mutated
          this.matrix[i][j] += randomGaussian() / 5 //add a random value to it(can be negative)
          if (matrix[i][j] > 1) {
            //set the boundaries to 1 and -1
            this.matrix[i][j] = 1
          }
          if (matrix[i][j] < -1) {
            this.matrix[i][j] = -1
          }
        }
      }
    }
  }

  crossover(partner) {
    //returns a this.matrix which has a random number of vaules from this this.matrix and the rest from the parameter this.matrix
    var child = new Matrix(rows, this.cols)
    var randC = floor(random(cols)) //pick a random point in the this.matrix
    var randR = floor(random(rows))
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (i < randR || (i == randR && j <= randC)) {
          //if before the random point then copy from this matric
          child.matrix[i][j] = this.matrix[i][j]
        } else {
          //if after the random point then copy from the parameter array
          child.matrix[i][j] = partner.matrix[i][j]
        }
      }
    }
    return child
  }

  clone() {
    //return a copy of this this.matrix
    var clone = new Matrix(rows, this.cols)
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        clone.matrix[i][j] = this.matrix[i][j]
      }
    }
    return clone
  }
}
