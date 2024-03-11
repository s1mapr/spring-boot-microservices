package com.admin.accountservice.controller;

import com.admin.accountservice.dto.MessageDTO;
import com.admin.accountservice.dto.Sort;
import com.admin.accountservice.dto.UserDTO;
import com.admin.accountservice.entity.Title;
import com.admin.accountservice.entity.User;
import com.admin.accountservice.service.IAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AccountController {

    private final IAccountService userService;
    private final WebClient.Builder webClientBuilder;
//  private ITitleService service;

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUsersRedirect() {
        return getAllUsers();
    }


    @GetMapping("/f")
    public ResponseEntity<List<User>> filterUsers(@RequestParam(name = "filter", required = false) String filter) {
        filter = filter.trim().toLowerCase();
        if (filter.isEmpty()) {
            return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
        }
        List<User> users = userService.getFilteredUsers(filter);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/sort/id")
    public ResponseEntity<List<User>> sortByID() {
        return new ResponseEntity<>(userService.getAllUsersSort(Sort.ID), HttpStatus.OK);
    }

    @GetMapping("/sort/date")
    public ResponseEntity<List<User>> sortByDate() {
        return new ResponseEntity<>(userService.getAllUsersSort(Sort.DATE), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        List<Title> titles = Arrays.stream(webClientBuilder.build().get()
                .uri("http://title-service/api/titles/user-titles/" + id)
                .retrieve().bodyToMono(Title[].class).block()).toList();
        UserDTO userDTO = new UserDTO();
        userDTO.setUser(user);
        userDTO.setTitles(titles);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PatchMapping("/{id}/ban")
    public ResponseEntity<MessageDTO> banOrUnban(@PathVariable Long id) {
        User user = userService.getUserById(id);
        userService.banOrUnbanUser(user);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Status of User with id " + id + " has been successfully changed")
                .build());
    }

    @PatchMapping("/{id}/make-author")
    public ResponseEntity<MessageDTO> giveAuthorRole(@PathVariable Long id) {
        User user = userService.getUserById(id);
        userService.updateUserRole("AUTHOR", user);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Role of User with id " + id + " has been successfully changed to AUTHOR")
                .build());
    }

    @PatchMapping("/{id}/cancel-author")
    public ResponseEntity<MessageDTO> cancelAuthorRole(@PathVariable Long id) {
        User user = userService.getUserById(id);
        userService.updateUserRole("USER", user);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Role of User with id " + id + " has been successfully changed to USER")
                .build());
    }

    @DeleteMapping("/{id}/comment/{commentId}")
    public ResponseEntity<MessageDTO> deleteCommentByUser(@PathVariable Long commentId, @PathVariable Long id) {
        User user = userService.getUserById(id);
        userService.deleteCommentByUser(user, commentId);
        return ResponseEntity.ok(MessageDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Comment with id " + id + " has been successfully deleted")
                .build());
    }
}
