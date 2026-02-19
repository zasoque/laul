<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Word from "$lib/components/Word.svelte";

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

  function getWord(id: string): Promise<string[] | null> {
    return values.find((word) => word[0] === id) || null;
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
      <Word {word} {getWord} />
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
</style>
