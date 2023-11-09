<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
    metaInfo() {
        return {
            title: 管理系统,
            titleTemplate: 管理系统
        }
    }
}
</script>
