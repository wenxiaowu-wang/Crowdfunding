package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.mapper.UserInfoMapper;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * 包:com.money.crowdfunding.website.controller
 * 项目:website
 * 描述:
 */
@RestController
@RequestMapping("/user")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    UserInfoMapper userInfoMapper;

    @GetMapping("/getUserByName")
    public UserInfo getUserByName(@Param("userName") String name){
        UserInfo userInfo = userInfoService.getUserInfoByName(name);
        System.out.println(userInfo);
        return userInfo;
    }


    @PostMapping("/getRegisterResult")
    public HttpResult getRegisterResult(UserInfo userInfo){
        return HttpResult.ok().setData(userInfoService.getRegisterResult(userInfo));
    }

    @RequestMapping("/getLoginResult/{yonghuming}/{mima}")
    @ResponseBody
    public HttpResult getLoginResult(@PathVariable(value = "yonghuming") String yonghuming, @PathVariable(value = "mima") String mima, HttpSession httpSession){
        UserInfo userInfo = userInfoService.getUserInfoByIDM(yonghuming,mima);
        httpSession.setAttribute("userInfo",userInfo);
        return HttpResult.ok().setData(userInfoService.getLoginResult(yonghuming,mima));
    }

    //用户修改资料
    @PostMapping("/updateUser")
    public HttpResult updateUser(@Param("yonghuming")String yonghuming,@Param("xingbie")String xingbie,@Param("chushengnianyue")String chushengnianyue,@Param("qq")String qq,@Param("youxiang")String youxiang,@Param("dianhua")String dianhua,@Param("dizhi")String dizhi,HttpSession httpSession){

        if (userInfoService.updateUser(xingbie,chushengnianyue,qq,youxiang,dianhua,dizhi,yonghuming)){
            UserInfo userInfo = userInfoMapper.getUserInfoByYonghuming(yonghuming);
            httpSession.setAttribute("userInfo",userInfo);
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);
    }

    //用户修改密码
    @PostMapping("/updatePwd")
    public HttpResult updatePwd(@Param("yonghuming")String yonghuming,@Param("mima")String mima,HttpSession httpSession){

        if (userInfoService.updatePwd(mima,yonghuming)){
            UserInfo userInfo = userInfoMapper.getUserInfoByYonghuming(yonghuming);
            httpSession.setAttribute("userInfo",userInfo);
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);
    }


    @GetMapping("/getUserSession")
    public HttpResult getUserSession(HttpSession httpSession){
        UserInfo userInfo = (UserInfo) httpSession.getAttribute("userInfo");
        return HttpResult.ok().setData(userInfo);
    }

    @GetMapping("/getAllUser")
    public HttpResult getAllUser(){
        return HttpResult.ok().setData(userInfoService.getAllUser());
    }

    //禁用用户账号
    @PostMapping("/disableUserAccount")
    public HttpResult disableUserAccount(@Param("id")Integer id){
        return HttpResult.ok().setData(userInfoService.disableUserAccount(id));
    }

    //解封用户账号
    @PostMapping("/openUserAccount")
    public HttpResult openUserAccount(@Param("id")Integer id){
        return HttpResult.ok().setData(userInfoService.openUserAccount(id));
    }

    //获取跳转到userEditOfManage的缓存id对应的用户信息
    @GetMapping("/getUserBySessionId")
    public HttpResult getUserByName(HttpSession httpSession){
        Integer id = (Integer) httpSession.getAttribute("userEditId");
        UserInfo userInfo = userInfoService.getUserInfoById(id);
        return HttpResult.ok().setData(userInfo);
    }

    //修改信息
    @PostMapping("/updateUserById")
    public HttpResult updateUserById(UserInfo userInfo){
        return HttpResult.ok().setData(userInfoService.updateUserInfoById(userInfo));
    }


}
