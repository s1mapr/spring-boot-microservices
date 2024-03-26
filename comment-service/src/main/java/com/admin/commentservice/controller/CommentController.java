package com.admin.commentservice.controller;


import com.admin.commentservice.dto.MessageDTO;
import com.admin.commentservice.dto.Sort;
import com.admin.commentservice.entity.Comment;
import com.admin.commentservice.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final ICommentService service;

    @GetMapping("/")
    public ResponseEntity<List<Comment>> comments() {
        List<Comment> comments = service.getAllComments();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }


    @GetMapping("/f")
    public ResponseEntity<List<Comment>> filterBy(@RequestParam(name = "filter", required = false) String filter) {
        filter = filter.trim().toLowerCase();
        if (filter.isEmpty()) {
            return new ResponseEntity<>(service.getAllComments(), HttpStatus.OK);
        }
        List<Comment> comments = service.getAllFilteredComments(filter);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }


    @GetMapping("/sort/id")
    public ResponseEntity<List<Comment>> sortByID() {
        return new ResponseEntity<>(service.getAllCommentsSorted(Sort.ID), HttpStatus.OK);
    }

    @GetMapping("/sort/date")
    public ResponseEntity<List<Comment>> sortByDate() {
        return new ResponseEntity<>(service.getAllCommentsSorted(Sort.DATE), HttpStatus.OK);
    }


    @DeleteMapping("/{id}/del")
    public ResponseEntity<MessageDTO> deleteComment(@PathVariable Long id) {
        service.deleteComment(id);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Comment with id " + id + " has been successfully deleted")
                .build());
    }

    @GetMapping("")
    public ResponseEntity<List<Comment>> redirect() {
        return comments();
    }
}

