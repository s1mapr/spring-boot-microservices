package com.admin.contentservice.dto;

import com.admin.contentservice.entity.Category;
import com.admin.contentservice.entity.Serial;
import com.admin.contentservice.entity.Tag;
import lombok.Data;

import java.util.List;

@Data
public class AllContent {
    private List<Category> categories;
    private List<Tag> tags;
    private List<Serial> serials;
}
