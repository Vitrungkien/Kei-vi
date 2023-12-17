package com.OneBpy.repositories;

import com.OneBpy.dtos.ProductDTOS;
import com.OneBpy.models.Product;
import com.OneBpy.models.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT p.* FROM product_tb p " +
            "WHERE EXISTS ( " +
            "SELECT 1 FROM stop_tb s1 " +
            "WHERE s1.product_id = p.product_id " +
            "AND s1.stop_time BETWEEN :startTime AND :endTime " +
            "AND s1.stop_address = :startAddress) " +
            "AND EXISTS (" +
            "SELECT 1 FROM stop_tb s2 " +
            "WHERE s2.product_id = p.product_id " +
            "AND s2.stop_address = :endAddress)"
            , nativeQuery = true)
    List<Product> findProductsByTimeAndAddress(
            @Param("startTime") String startTime,
            @Param("endTime") String endTime,
            @Param("startAddress") String startAddress,
            @Param("endAddress") String endAddress
    );

    @Query(value = "SELECT p.* FROM product_tb p WHERE display = true and deleted = false", nativeQuery = true)
    List<Product> findAllActiveProducts();

    @Query(value = "SELECT p.* FROM product_tb p WHERE deleted = false and store_id = :store_id"
            , nativeQuery = true)
    List<Product> findAllStoreProducts(Long store_id);

    Page<Product> findAll(Pageable pageable);
}
