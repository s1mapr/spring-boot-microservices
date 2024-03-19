package com.admin.authenticationservice.dao;

import com.admin.authenticationservice.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Mappers {
    public static final class UserAuthMapper implements RowMapper<User> {
        private JdbcTemplate jdbcTemplate;

        public UserAuthMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setID(rs.getLong("id"));
            user.setName(rs.getString("name"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            user.setBanned(rs.getBoolean("banned"));
            return user;
        }
    }

}
