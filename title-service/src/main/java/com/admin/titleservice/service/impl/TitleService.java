package com.admin.titleservice.service.impl;

import com.admin.titleservice.dao.TitleDAO;
import com.admin.titleservice.entity.Sort;
import com.admin.titleservice.entity.Title;
import com.admin.titleservice.service.ITitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TitleService implements ITitleService {

    private final TitleDAO titleDAO;

    @Override
    public List<Title> getAllTitles() {
        return titleDAO.findAll();
    }

    @Override
    public List<Title> getAllTitlesReleased() {
        return titleDAO.findAllReleased();
    }

    @Override
    public List<Title> getAllTitlesUnReleased() {
        return titleDAO.findAllUnReleased();
    }

    @Override
    public List<Title> getAllFilteredTitles(String filter) {
        return titleDAO.findFilteredAll(filter);
    }

    @Override
    public List<Title> getAllTitlesSort(Sort sortBy) {
        if (sortBy == Sort.ID) return titleDAO.findAllByID();
        else if (sortBy == Sort.DATE) return titleDAO.findAllByDate();
        else return titleDAO.findAll();
    }

    @Override
    public Title getTitleById(Long id) {
        return titleDAO.findById(id);
    }

    @Override
    public Title releaseOrBanTitleById(Title title) {
        titleDAO.releaseOrBanTitleById(title);
        return titleDAO.findById(title.getID());
    }

    @Override
    @Transactional
    public Title deleteCommentForTitle(Title title, Long commentId) {
        titleDAO.deleteCommentForTitle(commentId);
        return titleDAO.findById(title.getID());
    }

    public List<Title> getAllUserTitles(Long userId) {
        return titleDAO.findTitlesByUserId(userId);
    }

}