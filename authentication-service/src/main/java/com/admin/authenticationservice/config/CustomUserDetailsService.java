package com.admin.authenticationservice.config;

import com.admin.authenticationservice.dao.UserDAO;
import com.admin.authenticationservice.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
     private  UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> user = userDAO.getUserByEmailAndPassword(name);
        return user.map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException("user not found with name " + name));
    }
}
