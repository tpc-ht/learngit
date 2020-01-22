<template>
    <div class="img">
        <img src="../assets/4040.png"/>
        <div class="page-container" @click="getData"></div>
    </div>
</template>
<script>

    export default {
        data() {
            return {

            }
        },

        methods: {
            getData() { //初始化
               this.$router.back()
            },

        }
    }
</script>
<style lang="scss" scoped>
    .img{
        width: 100%;
    }
    .page-container {
       width: 290px;
        height: 60px;
        margin: 0 auto;
        position: relative;
        top:-110px;
        cursor: pointer;
        z-index: 10;
    }
    img{width: 40%;margin: 0 30%;}
</style>