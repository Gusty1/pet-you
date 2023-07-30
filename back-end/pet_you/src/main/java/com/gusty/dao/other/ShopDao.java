package com.gusty.dao.other;

import com.gusty.domain.other.Shop;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ShopDao {


    @Select("<script>" +
            "select * from shop " +
            "<where>"+
            "<if test=\"name != null and name !=''\">" +
            "and name LIKE '%${name}%'" +
            "</if>"+
            "<if test=\"address != null and address !=''\">" +
            "and address LIKE '%${address}%'" +
            "</if>"+
            "</where></script>")
    public List<Shop> getByCondition(@Param("name") String name, @Param("address") String address);

}
