<template>
    <div class="addArticleGoods">
        <div>
            <p class="se-pl">商品名称</p>
            <div class="inputes">
                <el-input placeholder="最多输入30个字" v-model="formData.title" :maxlength="30" style="width: 300px;"></el-input>
            </div>
        </div>
        <div class="attributeDiv_con">
            <p class="attributeDiv_con-pl">商品属性</p>
            <div class="attributeDiv">
                <ul class="attribute">
                    <li>
                        <span class="se-p2">规格</span>
                        <el-input placeholder="请输入" v-model="formData.specifications" style="width: 150px;"></el-input>
                    </li>
                    <li>
                        <span class="se-p2">单价</span>
                        <el-input placeholder="请输入" v-model="formData.price" style="width: 150px;"></el-input>
                    </li>
                    <li>
                        <span class="se-p2">库存</span>
                        <el-input placeholder="请输入" v-model="formData.Inventory" style="width: 150px;"></el-input>
                    </li>
                    <li class="li_span">
                        <span @click="tianjia()">+</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="attributeDiv_two" v-show="show">
            <ul>
                <li v-for="(val , i) in shareholderInfoList" class="scgd">
                    <div class="gudong">
                        <span class="se-p2">规格</span>
                        <el-input placeholder="请输入" v-model="val.specifications" style="width:150px;"></el-input>
                    </div>
                    <div class="gudong">
                        <span class="se-p2">单价</span>
                        <el-input placeholder="请输入" v-model="val.price" style="width:150px;"></el-input>
                    </div>
                    <div class="gudong">
                        <span class="se-p2">库存</span>
                        <el-input placeholder="请输入" v-model="val.Inventory" style="width:150px;"></el-input>
                    </div>
                    <span class="tj" @click="addInput()">+</span>
                    <span class="tj" v-on:click="shareholderInfoList.splice(i, 1)">-</span>
                </li>
            </ul>
        </div>
        <div>
            <p class="se-pl">商品所在地</p>
            <div class="inputes">
                <el-cascader v-model="adderedOne" :options="selected" change-on-select clearable></el-cascader>
                <!--<el-select v-model="adderedTwo" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in adderssM" :key="item.code" :label="item.name" :value="item.code">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--<el-select v-model="adderedThree" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in adderssN" :key="item.code" :label="item.name" :value="item.code">-->
                <!--</el-option>-->
                <!--</el-select>-->
            </div>
        </div>
        <div>
            <p class="se-pl">客服电话</p>
            <div class="inputes">
                <el-input placeholder="请输入" v-model="formData.title"></el-input>
            </div>
        </div>
        <div>
            <p class="se-pl">最小购买数量</p>
            <div class="inputes">
                <el-input placeholder="请输入" v-model="formData.title"></el-input>
            </div>
        </div>
        <div style="position: relative;">
            <p class="se-p3">商品轮播图片</p>
            <div class="vue-uploader">
                <div class="file-list">
                    <section
                            v-for="(file, index) of files"
                            v-if="index<=3"
                            class="file-item draggable-item"
                    >
                        <img :src="file.src" alt ondragstart="return false;">
                        <span class="file-remove" @click="remove(index)">+</span>
                    </section>
                    <section v-if=" status == 'ready'" class="file-item">
                        <div @click="add" class="add">
                            <span>+</span>
                        </div>
                    </section>
                </div>
                <!-- 调用相机/图库 ref="file" 指定DOM节点 -->
                <input type="file" accept="image/*" @change="fileChanged" ref="file" name="file" multiple>
                <p>图像比例为5:3.5，大小在100K以下</p>
            </div>
        </div>
        <div style="position: relative;">
            <p class="se-p3">商品的详情</p>
            <div class="inputes" style="width: 80%;margin-left: 115px;">
                <el-card style="height: 610px;">
                    <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
                        <!-- 自定义toolar -->
                        <!--<div id="toolbar" slot="toolbar">-->
                        <!--&lt;!&ndash; Add a bold button &ndash;&gt;-->
                        <!--<button class="ql-bold" title="加粗">Bold</button>-->
                        <!--<button class="ql-italic" title="斜体">Italic</button>-->
                        <!--<button class="ql-underline" title="下划线">underline</button>-->
                        <!--<button class="ql-strike" title="删除线">strike</button>-->
                        <!--<button class="ql-blockquote" title="引用"></button>-->
                        <!--<button class="ql-code-block" title="代码"></button>-->
                        <!--<button class="ql-header" value="1" title="标题1"></button>-->
                        <!--<button class="ql-header" value="2" title="标题2"></button>-->
                        <!--&lt;!&ndash;Add list &ndash;&gt;-->
                        <!--<button class="ql-list" value="ordered" title="有序列表"></button>-->
                        <!--<button class="ql-list" value="bullet" title="无序列表"></button>-->
                        <!--&lt;!&ndash; Add font size dropdown &ndash;&gt;-->
                        <!--<select class="ql-header" title="段落格式">-->
                        <!--<option selected>段落</option>-->
                        <!--<option value="1">标题1</option>-->
                        <!--<option value="2">标题2</option>-->
                        <!--<option value="3">标题3</option>-->
                        <!--<option value="4">标题4</option>-->
                        <!--<option value="5">标题5</option>-->
                        <!--<option value="6">标题6</option>-->
                        <!--</select>-->
                        <!--<select class="ql-size" title="字体大小">-->
                        <!--<option value="10px">10px</option>-->
                        <!--<option value="12px">12px</option>-->
                        <!--<option value="14px">14px</option>-->
                        <!--<option value="16px" selected>16px</option>-->
                        <!--<option value="18px">18px</option>-->
                        <!--<option value="20px">20px</option>-->
                        <!--</select>-->
                        <!--<select class="ql-font" title="字体">-->
                        <!--<option value="SimSun">宋体</option>-->
                        <!--<option value="SimHei">黑体</option>-->
                        <!--<option value="Microsoft-YaHei">微软雅黑</option>-->
                        <!--<option value="KaiTi">楷体</option>-->
                        <!--<option value="FangSong">仿宋</option>-->
                        <!--<option value="Arial">Arial</option>-->
                        <!--</select>-->
                        <!--&lt;!&ndash; Add subscript and superscript buttons &ndash;&gt;-->
                        <!--<select class="ql-color" value="color" title="字体颜色"></select>-->
                        <!--<select class="ql-background" value="background" title="背景颜色"></select>-->
                        <!--<select class="ql-align" value="align" title="对齐"></select>-->
                        <!--<button class="ql-clean" title="还原"></button>-->
                        <!--&lt;!&ndash; You can also add your own &ndash;&gt;-->
                        <!--</div>-->
                    </quill-editor>
                </el-card>

            </div>
        </div>
        <el-row class="foot_but">
            <el-button @click="cleach">发布</el-button>
        </el-row>

    </div>
