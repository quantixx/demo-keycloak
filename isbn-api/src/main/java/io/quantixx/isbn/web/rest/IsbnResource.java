package io.quantixx.isbn.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.quantixx.isbn.domain.Isbn;
import io.quantixx.isbn.repository.IsbnRepository;
import io.quantixx.isbn.web.rest.errors.BadRequestAlertException;
import io.quantixx.isbn.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Isbn.
 */
@RestController
@RequestMapping("/api")
public class IsbnResource {

    private final Logger log = LoggerFactory.getLogger(IsbnResource.class);

    private static final String ENTITY_NAME = "isbn";

    private final IsbnRepository isbnRepository;

    public IsbnResource(IsbnRepository isbnRepository) {
        this.isbnRepository = isbnRepository;
    }

    /**
     * POST  /isbns : Create a new isbn.
     *
     * @param isbn the isbn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new isbn, or with status 400 (Bad Request) if the isbn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/isbns")
    @Timed
    public ResponseEntity<Isbn> createIsbn(@RequestBody Isbn isbn) throws URISyntaxException {
        log.debug("REST request to save Isbn : {}", isbn);
        if (isbn.getId() != null) {
            throw new BadRequestAlertException("A new isbn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Isbn result = isbnRepository.save(isbn);
        return ResponseEntity.created(new URI("/api/isbns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /isbns : Updates an existing isbn.
     *
     * @param isbn the isbn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated isbn,
     * or with status 400 (Bad Request) if the isbn is not valid,
     * or with status 500 (Internal Server Error) if the isbn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/isbns")
    @Timed
    public ResponseEntity<Isbn> updateIsbn(@RequestBody Isbn isbn) throws URISyntaxException {
        log.debug("REST request to update Isbn : {}", isbn);
        if (isbn.getId() == null) {
            return createIsbn(isbn);
        }
        Isbn result = isbnRepository.save(isbn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, isbn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /isbns : get all the isbns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of isbns in body
     */
    @GetMapping("/isbns")
    @Timed
    public List<Isbn> getAllIsbns() {
        log.debug("REST request to get all Isbns");
        return isbnRepository.findAll();
    }

    @GetMapping("/isbns/number")
    @Timed
    public String generateIsbnNumber() {
        log.debug("REST request to get generate an Isbn number");
        return "ISBN-" + String.valueOf(Math.random());
    }

    /**
     * GET  /isbns/:id : get the "id" isbn.
     *
     * @param id the id of the isbn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the isbn, or with status 404 (Not Found)
     */
    @GetMapping("/isbns/{id}")
    @Timed
    public ResponseEntity<Isbn> getIsbn(@PathVariable Long id) {
        log.debug("REST request to get Isbn : {}", id);
        Isbn isbn = isbnRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(isbn));
    }

    /**
     * DELETE  /isbns/:id : delete the "id" isbn.
     *
     * @param id the id of the isbn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/isbns/{id}")
    @Timed
    public ResponseEntity<Void> deleteIsbn(@PathVariable Long id) {
        log.debug("REST request to delete Isbn : {}", id);
        isbnRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
