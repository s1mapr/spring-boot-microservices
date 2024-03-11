package com.admin.commentservice.service;


import com.admin.commentservice.dto.Sort;
import com.admin.commentservice.entity.Comment;

import java.util.List;

public interface ICommentService {

    List<Comment> getAllComments();

    List<Comment> getAllCommentsSorted(Sort sort);

    List<Comment> getAllFilteredComments(String filter);

    void deleteComment(Long id);
}
