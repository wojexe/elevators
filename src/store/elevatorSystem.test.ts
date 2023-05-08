import { describe, expect, it } from "vitest";
import ElevatorSystem from "./elevatorSystem";
import type { ElevatorStatus, Range } from "./elevator";

describe("ElevatorSystem constructor", () => {
  it("Has proper ids", () => {
    const elevatorSystem = new ElevatorSystem();
    elevatorSystem.addElevator(2);
    elevatorSystem.addElevator(23, { low: -2, high: 10 });
    elevatorSystem.addElevator(63, { low: 0, high: 6 });

    const expected: Array<ElevatorStatus & Range> = [
      { elevatorID: 2, currentFloor: 0, targetFloor: null, low: -3, high: 12 },
      { elevatorID: 23, currentFloor: 0, targetFloor: null, low: -2, high: 10 },
      { elevatorID: 63, currentFloor: 0, targetFloor: null, low: 0, high: 6 }
    ];

    expect(elevatorSystem.status()).toStrictEqual(expected);
  });
});
