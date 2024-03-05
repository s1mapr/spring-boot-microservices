package com.admin.contentservice.dao;

import com.admin.contentservice.entity.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

public class Mappers {

    public static final class CategoryMapper implements RowMapper<Category> {

        private JdbcTemplate jdbcTemplate;

        public CategoryMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public Category mapRow(ResultSet rs, int rowNum) throws SQLException {
            Category o = new Category();
            o.setGenre(rs.getString("genre"));
            o.setID(rs.getLong("id"));

            return o;
        }
    }

    public static final class TagMapper implements RowMapper<Tag> {
        private JdbcTemplate jdbcTemplate;

        public TagMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public Tag mapRow(ResultSet rs, int rowNum) throws SQLException {
            Tag o = new Tag();
            o.setTagName(rs.getString("tag_name"));
            o.setID(rs.getLong("id"));

            return o;
        }
    }

    public static final class SerialMapper implements RowMapper<Serial> {
        private JdbcTemplate jdbcTemplate;

        public SerialMapper(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public Serial mapRow(ResultSet rs, int rowNum) throws SQLException {
            Serial o = new Serial();
            o.setSerialName(rs.getString("serial_name"));
            o.setID(rs.getLong("id"));

            return o;
        }
    }


}