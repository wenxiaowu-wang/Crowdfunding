package com.money.crowdfunding.website.mapper;

import com.money.crowdfunding.website.model.Admin;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 包:com.money.crowdfunding.website.mapper
 * 项目:website
 * 描述:
 */
@Mapper
public interface AdminMapper {

    @Select("select * from allusers where username = #{name}")
    Admin selectAdminByName(@Param("name")String name);

    @Insert("insert into addusers(username,pwd,cx,addtime)values(#{username},#{pwd},#{cx},#{addtime})")
    int insertOneAdmin(Admin admin);

    //根据id万能修
    @Update("update allusers set username = #{username},pwd = #{pwd},cx = #{cx},addtime = #{addtime} where id = #{id}")
    int updateOneAdminById(Admin admin);

    //根据管理员用户名修改密码
    @Update("update allusers set pwd = #{pwd} where username = #{username}")
    int updateOneAdminByName(@Param("username")String name,@Param("pwd")String password);

    //getAll
    @Select("select * from allusers")
    List<Admin> getAllAdminList();

}
