package io.quantixx.isbn.repository;

import io.quantixx.isbn.domain.Isbn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Isbn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IsbnRepository extends JpaRepository<Isbn, Long> {

}
