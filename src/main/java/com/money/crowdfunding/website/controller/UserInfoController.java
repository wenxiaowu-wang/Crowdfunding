package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        UserInfo userInfo = userInfoService.getUserInfoByName("111");
        System.out.println(userInfo);
        return userInfo;
    }


    @PostMapping("/getRegisterResult")
    public HttpResult getRegisterResult(@RequestBody UserInfo userInfo){
        return HttpResult.ok().setData(userInfoService.getRegisterResult(userInfo));
    }

}
