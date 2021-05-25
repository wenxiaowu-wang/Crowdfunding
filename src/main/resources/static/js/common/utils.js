//选择考核对象
var selectObject = "/home/page/performance/utils/selectObject/objSelection.html";
var selectObjectMul = "/home/page/performance/utils/selectObject/objSelectionMul.html";
//选择考评责任部门
var selectObjectUser = "/home/page/performance/utils/selectObjectUser/objUserSelection.html";
var cityUnitTypeId = '0100000001';
var organTypeDd = '0100000002';
var directTypeId = '0100000003';
Utils = {
    _$: function () {
        if (layui) {
            if (layui.$) {
                return layui.$;
            } else {
                return $;
            }
        } else {
            return $;
        }
    },
    isNumber: function(val){
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
        if(val === "" || val ==null){
            return false;
        }
        if(!isNaN(val)){
            return true;
        }else{
            return false;
        }
    },

    //获取滚动条垂直位置
    getScrollTop: function() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
},

    //弹出层
    openDlg: function (url, title, param) {
        var _$ = layui.$ ? layui.$ : $;
        var json = {
            type: 2,
            content: url,
            //背景阴影
            shade: 0.3,
            //表头
            title: title,
            area: ['50%', '60%']
        };
        _$.each(param, function (t, v) {
            json[t] = v;
          });
          layer.open(json);
    },
    openDlgInParent: function (url, title, param) {
        var _$ = layui.$ ? layui.$ : $;
        var json = {
            type: 2,
            content: url,
            //背景阴影
            shade: 0.3,
            //表头
            title: title,
            area: ['60%', '80%']
        };
        _$.each(param, function (t, v) {
            json[t] = v;
        });
        parent.layer.open(json);
    },
    //选择封装
    openSelectDlgInParent: function (url, title, onSelect) {
        var _$ = layui.$ ? layui.$ : $;
        var json = {
            type: 2,
            btn: ['确认', '取消'],
            content: url,
            //背景阴影
            shade: 0.3,
            //表头
            title: title,
            area: ['60%', '85%']
        };
        json.success = function (layero) {
            var btn = layero.find('.layui-layer-btn');
            //确认按钮点击事件
            btn.find('.layui-layer-btn0').click(function () {
                //this.find('#selected_id').val();
                var obj = $(layero).find("iframe")[0].contentWindow;
                //获取用户选择的数据
                var info = obj.getSelectedId();
                var jsonData;
                if (info)
                    jsonData = JSON.parse(info);
                onSelect(jsonData);

            });
        };
        parent.layer.open(json);
    },
    getUrlParam: function (key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    },
    getBaseUrl: function () {
        return config.performance_url();
    },
    initTableParams: function (params) {
        var personid = '';
        var token = '';
        if (typeof getCookie === 'function') {
            personid = getCookie('personID');
            token = getCookie('token');
        }
        var url = params.url;
        var a = url.indexOf("?");
        var name = url.substring(url.lastIndexOf("/") + 1, a === -1 ? url.length : a);
        params.headers = config.headers(name);
        return params;
    },
    IEVersion: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1;//不是ie浏览器
        }
    },
    val: function (data) {
        var _$ = layui.$ ? layui.$ : $;
        _$.each(data, function (k, v) {
            if (v && $("#" + k)){
                if (k === 'totalSinceScore') {
                    $('#' + k).text(v.toFixed(1))
                }else if (k === 'vitalWorkStatus' && v === 1) {
                    $("#" + k).text('是');
                    $('.sumCount').show();
                }else {
                    $("#" + k).text(v);
                    $("#" + k).val(v);
                }
            } else if ($("#" + k) && k === 'vitalWorkStatus' && v !== 1) {
                $("#" + k).text('否');
            }
        })
    }
};
Request = {
    post: function (url, data, params) {
        var _$ = layui.$ ? layui.$ : $;
        var personid = '';
        var token = '';
        if (typeof getCookie === 'function') {
            personid = getCookie('personID');
            token = getCookie('personID');
        }
        if (!url) {
            url = params.url;
        }
        var a = url.indexOf("?");
        var name = url.substring(url.lastIndexOf("/") + 1, a === -1 ? url.length : a);
        var json = {
            url: url,
            type: 'post',
            data: data,
            headers: config.headers(name),
            success: function (response) {
                console.log("请求成功: " + url)
            },
            error: function (err) {
                console.log("请求失败: " + url);
            }
        };
        this.addAuthInfo(json, name);
        _$.each(params, function (t, v) {
            json[t] = v;
        });
        _$.ajax(json);
    },
    get: function (url, data, params) {
        var _$ = layui.$ ? layui.$ : $;
        if (!url) {
            url = params.url;
        }
        var a = url.indexOf("?");
        var name = url.substring(url.lastIndexOf("/") + 1, a === -1 ? url.length : a);
        var json = {
            url: url,
            type: 'get',
            data: data,
            success: function (response) {
                console.log("请求成功: " + url)
            },
            error: function (err) {
                console.log("请求失败: " + url)
            }
        };
        this.addAuthInfo(json, name);
        _$.each(params, function (t, v) {
            json[t] = v;
        });
        _$.ajax(json);
    },
    addAuthInfo: function (json, jname) {
        var name = '';
        if (jname) {
            name = jname;
        } else {
            var url = json.url, a = 0;
            if (url) {
                a = url.indexOf("?");
                name = url.substring(url.lastIndexOf("/") + 1, a && a === -1 ? url.length : a);
            }
        }
        var headers = json.headers;
        var heads = config.headers(name);
        if (headers) {
            headers.token = heads.token;
            headers.sign = heads.sign;
        } else {
            headers = {};
            headers.token = heads.token;
            headers.sign = heads.sign;
        }
        json.headers = headers;
        return json;
    }
};
