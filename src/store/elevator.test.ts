import { it, describe, expect, beforeEach, beforeAll } from "vitest";

import Elevator from "./elevator";

let elevator: Elevator;
let ID: number;

describe("Elevator constructor", () => {
  beforeAll(() => {
    ID = 25;
    elevator = new Elevator(ID);
  });

  it("Has proper ID", () => expect(elevator.ID).toBe(ID));
  it("Is on ground floor", () => expect(elevator.currentFloor).toBe(0));
  it("Has empty queue", () => expect(elevator.currentTargets).toStrictEqual([]));
});

describe("Elevator methods", () => {
  beforeEach(() => {
    ID = 33;
    elevator = new Elevator(ID);
  });

  it("setFloor", () => {
    expect(elevator.currentFloor).toBe(0);

    elevator.setFloor(3);
    expect(elevator.currentFloor).toBe(3);

    elevator.setFloor(-2);
    expect(elevator.currentFloor).toBe(-2);

    elevator.setFloor(0);
    expect(elevator.currentFloor).toBe(0);
  });

  it("forceTarget", () => {
    expect(elevator.currentTarget).toBe(0);

    elevator.forceTarget(4);
    expect(elevator.currentTarget).toBe(4);
    expect(elevator.currentTargets).toStrictEqual([4]);

    elevator.forceTarget(7);
    expect(elevator.currentTarget).toBe(7);
    expect(elevator.currentTargets).toStrictEqual([7, 4]);
  });

  describe("request", () => {
    beforeEach(() => {
      elevator = new Elevator(ID);
    });

    it("To the same floor", () => {
      elevator.request(0);
      expect(elevator.currentTargets).toStrictEqual([]);
    });

    it("First request", () => {
      elevator.request(5);
      expect(elevator.currentTargets).toStrictEqual([5]);
    });

    it("Multiple requests", () => {
      elevator.request(5);
      expect(elevator.currentTargets).toStrictEqual([5]);

      elevator.request(9);
      expect(elevator.currentTargets).toStrictEqual([5, 9]);

      elevator.request(7);
      expect(elevator.currentTargets).toStrictEqual([5, 7, 9]);

      elevator.request(7);
      expect(elevator.currentTargets).toStrictEqual([5, 7, 9]);

      elevator.request(-3);
      expect(elevator.currentTargets).toStrictEqual([5, 7, 9, -3]);

      elevator.request(1);
      expect(elevator.currentTargets).toStrictEqual([1, 5, 7, 9, -3]);
    });
  });

  it("step", () => {
    // [1, 5, 7, 9, -3] - from the above test
    elevator.request(5, 9, 7, 7, -3, 1);

    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([1, 5, 7, 9, -3]);
    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([5, 7, 9, -3]);
    elevator.step(4);
    expect(elevator.currentTargets).toStrictEqual([5, 7, 9, -3]);
    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([7, 9, -3]);
    elevator.step(2);
    expect(elevator.currentTargets).toStrictEqual([7, 9, -3]);
    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([9, -3]);
    elevator.step(2);
    expect(elevator.currentTargets).toStrictEqual([9, -3]);
    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([-3]);
    elevator.step(12);
    expect(elevator.currentTargets).toStrictEqual([-3]);
    elevator.step();
    expect(elevator.currentTargets).toStrictEqual([]);
    expect(elevator.currentFloor).toBe(-3);
    elevator.step(10);
    expect(elevator.currentFloor).toBe(-3);
    expect(elevator.currentTargets).toStrictEqual([]);
  });
});
