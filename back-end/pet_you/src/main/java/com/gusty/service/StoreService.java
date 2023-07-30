package com.gusty.service;


import com.github.pagehelper.PageInfo;
import com.google.gson.JsonArray;
import com.gusty.domain.Buy;
import com.gusty.domain.OrderCar;
import com.gusty.domain.Store;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
public interface StoreService {

    /**
     * 根據type、名稱查詢商品，並排序，然後回傳頁數資訊
     * @param type
     * @param pageNum
     * @param name
     * @param order
     * @return
     */
    public PageInfo<Store> getByType(String type,Integer pageNum,String name,String order);

    /**
     * 根據ID查詢商品
     * @param id
     * @return
     */
    public Store getDetailById(Integer id);

    /**
     * 寫入購物車
     * @param orderCar
     * @return
     */
    public boolean saveOrderCar(OrderCar orderCar) ;

    /**
     * 根據id查詢購物車內容
     * @param id
     * @return
     */
    public List<Map<String,Object>> getUserOrderCar(Integer id);


    /**
     * 根據uid & sid 刪除購物車
     * @param id
     * @return
     */
    public boolean deleteOrderCar(Integer id);

    /**
     * 訂單成立前的修改購物車
     * @param newOrderAry
     * @param deleteAry
     * @return
     */
    public boolean updateOrder(JsonArray newOrderAry,JsonArray deleteAry);

    /**
     * 訂單成立(寫入資料庫) & 刪除購物車內容
     * @param buy
     * @return
     */
    public boolean saveOrder(Buy buy);

}