</template>

<script>
    import adderss from '@/api/adderss'
    import { Quill,quillEditor} from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    //引入font.css
    import '../../assets/font.css'

    // 自定义字体大小
    let Size = Quill.import('attributors/style/size')
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px']
    Quill.register(Size, true)

    // 自定义字体类型
    var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
        '宋体', '黑体'
    ]
    var Font = Quill.import('formats/font')
    Font.whitelist = fonts
    Quill.register(Font, true)

    export default {
        name: "barterGoods",
        props: {
            src: { // 后台接受图片的http地址
                type: String,
                required: false
            },
        },
        data() {
            return {
                fruit: "个体商户",
                addrInif: "",
                show: false,
                status: 'ready', // 状态
                files: [], // 图片数组
                formData: {
                    title: "",
                    specifications: "",
                    price: "",
                    Inventory: ""
                },
                legalPersonInfo: [
                    {
                        userName: "",
                        idCardNo: "",
                        ashare: ""
                    }
                ],

                shareholderInfoList: [],
                shareholderInfo: { specifications: "", price: "", Inventory: "" },
                selected: adderss,
                adderedOne: '',
                adderedTwo: '',
                adderedThree: '',
                adderssM: [],
                adderssN: [],
                content: null,
                editorOption: {},

            };
        },
        components: {
            quillEditor
        },
        mounted() {},
        methods: {

            addInput() {
                this.shareholderInfoList.push({specifications: "", price: "", Inventory: "" });
                console.log(this.shareholderInfoList);
            },
            //生成股东
            tianjia() {
                this.show=true;
                this.shareholderInfoList.push({specifications: "", price: "", Inventory: "" });
                console.log(this.shareholderInfoList);
            },

// 添加图片操作
            add() {
                this.$refs.file.click();
            },
            // 提交所有数据----请求后台
            submit() {
                const formData=new FormData()
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                let this_ = this;
                var userList=[]
                var userList=JSON.parse(localStorage.getItem('userInfo'))
                this.userList=userList
                for(var i in this.files){
                    var src=this.files[i].file
                    formData.append('imageList',src)//帖子的配图
                }
                formData.append('title',this_.formDatas.aname)//帖子标题
                formData.append('content',this_.formDatas.atext)//帖子内容
                formData.append('address',this.addressData)//发帖时的位置
                //发送ajax请求到后台
                this.axios({
                    method:"post",
                    url: '/api/common/v1/CoverageNews/insertCoverageNews?user_id='+userList.userId,
                    data:formData,
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{


                }).catch(res=>{

                })
            },
            // 完成操作 还原状态
            finished() {
                this.files = [];
                this.status = 'ready'
            },
            // 上传图片列表中的某个图片
            remove(index) {
                this.files.splice(index, 1)
            },
            // 唤醒相机/图库
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            size: list[i].size,
                            file: list[i]
                        }
                        // 转换图片格式
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            // 判断是否包含
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.size === file.size) {
                        return true
                    }
                })
                return false
            },


        },




    }

