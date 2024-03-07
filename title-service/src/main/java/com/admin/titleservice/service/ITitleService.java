package com.admin.titleservice.service;

import com.admin.titleservice.entity.Sort;
import com.admin.titleservice.entity.Title;

import java.util.List;

public interface ITitleService {

    List<Title> getAllTitles();

    List<Title> getAllTitlesReleased();

    List<Title> getAllTitlesUnReleased();

    List<Title> getAllUserTitles(Long userId);

    List<Title> getAllFilteredTitles(String filter);

    Title getTitleById(Long id);

    List<Title> getAllTitlesSort(Sort sortBy);

    Title releaseOrBanTitleById(Title title);

    Title deleteCommentForTitle(Title title, Long commentId);

}