let userEditOfManage_vm = new Vue({
    el:"#userEditOfManage",
    data:{
        form:{
            id:"",
            yonghuming:"",
            mima:"",
            xingming:"",
            xingbie:"",
            chushengnianyue:"",
            qq:"",
            youxiang:"",
            dianhua:"",
            shenfenzheng:"",
            touxiang:"",
            dizhi:"",
            beizhu:"",
            addtime:"",
            issh:"",
        },
        time:""
    },
    methods: {
        onSubmit(){
            //提交修改
            let user = {};
            let this_ = this;
            $.ajax({
                url: "/user/updateUserById",
                type: "post",
                data: {
                    id:this_.form.id,
                    yonghuming:this_.formatString(this_.form.yonghuming),
                    mima:this_.formatString(this_.form.mima),
                    xingming:this_.formatString(this_.form.xingming),
                    xingbie:this_.formatString(this_.form.xingbie),
                    chushengnianyue:this_.formatString(this_.form.chushengnianyue),
                    qq:this_.formatString(this_.form.qq),
                    youxiang:this_.formatString(this_.form.youxiang),
                    dianhua:this_.formatString(this_.form.dianhua),
                    shenfenzheng:this_.formatString(this_.form.shenfenzheng),
                    touxiang:this_.formatString(this_.form.touxiang),
                    dizhi:this_.formatString(this_.form.dizhi),
                    beizhu:this_.formatString(this_.form.beizhu),
                    // addtime:this_.formatString(this_.form.addtime),
                    // issh:this_.formatString(this_.form.issh),
                },
                dataType: 'json'
                , headers: 'updateUserById',
                success: function (msg) {
                    let theResult = msg.data;
                    if (theResult){
                        alert("修改信息成功！");
                        // refreshBgtDbTable();
                        window.close();
                    }else{
                        alert("修改信息失败!");
                    }
                }
            });
        },
        cancel(){
            window.close();
        },
        formatString(str){
            if (str === null){
                return "空";
            }else {
                return str;
            }
        },
        findData() {
            return {
                adminData: []
            }
        },
    },
    mounted(){
        //获取缓存id，根据id获取信息
        axios.get("/user/getUserBySessionId").then(response =>{
            //进行添加关注信息操作
            if (response.data !== null){
                let user = response.data.data;
                this.form.id = user.id;
                this.form.yonghuming = user.yonghuming;
                this.form.mima = user.mima;
                this.form.xingming = user.xingming;
                this.form.xingbie = user.xingbie;
                this.form.chushengnianyue = user.chushengnianyue;
                this.form.qq = user.qq;
                this.form.youxiang = user.youxiang;
                this.form.dianhua = user.dianhua;
                this.form.shenfenzheng = user.shenfenzheng;
                this.form.touxiang = user.touxiang;
                this.form.dizhi = user.dizhi;
                this.form.beizhu = user.beizhu;
                this.form.addtime = user.addtime;
                this.form.issh = user.issh;
            }else{
                console.log("信息获取不匹配！");
                this.$message({
                    type:'error',
                    message:'未选中目标或系统故障，获取信息失败！'
                });
            }
            // let object = JSON.stringify(response.data);
            // let object_int = parseInt(object);
        }).catch(error =>{
            this.$message({
                type:'error',
                message:"信息响应失败！"
            });
            console.log("信息响应失败");
        });
    }
})