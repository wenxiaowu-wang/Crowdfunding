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

    /**
     * 管理员登录判断
     * @param userName  管理员用户名
     * @param password  管理员密码
     * @param httpSession   后端缓存
     * @return 判断结果
     */
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

    /**
     * 获取所有管理员信息
     * @return  所有管理员信息
     */
    @GetMapping("/getAll")
    public HttpResult getAll(){
        return HttpResult.ok().setData(adminService.getAllAdmin());
    }

    /**
     * 添加一条管理员信息记录
     * @param admin 管理员信息实体
     * @return  添加结果 封装在返回对象实例中
     */
    @PostMapping("/addOne")
    public HttpResult addOne(@RequestBody Admin admin){
        return HttpResult.ok().setData(adminService.addOneAdmin(admin));
    }

    /**
     * 获取后台服务器缓存的管理员信息
     * @param httpSession   后台缓存
     * @return  管理员信息 封装在返回对象实例中
     */
    @GetMapping("/getSession")
    public HttpResult getSession(HttpSession httpSession){
        Admin admin = (Admin) httpSession.getAttribute("adminInfo");
        System.out.println(admin);
        return HttpResult.ok().setData(admin);
    }

    /**
     * 更新管理员密码
     * @param oldPwd 原密码
     * @param newPwd 新密码
     * @param httpSession   后台缓存
     * @return  更新结果 boolean 封装在返回对象实例中
     */
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
