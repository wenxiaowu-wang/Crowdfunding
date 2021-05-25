package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;

import java.util.List;

public interface ProjectService {

    List<ZhongChouXiangMu> getZhongChouXiangMu();

    List<XinWenTongZhi> getZhongChouXuZhi();

    XinWenTongZhi getZhongChouXuZhiDetail(String id);
}
