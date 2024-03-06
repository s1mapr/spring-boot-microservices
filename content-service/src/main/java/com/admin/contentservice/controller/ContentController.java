package com.admin.contentservice.controller;

import com.admin.contentservice.dto.AllContent;
import com.admin.contentservice.dto.MessageDTO;
import com.admin.contentservice.entity.Category;
import com.admin.contentservice.entity.Serial;
import com.admin.contentservice.entity.Tag;
import com.admin.contentservice.service.IContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/contents", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ContentController {

    private final IContentService service;

    @GetMapping
    public ResponseEntity<AllContent> getContents() {
        AllContent content = service.getAllContent();
        return new ResponseEntity<>(content, HttpStatus.OK);
    }

    @PostMapping("/create-t")
    public ResponseEntity<MessageDTO> addTag(@RequestBody Tag tagInfo) {
        service.addTag(tagInfo);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Created tag with tag name " + tagInfo.getTagName())
                .build());
    }

    @PostMapping("/create-s")
    public ResponseEntity<MessageDTO> addSerial(@RequestBody Serial serialInfo) {
        service.addSerial(serialInfo);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Created serial with serial name " + serialInfo.getSerialName())
                .build());
    }

    @PostMapping("/create-c")
    public ResponseEntity<MessageDTO> addCategory(@RequestBody Category categoryInfo) {
        service.addCategory(categoryInfo);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Created category with genre name " + categoryInfo.getGenre())
                .build());
    }

    @DeleteMapping("/t/{id}")
    public ResponseEntity<MessageDTO> deleteTag(@PathVariable Long id) {
        service.deleteTag(id);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Deleted tag with id " + id)
                .build());
    }

    @DeleteMapping("/c/{id}")
    public ResponseEntity<MessageDTO> deleteCategory(@PathVariable Long id) {
       service.deleteCategory(id);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Deleted category with id " + id)
                .build());
    }

    @DeleteMapping("/s/{id}")
    public ResponseEntity<MessageDTO> deleteSerial(@PathVariable Long id) {
        service.deleteSerial(id);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Deleted serial with id " + id)
                .build());
    }
}
