package com.gusty.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.gusty.controller.interceptor.ProjectInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.*;

import java.util.List;


@Configuration
@EnableWebMvc
@ComponentScan({"com.gusty.controller", "com.gusty.service"})
@PropertySource("classpath:jdbc.properties")
@Import({JdbcConfig.class, MyBatisConfig.class})
@EnableTransactionManagement
public class SpringMvcConfig implements WebMvcConfigurer {

    @Autowired
    private ProjectInterceptor projectInterceptor;

    //攔截器設定
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //自訂攔截器，然後自訂攔截路徑
//        registry.addInterceptor(projectInterceptor).addPathPatterns("/**");
    }

    //設定網頁路徑不要給spring管理
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/pages/**").addResourceLocations("/pages/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
        registry.addResourceHandler("/plugins/**").addResourceLocations("/plugins/");
        registry.addResourceHandler("/images/**").addResourceLocations("/images/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                //允許跨域攜帶cookie資訊，預設跨網域請求是不攜帶cookie資訊的。
                .allowCredentials(true)
                //允許使用那些請求方式
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")
                .maxAge(3600);
//        WebMvcConfigurer.super.addCorsMappings(registry);
    }

    //spring預設是jackson json，這邊改用gson
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(createGsonHttpMessageConvert());
//        WebMvcConfigurer.super.configureMessageConverters(converters);
    }

    private GsonHttpMessageConverter createGsonHttpMessageConvert() {
        Gson gson = new GsonBuilder().setDateFormat("yyyy/MM/dd HH:mm:ss").create();
        GsonHttpMessageConverter gsonConverter = new GsonHttpMessageConverter();
        gsonConverter.setGson(gson);
        return gsonConverter;
    }

}
