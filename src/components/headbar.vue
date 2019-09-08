<template>
    <div class="headbar">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="#">科学研究</a>
    </div>
    <div>
        <ul class="nav navbar-nav">
            <li><router-link to="/">index1</router-link></li>
            <li><router-link to="/index2">index2</router-link></li>
            <li><router-link to="/index3">index3</router-link></li>
        </ul>
    </div>
    </div>
</nav>
    </div>
</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
.headbar{
}
</style>
