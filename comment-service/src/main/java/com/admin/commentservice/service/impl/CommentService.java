package com.admin.commentservice.service.impl;

import com.admin.commentservice.dao.CommentDAO;
import com.admin.commentservice.dto.Sort;
import com.admin.commentservice.entity.Comment;
import com.admin.commentservice.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentDAO commentDAO;

    @Override
    @Transactional
    public void deleteComment(Long id) {
        commentDAO.deleteComment(id);
    }

    @Override
    public List<Comment> getAllComments() {
        return commentDAO.getAllComments();
    }

    @Override
    public List<Comment> getAllCommentsSorted(Sort sort) {
        if (sort == Sort.ID) return commentDAO.findAllByID();
        else if (sort == Sort.DATE) return commentDAO.findAllByDate();
        else return commentDAO.getAllComments();
    }

    @Override
    public List<Comment> getAllFilteredComments(String filter) {
        return commentDAO.getAllFilteredComments(filter);
    }

}

