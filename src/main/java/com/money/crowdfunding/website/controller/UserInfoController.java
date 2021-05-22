package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
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
//    @ResponseBody
    public UserInfo getUserByName(@Param("userName") String name){
        UserInfo userInfo = userInfoService.getUserInfoByName("111");
        System.out.println(userInfo);
        return userInfo;
    }

    @GetMapping("/getRegisterResult")
    public Boolean getRegisterResult(UserInfo userInfo){
        boolean result = false;
        result = userInfoService.getRegisterResult(userInfo);
        return result;
    }


}
