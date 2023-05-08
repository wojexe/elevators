type ElevatorID = number;

type ElevatorStatus = {
  elevatorID: ElevatorID;
  currentFloor: number;
  targetFloor: number | null;
};

type Range = {
  high: number;
  low: number;
};

const closestToZero = (a: number, b: number): number => {
  if (isBetweenEqual(0, a, b)) return 0;
  else if (Math.abs(a) === Math.abs(b)) return Math.sign(a) < 0 ? b : a;
  else return Math.abs(a) < Math.abs(b) ? a : b;
};

const isBetweenEqual = (target: number, a: number, b: number): boolean => {
  // Check if target is equal OR higher OR lower than current
  return (a <= target && target <= b) || (a >= target && target >= b);
};

class Elevator {
  #id: ElevatorID;
  #currentFloor: number;
  #queue: Array<number>;
  #range: {
    high: number;
    low: number;
  };

  constructor(elevatorID: ElevatorID, options = { low: -3, high: 12 }) {
    this.#id = elevatorID;
    this.#currentFloor = closestToZero(options.high - 1, options.low); // exclusive
    this.#queue = [];

    this.#range = { ...options };
  }

  get ID(): ElevatorID {
    return this.#id;
  }

  get currentFloor(): number {
    return this.#currentFloor;
  }

  set currentFloor(floor: number) {
    if (!isBetweenEqual(floor, this.#range.high, this.#range.low))
      throw new Error(`Provided floor outside of elevator #${this.#id} range`);

    this.#currentFloor = floor;
  }

  get currentTarget(): number | null {
    return this.#queue[0] ?? null;
  }

  get currentTargets(): Array<number> {
    return this.#queue;
  }

  get status(): ElevatorStatus & Range {
    return {
      elevatorID: this.#id,
      currentFloor: this.#currentFloor,
      targetFloor: this.currentTarget,
      ...this.#range
    } satisfies ElevatorStatus & Range;
  }

  #step() {
    if (this.currentTarget == null) return;

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

  #request(floor: number): void | never {
    // If the requested floor is outside of elevator's range
    if (!isBetweenEqual(floor, this.#range.high, this.#range.low))
      throw new Error(`Provided floor outside of elevator #${this.#id} range`);

    // If the floor already is in the queue
    if (this.#currentFloor === floor || this.#queue.includes(floor)) return;

    // If there are no floors on the queue
    if (this.#queue.length === 0) {
      this.#queue.push(floor);
      return;
    }

    // Find if there are any targets where this floor is between
    if (
      isBetweenEqual(floor, this.#currentFloor, this.currentTarget ?? this.#currentFloor)
    ) {
      this.#queue.splice(0, 0, floor);
      return;
    }

    for (let i = 1; i < this.#queue.length; i++) {
      const prevTarget = this.#queue[i - 1];
      const nextTarget = this.#queue[i];

      if (isBetweenEqual(floor, prevTarget, nextTarget)) {
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
    if (!isBetweenEqual(targetFloor, this.#range.high, this.#range.low))
      throw new Error(`Provided floor outside of elevator #${this.#id} range`);

    this.#queue.unshift(targetFloor);
  }
}

export default Elevator;
export type { ElevatorID, ElevatorStatus, Range };
