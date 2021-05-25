var npid = ''
alert("js执行");
layui.use(['table'], function () {
    var table = layui.table,
        $ = layui.jquery;   //申明jquery
    /*   返回点击事件*/
    $('#close').click(function () {
        layer.close(layer.index);
    });

    alert("表格渲染");

    //表格渲染
    table.render({
        elem: '#test'    //渲染
        , method: 'get'   //请求方式
        , height: 'full-62'  //表格高度
        , id: "idTest"
        ,url:'/user/getAllUser'
        , defaultToolbar: []     //工具栏右侧隐藏
        , title: '用户信息表'
        , response: {statusCode: 200}
        , parseData: function (res) {  //res 即为原始返回的数据
            return {
                "code": res.code, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.data.total, //解析数据长度
                "data": res.data.records //解析数据列表
            };
        }
        , cols: [[   //表格绑数据
            {type: 'checkbox'}
            , {field: 'id', title: '编号', align: 'center', width: 150}
            , { field: 'yonghuming', title: '标题', align: 'center',width: 470,
                templet: function (d) {
                        // console.log("this is data[d]:"+JSON.stringify(d));
                    return "<a style='color:#1b8eeb' onclick=\"viewcl('" + d.id + "')\">"+d.yonghuming+"</a>";
                }}
            , {field: 'xingming', title: '类别',hide:true, align: 'center'}
            , {field: 'xingbie', title: '报送时间 ', align: 'center'}
            , {field: 'chushengnianyue', title: '报送单位 ', align: 'center'}
            , {field: 'qq', title: '报送单位 ', align: 'center'}
            , {field: 'youxiang', title: '报送单位 ', align: 'center'}
            , {field: 'dianhua', title: '报送单位 ', align: 'center'}
            , {field: 'shenfenzheng', title: '报送单位 ', align: 'center'}
            , {field: 'touxiang', title: '报送单位 ', align: 'center'}
            , {field: 'dizhi', title: '报送单位 ', align: 'center'}
            , {field: 'beizhu', title: '报送单位 ', align: 'center'}
            , {field: 'addtime', title: '报送单位 ', align: 'center'}
            // , {field: 'handleState', title: '签收情况 ', align: 'center',
            //     templet: function (d) {
            //         // console.log("this is data[d]:"+JSON.stringify(d));
            //         if (d.handleState !== "未签收"){
            //             return "<span style='color: red;'>"+d.handleState+"</span>";
            //         }else {
            //             return "<span style='color: #262424;'>"+d.handleState+"</span>";
            //         }
            //     }}
            , {field:'operation', title: '操作', toolbar: '#barDemo', align: 'center',width: 360}
        ]],
        request: {
            page: 'pageCurrent' //页码的参数名称，默认：page
            , limit: 'pageSize' //每页数据量的参数名，默认：limit
        },
        contentType: "application/json" //格式
        // , headers: config.headers('getAllUser')
        // , error: config.error()
        , page: true   //开启分页
        , limits:[20,50,100,200] //控制多少行一页（默认五条一页）
        , limit: 20
        , where: {
            // sysUnitInfoCondition: sysUnitInfoCondition
        },    //给后台传数据
        done: function (res, curr, count) {
        }//回调
    });


    //监听行工具事件
    table.on('tool(test)', function(obj){
        npid = obj.data.id;
        if (obj.event === 'assign'){
            assignUnit();   //交办页面显示以及渲染和监听事件
        }else if (obj.event === 'upload'){
            uploadLeaderOpinion(npid);
        }else if (obj.event === 'look'){
            viewcl(npid);
        }else if (obj.event === 'end'){
            layer.confirm('确认结束该条工作流？', {
                time: 20000, //20s后自动关闭
                btn: ['确认', '取消']
                ,btn2: function(index, layero){
                    //按钮【按钮二】的回调
                }
            }, function(index, layero){
                //按钮【按钮一】的回调
                endProcess(npid);
            });
        }else if (obj.event === 'assess'){
            //处理人评论发起人的报送内容
            assess(npid);
        }else if (obj.event === 'look_assess'){
            //查看处理人对发起人的报送内容的评论内容
            lookAssess(npid);
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

$("#choose").click(function () {
    let data = layui.table.checkStatus('tableUnit').data;
    if (data.length === 0){
        layer.msg("请至少选择一个单位", {icon: 5});
    } else {
        //发送交办请求
        let occAssignedInfo = {};
        occAssignedInfo.npid = npid;
        occAssignedInfo.data = data;
        let occAssignedInfoStr = JSON.stringify(occAssignedInfo);

        config.post_ajax(config.occ_url() + "/occ-deal/bgtAssignedToUnit", {
            data: occAssignedInfoStr,
            contentType:'application/json;charset=utf-8',
            success: function (res) {
                if (res.code === 200) {
                    let getData = res.data;
                    if (getData){
                        layer.msg("交办成功", {
                            icon: 6,
                            time: 1000, //1s后自动关闭
                        }, function () {
                            layer.closeAll('page');    //关闭所有页面层
                            refreshBgtDbTable();    //刷新表格
                        });
                    }else {
                        layer.msg('操作失败！', {
                            icon: 5,
                            time: 2000, //2s后自动关闭
                        });
                    }
                }
            }
        }, "bgtAssignedToUnit");
    }
})

//弹出交办单位选择页面，渲染选择页面的表格以及监听事件
function assignUnit(){
    layui.use(['table'], function () {
        var table = layui.table,
            $ = layui.jquery;   //申明jquery
        //打开交办panel
        layer.open({
            type: 1,
            title: '请选择交办的单位',
            zIndex: 1998,
            area: ['500px', '540px'], //宽
            content: $("#assignPanel"),
            success: function () {
                table.render({
                    elem: '#table_unit'    //渲染
                    , method: 'post'   //请求方式
                    , height: 415  //表格高度
                    , id: 'tableUnit'
                    , url: config.occ_url() + '/occ-organ/getAllAssignedUnitList'
                    , title: '单位信息表'
                    , response: {statusCode: 200}
                    , parseData: function (res) {  //res 即为原始返回的数据
                        return {
                            "code": res.code, //解析接口状态
                            "msg": res.msg, //解析提示文本
                            "count": res.data.length, //解析数据长度
                            "data": res.data //解析数据列表
                        };
                    }
                    , cols: [[   //表格绑数据
                        {type: 'checkbox'}
                        , { field: 'organName', title: '名称', align: 'center',sort:true}
                        , {field: 'target', title: '标识符',align: 'center',sort:true}
                        , {field: 'id', title: '表id ',hide:true,sort:true}
                        , {field: 'personId', title: '账号id ',hide:true,sort:true}
                        , {field: 'personName', title: '账号名 ',hide:true,sort:true}
                    ]],
                    request: {
                        page: 'pageCurrent' //页码的参数名称，默认：page
                        , limit: 'pageSize' //每页数据量的参数名，默认：limit
                    },
                    contentType: "application/json" //格式
                    , headers: config.headers('getAllAssignedUnitList')
                    , error: config.error()
                    , page: true   //开启分页
                    , limits: [10,20,30] //控制多少行一页（默认五条一页）
                    , limit: 10
                    , where: {
                        organName: target
                    }
                    , done: function (res, curr, count) {
                    }//回调
                });
            }
        });

        //监听行工具事件
        // table.on('tool(table_unit)', function(obj) {
        //     if (obj.event === 'del') {
        //         layer.confirm('真的删除行么', function (index) {
        //             obj.del();
        //             layer.close(index);
        //         });
        //     }
        // });
    });
}


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
//结束该npid对应的办公厅处理流程
function endProcess(npid){
    config.post_ajax(config.occ_url() + "/occ-deal/endBgtProcess", {
        async: false,
        // contentType:"application/json;charset=UTF-8",
        data: {
            npid:npid
        },
        success: function (res) {
            layer.closeAll('page');    //关闭所有页面层
            if (res.code === 200) {
                let getData = res.data;
                if (getData){
                    layer.msg("报告处理完成", {
                        icon: 6,
                        time: 1500, //1.5s后自动关闭
                    }, function () {
                        // refreshBgtDbTable();    //刷新表格
                        window.location.reload();
                    });
                }else {
                    layer.msg('报告处理失败！', {
                        icon: 5,
                        time: 2000, //2s后自动关闭
                    });
                }
            }
        }
    }, "endBgtProcess");
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
        var table = layui.table;
        var active =
            {
                reload: function () {
                    //执行重载
                    sysUnitInfoCondition_value = {
                        dateRange: $('#dateRange').val(),
                        personName: "%" + $('#personName').val() + "%",
                        unitName: "%" + $('#unitName').val() + "%",
                        titleKey: "%" + $('#titleKey').val() + "%"  //大搜索框
                    };
                    // console.log("执行重载");
                    table.reload('idTest',
                        {
                            page: {
                                curr: 1
                            },//重新从第 1 页开始
                            where: {
                                sysUnitInfoCondition: sysUnitInfoCondition_value
                            }
                        });
                    layer.close(layer.index);
                }
            };
        // console.log("active.reload()·······························》");
        active.reload();
    });
}

//执行搜索，表格重载$("[name='dataSearch']")
$("#dataSearch1").click(function (e) {
    layui.use(['table'], function () {
    var table = layui.table;
    let sysUnitInfoCondition_search1 = {
        dateRange: "",
        personName: "%%",
        unitName: "%%",
        titleKey: "%" + $("#level1").val() + "%"  //大搜索框
    };
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
                            sysUnitInfoCondition: sysUnitInfoCondition_search1
                        }
                    });
            }
        };
    active.reload();
    });
});

