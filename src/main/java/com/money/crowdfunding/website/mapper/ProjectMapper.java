package com.money.crowdfunding.website.mapper;



import com.money.crowdfunding.website.model.*;
import org.apache.ibatis.annotations.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("select  * from zhongchouxiangmu where issh = '已通过' || issh = '已截止' || issh = '已完成' order by addtime DESC limit 6")
    List<ZhongChouXiangMu> getZhongChouXiangMu();

    @Select("select  * from zhongchouxiangmu where issh != '已删除' and faburen = #{faburen}  order by addtime DESC limit 6")
    List<ZhongChouXiangMu> getMyZhongChouXiangMu(@Param("faburen") String faburen);

    @Select("select  * from touzidingdan where issh = '已通过' and faburen = #{faburen}  order by addtime DESC limit 6")
    List<TouZiDingDan> getTouziMyXiangMu(@Param("faburen") String faburen);


    @Select("select  * from touzidingdan where  touziren = #{touziren}  order by addtime DESC limit 6")
    List<TouZiDingDan> getMyTouziXiangMu(@Param("touziren") String touziren);

    @Select("select  * from xinwentongzhi where shouyetupian !='delete' order by addtime DESC limit 6")
    List<XinWenTongZhi> getZhongChouXuZhi();

    @Select("select * from xinwentongzhi where shouyetupian !='delete' and  ID = #{id}")
    XinWenTongZhi getZhongChouXuZhiDetail(@Param("id") String id);

    @Select("select * from zhongchouxiangmu where  xiangmubianhao = #{xiangmubianhao}")
    ZhongChouXiangMu getZhongChouDetail(@Param("xiangmubianhao") String xiangmubianhao);

    @Select("select shouyi from zhongchouxiangmu where issh ='已通过' and  xiangmubianhao = #{id}")
    String getshouyi(@Param("id") String id);

    @Select("select zhongchoujine from zhongchouxiangmu where issh ='已通过' and  xiangmubianhao = #{id}")
    String getZhongChouJine(@Param("id") String id);


    @Select("select u.yonghuming,u.touxiang,c.addtime,c.xinwenid,c.pinglunneirong,c.pinglunren from yonghuzhuce u LEFT JOIN pinglun c on  u.yonghuming = c. pinglunren where c.xinwenid = #{id} order by addtime DESC")
    List<Comment> getComment(@Param("id") String id);

    @Insert("insert into pinglun(xinwenID,pinglunneirong,pinglunren,addtime)values" +
            "(#{xinwenid},#{pinglunneirong},#{pinglunren},#{addtime})")
    boolean insertComment(@Param("xinwenid") String xinwenid,@Param("pinglunneirong") String pinglunneirong,@Param("pinglunren") String pinglunren,@Param("addtime") Timestamp addtime);


    @Insert("insert into touzidingdan(xiangmubianhao,biaoti,leibie,zhongchoujine,qixian,shouyi,faburen,touziren,issh,iszf,addtime)values" +
            "(#{xiangmubianhao},#{biaoti},#{leibie},#{zhongchoujine},#{qixian},#{shouyi},#{faburen},#{touziren},#{issh},#{iszf},#{addtime})")
    boolean insertInvestment(TouZiDingDan touZiDingDan);

    @Update("UPDATE zhongchouxiangmu SET shouyi = #{shouyi} WHERE xiangmubianhao = #{id} ")
    boolean updateJine(@Param("shouyi") String shouyi,@Param("id") String id);


    @Insert("insert into zhongchouxiangmu(xiangmubianhao,biaoti,leibie,zhongchoujine,qixian,shouyi,xiangqing,faburen,issh,addtime)values" +
            "(#{xiangmubianhao},#{biaoti},#{leibie},#{zhongchoujine},#{qixian},#{shouyi},#{xiangqing},#{faburen},#{issh},#{addtime})")
    boolean publishProject(ZhongChouXiangMu zhongChouXiangMu);


    @Update("UPDATE xinwentongzhi SET dianjilv = dianjilv+1 WHERE ID = #{id} ")
    boolean updateDJL(@Param("id") String id);

    @Update("UPDATE zhongchouxiangmu SET issh = '已完成' WHERE xiangmubianhao = #{id} ")
    boolean updateJIN(@Param("id") String id);

    @Update("UPDATE zhongchouxiangmu SET issh = '已截止' WHERE xiangmubianhao = #{id} ")
    boolean updateJieZhi(@Param("id") String id);

    @Select("select qixian from zhongchouxiangmu where xiangmubianhao = #{id}")
    int getQixian(@Param("id") String id);

    @Select("select addtime from zhongchouxiangmu where xiangmubianhao = #{id}")
    Date getAddTime(@Param("id") String id);

}
