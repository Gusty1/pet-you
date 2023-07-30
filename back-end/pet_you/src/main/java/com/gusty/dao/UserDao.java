package com.gusty.dao;

import com.gusty.domain.Buy;
import com.gusty.domain.Store;
import com.gusty.domain.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserDao {

//    <if test="empName != null" >
//    emp_name = #{empName,jdbcType=VARCHAR},
//      </if>

    @Select("select * from user where id = #{id}")
    public  User getById(Integer id);

    @Select("select * from user")
    public List<User> getAll();

    @Select("select uid,stores,total,date,pay,transport from buy where uid = #{uid}")
    public List<Buy> getBuy(Integer uid);

    @Select("select id,name,price,small_pic from store where id in(${ids})")
    public List<Store> getBuyStores(String ids);
}
