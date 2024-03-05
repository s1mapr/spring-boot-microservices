package com.admin.contentservice.service;

import com.admin.contentservice.entity.AllContent;
import com.admin.contentservice.entity.Category;
import com.admin.contentservice.entity.Serial;
import com.admin.contentservice.entity.Tag;

public interface IContentService {
    AllContent getAllContent();

    Tag updateTag(Tag o);

    Category updateCategory(Category o);

    Serial updateSerial(Serial o);

    Tag addTag(Tag o);

    Category addCategory(Category o);

    Serial addSerial(Serial o);

    boolean deleteSerial(Long id);

    boolean deleteCategory(Long id);

    boolean deleteTag(Long id);

}
