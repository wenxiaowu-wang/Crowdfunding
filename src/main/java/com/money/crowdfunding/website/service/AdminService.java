package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.Admin;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.service
 * 项目:website
 * 描述:
 */
public interface AdminService {

    //判断管理员登录操作
    boolean isAdmin(String userName,String password);

    //添加一条管理员信息
    boolean addOneAdmin(Admin admin);

    //获取所有管理员信息
    List<Admin> getAllAdmin();

    //根据管理员用户名获取一条管理员信息
    Admin getOneAdminByName(String name);
}
