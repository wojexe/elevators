<script lang="ts">
  import { elevatorSystem } from "../store/index";
  import Elevator from "../components/elevator.svelte";

  let newID = "";
  let newHigh = "";
  let newLow = "";

  let pickupID = "";
  let pickupFloor = "";

  let updateID = "";
  let updateCurrent = "";
  let updateTarget = "";

  const parseIntThrowing = (v: string): number | never => {
    const parsed = parseInt(v);

    if (isNaN(parsed)) throw new Error("Provied value was not a number");

    return parsed;
  };

  const handleAddElevator = () => {
    const ID = parseIntThrowing(newID);
    const high = parseIntThrowing(newHigh) + 1; // inclusive
    const low = parseIntThrowing(newLow);

    $elevatorSystem.addElevator(ID, {
      high: Math.max(high, low),
      low: Math.min(high, low)
    });
    elevatorSystem.update((x) => x); // trigger updates
  };

  const handlePickup = () => {
    const ID = parseIntThrowing(pickupID);
    const calledFloor = parseIntThrowing(pickupFloor);

    $elevatorSystem?.pickup(ID, calledFloor);
    elevatorSystem.update((x) => x); // trigger updates
  };

  const handleUpdate = () => {
    const ID = parseIntThrowing(updateID);
    const newCurrent = parseIntThrowing(updateCurrent);
    const newTarget = parseIntThrowing(updateTarget);

    $elevatorSystem?.update(ID, newCurrent, newTarget);
    elevatorSystem.update((x) => x); // trigger updates
  };

  const handleStep = () => {
    $elevatorSystem?.step();
    elevatorSystem.update((x) => x); // trigger updates
  };
</script>

<svelte:head>
  <title>Elevator System</title>
</svelte:head>

<h1>Elevators</h1>

<div class="controls">
  <h2>Controls:</h2>
  <div>
    <form on:submit|preventDefault={() => handleAddElevator()}>
      <span>Add elevator</span>
      <input bind:value={newID} type="number" placeholder="New ID" />
      <input bind:value={newHigh} type="number" placeholder="Highest floor number" />
      <input bind:value={newLow} type="number" placeholder="Lowest floor number" />
      <button type="submit">Add Elevator</button>
    </form>
    <form on:submit|preventDefault={() => handlePickup()}>
      <span>Pickup</span>
      <input bind:value={pickupID} type="number" placeholder="Elevator ID" />
      <input bind:value={pickupFloor} type="number" placeholder="Called floor" />
      <button type="submit">Pickup elevator</button>
    </form>
    <form on:submit|preventDefault={() => handleUpdate()}>
      <span>Update</span>
      <input bind:value={updateID} type="number" placeholder="Elevator ID" />
      <input bind:value={updateCurrent} type="number" placeholder="New current floor" />
      <input bind:value={updateTarget} type="number" placeholder="New target floor" />
      <button type="submit">Update elevator</button>
    </form>
  </div>
  <div class="step">
    <button on:click={() => handleStep()}>Step</button>
  </div>
</div>

<h2>Elevators:</h2>
<div class="elevators">
  {#each $elevatorSystem.statusWithTargets() as elevatorStatus}
    <Elevator {elevatorStatus} />
  {/each}
</div>

<style lang="scss">
  h1 {
    text-align: center;
    color: orange;
  }
  .controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 1rem;

    & div {
      display: flex;
      gap: 1rem;

      & > form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        gap: 0.5rem;

        padding: 0.5rem;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
      }
    }

    & > div {
      place-self: center;
    }

    & .step {
      padding: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
    }
  }
  .elevators {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
  }
</style>
