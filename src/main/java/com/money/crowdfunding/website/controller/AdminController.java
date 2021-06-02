package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.mapper.AdminMapper;
import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.service.AdminService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Date;

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

    @Autowired
    AdminMapper adminMapper;

    @PostMapping("/isAdmin")
    public HttpResult isAdmin(@Param("userName")String userName, @Param("password")String password, HttpSession httpSession){
        boolean result = false;
        result = adminService.isAdmin(userName, password);
        if (result){
            Admin admin = adminService.getOneAdminByName(userName);
            httpSession.setAttribute("adminInfo",admin);
        }
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

    @GetMapping("/getSession")
    public HttpResult getSession(HttpSession httpSession){
        Admin admin = (Admin) httpSession.getAttribute("adminInfo");
        System.out.println(admin);
        return HttpResult.ok().setData(admin);
    }

    @PostMapping("/updateAdminPwd")
    public HttpResult updateAdminPwd(@Param("oldPwd")String oldPwd,@Param("newPwd")String newPwd,HttpSession httpSession){
        Admin admin = (Admin) httpSession.getAttribute("adminInfo");
        if (oldPwd.equals(admin.getPwd())){
            return HttpResult.ok().setData(adminMapper.updateOneAdminByName(admin.getUsername(),newPwd) > 0);
        }else{
            return HttpResult.ok().setData(false).setMsg("原密码输入错误！");
        }

    }

}
