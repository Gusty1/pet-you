package com.gusty.controller.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class ProjectInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //1.controller前
        System.out.println("preHandle");
        System.out.println("====================================");
        //可以獲得該方法，理論上就可以操作該方法
//        HandlerMethod hm = (HandlerMethod) handler;
//        System.out.println(hm.getMethod().getName());

        //return false postHandle就不會做了，但afterCompletion會做
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        //2.controller後
        System.out.println("postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        //3.postHandle後
        System.out.println("afterCompletion");

    }
}
