export default class Ship {
  constructor(length, hitCount = 0, sunk = false) {
    this.length = length;
    this.hitCount = hitCount;
    this.sunk = sunk;
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
