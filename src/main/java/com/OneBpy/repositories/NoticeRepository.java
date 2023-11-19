package com.OneBpy.repositories;

import com.OneBpy.models.Notice;
import com.OneBpy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
