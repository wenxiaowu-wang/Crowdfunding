let register_vm = new Vue({
    el: "#app",
    data: {
        yonghuming: '',
        mima: '',
        password: '',
        xingming: '',
        xingbie: '男',
        chushengnianyue: '',
        qq: '',
        youxiang: '',
        dianhua: '',
        shenfenzheng: '',
        dizhi: '',
        beizhu: '',

    },
    methods: {
        save() {
            const d = new Date(this.chushengnianyue)
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())

            $.ajax({
                url: "user/getRegisterResult",
                type: "post",
                data: {
                    yonghuming:this.yonghuming,
                    mima:this.mima,
                    xingming:this.xingming,
                    xingbie:this.xingbie,
                    chushengninayue:resDate.toString(),
                    qq:this.qq,
                    youxiang:this.youxiang,
                    dianhua:this.dianhua,
                    shenfenzheng:this.shenfenzheng,
                    dizhi:this.dizhi ,
                    beizhu:this.beizhu
                },
                dataType: 'json'
                , headers: 'getRegisterResult',
                success: function (msg) {
                    if (msg.code === 200) {
                        alert("注册成功，赶快去登陆吧")
                    } else {
                        alert("注册失败")
                    }
                }
            });


        },
        goToLogin() {
            window.location.assign("../pages/UserLogin.html");
        },
        p(s) {
            return s < 10 ? '0' + s : s
        },

    }
});

