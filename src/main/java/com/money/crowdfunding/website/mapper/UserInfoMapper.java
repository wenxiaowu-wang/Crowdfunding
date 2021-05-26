package com.money.crowdfunding.website.mapper;


import com.money.crowdfunding.website.model.UserInfo;
import org.apache.ibatis.annotations.*;

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

    @Select("select count(*) from yonghuzhuce where yonghuming = #{yonghuming} and mima =#{mima} and issh!='D'")
    boolean getLoginResult(@Param("yonghuming") String yonghuming,@Param("mima") String mima);

    @Select("select * from yonghuzhuce where yonghuming = #{yonghuming} and mima =#{mima}")
    UserInfo getUserInfoByIDM(@Param("yonghuming") String yonghuming,@Param("mima") String mima);

    @Select("select * from yonghuzhuce")
    List<UserInfo> selectAllUser();

    @Select("select count(*) from yonghuzhuce where yonghuming = #{name}")
    boolean selectUserInfoIsExistByName(@Param("name") String name);

    @Update("update yonghuzhuce set issh = #{issh} where id = #{id}")
    int updateIsshById(@Param("id")int id,@Param("issh")String issh);

    @Select("select * from yonghuzhuce where id = #{id}")
    UserInfo selectUserById(@Param("id")int id);

    @Update("update yonghuzhuce set xingming = #{xingming},qq=#{qq},youxiang=#{youxiang},dianhua=#{dianhua},touxiang=#{touxiang},dizhi=#{dizhi},chushengnianyue=#{chushengnianyue},issh = #{issh} where id = #{id}")
    int updateUserInfoById(@Param("id")int id,@Param("issh")String issh,@Param("xingming")String xingming,@Param("qq")String qq,@Param("youxiang")String youxiang,@Param("dianhua")String dianhua,@Param("touxiang")String touxiang,@Param("dizhi")String dizhi,@Param("chushengnianyue")String chushengnianyue);


    @Update("update yonghuzhuce set xingbie = #{xingbie} , chushengnianyue = #{chushengnianyue} , qq = #{qq} , youxiang = #{youxiang} , dianhua = #{dianhua} , dizhi = #{dizhi} where yonghuming = #{yonghuming}")
    boolean updateUser(@Param("xingbie")String xingbie,@Param("chushengnianyue")String chushengnianyue,@Param("qq")String qq,@Param("youxiang")String youxiang,@Param("dianhua")String dianhua,@Param("dizhi")String dizhi,@Param("yonghuming")String yonghuming);

    @Update("update yonghuzhuce set  mima = #{mima} where yonghuming = #{yonghuming}")
    boolean updatePwd(@Param("mima")String mima,@Param("yonghuming")String yonghuming);

    @Select("select * from yonghuzhuce where yonghuming = #{yonghuming} ")
    UserInfo getUserInfoByYonghuming(@Param("yonghuming") String yonghuming);

}
