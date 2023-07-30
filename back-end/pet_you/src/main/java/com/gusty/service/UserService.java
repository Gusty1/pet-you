package com.gusty.service;

import com.gusty.domain.Buy;
import com.gusty.domain.Store;
import com.gusty.domain.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserService {

    /**
     * 根據id查詢會員
     * @param id
     * @return
     */
    public User getById(Integer id);

    /**
     * 查詢全部
     * @return
     */
    public List<User> getAll();

    /**
     * 根據uid查詢訂單
     * @param uid
     * @return
     */
    public List<Buy> getBuy(Integer uid);

    /**
     * 根據訂單查詢商品資料
     * @param ids
     * @return
     */
    public List<Store> getBuyStores(String ids);
}
