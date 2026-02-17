<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  const KEY = "AIzaSyD-HRSmm2OBOf0ZpMh5kAfPFggwXLVPC6E";
  const SPREADSHEET_ID = "1vTe1JGdWz95CRl4-Kg8b5KVHZ25tLsqx1aSAOCxpT1A";

  let values;
  let searchTerm = '';

  function searchWord(term: string) {
    if (!values) return [];
    if (!term) return values;
    if (term.length < 2) return values;

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

  function wordSrcFor(word: string) {
    if ($page.url.host === "sch.shtelo.org:5173") {
      return `/laul/${word}.jpg`
    } else {
      return `/laul/laul/${word}.jpg`
    }
  }

  onMount(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/단어?key=${KEY}`)
      .then(response => response.json())
      .then(data => {
        values = data.values.splice(1);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
</script>

<input type="text" placeholder="검색어를 입력하세요" bind:value={searchTerm} />

{#if values}
  <div>
    {#each searchWord(searchTerm) as word}
      <div>
        <div><img src={wordSrcFor(word[1])}> {word[1]}</div>
        <div>{word[3]}</div>
      </div>
    {/each}
  </div>
{/if}
