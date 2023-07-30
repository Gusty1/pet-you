package com.gusty.domain;

import lombok.Data;

@Data
public class Store {
    private Integer id;
    private String type;
    private String name;
    private Integer price;
    private String description;
    private String smallPic;
    private String bigPic;
}
