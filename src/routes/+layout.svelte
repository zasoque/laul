<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
  <div class="title"><a href="/laul">라울 메인페이지</a></div>
  <ul class="menu">
    <li><a href="/laul/dictionary">단어장</a></li>
    <li><a href="/laul/wordmap">단어 지도</a></li>
    <li><a href="/laul/grammar">문법</a></li>
    <li><a href="https://github.com/zasoque/laul">GitHub 레포지토리</a></li>
    <li>
      <a
        href="https://docs.google.com/spreadsheets/d/1vTe1JGdWz95CRl4-Kg8b5KVHZ25tLsqx1aSAOCxpT1A/edit?gid=0#gid=0"
        >단어장 스프레드시트</a
      >
    </li>
  </ul>
  {@render children()}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .title a {
    text-decoration: none;
    color: #333;
  }

  .menu {
    list-style-type: none;
    padding: 0;
  }

  .menu li {
    margin-bottom: 10px;
  }

  .menu a {
    text-decoration: none;
    color: #007bff;
    font-size: 1.2em;
  }

  .menu a:hover {
    text-decoration: underline;
  }
</style>
