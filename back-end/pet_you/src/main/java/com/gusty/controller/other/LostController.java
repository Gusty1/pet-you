package com.gusty.controller.other;

import com.gusty.controller.Result;
import com.gusty.domain.other.Lost;
import com.gusty.service.other.LostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gusty.utils.PackageResult.selectResult;


@RestController
@RequestMapping(value = "/losts")
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class LostController {

    @Autowired
    private LostService lostService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Result getByCondition(@RequestParam String petType, @RequestParam String petFeature, @RequestParam String lostPlace) {
        List<Lost> lostList = lostService.getByCondition(petType, petFeature, lostPlace);
        return selectResult(lostList);
    }

}
