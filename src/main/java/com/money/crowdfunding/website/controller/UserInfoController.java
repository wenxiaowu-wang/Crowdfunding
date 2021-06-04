package com.money.crowdfunding.website.controller;

import com.money.crowdfunding.website.mapper.UserInfoMapper;
import com.money.crowdfunding.website.model.UserInfo;
import com.money.crowdfunding.website.service.UserInfoService;
import com.money.crowdfunding.website.utils.httpUtils.HttpResult;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * 包:com.money.crowdfunding.website.controller
 * 项目:website
 * 描述:
 */
@RestController
@RequestMapping("/user")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    UserInfoMapper userInfoMapper;

    /**
     * 根据用户名获取用户所有信息
     * @param name
     * @return
     */
    @GetMapping("/getUserByName")
    public UserInfo getUserByName(@Param("userName") String name){
        UserInfo userInfo = userInfoService.getUserInfoByName(name);
        System.out.println(userInfo);
        return userInfo;
    }

    /**
     * 用户注册获取注册结果
     * 用户名已存在直接返回false结果
     * @param userInfo
     * @return
     */
    @PostMapping("/getRegisterResult")
    public HttpResult getRegisterResult(UserInfo userInfo){
        return HttpResult.ok().setData(userInfoService.getRegisterResult(userInfo));
    }

    /**
     * 用户登录根据用户名、密码查询该用户账号密码是否正确
     * 账号密码正确将用户所有信息存入session
     * @param yonghuming
     * @param mima
     * @param httpSession
     * @return
     */
    @RequestMapping("/getLoginResult/{yonghuming}/{mima}")
    @ResponseBody
    public HttpResult getLoginResult(@PathVariable(value = "yonghuming") String yonghuming, @PathVariable(value = "mima") String mima, HttpSession httpSession){
        UserInfo userInfo = userInfoService.getUserInfoByIDM(yonghuming,mima);
        httpSession.setAttribute("userInfo",userInfo);
        return HttpResult.ok().setData(userInfoService.getLoginResult(yonghuming,mima));
    }


    /**
     *  用户根据用户名修改资料
     * @param yonghuming
     * @param xingbie
     * @param chushengnianyue
     * @param qq
     * @param youxiang
     * @param dianhua
     * @param dizhi
     * @param httpSession
     * @return
     */
    @PostMapping("/updateUser")
    public HttpResult updateUser(@Param("yonghuming")String yonghuming,@Param("xingbie")String xingbie,@Param("chushengnianyue")String chushengnianyue,@Param("qq")String qq,@Param("youxiang")String youxiang,@Param("dianhua")String dianhua,@Param("dizhi")String dizhi,HttpSession httpSession){

        if (userInfoService.updateUser(xingbie,chushengnianyue,qq,youxiang,dianhua,dizhi,yonghuming)){
            UserInfo userInfo = userInfoMapper.getUserInfoByYonghuming(yonghuming);
            httpSession.setAttribute("userInfo",userInfo);
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);
    }


    /**
     * 用户修改密码，修改完成信息后更新用户session
     * @param yonghuming
     * @param mima
     * @param httpSession
     * @return
     */
    @PostMapping("/updatePwd")
    public HttpResult updatePwd(@Param("yonghuming")String yonghuming,@Param("mima")String mima,HttpSession httpSession){

        if (userInfoService.updatePwd(mima,yonghuming)){
            UserInfo userInfo = userInfoMapper.getUserInfoByYonghuming(yonghuming);
            httpSession.setAttribute("userInfo",userInfo);
            return HttpResult.ok().setData(true);
        }
        return HttpResult.ok().setData(false);
    }

    /**
     * 获取登录账号存入的session信息
     * @param httpSession
     * @return
     */
    @GetMapping("/getUserSession")
    public HttpResult getUserSession(HttpSession httpSession){
        UserInfo userInfo = (UserInfo) httpSession.getAttribute("userInfo");
        return HttpResult.ok().setData(userInfo);
    }

    /**
     * 获取所有用户信息
     * @param searchData
     * @return
     */
    @GetMapping("/getAllUser")
    public HttpResult getAllUser(@Param("searchData")String searchData){
        return HttpResult.ok().setData(userInfoService.getAllUser(searchData));
    }


    /**
     * 禁用用户账号
     * @param id
     * @return
     */
    @PostMapping("/disableUserAccount")
    public HttpResult disableUserAccount(@Param("id")Integer id){
        return HttpResult.ok().setData(userInfoService.disableUserAccount(id));
    }


    /**
     * 解封用户账号
     * @param id
     * @return
     */
    @PostMapping("/openUserAccount")
    public HttpResult openUserAccount(@Param("id")Integer id){
        return HttpResult.ok().setData(userInfoService.openUserAccount(id));
    }

    /**
     * 获取跳转到userEditOfManage的缓存id对应的用户信息
     * @param httpSession   后台缓存 用于获取用户id，根据id获取对应用户信息
     * @return  用户信息实例  封装在返回对象实例中
     */
    @GetMapping("/getUserBySessionId")
    public HttpResult getUserByName(HttpSession httpSession){
        Integer id = (Integer) httpSession.getAttribute("userEditId");
        UserInfo userInfo = userInfoService.getUserInfoById(id);
        return HttpResult.ok().setData(userInfo);
    }

    /**
     * 根据用户id修改用户信息
     * @param userInfo  用户修改信息
     * @return  修改结果 boolean 封装在返回对象实例中
     */
    @PostMapping("/updateUserById")
    public HttpResult updateUserById(UserInfo userInfo){
        return HttpResult.ok().setData(userInfoService.updateUserInfoById(userInfo));
    }


}
