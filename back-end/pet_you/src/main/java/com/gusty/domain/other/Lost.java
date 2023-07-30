package com.gusty.domain.other;

import lombok.Data;
import org.apache.ibatis.annotations.Result;

import java.util.Date;

@Data
public class Lost {
    private String petName;
    private String petType;
    private String petSex;
    private String petFeature;
    private Date lostDate;
    private String lostPlace;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    private String petPicture;
}
