import { describe, expect, it } from "vitest";
import ElevatorSystem from "./elevatorSystem";
import type { ElevatorStatus } from "./elevator";

describe("ElevatorSystem constructor", () => {
  it("Has proper ids", () => {
    const elevatorSystem = new ElevatorSystem([2, 23, 63]);

    const expected: Array<ElevatorStatus> = [
      { elevatorID: 2, currentFloor: 0, targetFloor: 0 },
      { elevatorID: 23, currentFloor: 0, targetFloor: 0 },
      { elevatorID: 63, currentFloor: 0, targetFloor: 0 }
    ];

    expect(elevatorSystem.status()).toStrictEqual(expected);
  });
});
