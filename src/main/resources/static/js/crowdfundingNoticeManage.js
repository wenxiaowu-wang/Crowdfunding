var npid = ''
layui.use(['table'], function () {
    var table = layui.table,
        $ = layui.jquery;   //申明jquery
    /*   返回点击事件*/
    $('#close').click(function () {
        layer.close(layer.index);
    });

    let titleData = getSearchData();

    // 表格渲染
    table.render({
        elem: '#test'    //渲染
        , method: 'get'   //请求方式
        , height: 'full-62'  //表格高度
        , id: "idTest"
        ,url:'/notice/getNoticeListByLike'
        , defaultToolbar: []     //工具栏右侧隐藏
        , title: '通知信息表'
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
            , {field: 'id', title: '编号', align: 'center'}
            , {field: 'biaoti', title: '标题', align: 'center'}
            , {field: 'leibie', title: '类别', align: 'center'}
            , {field: 'neirong', title: '内容 ', align: 'center'}
            , {field: 'tianjiaren', title: '添加人 ', align: 'center'}
            , {field: 'shouyetupian', title: '首页图片 ',hide:true, align: 'center'}
            , {field: 'dianjilv', title: '点击率 ',hide:true, align: 'center'}
            , {field: 'addtime', title: '创建时间 ', align: 'center'}
            // , {field: 'handleState', title: '签收情况 ', align: 'center',
            //     templet: function (d) {
            //         // console.log("this is data[d]:"+JSON.stringify(d));
            //         if (d.handleState !== "未签收"){
            //             return "<span style='color: red;'>"+d.handleState+"</span>";
            //         }else {
            //             return "<span style='color: #262424;'>"+d.handleState+"</span>";
            //         }
            //     }}
            // , {field:'operation', title: '操作', toolbar: '#barDemo', align: 'center',width: 130}
        ]]
        , where: {
        title: titleData
    }
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
        }else if (obj.event === 'look'){
            viewcl(npid);       //查看用户详情信息
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

//获取搜索信息
function getSearchData(){
    let titleData = $("#level1").val();
    if (titleData === null || titleData === ""){
        return "%%";
    }else{
        return "%"+titleData+"%";
    }
}

//执行搜索，表格重载$("[name='dataSearch']")
$("#dataSearch1").click(function (e) {
    let title = getSearchData();
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
                            where: {
                                title: title
                            }
                        });
                }
            };
        active.reload();
    });
});

$("#refresh").click(function () {
    refreshBgtDbTable();
});

//打开报告详情页面
function viewcl(npid){
    //页面层
    layer.open({
        id: 'Unit_edit',
        type: 2,
        title: '查看',
        maxmin: false,
        area: ['100%', '100%'], //宽高
        skin: 'layer-ext-moon', //加上边框
        content: ['/home/page/directbus/html/perfornView.html?npid='+ npid+'&from=SWBGT','yes']  //跳转编辑页面并传值
    });
}

var target = ''
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

// 填写评价
function assess(npid){
    //页面层
    layer.open({
        type: 1,
        title: '评价',
        // shade: 0,
        zIndex: 1998,
        area: ['460px','300px'], //宽高
        content: $("#assessPanel")
    });

    layui.use(['form'], function() {
        var form = layui.form
            , layer = layui.layer;
        //监听提交按钮
        $("#submit_assess").click(function () {
            // attachmentfjIDS=attachmentfjIDS.substring(0, attachmentfjIDS.length - 1);
            let assess = $("#assess").val();

            config.post_ajax(config.occ_url() + "/occ-deal/updateAssessByNpid", {
                data: {
                    // attachmentfjIDS:attachmentfjIDS,
                    assess: assess,
                    npid: npid
                },
                success: function (res) {
                    layer.closeAll('page');    //关闭所有页面层
                    $("#assess").html("");
                    if (res.code === 200) {
                        let getData = res.data;
                        if (getData){
                            layer.msg("评价成功", {
                                    icon: 6,
                                    time: 2000}, //2s后自动关闭
                                function () {
                                    // 获得frame索引
                                    var index = parent.layer.getFrameIndex(window.name);
                                    //关闭当前frame
                                    parent.layer.close(index);
                                    //修改成功后刷新父界面
                                    window.location.reload();
                                });
                        }else {
                            layer.msg('评价失败！', {
                                icon: 5,
                                time: 2000, //2s后自动关闭
                            });
                        }
                    }
                }
            }, "updateAssessByNpid");
        });

    });
}

// 查看评价
function lookAssess(npid){
    var assess = "";
    config.post_ajax(config.occ_url() + "/occ-deal/getAssessByNpid", {
        data: {npid: npid},
        success: function (res) {
            if (res.code === 200){
                assess = res.data;
                layer.open({
                    title: '评价内容',
                    content: assess
                })
            } else {
                layer.open({
                    title: '评价内容',
                    content: '查看失败'
                })
            }
        }
    }, "getAssessByNpid")
}


//刷新办公厅待办表格
function refreshBgtDbTable(){
    // console.log("执行刷新办公厅待办表格操作=====================================》");
    layui.use(['table'], function () {
        let title = getSearchData();
        var table = layui.table;
        var active =
            {
                reload: function () {
                    //执行重载
                    // sysUnitInfoCondition_value = {
                    //     dateRange: $('#dateRange').val(),
                    //     personName: "%" + $('#personName').val() + "%",
                    //     unitName: "%" + $('#unitName').val() + "%",
                    //     titleKey: "%" + $('#titleKey').val() + "%"  //大搜索框
                    // };
                    // console.log("执行重载");
                    table.reload('idTest',
                        {
                            page: {
                                curr: 1
                            },//重新从第 1 页开始
                            where: {
                                title: title
                            }
                        });
                    layer.close(layer.index);
                }
            };
        // console.log("active.reload()·······························》");
        active.reload();
    });
}



window.addEventListener('visibilitychange',()=>{
    if(!document.hidden){
        this.refreshBgtDbTable();
    }
});

$("#dataAdd").click(function () {
    window.open("/addNoticeInterface"); //添加通知信息界面
})

