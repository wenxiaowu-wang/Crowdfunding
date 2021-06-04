package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.mapper.NoticeMapper;
import com.money.crowdfunding.website.model.Admin;
import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.service.AdminService;
import com.money.crowdfunding.website.service.NoticeService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Date;

/**
 * 包:com.money.crowdfunding.website.controller
 * 项目:website
 * 描述:
 */
@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    @Autowired
    NoticeMapper noticeMapper;

    /**
     * 获取标题中存在对应关键字的所有通知信息
     * @param title 标题关键字
     * @return  对应通知信息实例集合 封装在返回对象中
     */
    @GetMapping("/getNoticeListByLike")
    public HttpResult getNoticeListByLike(@Param("title")String title){
        return HttpResult.ok().setData(noticeService.getNoticeListByLike(title));
    }

    /**
     * 添加一条通知信息
     * @param biaoti    通知标题
     * @param neirong   通知内容
     * @param leibie    通知类别
     * @param httpSession   后台缓存，用于获取管理员用户名
     * @return  添加结果boolean 封装在返回对象实例中
     */
    @PostMapping("/addOneNotice")
    public HttpResult addOneNotice(@Param("biaoti")String biaoti,@Param("neirong")String neirong,@Param("leibie")String leibie,HttpSession httpSession){
        Date currentTime = new Date();
        Timestamp timestamp = new Timestamp(currentTime.getTime());
        XinWenTongZhi xinWenTongZhi = new XinWenTongZhi();
        xinWenTongZhi.setBiaoti(biaoti);
        xinWenTongZhi.setNeirong(neirong);
        xinWenTongZhi.setLeibie(leibie);
        xinWenTongZhi.setAddtime(timestamp.toString());
        Admin admin = (Admin) httpSession.getAttribute("adminInfo");
        xinWenTongZhi.setTianjiaren(admin.getUsername());
        return HttpResult.ok().setData(noticeMapper.insertOneNotice(xinWenTongZhi) > 0);
    }




}
