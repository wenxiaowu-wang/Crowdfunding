let adminFrame_vm = new Vue({
    el:"#adminFrame",
    data:{
        user_id:0,
        user_name:"我系成龙",
        activeIndex: "1",
        user_avatar:"avatar",
        displayDivs:{
            displayDiv1:"none", //以块状元素展示，可更改控制
            displayDiv2:"none", //以块状元素展示
            displayDiv3:"none", //以块状元素展示

        },
        buttonContext:"取关",
        pageSize: 4, //每页显示4条数据
        currentPage: 1, //初始定位页数
        dynamicCurrentPage1:1, //动态变化的互相关注当前页数
        dynamicCurrentPage2:1, //动态变化的关注当前页数
        dynamicCurrentPage3:1, //动态变化的粉丝当前页数
        totals:{
            //总条目数（总共数据条数）
            total1:0,//互相关注的数量
            total2:0,//关注的数量
            total3:0 //粉丝的数量
        },
        imageURL_header:"../images/avatar/",
        imageURL_suffix:".jpg",
        eachAttentionData:[
            // {
            //     head_portrait:"001",
            //     user_name:"name0",
            //     user_id:0,
            //     works_name:"《好多作品》"
            // },{
            //     head_portrait:"013",
            //     user_name:"name0",
            //     user_id:0,
            //     works_name:"《好多作品》、《斗破苍穹》、《吞噬星空》、《唐朝的宇宙》、《三千雷动武动乾坤》"
            // },{
            //     head_portrait:"023",
            //     user_name:"name0",
            //     user_id:0,
            //     works_name:"《好多作品》、《斗破苍穹》、《吞噬星空》、《唐朝的宇宙》、《三千雷动武动乾坤》"
            // }
        ],

    },
    methods:{
        changeContent(num){
            //页面层
            // layer.open({
            //     id:'Unit_edit',
            //     type: 2,
            //     title: '编辑',
            //     area: ['100%', '100%'], //宽高
            //     skin: 'layer-ext-moon', //加上边框
            //     maxmin: false,
            //     content: ['/home/page/organ/organNew/organEdit.html?id='+data.id + '&unitID='+data.unitID, 'yes']  //调到编辑页面
            // });
            layer.msg("即将进入管理员登录页面",{icon:5});
            // alert("num="+num);
            switch (num){
                case 0:{
                    $("#content_div").load("/admin/userManagement");
                    break;
                }case 1:{
                    // $("#content_div").load("/adminLogin");
                    alert("待更新···");
                    break;
                }case 2:{
                    $.ajax({
                        url: "/admin/getSession",
                        type: "GET",
                        data: {},
                        dataType: 'json',
                        success: function (res) {
                            // console.log(res);
                            let theResult = res.data;
                            $("#content_div div").html(theResult);
                        }
                    });
                    break;
                }
                default:break;
            }
        },
        addAttention(user){
            //先提交选中的用户到session
            axios.post("/shaohuashuwu/userSession/saveSelectedUserId/" +
                user.user_id).then(resp =>{
                console.log(resp.data);//打印 装配数据成功
                axios.post("/shaohuashuwu/attentionInfoController/payAttentionToUser").then(response =>{
                    //进行添加关注信息操作
                    let object = JSON.stringify(response.data);
                    let object_int = parseInt(object);
                    if (object_int === 0){
                        this.$message({
                            type:'error',
                            message:'关注失败'
                        });
                        console.log("关注失败");
                    }else if(object_int === 1){
                        this.$message({
                            type:'success',
                            message:'关注成功'
                        });
                        //更新我的关注和互相关注的数据以及界面
                        this.eachAttentionData.push(user);
                        this.attentionData.push(user);
                        this.totals.total1 += 1;
                        this.totals.total2 += 1;//更新数据总数
                        this.handleCurrentChange_each(this.dynamicCurrentPage1);
                        this.handleCurrentChange_attention(this.dynamicCurrentPage2);
                        this.displayDivsSetting(); //判断是否要显示空内容提示
                        console.log("关注成功");
                    }else if(object_int === 2){
                        this.$message({
                            type:'info',
                            message:'您已经关注了该用户，请勿重复关注'
                        });
                        console.log("您已经关注了该用户，请勿重复关注");
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message:'关注请求发送失败'
                    });
                    console.log("关注请求发送失败");
                });
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message:'网络或其它原因，操作失败'
                });
                console.log("选中用户ID失败"+error);
            });

        },
    },
    mounted(){

    },
})