package com.gusty.controller.other;

import com.gusty.controller.Result;
import com.gusty.domain.other.Shop;
import com.gusty.service.other.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gusty.utils.PackageResult.selectResult;


@RestController
@RequestMapping(value = "/shops")
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public Result getByCondition(@RequestParam String name ,@RequestParam String address) {
        List<Shop> shopList = shopService.getByCondition(name,address);
        return selectResult(shopList);
    }

}
