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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    ProjectMapper projectMapper;

    /**
     *获取所有的众筹项目记录
     * @return
     */
    @GetMapping("/getZhongChouXiangMu")
    public HttpResult getZhongChouXiangMu() {
        List<ZhongChouXiangMu> zhongChouXiangMu = projectService.getZhongChouXiangMu();
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    /**
     * 根据用户名获取自己发布的众筹项目
     * @param yonghuming
     * @return
     */
    @GetMapping("/getMyZhongChouXiangMu/{yonghuming}")
    public HttpResult getMyZhongChouXiangMu(@PathVariable(value = "yonghuming") String yonghuming) {
        List<ZhongChouXiangMu> zhongChouXiangMu = projectMapper.getMyZhongChouXiangMu(yonghuming);
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    /**
     * 根据用户名获取投资自己的众筹项目
     * @param yonghuming
     * @return
     */
    @GetMapping("/getTouziMyXiangMu/{yonghuming}")
    public HttpResult getTouziMyXiangMu(@PathVariable(value = "yonghuming") String yonghuming) {
        List<TouZiDingDan> zhongChouXiangMu = projectMapper.getTouziMyXiangMu(yonghuming);
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    /**
     * 根据用户名获取自己投资的众筹项目
     * @param yonghuming
     * @return
     */
    @GetMapping("/getMyTouziXiangMu/{yonghuming}")
    public HttpResult getMyTouziXiangMu(@PathVariable(value = "yonghuming") String yonghuming) {
        List<TouZiDingDan> zhongChouXiangMu = projectMapper.getMyTouziXiangMu(yonghuming);
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    /**
     * 获取所有的众筹须知
     * @return
     */
    @GetMapping("/getZhongChouXuZhi")
    public HttpResult getZhongChouXuZhi() {
        List<XinWenTongZhi> xinWenTongZhiList = projectService.getZhongChouXuZhi();
        return HttpResult.ok().setData(xinWenTongZhiList);
    }

    /**
     * 将一条众筹项目的信息存入session
     * @param id
     * @param httpSession
     * @return
     */
    @RequestMapping("/setProjectDetailSession/{id}")
    @ResponseBody
    public HttpResult setProjectDetailSession(@PathVariable(value = "id") String id, HttpSession httpSession) {
        httpSession.setAttribute("id", id);
        return HttpResult.ok().setData(id);
    }

    /**
     * 从session中获取一条众筹项目的信息
     * @param httpSession
     * @return
     */
    @GetMapping("/getProjectDetailSession")
    public HttpResult getProjectDetailSession(HttpSession httpSession) {
        String id = (String) httpSession.getAttribute("id");
        return HttpResult.ok().setData(id);
    }

    /**
     * 获取一条众筹须知的信息
     * @param id
     * @return
     */
    @GetMapping("/getZhongChouXuZhiDetail/{id}")
    public HttpResult getZhongChouXuZhiDetail(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectService.getZhongChouXuZhiDetail(id));
    }

    /**
     * 获取一条众筹项目的详细信息
     * @param id
     * @return
     */
    @GetMapping("/getZhongChouDetail/{id}")
    public HttpResult getZhongChouDetail(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectService.getZhongChouDetail(id));
    }

    /**
     * 获取一条众筹项目下面的评论信息
     * @param id
     * @return
     */
    @GetMapping("/getComment/{id}")
    public HttpResult getComment(@PathVariable("id") String id) {
        return HttpResult.ok().setData(projectMapper.getComment(id));
    }

    /**
     * 存入用户输入的评论信息
     * @param yonghuming
     * @param pinglunneirong
     * @param xinwenid
     * @return
     */
    @PostMapping("/setComment/{yonghuming}/{pinglunneirong}/{xinwenid}")
    public HttpResult setComment(@PathVariable("yonghuming") String yonghuming, @PathVariable("pinglunneirong") String pinglunneirong, @PathVariable("xinwenid") String xinwenid) {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());
        return HttpResult.ok().setData(projectMapper.insertComment(xinwenid, pinglunneirong, yonghuming, timestamp));

    }

    /**
     * 用户发布众筹项目
     * @param biaoti
     * @param leibie
     * @param money
     * @param qixian
     * @param xiangqing
     * @param faburen
     * @return
     */
    @PostMapping("/publishProject/{biaoti}/{leibie}/{money}/{qixian}/{xiangqing}/{faburen}")
    public HttpResult publishProject(@PathVariable("biaoti") String biaoti, @PathVariable("leibie") String leibie, @PathVariable("money") String money, @PathVariable("qixian") String qixian, @PathVariable("xiangqing") String xiangqing, @PathVariable("faburen") String faburen) {
        Date date = new Date();
        Timestamp addtime = new Timestamp(date.getTime());
        ZhongChouXiangMu zhongChouXiangMu = new ZhongChouXiangMu();
        SimpleDateFormat formatter = new SimpleDateFormat("MMddHHmmss"); //获得年月日
        Date currentTime = new Date();
        String xiangmubianhao = formatter.format(currentTime);
        zhongChouXiangMu.setXiangmubianhao(xiangmubianhao);
        zhongChouXiangMu.setBiaoti(biaoti);
        zhongChouXiangMu.setLeibie(leibie);
        zhongChouXiangMu.setZhongchoujine(money);
        zhongChouXiangMu.setQixian(qixian);
        zhongChouXiangMu.setAddtime(addtime);
        zhongChouXiangMu.setShouyi("0");
        zhongChouXiangMu.setXiangqing(xiangqing);
        zhongChouXiangMu.setFaburen(faburen);
        zhongChouXiangMu.setIssh("待审核");
        return HttpResult.ok().setData(projectMapper.publishProject(zhongChouXiangMu));

    }

    /**
     * 用户投资项目，将信息存入投资订单表
     * @param shouyi
     * @param touziren
     * @param xiangmubianhao
     * @return
     */
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
        touZiDingDan.setIszf("是");
        int allMoney = Integer.parseInt(projectMapper.getshouyi(xiangmubianhao));
        int touzi = Integer.parseInt(shouyi);
        int totle = allMoney + touzi;
        int zhongchoujine = Integer.parseInt(projectMapper.getZhongChouJine(xiangmubianhao));
        if (totle >= zhongchoujine) {
            projectMapper.updateJIN(xiangmubianhao);
        }
        String fi = String.valueOf(totle);
        boolean update = projectMapper.updateJine(fi, xiangmubianhao);
        boolean insert = projectMapper.insertInvestment(touZiDingDan);
        if (update && insert) {
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);
    }

    /**
     * 用户点击一条众筹须知的详情，增加该条的点击率
     * @param id
     * @return
     */
    @PostMapping("/updateDJL/{id}")
    public HttpResult updateDJL(@PathVariable("id") String id) {
        boolean update = false;
        update = projectMapper.updateDJL(id);
        return HttpResult.ok().setData(update);
    }

    /**
     * 获取一条众筹项目的发布时间和期限，用于在前端展示倒计时。判断该项目是否已截止
     * @param id
     * @return
     */
    @GetMapping("/getDate")
    public HttpResult getDate(@Param("id") String id) {
        int qixian = projectMapper.getQixian(id);
        Date addtime = projectMapper.getAddTime(id);
        SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy");
        SimpleDateFormat formatter2 = new SimpleDateFormat("MM");
        SimpleDateFormat formatter3 = new SimpleDateFormat("dd");
        SimpleDateFormat formatter4 = new SimpleDateFormat("HH");
        SimpleDateFormat formatter5 = new SimpleDateFormat("mm");
        SimpleDateFormat formatter6 = new SimpleDateFormat("ss");
        List<Integer> list = new ArrayList<>();
        int endTime1 = Integer.parseInt(formatter1.format(addtime)) + qixian;
        int endTime2 = Integer.parseInt(formatter2.format(addtime));
        int endTime3 = Integer.parseInt(formatter3.format(addtime));
        int endTime4 = Integer.parseInt(formatter4.format(addtime));
        int endTime5 = Integer.parseInt(formatter5.format(addtime));
        int endTime6 = Integer.parseInt(formatter6.format(addtime));
        list.add(endTime6);
        list.add(endTime5);
        list.add(endTime4);
        list.add(endTime3);
        list.add(endTime2);
        list.add(endTime1);
        return HttpResult.ok().setData(list);
    }

    /**
     * 如果时间倒计时为0 自动截止停止投资，但可以评论
     * @param id
     * @return
     */
    @GetMapping("/updateJieZhi")
    public HttpResult updateJieZhi(@Param("id") String id) {
        return HttpResult.ok().setData(projectMapper.updateJieZhi(id));
    }

}
