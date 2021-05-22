package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.service.AdminService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 包:com.money.crowdfunding.website.controller
 * 项目:website
 * 描述:
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/isAdmin")
    public HttpResult isAdmin(@Param("userName")String userName, @Param("password")String password){
        return HttpResult.ok().setData(adminService.isAdmin(userName, password));
    }

    @GetMapping("/getAll")
    public HttpResult getAll(){
        return HttpResult.ok().setData(adminService.getAllAdmin());
    }

    @PostMapping("/addOne")
    public HttpResult addOne(@RequestBody Admin admin){
        return HttpResult.ok().setData(adminService.addOneAdmin(admin));
    }
}
