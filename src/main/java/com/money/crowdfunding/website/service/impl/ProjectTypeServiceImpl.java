package com.money.crowdfunding.website.service.impl;

import com.money.crowdfunding.website.mapper.ProjectTypeMapper;
import com.money.crowdfunding.website.model.TouZiDingDan;
import com.money.crowdfunding.website.model.XiangMuLeiBie;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import com.money.crowdfunding.website.service.ProjectTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class ProjectTypeServiceImpl implements ProjectTypeService {

    @Autowired
    ProjectTypeMapper projectTypeMapper;


    //添加一条记录
    @Override
    public Map<String, Object> insertOne(XiangMuLeiBie xiangMuLeiBie) {
        Map<String, Object> map = new HashMap<>();
        if (this.isAlreadyHas(xiangMuLeiBie.getLeibie())){
            map.put("result",false);
            map.put("msg","已存在该众筹类型");
            return map;
        }else{
            Date currentTime = new Date();
            Timestamp timestamp = new Timestamp(currentTime.getTime());
            xiangMuLeiBie.setAddtime(timestamp.toString());
            xiangMuLeiBie.setIsdelete("使用中");
            if (projectTypeMapper.insertOne(xiangMuLeiBie) > 0){
                map.put("result",true);
                map.put("msg","添加成功");
                return map;
            }else{
                map.put("result",false);
                map.put("msg","系统原因，添加失败");
                return map;
            }
        }
    }

    //根据id更新对应记录的类别信息
    @Override
    public Map<String, Object> updateOneAdminById(String type, int id) {
        Map<String, Object> map = new HashMap<>();
        if (this.isAlreadyHas(type)){
            map.put("result",false);
            map.put("msg","已存在该众筹类型");
            return map;
        }else{
            if (projectTypeMapper.updateOneAdminById(type,id) > 0){
                map.put("result",true);
                map.put("msg","修改成功");
                return map;
            }else{
                map.put("result",false);
                map.put("msg","系统原因，修改失败");
                return map;
            }
        }
    }

    @Override
    public List<XiangMuLeiBie> getAllList() {
        return projectTypeMapper.getAllList();
    }

    //封禁一套记录
    @Override
    public boolean disableOne(Integer id) {
        return projectTypeMapper.updateOneIsDeleteById("已删除",id) > 0;
    }

    //解封一条记录
    @Override
    public Map<String, Object> openOne(Integer id) {
        Map<String, Object> map = new HashMap<>();
        String type = projectTypeMapper.selectOneById(id).getLeibie();
        if (this.isAlreadyHas(type)){
            map.put("result",false);
            map.put("msg","已存在该众筹类型");
            return map;
        }else{
            if (projectTypeMapper.updateOneIsDeleteById("使用中",id) > 0){
                map.put("result",true);
                map.put("msg","解封成功");
                return map;
            }else{
                map.put("result",false);
                map.put("msg","系统原因，解封失败");
                return map;
            }
        }
    }

    @Override
    public List<ZhongChouXiangMu> getAllProjectList() {
        return projectTypeMapper.getAllProjectList();
    }

    @Override
    public List<TouZiDingDan> getAllOrderList() {
        return projectTypeMapper.getAllOrderList();
    }

    @Override
    public TouZiDingDan getOneOrderById(int id) {
        return projectTypeMapper.getOneOrderById(id);
    }

    @Override
    public ZhongChouXiangMu getOneProjectInfoById(int id) {
        return projectTypeMapper.getOneProjectById(id);
    }

    @Override
    public boolean updateOneProjectInfoById(ZhongChouXiangMu zhongChouXiangMu) {
        return projectTypeMapper.updateOneIsshById(zhongChouXiangMu.getIssh(), zhongChouXiangMu.getId()) > 0;
    }

    //查重
    public boolean isAlreadyHas(String type){
        return projectTypeMapper.selectOneByType(type) != null;
    }
}
