type ElevatorID = number;

type ElevatorStatus = {
  elevatorID: ElevatorID;
  currentFloor: number;
  targetFloor: number;
};

class Elevator {
  #id: ElevatorID;
  #currentFloor: number;
  #queue: Array<number>;

  constructor(elevatorID: ElevatorID) {
    this.#id = elevatorID;
    this.#currentFloor = 0;
    this.#queue = [];
  }

  get ID(): ElevatorID {
    return this.#id;
  }

  get currentFloor(): number {
    return this.#currentFloor;
  }

  get currentTarget(): number {
    return this.#queue[0] ?? this.#currentFloor;
  }

  get currentTargets(): Array<number> {
    return this.#queue;
  }

  get status(): ElevatorStatus {
    return {
      elevatorID: this.#id,
      currentFloor: this.#currentFloor,
      targetFloor: this.currentTarget
    } satisfies ElevatorStatus;
  }

  #isBetween(target: number, a: number, b: number): boolean {
    // Requested floor higher OR lower than current
    return (a < target && target < b) || (a > target && target > b);
  }

  #step() {
    if (this.#currentFloor === this.currentTarget) {
      this.#queue.shift(); // Passengers go in and out
    } else if (this.#currentFloor < this.currentTarget) {
      this.#currentFloor += 1; // Going up
    } else {
      this.#currentFloor -= 1; // Going down
    }
  }

  // Allow multiple steps at once & return to allow chaining
  public step(count?: number): Elevator {
    for (let i = 0; i < (count ?? 1); i++) {
      this.#step();
    }

    return this;
  }

  #request(floor: number): void {
    // If the floor already is in the queue
    if (this.#currentFloor === floor || this.#queue.includes(floor)) return;

    // If there are no floors on the queue
    if (this.#queue.length === 0) {
      this.#queue.push(floor);
      return;
    }

    // Find if there are any targets where this floor is between
    if (this.#isBetween(floor, this.#currentFloor, this.currentTarget)) {
      this.#queue.splice(0, 0, floor);
      return;
    }

    for (let i = 1; i < this.#queue.length; i++) {
      const prevTarget = this.#queue[i - 1];
      const nextTarget = this.#queue[i];

      if (this.#isBetween(floor, prevTarget, nextTarget)) {
        this.#queue.splice(i, 0, floor);
        return;
      }
    }

    // Otherwise, push the that target to the end
    this.#queue.push(floor);
  }

  // Allow requesting multiple floors by passing multiple parameters & return to allow chaining
  public request(floor: number, ...rest: Array<number>): Elevator {
    this.#request(floor);
    rest.forEach((floor) => this.#request(floor));
    return this;
  }

  public setFloor(currentFloor: number): void {
    this.#currentFloor = currentFloor;
  }

  public forceTarget(targetFloor: number): void {
    this.#queue.unshift(targetFloor);
  }
}

export default Elevator;
export type { ElevatorID, ElevatorStatus };
