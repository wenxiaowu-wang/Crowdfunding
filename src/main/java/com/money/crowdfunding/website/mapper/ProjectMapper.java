package com.money.crowdfunding.website.mapper;



import com.money.crowdfunding.website.model.*;
import org.apache.ibatis.annotations.*;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("select  * from zhongchouxiangmu where issh = '是'  order by addtime DESC limit 6")
    List<ZhongChouXiangMu> getZhongChouXiangMu();

    @Select("select  * from xinwentongzhi where shouyetupian !='delete' order by addtime DESC limit 6")
    List<XinWenTongZhi> getZhongChouXuZhi();

    @Select("select * from xinwentongzhi where shouyetupian !='delete' and  ID = #{id}")
    XinWenTongZhi getZhongChouXuZhiDetail(@Param("id") String id);

    @Select("select * from zhongchouxiangmu where issh ='是' and  ID = #{id}")
    ZhongChouXiangMu getZhongChouDetail(@Param("id") String id);

    @Select("select shouyi from zhongchouxiangmu where issh ='是' and  ID = #{id}")
    String getshouyi(@Param("id") String id);


    @Select("select u.yonghuming,u.touxiang,c.addtime,c.xinwenid,c.pinglunneirong,c.pinglunren from yonghuzhuce u LEFT JOIN pinglun c on  u.yonghuming = c. pinglunren where c.xinwenid = #{id} order by addtime DESC")
    List<Comment> getComment(@Param("id") String id);

    @Insert("insert into pinglun(xinwenID,pinglunneirong,pinglunren,addtime)values" +
            "(#{xinwenid},#{pinglunneirong},#{pinglunren},#{addtime})")
    boolean insertComment(@Param("xinwenid") String xinwenid,@Param("pinglunneirong") String pinglunneirong,@Param("pinglunren") String pinglunren,@Param("addtime") Timestamp addtime);


    @Insert("insert into touzidingdan(xiangmubianhao,biaoti,leibie,zhongchoujine,qixian,shouyi,faburen,touziren,issh,iszf,addtime)values" +
            "(#{xiangmubianhao},#{biaoti},#{leibie},#{zhongchoujine},#{qixian},#{shouyi},#{faburen},#{touziren},#{issh},#{iszf},#{addtime})")
    boolean insertInvestment(TouZiDingDan touZiDingDan);

    @Update("UPDATE zhongchouxiangmu SET shouyi = #{shouyi} WHERE ID = #{id} ")
    boolean updateJine(@Param("shouyi") String shouyi,@Param("id") String id);


}
