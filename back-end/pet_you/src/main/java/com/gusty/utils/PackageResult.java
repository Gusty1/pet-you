package com.gusty.utils;

import com.gusty.controller.Code;
import com.gusty.controller.Msg;
import com.gusty.controller.Result;

public class PackageResult {

    public static Result selectResult(Object data) {
        if (data == null) return new Result(Code.OPERATION_FAIL, null, Msg.OPERATION_FAIL);
        else return new Result(Code.OPERATION_OK, data, Msg.OPERATION_OK);
    }

    public static Result urdResult(Object data) {
        return null;
    }
}
