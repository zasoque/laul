<script lang="ts">
  import cytoscape from 'cytoscape';
  import { onMount } from 'svelte';
  import {page} from '$app/stores';

  onMount(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [ ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            label: 'data(label)',
            'text-valign': 'bottom',
            'color': 'grey',
            'background-image': 'data(img)',
            'background-fit': 'cover',
            'shape': 'rectangle',
          }
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],
      layout: {
        name: 'grid',
        rows: 2
      }
    });

    const KEY = "AIzaSyD-HRSmm2OBOf0ZpMh5kAfPFggwXLVPC6E";
    const SPREADSHEET_ID = "1vTe1JGdWz95CRl4-Kg8b5KVHZ25tLsqx1aSAOCxpT1A";
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/단어?key=${KEY}`)
      .then(response => response.json())
      .then(data => {
        const values = data.values.splice(1);

        const nodes = [];
        const edges = [];
        for (const word of values) {
          nodes.push({ data: { id: word[0], label: word[1], img: $page.url.host === "sch.shtelo.org:5173" ? `/laul/${word[1]}.jpg` : `/laul/laul/${word[1]}.jpg` } });
          if (word[4] !== "-") {
            const relatedWords = word[4].split(',').map(w => w.trim());
            for (const relatedWord of relatedWords) {
              edges.push({ data: { source: relatedWord, target: word[0] } });
            }
          }
        }

        cy.add(nodes);
        cy.add(edges);
        cy.layout({ name: 'cose' }).run();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
</script>

<div id="cy" style="width: 800px; height: 600px;"></div>
