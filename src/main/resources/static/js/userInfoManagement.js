var npid = ''
layui.use(['table'], function () {
    var table = layui.table,
        $ = layui.jquery;   //申明jquery
    /*   返回点击事件*/
    $('#close').click(function () {
        layer.close(layer.index);
    });


    // 表格渲染
    table.render({
        elem: '#test'    //渲染
        , method: 'get'   //请求方式
        , height: 'full-62'  //表格高度
        , id: "idTest"
        ,url:'/user/getAllUser'
        , defaultToolbar: []     //工具栏右侧隐藏
        , title: '用户信息表'
        , parseData: function (res) {  //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                // "msg": res.msg, //解析提示文本
                "count": res.data.length, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        , cols: [[   //表格绑数据
            // {type: 'checkbox'}
            {field: 'id', title: '编号', align: 'center', width: "5%"}
            , {field: 'yonghuming', title: '用户名',align: 'center',width: "7%"}
            , {field: 'xingming', title: '姓名', align: 'center',width: "6%"}
            , {field: 'xingbie', title: '性别 ',align: 'center', width: "5%"}
            , {field: 'chushengnianyue', title: '出生年月 ',align: 'center',width: "8%"}
            , {field: 'qq', title: 'qq ', align: 'center',width: "10%"}
            , {field: 'youxiang', title: '邮箱 ',align: 'center',width: "12%" }
            , {field: 'dianhua', title: '电话 ',align: 'center', width: "10%"}
            , {field: 'shenfenzheng', title: '身份证 ', align: 'center'}
            // , {field: 'touxiang', title: '头像 ',hide:true, }
            , {field: 'dizhi', title: '地址 ',align: 'center',width: "13%"}
            , {field:'operation', title: '操作', toolbar: '#barDemo',align: 'center'}
        ]],
    });



    //监听行工具事件
    table.on('tool(test)', function(obj){
        npid = obj.data.id;
        let userName = obj.data.yonghuming;
        if (obj.event === 'open'){
            openAccount(npid);   //启用用户账号
        }else if (obj.event === 'upload'){
            axios.post("/setUserEditIdToSession/" +
                npid).then(response =>{
                //response.data本身即为字符串格式，JSON处理是为了将整个response对象解析成字符串，否则直接打印response为Object
                let theResult = response.data;
                if (theResult) {
                    //登录成功，进行的操作:在当前界面跳进入管理员主界面；
                    //跳转界面
                    window.open("/userEditOfManage"); //修改用户账号信息界面
                } else {
                    this.$message({
                        type: 'error',
                        message: '系统错误'
                    });
                }
            }).catch(error =>{
                console.log("跳转失败+" + error);
            });
        }else if (obj.event === 'end'){
            endAccount(npid);   //禁用对应用户账号
        }
    });

    //原监听头工具栏
    $("#close").click(function () {
        $('#close').blur()
    });

    $(function () {
        $("#search2").click(function () {
            $('#search2').blur()
        })
    });

});

$("#refresh").click(function () {
    this.refreshBgtDbTable();
});

// 搜索按钮
$("#search").click(function () {
    search()
})
//执行搜索，表格重载
function search(){
    target = $('#unitInput').val();
    //执行重载
    layui.table.reload('tableUnit', {
        page: {
            curr: 1 //重新从第 1 页开始
        }
        ,where: {
            organName: target
        }
    });
}

// 按下回车，执行搜索
$(document).keypress(function(e) {
    if((e.keyCode || e.which) === 13) {
        // 触发需要调用的方法
        search();
    }
});



//上传弹框的打开以及监听事件
function uploadLeaderOpinion(npid){

    //清空弹框的输入内容
    $("#feedback").val("");
    $("#leaderName").val("");

    //打开上传panel
    layer.open({
        type: 1,
        title: '上传批示意见',
        // shade: 0,
        zIndex: 1998,
        area: '750px', //宽
        content: $("#uploadPanel")
    });

    //监听上传表单
    layui.use(['form'], function() {
        var form = layui.form
            , layer = layui.layer;
        //监听提交按钮
        $("#submit_now").click(function () {
            attachmentfjIDS=attachmentfjIDS.substring(0, attachmentfjIDS.length - 1);
            let feedback = $("#feedback").val();
            let leaderName = $("#leaderName").val();
            // layer.alert(attachmentfjIDS, {
            //     title: 'feedback = '+feedback+npid
            // });
            if (leaderName === "" || feedback === ""){
                layer.msg('领导名字或批示内容均不可为空！', {
                    icon: 5,
                    time: 2000, //2s后自动关闭
                });
                return false;
            }
            config.post_ajax(config.occ_url() + "/occ-deal/bgtUploadLeaderOpinion", {
                async: false,
                // contentType:"application/json;charset=UTF-8",
                data: {
                    attachmentfjIDS:attachmentfjIDS,
                    feedback:feedback,
                    npid:npid,
                    leaderName:leaderName
                },
                success: function (res) {
                    layer.closeAll('page');    //关闭所有页面层
                    $("#feedback").val("");
                    $("#leaderName").val("");
                    if (res.code === 200) {
                        let getData = res.data;
                        if (getData){
                            layer.msg("领导批示上传成功", {
                                icon: 6,
                                time: 1000, //1s后自动关闭
                            }, function () {
                                // refreshBgtDbTable();    //刷新表格
                                window.location.reload();
                            });
                        }else {
                            layer.msg('领导批示上传失败！', {
                                icon: 5,
                                time: 2000, //2s后自动关闭
                            });
                        }
                    }
                }
            }, "bgtUploadLeaderOpinion");
        });

    });
}
//禁用id对应的用户账号
function endAccount(id){
    $.ajax({
        url: "/user/disableUserAccount",
        type: "POST",
        data: {'id':id},
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            let theResult = res.data;
            if (theResult) {
                //登录成功，进行的操作:在当前界面跳进入管理员主界面；
                //跳转界面
                // window.location.assign("toAdminMain");
                // window.location.reload();

                refreshBgtDbTable();
            } else {
                layer.msg('禁用账号失败！', {
                    icon: 5,
                    time: 1500, //1.5s后自动关闭
                });
            }
        }
    });
}

