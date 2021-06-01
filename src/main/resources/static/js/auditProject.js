let userEditOfManage_vm = new Vue({
    el:"#userEditOfManage",
    data:{
        form:{
            id:"",
            xiangmubianhao:"",
            biaoti:"",
            leibie:"",
            zhongchoujine:"",
            qixian:"",
            shouji:"",
            xiangqing:"",
            faburen:"",
            addtime:"",
            issh:""
        },
        labelPosition:"right",
        formLabel:{
            admin_id: "",
            admin_password: ""
        }
    },
    methods: {
        onSubmit(){
            //提交修改
            let user = {};
            $.ajax({
                url: "/pType/updateProjectById",
                type: "post",
                data: {
                    id:this.form.id,
                    xiangmubianhao:this.formatString(this.form.xiangmubianhao),
                    issh:this.formatString(this.form.issh),
                },
                dataType: 'json'
                , headers: 'updateProjectById',
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
        axios.get("/pType/getProjectBySessionId").then(response =>{
            //进行添加关注信息操作
            if (response.data !== null){
                let project = response.data.data;
                this.form.id = project.id;
                this.form.xiangmubianhao = project.xiangmubianhao;
                this.form.biaoti = project.biaoti;
                this.form.leibie = project.leibie;
                this.form.zhongchoujine = project.zhongchoujine;
                this.form.qixian = project.qixian;
                this.form.shouji = project.shouji;
                this.form.xiangqing = project.xiangqing;
                this.form.faburen = project.faburen;
                this.form.addtime = project.addtime;
                this.form.issh = project.issh;
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