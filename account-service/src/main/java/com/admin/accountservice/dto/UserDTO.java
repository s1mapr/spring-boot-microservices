package com.admin.accountservice.dto;

import com.admin.accountservice.entity.Title;
import com.admin.accountservice.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private User user;
    private List<Title> titles;
}
