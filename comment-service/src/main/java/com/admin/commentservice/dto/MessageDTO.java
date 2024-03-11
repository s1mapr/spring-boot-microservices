package com.admin.commentservice.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MessageDTO {
    private Integer status;
    private final String time = LocalDateTime.now().toString();
    private String message;
    private String url;
}
