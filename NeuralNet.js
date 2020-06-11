class NeuralNet {
  constructor(inputs, hiddenNo, outputNo) {
    this.inNodes = inputs
    this.hidNodes = hiddenNo
    this.outNodes = outputNo

    this.weightIn = new Matrix(hidNodes, this.inNodes + 1) // +1 for bias
    this.weightHid = new Matrix(hidNodes, this.hidNodes + 1)
    this.weightOut = new Matrix(outNodes, this.hidNodes + 1)
    this.weightIn.randomise()
    this.weightHid.randomise()
    this.weightOut.randomise()
  }

  mutate(mr) {
    this.weightIn.mutate(mr)
    this.weightHid.mutate(mr)
    this.weightOut.mutate(mr)
  }

  output(inputsArr) {
    // calculate output values by feeding forward through NN
    var inputs = this.weightOut.singleColumnMatrixFromArray(inputsArr) // convert arr to matrix
    var inputsBias = inputs.addBias() // add bias

    var hiddenInputs = this.weightIn.dot(inputsBias) // apply layer one weights
    var hiddenOutputs = hiddenInputs.activate() // pass through activation function
    var hiddenOutputsBias = hiddenOutputs.addBias() // add bias

    var hiddenInputs2 = this.weightHid.dot(hiddenOutputsBias)
    var hiddenOutputs2 = hiddenInputs2.activate()
    var hiddenOutputsBias2 = hiddenOutputs2.addBias()

    var outputInputs = this.weightOut.dot(hiddenOutputsBias2)
    var outputs = outputInputs.activate()

    return outputs.toArray()
  }

  crossover(partner) {
    // creates a new child with layer matricies from both parents
    var child = new NeuralNet(inNodes, this.hidNodes, this.outNodes)
    child.weightIn = this.weightIn.crossover(partner.weightIn)
    child.weightHid = this.weightHid.crossover(partner.weightHid)
    child.weightOut = this.weightOut.crossover(partner.weightOut)
    return child
  }

  clone() {
    var clone = new NeuralNet(inNodes, this.hidNodes, this.outNodes)
    clone.weightIn = this.weightIn.clone()
    clone.weightHid = this.weightHid.clone()
    clone.weightOut = this.weightOut.clone()
    return clone
  }

  NetToTable() {
    var t = new Table()
    var weightInArr = this.weightIn.toArray()
    var weightHidArr = this.weightHid.toArray()
    var weightOutArr = this.weightOut.toArray()

    for (
      var i = 0;
      i <
      max(
        weightInArr.length,
        this.weightHidArr.length,
        this.weightOutArr.length
      );
      i++
    ) {
      t.addColumn()
    }

    var tr = t.addRow()
    for (var i = 0; i < this.weightInArr.length; i++) {
      tr.setFloat(i, this.weightInArr[i])
    }
    tr = t.addRow()
    for (var i = 0; i < this.weightHidArr.length; i++) {
      tr.setFloat(i, this.weightHidArr[i])
    }
    tr = t.addRow()
    for (var i = 0; i < this.weightOutArr.length; i++) {
      tr.setFloat(i, this.weightOutArr[i])
    }
    return t
  }

  TableToNet(t) {
    var weightInArr = new float[weightIn.rows * this.weightIn.cols]() //create arrays to tempurarily store the data for each matrix
    var weightHidArr = new float[weightHid.rows * this.weightHid.cols]()
    var weightOutArr = new float[weightOut.rows * this.weightOut.cols]()

    var tr = t.getRow(0) //set the this.weightIn array as the first row of the table
    for (var i = 0; i < this.weightInArr.length; i++) {
      this.weightInArr[i] = tr.getFloat(i)
    }

    tr = t.getRow(1) //set the this.weightHid array as the second row of the table
    for (var i = 0; i < this.weightHidArr.length; i++) {
      this.weightHidArr[i] = tr.getFloat(i)
    }

    tr = t.getRow(2) //set the this.weightOut array as the third row of the table
    for (var i = 0; i < this.weightOutArr.length; i++) {
      this.weightOutArr[i] = tr.getFloat(i)
    }

    this.weightIn.fromArray(weightInArr) //convert the arrays to matricies and set them as the layer matricies
    this.weightHid.fromArray(weightHidArr)
    this.weightOut.fromArray(weightOutArr)
  }
}
