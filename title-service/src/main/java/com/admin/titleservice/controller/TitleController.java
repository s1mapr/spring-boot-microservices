package com.admin.titleservice.controller;

import com.admin.titleservice.dto.MessageDTO;
import com.admin.titleservice.entity.Sort;
import com.admin.titleservice.entity.Title;
import com.admin.titleservice.service.ITitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/api/titles")
@RequiredArgsConstructor
public class TitleController {


    private final ITitleService service;

    @GetMapping("/{id}")
    public ResponseEntity<Title> getTitle(@PathVariable Long id) {
        Title title = service.getTitleById(id);
        return new ResponseEntity<>(title, HttpStatus.OK);
    }

    @PostMapping("/{id}/release")
    public ResponseEntity<MessageDTO> releaseOrBan(@PathVariable Long id) {
        Title title = service.getTitleById(id);
        service.releaseOrBanTitleById(title);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Title release status has been successfully changed")
                .build());
    }

    @DeleteMapping("/{titleId}/comment/{commentId}")
    public ResponseEntity<MessageDTO> deleteComment(@PathVariable Long titleId, @PathVariable Long commentId) {
        Title title = service.getTitleById(titleId);
        service.deleteCommentForTitle(title, commentId);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Comment with id " + commentId + " has been successfully deleted")
                .build());
    }

    @GetMapping("/released")
    public ResponseEntity<List<Title>> titles() {
        List<Title> titles = service.getAllTitlesReleased();
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Title>> releasedTitles() {
        return titles();
    }


    @GetMapping("/not-released")
    public ResponseEntity<List<Title>> titlesUnReleased() {
        List<Title> titles = service.getAllTitlesUnReleased();
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }

    @GetMapping("/f")
    public ResponseEntity<List<Title>> filterTitles(@RequestParam(name = "filter", required = false) String filter) {
        filter = filter.trim().toLowerCase();
        if (filter.isEmpty()) {
            return new ResponseEntity<>(service.getAllTitles(), HttpStatus.OK);
        }
        List<Title> titles = service.getAllFilteredTitles(filter);
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }

    @GetMapping("/sort/id")
    public ResponseEntity<List<Title>> sortByID() {
        return new ResponseEntity<>(service.getAllTitlesSort(Sort.ID), HttpStatus.OK);
    }

    @GetMapping("/sort/date")
    public ResponseEntity<List<Title>> sortByDate() {
        return new ResponseEntity<>(service.getAllTitlesSort(Sort.DATE), HttpStatus.OK);
    }

    @GetMapping("/user-titles/{id}")
    public ResponseEntity<List<Title>> getAllUserTitles(@PathVariable Long id){
        List<Title> titles = service.getAllUserTitles(id);
        return new ResponseEntity<>(titles, HttpStatus.OK);
    }

}
