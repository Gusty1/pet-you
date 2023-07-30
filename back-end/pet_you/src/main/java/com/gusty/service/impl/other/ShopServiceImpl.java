package com.gusty.service.impl.other;

import com.gusty.dao.other.ShopDao;
import com.gusty.domain.other.Shop;
import com.gusty.service.other.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopDao shopDao;

    @Override
    public List<Shop> getByCondition(String name, String address) {
        return shopDao.getByCondition(name, address);
    }
}
