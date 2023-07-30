package com.gusty.service.impl.other;

import com.gusty.dao.other.LostDao;
import com.gusty.domain.other.Lost;
import com.gusty.service.other.LostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LostServiceImpl implements LostService {

    @Autowired
    private LostDao lostDao;

    @Override
    public List<Lost> getByCondition(String petType, String petFeature, String lostPlace) {
        return lostDao.getByCondition(petType,petFeature,lostPlace);
    }
}
