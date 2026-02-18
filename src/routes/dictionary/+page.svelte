<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  const KEY = "AIzaSyD-HRSmm2OBOf0ZpMh5kAfPFggwXLVPC6E";
  const SPREADSHEET_ID = "1vTe1JGdWz95CRl4-Kg8b5KVHZ25tLsqx1aSAOCxpT1A";

  let values;
  let searchTerm = "";

  function searchWord(term: string) {
    if (!values) return [];
    if (!term) return values;

    const result = [];
    for (const word of values) {
      for (const cell of word) {
        if (cell.includes(term)) {
          result.push(word);
          break;
        }
      }
    }

    return result;
  }

  function wordSrcFor(id: string) {
    return `/laul/laul/${id}.jpg`;
  }

  onMount(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/단어?key=${KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        values = data.values.splice(1);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
</script>

<input
  type="text"
  placeholder="검색어를 입력하세요"
  bind:value={searchTerm}
  class="query"
/>
{#if values}
  <div class="results">
    {#each searchWord(searchTerm) as word}
      <div class="word">
        <div class="title"><img src={wordSrcFor(word[0])} /> {word[1]}</div>
        <div class="meaning">{word[2]}</div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .query {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    margin-bottom: 16px;
    font-size: 16px;
  }
  .results {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
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
    margin-bottom: 4px;
  }
  .title img {
    width: 1rem;
    margin-right: 4px;
  }
  .meaning {
    font-size: 14px;
  }
</style>
