<script lang="ts">
  import Floor from "./floor.svelte";
  import type { Range, ElevatorStatus } from "../store/elevator";

  export let elevatorStatus: ElevatorStatus & Range & { allTargets: Array<number> };
  $: ({ elevatorID, currentFloor, targetFloor, allTargets } = elevatorStatus);
  let { high, low } = elevatorStatus;

  let floors: Array<number> = new Array(Math.abs(high - low))
    .fill(low)
    .map((el, i) => el + i)
    .reverse();
</script>

<div class="elevator">
  <span class="title">ID: <span class="id">{elevatorID}</span></span>

  <div class="floors">
    {#each floors as floor}
      <Floor
        current={floor === currentFloor}
        currentTarget={floor === targetFloor}
        target={allTargets.includes(floor)}
        >{floor}
      </Floor>
    {/each}
  </div>
</div>

<style lang="scss">
  .title {
    font-size: 1.2rem;
  }
  .id {
    font-weight: bold;
    font-family: monospace;
  }
  .elevator {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  .floors {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 1.5rem;
  }
</style>
