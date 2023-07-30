package com.gusty.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;


@RestControllerAdvice
public class ProjectExceptionAdvice {


    //攔截全部的異常
    @ExceptionHandler(Exception.class)
    public Result doException(Exception ex) {
        ex.printStackTrace();
        return new Result(Code.SYSTEM_ERR_500, null, Msg.SYSTEM_ERR_500);
    }

    //攔截404異常
    @ExceptionHandler(NoHandlerFoundException.class)
    public Result notFoundException(Exception ex) {
        ex.printStackTrace();
        return new Result(Code.SYSTEM_ERR_404, null, Msg.SYSTEM_ERR_404);
    }

}
