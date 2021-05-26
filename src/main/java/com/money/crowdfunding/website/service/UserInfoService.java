package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.UserInfo;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.service
 * 项目:website
 * 描述:
 */
public interface UserInfoService {

    public UserInfo getUserInfoByName(String name);

    public UserInfo getUserInfoByIDM(String yonghuming,String mima);

    public boolean getRegisterResult(UserInfo userInfo);

    public boolean getLoginResult(String yonghuming, String mima);

    public List<UserInfo> getAllUser();

    boolean disableUserAccount(Integer id);

    boolean openUserAccount(Integer id);

    boolean updateUser(String xingbie,String chushengnianyue,String qq,String youxiang,String dianhua,String dizhi,String yonghuming);

    boolean updatePwd(String mima,String yonghuming);

    UserInfo getUserInfoById(Integer id);

    boolean updateUserInfoById(UserInfo userInfo);
}
