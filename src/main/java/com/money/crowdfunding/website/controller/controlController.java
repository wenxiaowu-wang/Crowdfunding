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

    //跳转到管理员登录界面
    @RequestMapping("/adminLogin")
    public String adminLogin() {
        return "html/adminLoginInterface";
    }

    //跳转到后台管理主框架
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

    @RequestMapping("/toProjectFaBu")
    public String toProjectFaBu() {
        return "html/projectFaBu";
    }

    @RequestMapping("/toPersonalCenter")
    public String toPersonalCenter() {
        return "html/personalCenter";
    }

    @RequestMapping("/myProject")
    public String myProject() {
        return "html/myProject";
    }
    @RequestMapping("/myTouzi")
    public String myTouzi() {
        return "html/myTouzi";
    }
    @RequestMapping("/touziMy")
    public String touziMy() {
        return "html/touziMy";
    }

    //跳转到后台用户信息管理界面
    @RequestMapping("/admin/userManagement")
    public ModelAndView userManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/userInfoManagement");
        modelAndView.addObject("key", "注册用户信息");
        return modelAndView;
    }

    //跳转到后台编辑用户信息界面
    @RequestMapping("/userEditOfManage")
    public String userEditOfManage(){
        return "html/userEditOfManagement";
    }

    //将用户id存入session中，方便跳转到编辑用户信息界面获取用户信息
    @RequestMapping("/setUserEditIdToSession/{id}")
    @ResponseBody
    public int setUserEditIdToSession(@PathVariable("id")Integer id,HttpSession httpSession){
        httpSession.setAttribute("userEditId",id);
        return (int) httpSession.getAttribute("userEditId");
    }

    //后台管理系统跳转到众筹类别管理界面
    @RequestMapping("/admin/crowdfundingTypeManagement")
    public ModelAndView crowdfundingTypeManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/crowdfundingTypeManage");
        modelAndView.addObject("key", "众筹类别");
        return modelAndView;
    }

    //后台管理系统跳转到众筹项目管理界面
    @RequestMapping("/admin/crowdfundingProjectManagement")
    public ModelAndView crowdfundingProjectManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/crowdfundingProjectManage");
        modelAndView.addObject("key", "众筹项目");
        return modelAndView;
    }

    //后台管理系统跳转到众筹订单管理界面
    @RequestMapping("/admin/crowdfundingOrderManagement")
    public ModelAndView crowdfundingOrderManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/crowdfundingOrderManage");
        modelAndView.addObject("key", "众筹项目订单");
        return modelAndView;
    }

    //后台管理系统跳转到通知信息管理界面
    @RequestMapping("/admin/crowdfundingNoticeManagement")
    public ModelAndView crowdfundingNoticeManagement() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/crowdfundingNoticeManage");
        modelAndView.addObject("key", "通知消息");
        return modelAndView;
    }

    //后台管理系统跳转到更新管理员密码界面
    @RequestMapping("/admin/updateAdminInfoInterface")
    public ModelAndView updateAdminInfoInterface() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("html/updateAdminInterface");
        modelAndView.addObject("key", "管理员信息更新");
        return modelAndView;
    }

    //添加众筹项目id到session，方便跳转页面后获取对应项目信息
    @RequestMapping("/setProjectIdToSession/{id}")
    @ResponseBody
    public int setProjectIdToSession(@PathVariable("id")Integer id,HttpSession httpSession){
        httpSession.setAttribute("projectId",id);
        return (int) httpSession.getAttribute("projectId");
    }

    //后台管理系统跳转到审核一个众筹项目界面
    @RequestMapping("/auditProjectInterface")
    public String auditProjectInterface(){
        return "html/auditProjectInterface";
    }

    //添加众筹项目订单id到session，方便跳转页面后获取对应订单信息
    @RequestMapping("/setOrderIdToSession/{id}")
    @ResponseBody
    public int setOrderIdToSession(@PathVariable("id")Integer id,HttpSession httpSession){
        httpSession.setAttribute("orderId",id);
        return (int) httpSession.getAttribute("orderId");
    }

    //后台管理系统跳转到审核一个订单界面
    @RequestMapping("/auditOrderInterface")
    public String auditOrderInterface(){
        return "html/auditOrderInterface";
    }

    //获取添加通知信息界面
    @RequestMapping("/addNoticeInterface")
    public String addNoticeInterface(){
        return "html/addNoticeInterface";
    }
}
