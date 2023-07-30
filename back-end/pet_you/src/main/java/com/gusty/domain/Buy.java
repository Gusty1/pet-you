package com.gusty.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Buy {
    private Integer id;
    private Integer uid;
    private String stores;
    private Integer total;
    private String pay;
    private String transport;
    private Date date;
}
