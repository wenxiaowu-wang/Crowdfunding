package com.money.crowdfunding.website.controller;



import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import com.money.crowdfunding.website.service.ProjectService;

import com.money.crowdfunding.website.utils.httpUtils.HttpResult;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @GetMapping("/getZhongChouXiangMu")
    public HttpResult getZhongChouXiangMu(){
        List<ZhongChouXiangMu> zhongChouXiangMu = projectService.getZhongChouXiangMu();
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    @GetMapping("/getZhongChouXuZhi")
    public HttpResult getZhongChouXuZhi(){
        List<XinWenTongZhi> xinWenTongZhiList = projectService.getZhongChouXuZhi();
        return HttpResult.ok().setData(xinWenTongZhiList);
    }


    @RequestMapping("/setProjectDetailSession/{id}")
    @ResponseBody
    public HttpResult setProjectDetailSession(@PathVariable(value = "id") String id, HttpSession httpSession){
        httpSession.setAttribute("id",id);
        return HttpResult.ok().setData(id);
    }


    @GetMapping("/getProjectDetailSession")
    public HttpResult getProjectDetailSession(HttpSession httpSession){
        String id = (String) httpSession.getAttribute("id");
        return HttpResult.ok().setData(id);
    }

    @GetMapping("/getZhongChouXuZhiDetail/{id}")
    public HttpResult getZhongChouXuZhiDetail(@PathVariable("id") String id){
        return HttpResult.ok().setData(projectService.getZhongChouXuZhiDetail(id));
    }
}
