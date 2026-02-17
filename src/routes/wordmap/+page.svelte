<script lang="ts">
  import cytoscape from "cytoscape";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import fcose from "cytoscape-fcose";

  cytoscape.use(fcose);

  onMount(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      style: [
        {
          selector: "node",
          style: {
            "background-color": "white",
            label: "data(label)",
            "text-valign": "bottom",
            color: "grey",
            "background-image": "data(img)",
            "background-fit": "contain",
            shape: "rectangle",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: {
        name: "fcose",
        quality: "proof",
        randomize: true,
        animate: true,
      },
    });

    const KEY = "AIzaSyD-HRSmm2OBOf0ZpMh5kAfPFggwXLVPC6E";
    const SPREADSHEET_ID = "1vTe1JGdWz95CRl4-Kg8b5KVHZ25tLsqx1aSAOCxpT1A";
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/단어?key=${KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const values = data.values.splice(1);

        const nodes = [];
        const edges = [];
        for (const word of values) {
          nodes.push({
            data: {
              id: word[0],
              label: word[1],
              img:
                $page.url.host === "localhost:5173"
                  ? `/laul/${word[0]}.jpg`
                  : `/laul/laul/${word[0]}.jpg`,
            },
          });
          if (word[3] !== "-") {
            const relatedWords = word[3].split(",").map((w) => w.trim());
            for (const relatedWord of relatedWords) {
              edges.push({ data: { source: relatedWord, target: word[0] } });
            }
          }
        }

        cy.add(nodes);
        cy.add(edges);
        cy.layout({ name: "cose" }).run();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
</script>

<div id="cy"></div>

<style>
  #cy {
    width: 100vw;
    height: 100vh;
  }
</style>
