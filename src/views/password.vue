<template>
    <div class="password">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model.number="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>



    </div>
</template>

<script>
    export default {
        name: "password",
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号'));
                } else {
                    var targ = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                    if( !targ.test(value)){
                        callback(new Error('手机号只支持数字'));
                    }
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    phone: ''
                },
                rules: {
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    pass: [
                        // { validator: validatePass, trigger: 'blur' }
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                        { min: 6, max: 16, required: true, message: '密码至少为6位', trigger: 'blur' },
                    ],
                    checkPass: [
                        // { validator: validatePass2, trigger: 'blur' }
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, max: 16, required: true, message: '密码至少为6位', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const formDatas=new FormData()
                        formDatas.append('phone',this.ruleForm.phone);//
                        formDatas.append('pwd',this.ruleForm.pass);//
                        formDatas.append('npwd',this.ruleForm.checkPass);//
                        this.axios({
                            method: "POST",
                            url: this.$local.http+this.$api.changePwd,
                            data:formDatas,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(data => {
                            let res = data.data;
                            if (res.success == false) {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                                this.$router.go(-1);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
   .password{padding-top: 30px;}
    .el-form{width: 30%;}
</style>