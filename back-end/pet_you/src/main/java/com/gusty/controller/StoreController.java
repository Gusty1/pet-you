package com.gusty.controller;

import com.github.pagehelper.PageInfo;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.gusty.domain.Buy;
import com.gusty.domain.OrderCar;
import com.gusty.domain.Store;
import com.gusty.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/stores")
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/{type}")
    public Result getById(@PathVariable String type, @RequestParam Integer pageNum, @RequestParam String name, @RequestParam String order) {
        PageInfo<Store> pageInfo = storeService.getByType(type, pageNum, name, order);
        Integer code = pageInfo != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = pageInfo != null ? "" : "數據查詢失敗";
        return new Result(code, pageInfo, msg);

        //ASC  小-->大
        //DESC 大-->小
    }

    @GetMapping("/detail/{id}")
    public Result getDetailById(@PathVariable Integer id) {
        Store store = storeService.getDetailById(id);
        Integer code = store != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = store != null ? "" : "數據查詢失敗";
        return new Result(code, store, msg);
    }

    @PostMapping("/orderCar")
    public Result saveOrder(@RequestBody OrderCar orderCar) {
        boolean flag = storeService.saveOrderCar(orderCar);
        return new Result(flag ? Code.OPERATION_OK : Code.OPERATION_FAIL, flag);
    }

    @GetMapping("/orderCar/{id}")
    public Result getUserOrderCar(@PathVariable Integer id) {
        List<Map<String, Object>> storeOrder = storeService.getUserOrderCar(id);
        Integer code = storeOrder != null ? Code.OPERATION_OK : Code.OPERATION_FAIL;
        String msg = storeOrder != null ? "" : "數據查詢失敗";
        return new Result(code, storeOrder, msg);
    }

    @DeleteMapping("/orderCar")
    public Result delete(@RequestParam Integer id) {
        boolean flag = storeService.deleteOrderCar(id);
        return new Result(flag ? Code.OPERATION_OK : Code.OPERATION_FAIL, flag);
    }

    @PutMapping("/updateOrder")
    public Result updateOrder(@RequestBody Map<String, Object> data) {
        JsonArray newOrderAry = null;
        JsonArray deleteAry = null;
        if(data.get("newOrderAry")!=null){
            newOrderAry = new JsonParser().parse(data.get("newOrderAry").toString()).getAsJsonArray();
        }
        if(data.get("deleteAry")!=null){
            deleteAry = new JsonParser().parse(data.get("deleteAry").toString()).getAsJsonArray();
        };

        boolean flag = storeService.updateOrder(newOrderAry, deleteAry);
        return new Result(flag ? Code.OPERATION_OK : Code.OPERATION_FAIL, flag);
    }

    @PostMapping("/deal")
    public Result saveOrder(@RequestBody Buy buy) {
        boolean flag = storeService.saveOrder(buy);
        return new Result(flag ? Code.OPERATION_OK : Code.OPERATION_FAIL, flag);
    }
}
