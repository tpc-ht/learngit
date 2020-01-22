<template>
    <div class="markingDetails">
        <div class="markingDetails_head">
            <ul>
                <li>
                    <p class="markingDetails_head_left">发布人：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">联系方式：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">发布日期：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">类型：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">标题：</p>
                    <p class="markingDetails_head_right">良田急租年付5000起</p>
                </li>
                <li>
                    <p class="markingDetails_head_left">所在位置：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">面积：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">付款方式：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">土地年限：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">出租价格：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">预约带看费：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
                <li>
                    <p class="markingDetails_head_left">详细介绍：</p>
                    <p class="markingDetails_head_right"></p>
                </li>
            </ul>
            <div class="markingDetails_head_img">
                <div>
                    <img src=" "/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detailsLandResources",
        data() {
            return {
                form: {
                    page: 1,
                    limit: 10
                },
                tableData: [],
            }
        },
        created() {


        },
        mounted() {

        },
        methods: {
            getList(){

            },

        }
    }
</script>

<style scoped>
    .markingDetails_head{width: 100%;padding-bottom: 20px;overflow: hidden;}
    .markingDetails_head ul{padding: 0;float: left;width: 75%;}
    .markingDetails_head ul li{width: 100%;line-height: 40px;font-size: 16px;overflow: hidden;}
    .markingDetails_head_left{float: left;text-align: left;width: 10%;color: #333333;}
    .markingDetails_head_right{float: left;text-align: left;width: 90%;color: #666666;}
    .markingDetails_head_img{float: left;width: 25%;padding-left: 2%}
    .markingDetails_head_img div{width: 300px;height: 200px;background-color: #dddddd;border-radius: 5px;margin-top: 10%;}
    .markingDetails_head_img div img{width: 100%;border-radius: 5px;height: 100%;}


</style>