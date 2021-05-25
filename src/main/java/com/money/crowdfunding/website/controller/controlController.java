package com.money.crowdfunding.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 包:com.money.crowdfunding.website.controller
 * 作者:
 * 日期:
 * 项目:website
 * 描述:
 */
@Controller
public class controlController {

    public controlController(){
//        System.out.println("hello");
    }

    @RequestMapping("/hello")
    public String sayHello(){
        System.out.println("进来了");
        return "html/helloo";
    }


    @RequestMapping("/userLogin")
    public String UserLogin(){
        return "html/UserLogin";
    }

    @RequestMapping("/adminLogin")
    public String adminLogin(){
        return "html/adminLoginInterface";
    }

    @RequestMapping("/toAdminMain")
    public String toAdminMain(){
        return "html/adminFrame";
    }

    @RequestMapping("/toHome")
    public String toHome(){
        return "html/homePage";
    }

    @RequestMapping("/toProject")
    public String toProject(){
        return "html/project";
    }

    @RequestMapping("/userRegister")
    public String userRegister(){
        return "html/usersRegistrationInterface";
    }

    @RequestMapping("/admin/userManagement")
    public String userManagement(){
        return "html/userInfoManagement";
    }
}
