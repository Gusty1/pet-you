package com.gusty.service.impl;

import com.gusty.dao.UserDao;
import com.gusty.domain.Buy;
import com.gusty.domain.Store;
import com.gusty.domain.User;
import com.gusty.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User getById(Integer id) {
        return userDao.getById(id);
    }

    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }

    @Override
    public List<Buy> getBuy(Integer uid) {
        return userDao.getBuy(uid);
    }

    @Override
    public List<Store> getBuyStores(String ids) {
        return userDao.getBuyStores(ids);
    }
}
