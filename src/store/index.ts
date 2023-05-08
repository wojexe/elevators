import { writable, type Writable } from "svelte/store";
import ElevatorSystem from "./elevatorSystem";

const elevatorSystem: Writable<ElevatorSystem> = writable(new ElevatorSystem());

export { elevatorSystem };
