package com.admin.authenticationservice.service;

import com.admin.authenticationservice.dao.UserDAO;
import com.admin.authenticationservice.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDAO.saveUser(user);
    }

    public String generateToken(String name){
        return jwtService.generateToken(name);
    }

    public void validateToken(String token){
        jwtService.validateToken(token);
    }



}
