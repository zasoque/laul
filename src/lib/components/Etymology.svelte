<script lang="ts">
  export let origin: string[];

  function wordSrcFor(id: string) {
    return `/laul/laul/${id}.jpg`;
  }

  let hoverDisplay: HTMLDivElement;

  function onmouseenter(event: MouseEvent) {
    hoverDisplay.style.display = "block";
  }

  function onmouseleave(event: MouseEvent) {
    hoverDisplay.style.display = "none";
  }

  function onmousemove(event: MouseEvent) {
    hoverDisplay.style.left = `${event.pageX + 10}px`;
    hoverDisplay.style.top = `${event.pageY + 10}px`;
  }
</script>

<div
  style="background-image: url({wordSrcFor(origin[0])});"
  class="etymology-origin"
  {onmouseenter}
  {onmouseleave}
  {onmousemove}
></div>
<div class="hover-display" bind:this={hoverDisplay}>
  {origin[1]} #{origin[0]}
  {origin[2]}
</div>

<style>
  .etymology-origin {
    width: 1rem;
    height: 1rem;
    background-size: cover;
    background-position: center;
    display: inline-block;
    margin-right: 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .hover-display {
    display: none;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    pointer-events: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
  }
</style>
