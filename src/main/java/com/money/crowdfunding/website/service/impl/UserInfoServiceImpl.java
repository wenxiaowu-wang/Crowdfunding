package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.UserInfoMapper;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 包:com.money.crowdfunding.website.service.impl
 * 作者:王洪斌
 * 日期:2021/5/21
 * 项目:website
 * 描述:
 */
@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    UserInfoMapper userInfoMapper;

    @Override
    public UserInfo getUserInfoByName(String name) {

        return userInfoMapper.selectUserInfoByName(name);
    }

    @Override
    public Boolean getRegisterResult(UserInfo userInfo) {

        return null;
    }
}
