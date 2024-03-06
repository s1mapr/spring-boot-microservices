package com.admin.titleservice.entity;

import lombok.Data;

@Data
public class Like {
    private TitleContent titleContent;
    private Long titleContentID;
    private User user;
    private Long userID;
}
