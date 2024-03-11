package com.admin.accountservice.service;


import com.admin.accountservice.dto.Sort;
import com.admin.accountservice.entity.User;

import java.util.List;

public interface IAccountService {

    List<User> getAllUsers();

    List<User> getFilteredUsers(String filter);

    List<User> getAllUsersSort(Sort sortBy);

    User getUserById(Long id);

    User createUser(User user);

    User updateUser(User title);

    boolean deleteUser(Long id);

    User deleteCommentByUser(User user, Long commentId);

    User banOrUnbanUser(User user);

    User updateUserRole(String role, User user);
}
