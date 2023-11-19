package com.OneBpy.repositories;

import com.OneBpy.models.Store;
import com.OneBpy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

}
