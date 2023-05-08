import Elevator from "./elevator";
import type { ElevatorID, ElevatorStatus } from "./elevator";

class ElevatorSystem {
  #elevators: Map<ElevatorID, Elevator>;

  constructor(elevatorIDs?: Array<ElevatorID>) {
    this.#elevators = new Map();

    if (elevatorIDs == null) return;

    for (const elevatorID of elevatorIDs) {
      this.#elevators.set(elevatorID, new Elevator(elevatorID));
    }
  }

  #getElevator(elevatorID: ElevatorID): Elevator {
    const elevator = this.#elevators.get(elevatorID);

    if (elevator == null) throw new Error("This elevator does not exist");

    return elevator;
  }

  addElevator(elevatorID: number) {
    if (!this.#elevators.has(elevatorID)) {
      this.#elevators.set(elevatorID, new Elevator(elevatorID));
    }
  }

  // No need for the direction argument - assume floors are numbered sequentially
  pickup(elevatorID: ElevatorID, calledFloor: number): void {
    this.#getElevator(elevatorID).request(calledFloor);
  }

  // Set
  update(elevatorID: ElevatorID, currentFloor: number, targetFloor: number): void {
    this.#getElevator(elevatorID).setFloor(currentFloor);
    this.#getElevator(elevatorID).forceTarget(targetFloor);
  }

  step(): void {
    this.#elevators.forEach((elevator) => elevator.step());
  }

  status(): Array<ElevatorStatus> {
    return [...this.#elevators].map(([, elevator]) => elevator.status);
  }
}

export default ElevatorSystem;
