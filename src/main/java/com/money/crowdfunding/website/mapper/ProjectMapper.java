package com.money.crowdfunding.website.mapper;



import com.money.crowdfunding.website.model.XinWenTongZhi;
import com.money.crowdfunding.website.model.ZhongChouXiangMu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("select  * from zhongchouxiangmu where issh = '是'  order by addtime DESC limit 6")
    List<ZhongChouXiangMu> getZhongChouXiangMu();

    @Select("select  * from xinwentongzhi where shouyetupian !='delete' order by addtime DESC limit 6")
    List<XinWenTongZhi> getZhongChouXuZhi();

    @Select("select * from xinwentongzhi where shouyetupian !='delete' and  ID = #{id}")
    XinWenTongZhi getZhongChouXuZhiDetail(@Param("id") String id);

}
