<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-xl bg-light px-3">
      <a
        class="navbar-brand"
        href="#"
      >
        Patiro Test Project
      </a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/">
              Home
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.nav-item {
  padding: 0.5rem;
}
</style>