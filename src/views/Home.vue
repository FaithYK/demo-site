<template>
  <div>
    这是Home页面
    <hr />
    <div class="wrap">
      <p>count: {{ count }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const store = useStore();
const count = computed(() => store.state.count);
</script>
<style scoped lang="scss">
.wrap {
    background: yellow;
    p {
        color: blue;
        font-size: 24px;
    }
} 
</style>
