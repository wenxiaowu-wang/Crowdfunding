package com.money.crowdfunding.website.mapper;

import com.money.crowdfunding.website.model.TouZiDingDan;
import com.money.crowdfunding.website.model.XiangMuLeiBie;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.mapper
 * 项目:website
 * 描述:
 */
@Mapper
public interface ProjectTypeMapper {

    @Select("select * from xiangmuleibie where leibie = #{leibie} and isdelete = '使用中'")
    XiangMuLeiBie selectOneByType(@Param("leibie")String type);

    @Select("select * from xiangmuleibie where id = #{id}")
    XiangMuLeiBie selectOneById(@Param("id")int id);

    @Insert("insert into xiangmuleibie(leibie,addtime,isdelete)values(#{leibie},#{addtime},#{isdelete})")
    int insertOne(XiangMuLeiBie xiangMuLeiBie);

    //根据id修改类别
    @Update("update xiangmuleibie set leibie = #{leibie} where id = #{id}")
    int updateOneAdminById(@Param("leibie")String type,@Param("id")int id);

    //getAllType
    @Select("select * from xiangmuleibie")
    List<XiangMuLeiBie> getAllList();

    //根据id修改isdelete
    @Update("update xiangmuleibie set isdelete = #{isdelete} where id = #{id}")
    int updateOneIsDeleteById(@Param("isdelete")String isdelete,@Param("id")int id);

    //getAllProject
    @Select("select * from zhongchouxiangmu limit 12")
    List<ZhongChouXiangMu> getAllProjectList();

    //getAllOrder
    @Select("select * from touzidingdan limit 12")
    List<TouZiDingDan> getAllOrderList();

    //getOneProjectById
    @Select("select * from zhongchouxiangmu where id = #{id}")
    ZhongChouXiangMu getOneProjectById(@Param("id")int id);

    //根据id修改zhongchouxiangmu表中的issh
    @Update("update zhongchouxiangmu set issh = #{issh} where id = #{id}")
    int updateOneIsshById(@Param("issh")String issh,@Param("id")int id);
}
