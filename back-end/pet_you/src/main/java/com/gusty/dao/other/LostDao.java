package com.gusty.dao.other;

import com.gusty.domain.other.Lost;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface LostDao {


    @Select("<script>" +
            "select * from lost " +
            "<where>"+
            "<if test=\"pet_type != null and pet_type !=''\">" +
            "and pet_type = #{pet_type}" +
            "</if>"+
            "<if test=\"pet_feature != null and pet_feature !=''\">" +
            "and pet_feature LIKE '%${pet_feature}%'" +
            "</if>"+
            "<if test=\"lost_place != null and lost_place !=''\">" +
            "and lost_place LIKE '%${lost_place}%'" +
            "</if>"+
            "</where></script>")
    public List<Lost> getByCondition(@Param("pet_type") String petType,@Param("pet_feature") String petFeature,@Param("lost_place") String lostPlace);

}
