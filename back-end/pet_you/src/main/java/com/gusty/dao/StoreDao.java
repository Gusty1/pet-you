package com.gusty.dao;

import com.gusty.domain.Buy;
import com.gusty.domain.OrderCar;
import com.gusty.domain.Store;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

public interface StoreDao {
    @Select("<script>" +
            "select id,type,name,price,small_pic from store " +
            "<where>" +
            "<if test=\"type != null and type !=''\">" +
            "and type = #{type}" +
            "</if>" +
            "<if test=\"name != null and name !=''\">" +
            "and name LIKE '%${name}%'" +
            "</if>" +
            "</where>" +
            "<if test=\"order != null and order !=''\">" +
            "order by price ${order}" +
            "</if>" +
            "</script>")
    public List<Store> getByCondition(@Param("type") String type, @Param("name") String name, @Param("order") String order);

    @Select("<script>" +
            "select id,name,price,big_pic,description from store " +
            "<where>" +
            "<if test=\"id != null and id !=''\">" +
            "and id = #{id}" +
            "</if>" +
            "</where></script>")
    public Store getDetailById(Integer id);

    @Select("select id from order_car where uid =#{uid} and sid =#{sid}")
    public Map<String,Object> selectOrderCarId(OrderCar OrderCar);
    @Insert("INSERT INTO order_car(id,uid,sid,count) " +
            "values (#{id}, #{uid},#{sid},#{count} ) " +
            "on duplicate key update count =#{count}")
    public void saveOrderCar(OrderCar OrderCar);

    @Select("SELECT store.id as sid, store.name, store.price, store.small_pic, store.price*order_car.count as sum, order_car.count, order_car.id as oid " +
            "FROM store INNER JOIN order_car ON order_car.sid = store.id " +
            "Where order_car.uid= #{id}")
    public List<Map<String, Object>> getUserOrderCar(Integer id);

    @Delete("delete from order_car where order_car.id=#{id}")
    public boolean deleteOrderCar(@Param("id") Integer id);

    @Update("UPDATE order_car SET count=#{count} where id = #{id}")
    public boolean updateOrder(@Param("id") Integer id,@Param("count")Integer count);

    @Insert("INSERT INTO buy (uid,stores,total,date,pay,transport) " +
            "values(#{uid},#{stores},#{total},#{date},#{pay},#{transport})")
    public void saveOrder(Buy buy);
    @Delete("delete from order_car where uid = #{id}")
    public void deleteOrderCarByUser(Integer id);
}
