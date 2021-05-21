package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.UserInfo;

/**
 * 包:com.money.crowdfunding.website.service
 * 作者:王洪斌
 * 日期:2021/5/21
 * 项目:website
 * 描述:
 */
public interface UserInfoService {

    public UserInfo getUserInfoByName(String name);
}
