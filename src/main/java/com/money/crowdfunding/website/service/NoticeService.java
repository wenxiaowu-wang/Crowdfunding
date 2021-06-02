package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.XinWenTongZhi;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.service
 * 项目:website
 * 描述:
 */
public interface NoticeService {

    //判断管理员登录操作
    List<XinWenTongZhi> getNoticeListByLike(String title);

}
