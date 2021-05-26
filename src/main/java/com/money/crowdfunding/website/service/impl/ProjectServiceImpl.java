package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.ProjectMapper;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import com.money.crowdfunding.website.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    @Override
    public ZhongChouXiangMu getZhongChouDetail(String id) {

        ZhongChouXiangMu zhongChouXiangMu = projectMapper.getZhongChouDetail(id);
        Random random = new Random();
        int num =random.nextInt(4);
        if (num==0){
            num=5;
        }
        String code = String.valueOf(num);
        String picture = "00"+code;
        zhongChouXiangMu.setPicture(picture);
        return zhongChouXiangMu;
    }


}
