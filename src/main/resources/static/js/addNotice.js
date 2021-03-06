let addNotice_vm = new Vue({
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
            faburen:"",
            touziren:"",
            iszf:"",
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
                url: "/notice/addOneNotice",
                type: "post",
                data: {
                    biaoti:this.formatString(this.form.biaoti),
                    neirong:this.formatString(this.form.neirong),
                    leibie:this.formatString(this.form.leibie),
                },
                dataType: 'json'
                , headers: 'updateProjectById',
                success: function (msg) {
                    let theResult = msg.data;
                    if (theResult){
                        alert("添加信息成功！");
                        // refreshBgtDbTable();
                        window.close();
                    }else{
                        alert("添加信息失败!");
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
        // //获取缓存id，根据id获取信息
        // axios.get("/pType/getOrderBySessionId").then(response =>{
        //     //进行添加关注信息操作
        //     if (response.data !== null){
        //         let order = response.data.data;
        //         this.form.id = order.id;
        //         this.form.xiangmubianhao = order.xiangmubianhao;
        //         this.form.biaoti = order.biaoti;
        //         this.form.leibie = order.leibie;
        //         this.form.zhongchoujine = order.zhongchoujine;
        //         this.form.qixian = order.qixian;
        //         this.form.shouji = order.shouji;
        //         this.form.faburen = order.faburen;
        //         this.form.touziren = order.touziren;
        //         this.form.iszf = order.iszf;
        //         this.form.addtime = order.addtime;
        //         this.form.issh = order.issh;
        //     }else{
        //         console.log("信息获取不匹配！");
        //         this.$message({
        //             type:'error',
        //             message:'未选中目标或系统故障，获取信息失败！'
        //         });
        //     }
        //     // let object = JSON.stringify(response.data);
        //     // let object_int = parseInt(object);
        // }).catch(error =>{
        //     this.$message({
        //         type:'error',
        //         message:"信息响应失败！"
        //     });
        //     console.log("信息响应失败");
        // });
    }
})