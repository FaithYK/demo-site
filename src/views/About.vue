<template>
  <div>
    这是About页面
    <hr />
    <button @click="increse">增加</button>
    <hr>
    count: {{ $store.state.count }}
  </div>
</template>
<script setup> 
const store = useStore()
let count = 3
function increse(){
    count++
    store.commit('increate', count)
}
</script>
