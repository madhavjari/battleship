export default class Ship {
  constructor(name, length, hitCount = 0, sunk = false) {
    this.name = name;
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = sunk;
    this.allCordinates = [];
  }

  hit() {
    this.hitCount++;
    this.isSunk();
    return this.hitCount;
  }

  isSunk() {
    if (this.hitCount === this.length) this.sunk = true;
  }
}
