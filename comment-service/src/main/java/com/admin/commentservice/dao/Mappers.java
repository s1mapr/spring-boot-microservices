package com.admin.commentservice.dao;

import com.admin.commentservice.entity.Comment;
import com.admin.commentservice.entity.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Objects;

public class Mappers {

    public static final class CommentMapper implements RowMapper<Comment> {
        private JdbcTemplate jdbcTemplate;

        public CommentMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Comment o = new Comment();
            o.setID(rs.getLong("id"));
            o.setCommentVal(rs.getString("comment_val"));
            o.setUserID(rs.getLong("user_id"));
            o.setTitleContentID(rs.getLong("title_content_id"));

            Timestamp timestamp = rs.getTimestamp("creation_date");
            if (Objects.nonNull(timestamp)) {
                o.setCreationDate(timestamp.toLocalDateTime());
            }

            String sql = "SELECT c.* FROM users c WHERE c.id = ?";
            User user = jdbcTemplate.queryForObject(sql, new Object[]{o.getUserID()}, new Mappers.CommentUserMapper(jdbcTemplate));
            o.setUser(user);

            return o;
        }
    }

    public static final class CommentUserMapper implements RowMapper<User> {
        private JdbcTemplate jdbcTemplate;

        public CommentUserMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setID(rs.getLong("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            user.setImg(rs.getString("img"));
            user.setRole(rs.getString("role"));
            user.setLastName(rs.getString("last_name"));
            user.setFirstName(rs.getString("first_name"));
            user.setBanned(rs.getBoolean("banned"));
            return user;
        }
    }


}
