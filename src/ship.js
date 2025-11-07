export class Ship {
  constructor(length, direction, firstCord, hitCount = 0, sunk = false) {
    this.length = length;
    this.direction = direction;
    this.firstCord = firstCord;
    this.hitCount = hitCount;
    this.sunk = sunk;
  }

  shipCordination() {}

  hit() {
    this.hitCount++;
    this.isSunk();
  }

  isSunk() {
    if (this.hitCount === this.length) this.sunk = true;
  }
}
