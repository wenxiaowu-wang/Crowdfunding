package com.money.crowdfunding.website.service;

import com.money.crowdfunding.website.model.TouZiDingDan;
import com.money.crowdfunding.website.model.XiangMuLeiBie;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;

import java.util.List;
import java.util.Map;

public interface ProjectTypeService {

    //插入一条项目类别信息
    Map<String,Object> insertOne(XiangMuLeiBie xiangMuLeiBie);

    //根据id修改类别
    Map<String,Object> updateOneAdminById(String type,int id);

    //getAll
    List<XiangMuLeiBie> getAllList();

    //禁用一条类别记录
    boolean disableOne(Integer id);

    //解封一条类别记录
    Map<String,Object> openOne(Integer id);

    //getAllProject
    List<ZhongChouXiangMu> getAllProjectList();

    //getAllOrder
    List<TouZiDingDan> getAllOrderList();
}
