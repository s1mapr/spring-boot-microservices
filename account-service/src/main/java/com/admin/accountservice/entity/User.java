package com.admin.accountservice.entity;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
public class User {
    private Long ID;
    @Email
    @NotEmpty(message = "Email field can't be empty!")
    private String email;
    @NotEmpty(message = "Password can't be empty!")
    @Size(min = 6, message = "Password must contains at least 6 chars")
    private String password;
    @NotEmpty(message = "Name field can't be empty!")
    private String name;
    private String img;
    private String role = "USER";
    private List<Like> likes;
    private List<Comment> comments;
    private LocalDateTime creationDate = LocalDateTime.now();
    private String lastName;
    private String firstName;
    private boolean banned;

}
