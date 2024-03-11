package com.admin.commentservice.entity;

import lombok.Data;

import java.util.List;

@Data
public class Category {
    private Long ID;
    private String genre;
    private List<Title> titles;
}
