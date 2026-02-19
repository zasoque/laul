<script lang="ts">
  import Etymology from "$lib/components/Etymology.svelte";

  export let word: string[];
  export let getWord: (id: string) => Promise<string[] | null>;

  let etymology: string[] = [];

  if (word[3] !== "-") {
    word[3].split(",").forEach(async (id) => {
      const origin = await getWord(id);

      etymology = [...etymology, origin ? origin : id];
    });
  }

  function wordSrcFor(id: string) {
    return `/laul/laul/${id}.jpg`;
  }
</script>

<div class="word">
  <div class="title">
    <img src={wordSrcFor(word[0])} />
    {word[1]}
    <span class="id">{word[0]}</span>
  </div>
  <div class="meaning">{word[2]}</div>
  <div class="etymology">
    {#each etymology as origin}
      <Etymology {origin} />
    {/each}
  </div>
</div>

<style>
  .word {
    padding: 8px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  .word:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .title {
    font-weight: bold;
    margin-bottom: 8px;
  }
  .title img {
    width: 1rem;
    margin-right: 4px;
    transform: translateY(3px);
  }
  .id {
    font-size: 12px;
    color: #888;
    margin-left: 4px;
    vertical-align: center;
  }
  .meaning {
    font-size: 14px;
  }

  .etymology {
    margin-top: 4px;
  }
</style>
