package com.gusty.domain;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Integer id;
    private String name;
    private String nickName;
    private String phone;
    private String sex;
    private Date birth;
}
