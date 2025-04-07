<script setup lang="ts">
import keys from '@/assets/keys';
import { type ColorState, type Dimension2D } from '@/modules/types/ui';
import { debounce, isNil } from 'lodash';
import { onBeforeUnmount, onMounted, provide, reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const dimension = reactive<Dimension2D>({ width: window.innerWidth, height: window.innerHeight })
const colorState = reactive<ColorState>({ mode: (!isNil(window.matchMedia) && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') })

const updateDimension = debounce((ui: UIEvent) => { dimension.width = (ui.currentTarget as Window).innerWidth; dimension.height = (ui.currentTarget as Window).innerHeight; }, 100);
const updateMode = debounce((me: MediaQueryListEvent) => {
  if (me.matches) {
    document.documentElement.classList.add("dark")
    colorState.mode = "dark"
  } else {
    document.documentElement.classList.remove("dark")
    colorState.mode = "light"
  }
}, 100)

/* Providers */
provide<ColorState>(keys.colorState, colorState)
provide<Dimension2D>(keys.dimension, dimension)

/* Lifecycle calls */
onMounted(() => {
  window.addEventListener('resize', updateDimension)
  if (!isNil(window.matchMedia("(prefers-color-scheme: dark)"))) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateMode)
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimension)
  if (!isNil(window.matchMedia("(prefers-color-scheme: dark)"))) window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateMode)
});

</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
  </header>

  <router-view />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
