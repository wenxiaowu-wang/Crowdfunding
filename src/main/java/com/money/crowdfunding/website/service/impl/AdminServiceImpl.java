package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.AdminMapper;
import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.service.impl
 * 项目:website
 * 描述:
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminMapper adminMapper;

    @Override
    public boolean isAdmin(String userName, String password) {
        Admin admin = adminMapper.selectAdminByName(userName);
        if (admin == null){
            return false;
        }else{
            return admin.getPwd().equals(password);
        }
    }

    @Override
    public boolean addOneAdmin(Admin admin) {
        return adminMapper.insertOneAdmin(admin) > 0;
    }

    @Override
    public List<Admin> getAllAdmin() {
        return adminMapper.getAllAdminList();
    }

    @Override
    public Admin getOneAdminByName(String name) {
        return adminMapper.selectAdminByName(name);
    }
}
