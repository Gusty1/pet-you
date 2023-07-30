package com.gusty.config;

import com.github.pagehelper.PageInterceptor;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.Configuration;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.util.Properties;

public class MyBatisConfig {

    @Bean
    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();

        Configuration configuration = new Configuration();
        configuration.setMapUnderscoreToCamelCase(true);

        factoryBean.setConfiguration(configuration);
        factoryBean.setDataSource(dataSource);
        factoryBean.setTypeAliasesPackage("com.gusty.domain");

        factoryBean.setPlugins(new Interceptor[]{getPageInterceptor()});

        return factoryBean;
    }

    public PageInterceptor getPageInterceptor(){
        PageInterceptor pageInterceptor = new PageInterceptor();
        Properties properties = new Properties();
//        properties.setProperty("value","true");
//        properties.setProperty("offsetAsPageNum", "true");
//        properties.setProperty("rowBoundsWithCount", "true");
//        properties.setProperty("reasonable", "true");
        pageInterceptor.setProperties(properties);
        return pageInterceptor;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer msc= new MapperScannerConfigurer();
        msc.setBasePackage("com.gusty.dao");
        return msc;
    }
}
