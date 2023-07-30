package com.gusty.controller.other;

import com.gusty.controller.Result;
import com.gusty.domain.other.Vet;
import com.gusty.service.other.VetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gusty.utils.PackageResult.selectResult;


@RestController
@RequestMapping(value = "/vets")
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class VetController {

    @Autowired
    private VetService vetService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public Result getByCondition(@RequestParam String name,@RequestParam String address) {
        List<Vet> vetList = vetService.getByCondition(name,address);
        return selectResult(vetList);
    }

}
