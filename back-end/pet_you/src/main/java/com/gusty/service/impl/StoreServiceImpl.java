package com.gusty.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.JsonArray;
import com.gusty.dao.StoreDao;
import com.gusty.domain.Buy;
import com.gusty.domain.OrderCar;
import com.gusty.domain.Store;
import com.gusty.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreDao storeDao;

    final Integer pageSize = 6;

    @Override
    public PageInfo<Store> getByType(String type, Integer pageNum, String name, String order) {
        PageHelper.startPage(pageNum, pageSize);
        List<Store> storeList = storeDao.getByCondition(type, name, order);
        PageInfo<Store> pageInfo = new PageInfo<>(storeList);
        return pageInfo;
    }

    @Override
    public Store getDetailById(Integer id) {
        return storeDao.getDetailById(id);
    }


    @Override
    public boolean saveOrderCar(OrderCar orderCar) {
        System.out.println(orderCar);
        System.out.println("=====================");
        if (storeDao.selectOrderCarId(orderCar) != null) {
            orderCar.setId(Integer.valueOf(storeDao.selectOrderCarId(orderCar).get("id").toString()));
        }
        System.out.println(orderCar);
        storeDao.saveOrderCar(orderCar);
        return true;
    }

    @Override
    public List<Map<String, Object>> getUserOrderCar(Integer id) {
        return storeDao.getUserOrderCar(id);
    }

    @Override
    public boolean deleteOrderCar(Integer id) {
        storeDao.deleteOrderCar(id);
        return true;
    }

    @Override
    public boolean updateOrder(JsonArray newOrderAry, JsonArray deleteAry) {

        if (deleteAry != null && deleteAry.size() > 0) {
            for (int i = 0; i < deleteAry.size(); i++) {
                deleteAry.toString();
                storeDao.deleteOrderCar(deleteAry.get(i).getAsInt());
            }
        }
        if (newOrderAry != null && newOrderAry.size() > 0) {
            for (int i = 0; i < newOrderAry.size(); i++) {
                storeDao.updateOrder(newOrderAry.get(i).getAsJsonObject().get("oid").getAsInt(),
                        newOrderAry.get(i).getAsJsonObject().get("count").getAsInt());
            }
        }
        return false;
    }

    @Override
    public boolean saveOrder(Buy buy) {
        storeDao.saveOrder(buy);
        storeDao.deleteOrderCarByUser(buy.getUid());
        return true;
    }
}
