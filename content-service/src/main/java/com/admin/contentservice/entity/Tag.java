package com.admin.contentservice.entity;

import lombok.Data;

import java.util.List;

@Data
public class Tag {
    private Long ID;
    private String tagName;
    private List<Title> titles;
}