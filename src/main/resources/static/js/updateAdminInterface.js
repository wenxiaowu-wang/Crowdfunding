let addNotice_vm = new Vue({
    el:"#userEditOfManage",
    data:{
        form:{
            username:"用户名",
            oldPwd:"",
            newPwd:"",
            doublePwd:"",
        },
    },
    methods: {
        onSubmit(){
            let this_ = this;
            if (this.form.oldPwd === null || this.form.oldPwd === "" || this.form.newPwd === null || this.form.newPwd === ""){
                alert("输入不可为空！");
                return;
            }
            //提交修改
            $.ajax({
                url: "/admin/updateAdminPwd",
                type: "post",
                data: {
                    oldPwd:this.formatString(this.form.oldPwd),
                    newPwd:this.formatString(this.form.newPwd),
                },
                dataType: 'json'
                , headers: 'updateAdminPwd',
                success: function (msg) {
                    let theResult = msg.data;
                    if (theResult){
                        alert("修改信息成功，请重新登录");
                        this_
                        window.location.assign("adminLogin");
                    }else{
                        alert("修改信息失败!"+msg.msg);
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
        var username = this.form.username;
        var this_ = this;
        if (username !== ""){
            $.ajax({
                url: "/admin/getSession",
                type: "GET",
                data: {},
                dataType: 'json',
                success: function (res) {
                    // console.log(res);
                    let theResult = res.data;
                    if (theResult == null){
                        alert("未登录，返回管理员登录界面");
                        window.location.assign("adminLogin");
                    }else{
                        console.log(theResult);
                        console.log("username = "+theResult.username);
                        console.log("form.username = "+this_.form.username);
                        this_.form.username = theResult.username;
                    }
                    // $("#content_div div").html(theResult+"待更新···");
                }
            });
        }

    }
})