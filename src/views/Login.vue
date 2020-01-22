<template>
  <!--<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">-->
    <!--<h3 class="title">系统登录</h3>-->
    <!--<el-form-item prop="phone">-->
      <!--<el-input type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="账号"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item prop="pwd">-->
      <!--<el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="密码"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <!--<el-form-item style="width:100%;">-->
      <!--<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>-->
    <!--</el-form-item>-->
  <!--</el-form>-->
  <div class="login-container">
    <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" class="login-form" auto-complete="on" label-position="left" v-show="loginShow">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="ruleForm2.phone" placeholder="请输入账号" type="text" auto-complete="off"/>
      </el-form-item>
        <el-form-item prop="pwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="ruleForm2.pwd" type="password" placeholder="请输入密码" auto-complete="off"/>
        </el-form-item>
      <p class="remember" @click.prevent="forgetPassword()">忘记密码 ？</p>
      <el-button :loading="logining" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSubmit2">登录</el-button>
    </el-form>

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-form" auto-complete="on" label-position="left" v-show="pwdShow">
      <div class="title-container">
        <h3 class="title">忘记密码</h3>
      </div>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" type="text" auto-complete="off"/>
        <button @click.prevent="getPwd()" class="button">获取验证码</button>
      </el-form-item>
      <el-form-item prop="verificationCode">
         <i class="el-icon-message i"></i>
        <el-input v-model="ruleForm.verificationCode" type="text" placeholder="请输入验证码" auto-complete="off"/>
      </el-form-item>
      <el-form-item prop="pwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
        <el-input v-model="ruleForm.pwd" type="text" placeholder="请输入密码" auto-complete="off"/>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="sendPwd">登录</el-button>
    </el-form>

    <footer class="foot">
      <div>
        <p>版权所有 © 海口市搜了科技有限公司</p>
        <p><a href="http://www.beian.miit.gov.cn" target="_blank">琼ICP备18002094号</a></p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
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
        logining: false,
        loginShow:true,
        pwdShow:false,
        ruleForm2: {
          phone: '',
          pwd: ''
        },
        ruleForm: {
          verificationCode: '',
          phone: '',
          pwd:''
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' },
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, required: true, message: '密码至少为6位', trigger: 'blur' },
          ],
        },
        rules2: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, required: true, message: '密码至少为6位', trigger: 'blur' },
          ]
        },
        checked: true,
      };
    },
    methods: {
      forgetPassword(){
        if(this.loginShow==true){
          this.pwdShow=true;
          this.loginShow=false;
        }else if(this.loginShow==false){
          this.pwdShow=false;
          this.loginShow=true;
        }
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();

      },
	  //点击登录
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            const formDatas=new FormData();
            formDatas.append('phone',this.ruleForm2.phone);//电话
            formDatas.append('pwd',this.ruleForm2.pwd);//密码
            var that=this;
			this.axios({
				method: "POST",
				url: this.$local.http+this.$api.proxyLogin,
				data:formDatas,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(data => {
				this.logining = false;
				// console.log(res)
				 let res = data.data;
				 let user = res.data;
				console.log('user',user);
				if (res.success == false) {
				  this.$message({message: res.msg, type: 'error'});
				} else {
				   that.getToken(user.clientId,user.clientSecret);
				   // user.rules= 4;
				  sessionStorage.setItem('user', JSON.stringify(user));
				
				  if(user.rules==1||user.rules==100){
					this.$router.push({path:'/AgentOne'});
				  }else if(user.rules==2){
					this.$router.push({path:'/AgentsEnter'});
				  }else if(user.rules==3){
					this.$router.push({path:'/Formag'});
				  }else if(user.rules==4){
					this.$router.push({path:'/foreignPromotionCommission'});
				  }
				}
			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //获取验证码
      getPwd() {
        const formDatas=new FormData()
        formDatas.append('mobile',this.ruleForm.phone)//省
        formDatas.append('country_code','86')//市
        this.axios({
          method: "post",
          url: this.$local.http + this.$api.pwd,
          data:formDatas,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data.success) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        }).catch(res=>{
          this.$message({
            message:res.data.msg,
            type: 'error'
          })
        })
      },
      sendPwd(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const formDatas=new FormData()
            formDatas.append('phone',this.ruleForm.phone)//省
            formDatas.append('code',this.ruleForm.verificationCode)//市
            formDatas.append('pwd',this.ruleForm.pwd)//市
              // let formDatas={
              //     phone:this.ruleForm.phone,
              //     code:this.ruleForm.verificationCode,
              //     pwd:this.ruleForm.pwd
              // };
            this.axios({
              method: "POST",
              url: this.$local.http+this.$api.setPassword,
              data:formDatas,
              // headers: {
              //   'Content-Type': 'application/x-www-form-urlencoded'
              // }
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
                this.pwdShow=false;
                this.loginShow=true
              }
            })
          } else {
              console.log('error submit!!');
              return false;
          }
        });
      },
      //获取token
       async getToken(clientId, clientSecret) {
            let params = {
                grant_type: 'client_credentials'
            };

            this.$axios({
                method: "POST",
                url: this.$local.http+"oauth/token?grant_type=client_credentials",
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': this.make_base_auth(clientId, clientSecret)
                }
            }).then(res => {
                if (res.status==200) {
                    sessionStorage.setItem('token',res.data.value)
                } else {}
            }).catch(error => {

            });
        },

        //base_auth验证
        make_base_auth(user, password) {
            let Base64 = require('js-base64').Base64;
            var tok = user + ':' + password;
            var hash = Base64.encode(tok);
            return "Basic " + hash;
        }

    }
  }

</script>

<style lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }
  .foot{width: 100%;height: 60px;position: fixed;bottom: 0;left: 0;}
  .foot div{width: 21%;margin: 0 auto;line-height: 60px;}
  .foot div p{display: inline-block;color: #fff;}
  .foot div p:nth-child(2){padding-left: 10%;}
  .remember{text-align: right;color: #fff;padding:0 15px 15px 0;cursor: pointer;float: right;width: 20%;}
  .button{padding: 8px 10px;border-radius: 80px;cursor: pointer;border: 0;
    color: #fff;
    background-color: #18c79c;outline: none;
   }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 68%;
      input {
        background: transparent;
        border: 0px!important;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        color: #fff;
        caret-color: #fff;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 280px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
   .i{font-size: 14px;color: #889aa4;padding: 6px 5px 6px 15px;
     vertical-align: middle;
     width: 30px;
     display: inline-block;}
    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
