package com.money.crowdfunding.website.controller;


import com.money.crowdfunding.website.mapper.ProjectMapper;
import com.money.crowdfunding.website.model.*;
import com.money.crowdfunding.website.service.ProjectService;

import com.money.crowdfunding.website.utils.httpUtils.HttpResult;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    ProjectMapper projectMapper;

    @GetMapping("/getZhongChouXiangMu")
    public HttpResult getZhongChouXiangMu() {
        List<ZhongChouXiangMu> zhongChouXiangMu = projectService.getZhongChouXiangMu();
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    @GetMapping("/getZhongChouXuZhi")
    public HttpResult getZhongChouXuZhi() {
        List<XinWenTongZhi> xinWenTongZhiList = projectService.getZhongChouXuZhi();
        return HttpResult.ok().setData(xinWenTongZhiList);
    }


    @RequestMapping("/setProjectDetailSession/{id}")
    @ResponseBody
    public HttpResult setProjectDetailSession(@PathVariable(value = "id") String id, HttpSession httpSession) {
        httpSession.setAttribute("id", id);
        return HttpResult.ok().setData(id);
    }


    @GetMapping("/getProjectDetailSession")
    public HttpResult getProjectDetailSession(HttpSession httpSession) {
        String id = (String) httpSession.getAttribute("id");
        return HttpResult.ok().setData(id);
    }

    @GetMapping("/getZhongChouXuZhiDetail/{id}")
    public HttpResult getZhongChouXuZhiDetail(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectService.getZhongChouXuZhiDetail(id));
    }

    @GetMapping("/getZhongChouDetail/{id}")
    public HttpResult getZhongChouDetail(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectService.getZhongChouDetail(id));
    }

    @GetMapping("/getComment/{id}")
    public HttpResult getComment(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectMapper.getComment(id));
    }

    @PostMapping("/setComment/{yonghuming}/{pinglunneirong}/{xinwenid}")
    public HttpResult setComment(@PathVariable("yonghuming") String yonghuming, @PathVariable("pinglunneirong") String pinglunneirong, @PathVariable("xinwenid") String xinwenid) {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        return HttpResult.ok().setData(projectMapper.insertComment(xinwenid,pinglunneirong,yonghuming,timestamp));

    }

    @PostMapping("/setInvestment/{shouyi}/{touziren}/{xiangmubianhao}")
    public HttpResult setInvestment(@PathVariable("shouyi") String shouyi, @PathVariable("touziren") String touziren, @PathVariable("xiangmubianhao") String xiangmubianhao) {
        Date date = new Date();
        Timestamp addtime = new Timestamp(date.getTime());

        ZhongChouXiangMu zhongChouXiangMu = projectMapper.getZhongChouDetail(xiangmubianhao);

        TouZiDingDan touZiDingDan = new TouZiDingDan();
        touZiDingDan.setXiangmubianhao(zhongChouXiangMu.getXiangmubianhao());
        touZiDingDan.setBiaoti(zhongChouXiangMu.getBiaoti());
        touZiDingDan.setLeibie(zhongChouXiangMu.getLeibie());
        touZiDingDan.setZhongchoujine(zhongChouXiangMu.getZhongchoujine());
        touZiDingDan.setQixian(zhongChouXiangMu.getQixian());
        touZiDingDan.setShouyi(shouyi);
        touZiDingDan.setFaburen(zhongChouXiangMu.getFaburen());
        touZiDingDan.setTouziren(touziren);
        touZiDingDan.setIssh(zhongChouXiangMu.getIssh());
        touZiDingDan.setAddtime(addtime);

        int allMoney = Integer.parseInt(projectMapper.getshouyi(xiangmubianhao));
        int touzi = Integer.parseInt(shouyi);
        int totle = allMoney+touzi;

        String fi = String.valueOf(totle);

        boolean update = projectMapper.updateJine(fi,xiangmubianhao);
        boolean insert = projectMapper.insertInvestment(touZiDingDan);
        if (update&&insert){
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);

    }


}