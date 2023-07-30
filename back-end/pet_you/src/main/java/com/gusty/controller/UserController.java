package com.gusty.controller;

import com.gusty.domain.Buy;
import com.gusty.domain.Store;
import com.gusty.domain.User;
import com.gusty.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id) {
        User user = userService.getById(id);
        Integer code = user != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = user != null ? "" : "數據查詢失敗";
        return new Result(code, user, msg);
    }

    @GetMapping
    public Result getAll() {
        List<User> userList = userService.getAll();
        Integer code = userList != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = userList != null ? "" : "數據查詢失敗";
        return new Result(code, userList, msg);
    }

    @GetMapping("/buy/{uid}")
    public Result getBuy(@PathVariable Integer uid) {
        List<Buy> buyData = userService.getBuy(uid);
        Integer code = buyData != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = buyData != null ? "" : "數據查詢失敗";
        return new Result(code, buyData, msg);
    }

    @GetMapping("/buy/stores")
    public Result getBuyStores(@RequestParam String ids) {
        List<Store> buyStoresData = userService.getBuyStores(ids);
        Integer code = buyStoresData != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = buyStoresData != null ? "" : "數據查詢失敗";
        return new Result(code, buyStoresData, msg);
    }
}
