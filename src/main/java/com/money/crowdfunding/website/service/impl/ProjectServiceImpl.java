package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.ProjectMapper;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import com.money.crowdfunding.website.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    ProjectMapper projectMapper;

    @Override
    public List<ZhongChouXiangMu> getZhongChouXiangMu() {
        return projectMapper.getZhongChouXiangMu();
    }

    @Override
    public List<XinWenTongZhi> getZhongChouXuZhi() {
        return projectMapper.getZhongChouXuZhi();
    }

    @Override
    public XinWenTongZhi getZhongChouXuZhiDetail(String id) {
        return projectMapper.getZhongChouXuZhiDetail(id);
    }


}
