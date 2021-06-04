package com.money.crowdfunding.website.controller;


import com.money.crowdfunding.website.model.TouZiDingDan;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.model.XiangMuLeiBie;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import com.money.crowdfunding.website.service.ProjectTypeService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/pType")
public class ProjectTypeController {

    @Autowired
    ProjectTypeService projectTypeService;

    /**
     * 添加一条众筹类别记录
     * @param xiangMuLeiBie 项目类别信息
     * @return  添加结果 Boolean 封装在返回对象实例中
     */
    @PostMapping("/addOne")
    public HttpResult addOne(XiangMuLeiBie xiangMuLeiBie) {
        Map<String,Object> map = projectTypeService.insertOne(xiangMuLeiBie);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    /**
     * 根据id修改一条众筹类别记录
     * @param type 类型
     * @param id    编号id
     * @return 修改结果 boolean 封装在返回对象实例中
     */
    @PostMapping("/updateOneById")
    public HttpResult updateOneById(@Param("type")String type,@Param("id")Integer id) {
        Map<String,Object> map = projectTypeService.updateOneAdminById(type,id);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    /**
     * 获取所有类别名符合搜索数据的众筹类别信息
     * @param searchData  关键词数据
     * @return  对应项目类别信息集合 封装在返回对象实例中
     */
    @GetMapping("/getAllList")
    public HttpResult getAllList(@Param("searchData")String searchData) {
        return HttpResult.ok().setData(projectTypeService.getAllList(searchData));
    }

    /**
     * 禁用项目类别信息
     * @param id    类别编号
     * @return  禁用操作结果 boolean 封装在返回对象实例中
     */
    @PostMapping("/disable")
    public HttpResult disable(@Param("id")Integer id){
        return HttpResult.ok().setData(projectTypeService.disableOne(id));
    }

    /**
     * 解封项目类别信息
     * @param id    类别编号
     * @return  解封操作结果 boolean 封装在返回对象实例中
     */
    @PostMapping("/open")
    public HttpResult open(@Param("id")Integer id){
        Map<String,Object> map = projectTypeService.openOne(id);
        boolean data = (boolean) map.get("result");
        return HttpResult.ok().setData(data).setMsg((String) map.get("msg"));
    }

    /**
     * 获取所有项目名符合关键字的对应众筹项目
     * @param searchData    项目名关键字
     * @return  对应众筹项目实例集合 封装到返回对象实例中
     */
    @GetMapping("/getAllProjectList")
    public HttpResult getAllProjectList(@Param("searchData")String searchData) {
        return HttpResult.ok().setData(projectTypeService.getAllProjectList(searchData));
    }

    /**
     * 获取所有项目名符合关键字的对应众筹订单
     * @param searchData    项目名关键字
     * @return  对应众筹订单实例集合 封装到返回对象实例中
     */
    @GetMapping("/getAllOrderList")
    public HttpResult getAllOrderList(@Param("searchData")String searchData) {
        return HttpResult.ok().setData(projectTypeService.getAllOrderList(searchData));
    }

    /**
     * 获取跳转到auditProjectInterface的缓存id对应的项目信息
     * @param httpSession   后台缓存 用于获取项目id，根据id获取对应众筹项目
     * @return  众筹项目对象 封装到返回对象实例中
     */
    @GetMapping("/getProjectBySessionId")
    public HttpResult getProjectBySessionId(HttpSession httpSession){
        Integer id = (Integer) httpSession.getAttribute("projectId");
        ZhongChouXiangMu zhongChouXiangMu = projectTypeService.getOneProjectInfoById(id);
        return HttpResult.ok().setData(zhongChouXiangMu);
    }

    /**
     * 根据项目id修改项目信息
     * @param zhongChouXiangMu  要修改的众筹项目信息
     * @return 修改结果 boolean 封装到返回对象实例中
     */
    @PostMapping("/updateProjectById")
    public HttpResult updateProjectById(ZhongChouXiangMu zhongChouXiangMu){
        return HttpResult.ok().setData(projectTypeService.updateOneProjectInfoById(zhongChouXiangMu));
    }

    /**
     * 获取跳转到auditOrderInterface的缓存id对应的项目信息
     * @param httpSession   后台缓存 用于获取项目订单id，根据id获取对应众筹项目订单
     * @return  众筹项目订单对象 封装到返回对象实例中
     */
    @GetMapping("/getOrderBySessionId")
    public HttpResult getOrderBySessionId(HttpSession httpSession){
        Integer id = (Integer) httpSession.getAttribute("orderId");
        TouZiDingDan touZiDingDan = projectTypeService.getOneOrderById(id);
        return HttpResult.ok().setData(touZiDingDan);
    }

}
