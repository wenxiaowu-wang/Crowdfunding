let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        reloadTest:"",
        topTips: "返回首页",
        activeIndex: '2',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",
        city: "火星",
        user_name2:'测试用户',//用户昵称2

        biaoti:'杨府山城市公园争取明年11月份开园',
        leibie:'众筹须知',
        neirong:'新华网新德里７月２８日电（记者毛晓晓）印度外长克里希纳２７日在印度首都新德里与到访的巴基斯坦新任女外长哈尔举行会谈。这是一年来两国外长的首次会晤并取得了一定成果。哈尔在会晤时表示，两国关系将“进入新的时代”。\n' +
            '分析人士指出，虽然印巴两国在克什米尔和恐怖主义等核心问题上分歧仍在，但双方都表现出了推动和谈继续进行下去的政治意愿，对于长期互相视为对手的这两个国家来说这已是成就。' +
            '　　７９岁的克里希纳与上周刚获任命的３４岁的巴基斯坦首位女外长哈尔２７日在会晤后发表联合声明，公布了在克什米尔问题上建立互信的举措，允许两国游客和宗教朝拜者通过印巴在克什米尔的实际控制分界线进入对方国家。在此之前，只有１９４７年战争中离散的家属才能乘坐大巴往来于克什米尔实际控制线两侧。' +
            '　　同时，允许入境者停留有效期也从４周延长到６个月，并可多次往返。实际控制线两侧的贸易时间也从每周两天增加到４天。印巴双方将继续谈判增加准许贸易的商品种类。此外，双方还将于今年９月在巴基斯坦首都伊斯兰堡继续就核互信机制等问题举行会谈。' +
            '　　克里希纳在两个半小时的会谈结束后说：“我对这轮恢复的对话取得的进展表示满意。结果正如我们所预期的……虽然我们充分意识到未来仍然充满挑战，但是我可以自信地说，我们的关系回到了正轨。”',
        dianjilv:'15',
        addtime:'2019-03-26 17:01:31',
        tianjiaren:'hsg',


    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)"+key, keyPath);
            switch (key){
                case "1":window.location.assign("toHome");break;
                case "2":{
                    this.$message({
                        type:'info',
                        message:'您已经在【众筹须知详情】，不必跳转。'
                    });
                    break;
                }
                case "3":window.location.assign("toProject");break;
                case "4":window.location.assign("adminLogin");break;
                default:break;
            }
        },
        backProject(){
            window.location.assign("toProjectXuZhi");
        },
        signOut(){
            window.location.assign("userLogin");
        },
        personally(){
            alert("代码未实现")
        }
    },
    mounted() {

        //用户session
        axios.get("/user/getUserSession").then(res => {

            let data = res.data.data;
            this.user_name2 = data.yonghuming;
            this.avatar = data.touxiang;

        }).catch(error => {
            console.log("获取session信息失败！" + error);
            // this.$confirm('请先登录！', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     window.location.assign("userLogin");
            // }).catch(() => {
            //     window.location.assign("userLogin");
            // });
        });

        //用户众筹项目的ID
        axios.get("/project/getProjectDetailSession").then(res => {
            let id = res.data.data;

            console.log(id)
            console.log(id)

            axios.get('/project/getZhongChouXuZhiDetail/' +
                id ).then(ress => {
                let data =ress.data.data;

                this.biaoti = data.biaoti;
                this.leibie =data.leibie;
                this.neirong =data.neirong;
                this.dianjilv =data.dianjilv;
                this.addtime =data.addtime;
                this.tianjiaren =data.tianjiaren;

            }).catch(error => {
                this.$message({
                    type: 'error',
                    message: '网络错误！'
                });
            });

        }).catch(error => {
            console.log("获取session信息失败！" + error);
        });


    }
});
