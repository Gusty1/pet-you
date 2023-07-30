package com.gusty.service.other;

import com.gusty.domain.other.Shop;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ShopService {

    /**
     * 根據地址、服務寵物查詢寵物店
     * @param name
     * @param address
     * @return
     */
    public List<Shop> getByCondition(String name,String address);


}