</script>

<style lang="less" scoped>
    .addArticleGoods{width: 100%;}
    .se-pl {margin-right: 10px;width: 100px;display: inline-block;text-align: right;}
    .se-p2{margin-right: 10px;}
    .se-p3{margin-right: 10px;width: 100px;display: inline-block;text-align: right;position: absolute;top:10px;}
    .inputes {display: inline-block !important;margin-top: 10px;}
    .attributeDiv_con{overflow: hidden;margin-top: 10px;}
    .attributeDiv_con-pl{float: left;margin-right: 10px;line-height: 36px;width: 100px;text-align: right;}
    .attributeDiv{float: left;width: 80%;}
    .attribute{overflow: hidden;padding: 0;margin: 0;}
    .attribute li{float: left;width: 18%;}
    .li_span{width: 20%;}
    .li_span span{font-size: 28px;color: #000;padding: 0 10px;cursor: pointer}
    .attributeDiv_two{width: 100%;padding-left: 70px;}
    .attributeDiv_two ul{overflow: hidden;margin:10px 0 0 0;}
    .attributeDiv_two ul li{overflow: hidden;margin-bottom: 10px;}
    .gudong{float: left;width: 15.5%;}
    .tj{font-size: 28px;color: #000;padding: 0 10px;cursor: pointer}
    .vue-uploader {
        width: 90%;
        display: inline-block;
        margin-top: 10px;
        margin-left: 115px;
        p{padding: 10px 0;}
        .file-list {
            &:after {
                content: "";
                display: block;
                clear: both;
                visibility: hidden;
                line-height: 0;
                height: 0;
                font-size: 0;
            }
            .file-item {
                float: left;
                position: relative;
                width: 200px;
                text-align: center;
                margin-right: 10px;
                img {
                    width: 200px;
                    height: 140px;
                    border: 1px solid #ececec;
                }
                .file-remove {
                    position: absolute;
                    right: 6px;
                    display: none;
                    top: 6px;
                    width: 18px;
                    height: 18px;
                    color: white;
                    cursor: pointer;
                    line-height: 18px;
                    border-radius: 100%;
                    transform: rotate(45deg);
                    background: rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                }
                &:hover {
                    .file-remove {
                        display: inline;
                    }
                }
                .file-name {
                    margin: 0;
                    height: 40px;
                    word-break: break-all;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .add {
            width: 200px;
            height: 140px;
            float: left;
            text-align: center;
            line-height: 150px;
            background-color: #8c8c8c;
            font-size: 30px;
            cursor: pointer;
        }
        .upload-func {
            display: flex;
            padding: 10px;
            margin: 0px;
            background: #f8f8f8;
            border-top: 1px solid #ececec;
            .progress-bar {
                flex-grow: 1;
                section {
                    margin-top: 5px;
                    background: #00b4aa;
                    border-radius: 3px;
                    text-align: center;
                    color: #fff;
                    font-size: 12px;
                    transition: all 0.5s ease;
                }
            }
            .operation-box {
                flex-grow: 0;
                padding-left: 10px;
                button {
                    padding: 4px 12px;
                    color: #fff;
                    background: #007acc;
                    border: none;
                    border-radius: 2px;
                    cursor: pointer;
                }
            }
        }
        & > input[type="file"] {
            display: none;
        }
    }
    .upload-imgs {
        margin: 10px 0 30px 0;
        overflow: hidden;
        font-size: 0;
    }
    .upload-imgs li {
        position: relative;
        width: 118px;
        height: 118px;
        font-size: 14px;
        display: inline-block;
        padding: 10px;
        margin-right: 25px;
        border: 2px dashed #ccc;
        text-align: center;
        vertical-align: middle;
    }
    .upload-imgs li:hover {
    }
    .upload-imgs .add {
        display: block;
        background-color: #ccc;
        color: #ffffff;
        height: 94px;
        padding: 8px 0;
    }
    .upload-imgs .add .iconfont {
        padding: 10px 0;
        font-size: 40px;
    }
    .upload-imgs li:hover .add {
    }
    .upload-imgs li .upload {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 118px;
        height: 118px;
    }
    .upload-imgs .img {
        position: relative;
        width: 94px;
        height: 94px;
        line-height: 94px;
    }
    .upload-imgs .img img {
        vertical-align: middle;
        width: 100%;
    }
    .upload-imgs .img .close {
        display: none;
    }
    .upload-imgs li:hover .img .close {
        display: block;
        position: absolute;
        right: -6px;
        top: -10px;
        line-height: 1;
        font-size: 22px;
        color: #aaa;
    }
    .foot_but button{margin: 10px 45%}
</style>