package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.UserInfoMapper;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;

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
    public UserInfo getUserInfoByIDM(String yonghuming,String mima) {
        return userInfoMapper.getUserInfoByIDM(yonghuming,mima);
    }

    @Override
    public boolean getRegisterResult(UserInfo userInfo) {

        userInfo.setIssh("是");

        Random random = new Random();
        int headCode = random.nextInt(15);
        String headCode1 = String.valueOf(headCode);
        String headCode2;
        if(headCode>=10){
            headCode2 = "0" + headCode1;
        }else{
            headCode2 = "00" + headCode1;
        }
        userInfo.setTouxiang(headCode2);

        Date currentTime = new Date();
        Timestamp timestamp = new Timestamp(currentTime.getTime());
        userInfo.setAddtime(timestamp);

        return userInfoMapper.insertOneAdmin(userInfo);
    }


    @Override
    public boolean getLoginResult(String yonghuming, String mima) {
        return userInfoMapper.getLoginResult(yonghuming,mima);
    }

    @Override
    public List<UserInfo> getAllUser() {
        return userInfoMapper.selectAllUser();
    }
}