//启用id对应的用户账号
function openAccount(id){
    $.ajax({
        url: "/user/openUserAccount",
        type: "POST",
        data: {'id':id},
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            let theResult = res.data;
            if (theResult) {
                //登录成功，进行的操作:在当前界面跳进入管理员主界面；
                //跳转界面
                // window.location.assign("toAdminMain");
                // window.location.reload();

                refreshBgtDbTable();
            } else {
                layer.msg('启用账号失败！', {
                    icon: 5,
                    time: 1500, //1.5s后自动关闭
                });
            }
        }
    });
}

//刷新表格
function refreshBgtDbTable(){
    // console.log("执行刷新办公厅待办表格操作=====================================》");
    layui.use(['table'], function () {
        var table = layui.table;
        var active =
            {
                reload: function () {
                    //执行重载
                    table.reload('idTest',
                        {
                            page: {
                                curr: 1
                            },//重新从第 1 页开始
                            // where: {
                            //     sysUnitInfoCondition: sysUnitInfoCondition_value
                            // }
                        });
                    layer.close(layer.index);
                }
            };
        active.reload();
    });
}



window.addEventListener('visibilitychange',()=>{
    if(!document.hidden){
        this.refreshBgtDbTable();
    }
});
//执行搜索，表格重载$("[name='dataSearch']")
$("#dataSearch1").click(function (e) {
    layui.use(['table'], function () {
    var table = layui.table;
    var active =
        {
            reload: function () {
                //执行重载
                // initData();
                table.reload('idTest',
                    {
                        page: {
                            curr: 1
                        },//重新从第 1 页开始
                        // where: {
                        //     sysUnitInfoCondition: sysUnitInfoCondition_search1
                        // }
                    });
            }
        };
    active.reload();
    });
});

