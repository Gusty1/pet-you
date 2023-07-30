package com.gusty.service.other;

import com.gusty.domain.other.Lost;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface LostService {

    /**
     * 根據種類、特徵、地址查詢走失
     * @param petType
     * @param petFeature
     * @param lostPlace
     * @return
     */
    public List<Lost> getByCondition(String petType, String petFeature, String lostPlace);


}
