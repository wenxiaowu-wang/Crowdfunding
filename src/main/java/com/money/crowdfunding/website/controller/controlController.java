package com.money.crowdfunding.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 包:com.money.crowdfunding.website.controller
 * 作者:
 * 日期:6
 * 项目:website
 * 描述:
 */
@Controller
public class controlController {

    public controlController(){
        System.out.println("hello");
    }

    @RequestMapping("/hello")
//    @ResponseBody
    public String sayHello(){
        System.out.println("进来了");
        return "html/helloo";
    }

}
