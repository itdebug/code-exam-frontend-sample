<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

      <router-link to="/dept">部门管理</router-link> |
      <router-link to="/emp">员工管理</router-link> |
      <router-link to="/kpi">员工考核</router-link> |
      <router-link to="/ana">数据分析</router-link> |

    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

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

