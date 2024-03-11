package com.admin.accountservice.service.impl;

import com.admin.accountservice.dao.AccountDAO;
import com.admin.accountservice.dto.Sort;
import com.admin.accountservice.entity.User;
import com.admin.accountservice.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private AccountDAO accountDAO;

    @Override
    public List<User> getAllUsers() {
        return accountDAO.getAllUsers();
    }

    @Override
    public List<User> getFilteredUsers(String filter) {
        return accountDAO.getFilteredUsers(filter);
    }

    @Override
    public List<User> getAllUsersSort(Sort sortBy) {
        if (sortBy == Sort.ID) return accountDAO.findAllByID();
        else if (sortBy == Sort.DATE) return accountDAO.findAllByDate();
        else return accountDAO.getAllUsers();
    }

    @Override
    public User getUserById(Long id) {
        return accountDAO.getUserById(id);
    }

    @Override
    public User createUser(User user) {
        user.setRole("ADMIN");
        user.setCreationDate(LocalDateTime.now());
        //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        accountDAO.addUserAdmin(user);
        return user;
    }

    @Override
    public User updateUserRole(String role, User user) {
        accountDAO.giveRoleForUser(role, user);
        return user;
    }

    @Override
    public User updateUser(User user) {
        accountDAO.updateUser(user);
        return user;
    }

    @Override
    public boolean deleteUser(Long id) {
        accountDAO.deleteUser(id);
        return true;
    }

    @Override
    @Transactional
    public User deleteCommentByUser(User user, Long commentId) {
        accountDAO.deleteUsersComment(commentId);
        return accountDAO.getUserById(user.getID());
    }

    @Override
    @Transactional
    public User banOrUnbanUser(User user) {
        accountDAO.banOrUnbanUserById(user);
        return accountDAO.getUserById(user.getID());
    }

}
