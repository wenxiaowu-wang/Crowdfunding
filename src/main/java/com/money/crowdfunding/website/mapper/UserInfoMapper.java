package com.money.crowdfunding.website.mapper;


import com.money.crowdfunding.website.model.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.mapper
 * 项目:website
 * 描述:
 */
@Mapper
public interface UserInfoMapper {

    @Select("select * from yonghuzhuce where yonghuming = #{name}")
    UserInfo selectUserInfoByName(@Param("name") String name);

    @Insert("insert into yonghuzhuce(yonghuming,mima,xingming,xingbie,chushengnianyue,qq,youxiang,dianhua,shenfenzheng,touxiang,dizhi,addtime,beizhu,issh)values" +
            "(#{yonghuming},#{mima},#{xingming},#{xingbie},#{chushengnianyue},#{qq},#{youxiang},#{dianhua},#{shenfenzheng},#{touxiang},#{dizhi},#{addtime},#{beizhu},#{issh})")
    boolean insertOneAdmin(UserInfo userInfo);

    @Select("select count(*) from yonghuzhuce where yonghuming = #{yonghuming} and mima =#{mima}")
    boolean getLoginResult(@Param("yonghuming") String yonghuming,@Param("mima") String mima);

    @Select("select * from yonghuzhuce where yonghuming = #{yonghuming} and mima =#{mima}")
    UserInfo getUserInfoByIDM(@Param("yonghuming") String yonghuming,@Param("mima") String mima);

    @Select("select * from yonghuzhuce")
    List<UserInfo> selectAllUser();
}
