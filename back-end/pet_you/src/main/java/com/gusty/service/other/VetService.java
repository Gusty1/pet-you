package com.gusty.service.other;

import com.gusty.domain.other.Vet;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface VetService {

    /**
     * 根據醫院名稱、醫院地址查詢醫院
     * @param name
     * @param address
     * @return
     */
    public List<Vet> getByCondition(String name,String address);


}
