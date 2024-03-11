package com.admin.commentservice.entity;

import lombok.Data;

import java.util.List;

@Data
public class Serial {
    private Long ID;
    private String serialName;
    private List<Title> titles;
}
