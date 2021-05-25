package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

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

}
