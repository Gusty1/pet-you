package com.gusty.service;

import com.gusty.config.SpringMvcConfig;
import com.gusty.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

@WebAppConfiguration//影片是用junit4，他沒有加這個，但我用junit5加這個才可以用
@SpringJUnitConfig(classes = SpringMvcConfig.class)
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void goGoGo(){
        System.out.println("ZZZZ");
    }

    @Test
    public void testGetById(){
        User user = userService.getById(1);
        System.out.println(user);
    }

    @Test
    public void testGetAll(){
        List<User> all = userService.getAll();
        System.out.println(all);
    }
}
