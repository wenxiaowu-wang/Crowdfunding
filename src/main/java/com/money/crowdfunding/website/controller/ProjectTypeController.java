package com.money.crowdfunding.website.controller;


import com.money.crowdfunding.website.model.XiangMuLeiBie;
import com.money.crowdfunding.website.service.ProjectTypeService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/pType")
public class ProjectTypeController {

    @Autowired
    ProjectTypeService projectTypeService;

    //添加一条众筹类别记录
    @PostMapping("/addOne")
    public HttpResult addOne(XiangMuLeiBie xiangMuLeiBie) {
        Map<String,Object> map = projectTypeService.insertOne(xiangMuLeiBie);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    //根据id修改一条众筹类别记录
    @PostMapping("/updateOneById")
    public HttpResult updateOneById(@Param("type")String type,@Param("id")Integer id) {
        Map<String,Object> map = projectTypeService.updateOneAdminById(type,id);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    @GetMapping("/getAllList")
    public HttpResult getAllList() {
        return HttpResult.ok().setData(projectTypeService.getAllList());
    }

    //禁用
    @PostMapping("/disable")
    public HttpResult disable(@Param("id")Integer id){
        return HttpResult.ok().setData(projectTypeService.disableOne(id));
    }

    //解封
    @PostMapping("/open")
    public HttpResult open(@Param("id")Integer id){
        Map<String,Object> map = projectTypeService.openOne(id);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    @GetMapping("/getAllProjectList")
    public HttpResult getAllProjectList() {
        return HttpResult.ok().setData(projectTypeService.getAllProjectList());
    }

    @GetMapping("/getAllOrderList")
    public HttpResult getAllOrderList() {
        return HttpResult.ok().setData(projectTypeService.getAllOrderList());
    }

}
