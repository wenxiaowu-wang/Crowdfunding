package com.money.crowdfunding.website.controller;

import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

/**
 * 包:com.money.crowdfunding.website.controller
 * 作者:
 * 日期:
 * 项目:website
 * 描述:
 */
@Controller
public class controlController {

    public controlController() {
//        System.out.println("hello");
    }

    @RequestMapping("/hello")
    public String sayHello() {
        System.out.println("进来了");
        return "html/helloo";
    }


    @RequestMapping("/userLogin")
    public String UserLogin() {
        return "html/UserLogin";
    }

    @RequestMapping("/adminLogin")
    public String adminLogin() {
        return "html/adminLoginInterface";
    }

    @RequestMapping("/toAdminMain")
    public String toAdminMain() {
        return "html/adminFrame";
    }

    @RequestMapping("/toHome")
    public String toHome() {
        return "html/homePage";
    }

    @RequestMapping("/toProjectXuZhi")
    public String toProjectXuZhi() {
        return "html/projectXuZhi";
    }

    @RequestMapping("/toProject")
    public String toProject() {
        return "html/project";
    }

    @RequestMapping("/toProjectDetails")
    public String toProjectDetails() {
        return "html/projectDetails";
    }

    @RequestMapping("/toProjectXuZhiDetail")
    public String toProjectXuZhiDetail() {
        return "html/projectXuZhiDetail";
    }

    @RequestMapping("/userRegister")
    public String userRegister() {
        return "html/usersRegistrationInterface";
    }

    @RequestMapping("/toPersonalCenter")
    public String toPersonalCenter() {
        return "html/personalCenter";
    }

    @RequestMapping("/admin/userManagement")
    public ModelAndView userManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/userInfoManagement");
        modelAndView.addObject("key", "注册用户信息");
        return modelAndView;
    }

    @RequestMapping("/userEditOfManage")
    public String userEditOfManage(){
        return "html/userEditOfManagement";
    }

    @RequestMapping("/setUserEditIdToSession/{id}")
    @ResponseBody
    public int setUserEditIdToSession(@PathVariable("id")Integer id,HttpSession httpSession){
        httpSession.setAttribute("userEditId",id);
        return (int) httpSession.getAttribute("userEditId");
    }

    @RequestMapping("/admin/crowdfundingTypeManagement")
    public ModelAndView crowdfundingTypeManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/crowdfundingTypeManage");
        modelAndView.addObject("key", "众筹类别");
        return modelAndView;
    }


}
