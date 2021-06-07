var npid = ''
layui.use(['table'], function () {
    var table = layui.table,
        $ = layui.jquery;   //申明jquery
    /*   返回点击事件*/
    $('#close').click(function () {
        layer.close(layer.index);
    });
    let searchData = getSearchData();

    // 表格渲染
    table.render({
        elem: '#test'    //渲染
        , method: 'get'   //请求方式
        , height: 'full-62'  //表格高度
        , id: "idTest"
        ,url:'/pType/getAllOrderList'
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
            , {field: 'id', title: 'ID', align: 'center'}
            , {field: 'xiangmubianhao', title: '编号', align: 'center'}
            , {field: 'biaoti', title: '标题', align: 'center'}
            , {field: 'leibie', title: '类别', align: 'center'}
            , {field: 'zhongchoujine', title: '众筹金额', align: 'center'}
            , {field: 'qixian', title: '期限', align: 'center'}
            , {field: 'shouyi', title: '收益', align: 'center'}
            , {field: 'faburen', title: '发布人', align: 'center'}
            , {field: 'touziren', title: '投资人', align: 'center'}
            , {field: 'addtime', title: '添加时间', align: 'center'}
            , {field: 'iszf', title: 'iszf',hide:true, align: 'center'}
            , {field: 'issh', title: '审核状态 ',hide:true, align: 'center',
                templet: function (d) {
                    // console.log("this is data[d]:"+JSON.stringify(d));
                    if (d.issh === "是"){
                        return "<span style='color: red;'>"+"未标记"+"</span>";
                    }else{
                        return "<span style='color: #262424;'>"+d.issh+"</span>";
                    }
                }}
            , {field:'operation', title: '操作', toolbar: '#barDemo', align: 'center'}
        ]],where: {
            searchData: searchData
        }
    });

    refreshBgtDbTable();

    //监听行工具事件
    table.on('tool(test)', function(obj){
        npid = obj.data.id;
        let userName = obj.data.yonghuming;
        if (obj.event === 'open'){
            openAccount(npid);   //启用
        }else if (obj.event === 'upload'){
            closeAll();
            displayUpdate(obj.data.leibie,npid);
        }else if (obj.event === 'look'){
            // viewcl(npid);       //查看用户详情信息
            axios.post("/setOrderIdToSession/" +
                npid).then(response =>{
                //response.data本身即为字符串格式，JSON处理是为了将整个response对象解析成字符串，否则直接打印response为Object
                let theResult = response.data;
                if (theResult) {
                    //跳转界面
                    window.open("/auditOrderInterface"); //修改众筹投资订单详情界面
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
        }else if (obj.event === 'audit' || obj.event === 'changeAudit') {
            // alert("标记功能尚未开放，阁下过段时间再来");   //审核
            //暂未开放
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
    refreshBgtDbTable();
});

$("#dataAdd").click(function () {
    closeAll();
    displayAdd();
});

$("#submit_cancel").click(function () {
    closeAll();
});

$("#submit_add").click(function () {
    let addType = $("#crowdfundingType").val();
    if (addType === null || addType === ""){
        alert("输入不可为空！");
        return ;
    }else{
        //添加操作
        $.ajax({
            url: "/pType/addOne",
            type: "post",
            data: {leibie:addType},
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                let theResult = res.data;
                if (theResult){
                    closeAll();
                    refreshBgtDbTable();
                    console.log("添加众筹类别成功！");
                }else{
                    alert(res.msg);
                }
            }
        });
    }

});

$("#submit_update").click(function () {
    let updateType = $("#crowdfundingType").val();
    let id = $("#crowdfundingId").val();
    if (updateType === null || updateType === ""){
        alert("输入不可为空！");
        return ;
    }else{
        //添加操作
        $.ajax({
            url: "/pType/updateOneById",
            type: "post",
            data: {"type":updateType,
                "id":id},
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                let theResult = res.data;
                if (theResult){
                    closeAll();
                    refreshBgtDbTable();
                    console.log("添加众筹类别成功！");
                }else{
                    alert(res.msg);
                }
            }
        });
    }

});

function displayAdd() {
    console.log("添加窗口展示");
    $("#addPanel").css("display","block");
    $(".div_update").css("display","none");
    $(".div_add").css("display","block");
}

function displayUpdate(type,id) {
    $("#addPanel").css("display","block");
    $(".div_update").css("display","block");
    $(".div_add").css("display","none");
    $("#crowdfundingId").val(id);
    $("#crowdfundingType").val(type);
}

function closeAll() {
    $("#crowdfundingType").val("");
    $("#crowdfundingId").val("");
    $("#addPanel").css("display","none");
}

//禁用id对应的用户账号
function endAccount(id){
    $.ajax({
        url: "/pType/disable",
        type: "POST",
        data: {'id':id},
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            let theResult = res.data;
            if (theResult) {
                refreshBgtDbTable();
            } else {
                alert("禁用众筹类型失败");
            }
        }
    });
}

//启用id对应的用户账号
function openAccount(id){
    $.ajax({
        url: "/pType/open",
        type: "POST",
        data: {'id':id},
        dataType: 'json',
        success: function (res) {
            // console.log(res);
            let theResult = res.data;
            if (theResult) {
                refreshBgtDbTable();
            } else {
                alert(res.msg);
            }
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

//刷新办公厅待办表格
function refreshBgtDbTable(){
    let searchData = getSearchData();
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
                                searchData: searchData
                            }
                        });
                }
            };
        active.reload();
    });
}



window.addEventListener('visibilitychange',()=>{
    if(!document.hidden){
        refreshBgtDbTable();
    }
});

//获取搜索信息
function getSearchData(){
    let searchData = $("#level1").val();
    if (searchData === null || searchData === ""){
        return "%%";
    }else{
        return "%"+searchData+"%";
    }
}

//执行搜索，表格重载$("[name='dataSearch']")
$("#dataSearch1").click(function (e) {
    let searchData = getSearchData();
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
                                searchData: searchData
                            }
                        });
                }
            };
        active.reload();
    });
});


