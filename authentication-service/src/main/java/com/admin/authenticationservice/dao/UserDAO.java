package com.admin.authenticationservice.dao;

import com.admin.authenticationservice.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;


    public void saveUser(User user) {
        String sql = "INSERT INTO users (name, password, role) VALUES (?,?,?)";
        jdbcTemplate.update(sql, user.getName(), user.getPassword(), user.getRole());
    }

    public Optional<User> getUserByEmailAndPassword(String name) {
        String sql = "SELECT * FROM users WHERE name=? LIMIT 1";
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, new Object[]{name}, new Mappers.UserAuthMapper(jdbcTemplate)));
    }

}
