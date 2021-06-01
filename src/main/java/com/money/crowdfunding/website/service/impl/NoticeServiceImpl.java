package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.NoticeMapper;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.service.impl
 * 项目:website
 * 描述:
 */
@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeMapper noticeMapper;


    @Override
    public List<XinWenTongZhi> getNoticeListByLike(String title) {
        return noticeMapper.selectNoticeListByLike(title);
    }
}
