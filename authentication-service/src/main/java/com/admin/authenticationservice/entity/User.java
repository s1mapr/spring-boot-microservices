package com.admin.authenticationservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long ID;
    private String name;
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String role = "ADMIN";
    private LocalDateTime creationDate = LocalDateTime.now();
    private boolean banned;
}
