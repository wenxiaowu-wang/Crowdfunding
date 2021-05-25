let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        introduction: "这家伙很懒，什么都没有留下！",

        eachAttentionNum:0,
        attentionNum: 0,
        fans: 0,
        topTips: "返回首页",
        activeIndex: '1',
        imageURL_header: "../images/avatar/",
        imageURL_suffix: ".jpg",

        city: "火星",

        phone_number: '',
        user_avatar: "009",//用户头像
        user_id: '',//用户id
        user_name: '123',//用户昵称
        user_name2:'22222',//用户昵称2
        gender: '',//用户性别
        dateValue: '',//用户生日
        area: '',//用户地区

        //修改密码
        comparePwd: '',//存入session的原密码
        oldPwd: '',//原密码
        newPwd: '',//新密码
        newPwd2: '',//重复新密码
        compareCode: '',


        //城市选择

        carouselFigures:[
            {
                figureUrl:"heci1",
                hyperlink:"https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            },{
                figureUrl:"heci2",
                hyperlink:"https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            },{
                figureUrl:"heci3",
                hyperlink:"https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            }
        ],//轮播图图片名字（图片格式为png）
    },

    methods: {


    },
    mounted() {


    }
});
