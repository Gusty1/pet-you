package com.gusty.service.impl.other;

import com.gusty.dao.other.VetDao;
import com.gusty.domain.other.Vet;
import com.gusty.service.other.VetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VetServiceImpl implements VetService {

    @Autowired
    private VetDao vetDao;

    @Override
    public List<Vet> getByCondition(String name,String address) {
        return vetDao.getByCondition(name,address);
    }
}
