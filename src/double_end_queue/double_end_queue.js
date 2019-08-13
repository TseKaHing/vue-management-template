class Dequeue {
  constructor() {
    this.count = 0  // 队尾
    this.lowestCount = 0  //  对头
    this.items = []
  }
  addAtFront(element) {
    if (this.isEmpty()) {
      this.addAtEnd(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    }
  }
  addAtEnd() {
    if (condition) {

    }
  }
  removeAtFront() {

  }
  removeAtEnd() {

  }
  frontPeek() {
    return this.items[this.lowestCount]
  }
  endPeek() {
    return this.items[this.count]
  }
  isEmpty() {
    return this.count - this.lowestCount
  }
  size() {
    return this.count - this.lowestCount === 0
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = []
  }
}