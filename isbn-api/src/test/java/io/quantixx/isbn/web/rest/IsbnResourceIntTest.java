package io.quantixx.isbn.web.rest;

import io.quantixx.isbn.IsbnApp;

import io.quantixx.isbn.domain.Isbn;
import io.quantixx.isbn.repository.IsbnRepository;
import io.quantixx.isbn.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.quantixx.isbn.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IsbnResource REST controller.
 *
 * @see IsbnResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IsbnApp.class)
public class IsbnResourceIntTest {

    private static final String DEFAULT_ISBN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ISBN_NUMBER = "BBBBBBBBBB";

    @Autowired
    private IsbnRepository isbnRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIsbnMockMvc;

    private Isbn isbn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IsbnResource isbnResource = new IsbnResource(isbnRepository);
        this.restIsbnMockMvc = MockMvcBuilders.standaloneSetup(isbnResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Isbn createEntity(EntityManager em) {
        Isbn isbn = new Isbn()
            .isbnNumber(DEFAULT_ISBN_NUMBER);
        return isbn;
    }

    @Before
    public void initTest() {
        isbn = createEntity(em);
    }

    @Test
    @Transactional
    public void createIsbn() throws Exception {
        int databaseSizeBeforeCreate = isbnRepository.findAll().size();

        // Create the Isbn
        restIsbnMockMvc.perform(post("/api/isbns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isbn)))
            .andExpect(status().isCreated());

        // Validate the Isbn in the database
        List<Isbn> isbnList = isbnRepository.findAll();
        assertThat(isbnList).hasSize(databaseSizeBeforeCreate + 1);
        Isbn testIsbn = isbnList.get(isbnList.size() - 1);
        assertThat(testIsbn.getIsbnNumber()).isEqualTo(DEFAULT_ISBN_NUMBER);
    }

    @Test
    @Transactional
    public void createIsbnWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = isbnRepository.findAll().size();

        // Create the Isbn with an existing ID
        isbn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIsbnMockMvc.perform(post("/api/isbns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isbn)))
            .andExpect(status().isBadRequest());

        // Validate the Isbn in the database
        List<Isbn> isbnList = isbnRepository.findAll();
        assertThat(isbnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIsbns() throws Exception {
        // Initialize the database
        isbnRepository.saveAndFlush(isbn);

        // Get all the isbnList
        restIsbnMockMvc.perform(get("/api/isbns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(isbn.getId().intValue())))
            .andExpect(jsonPath("$.[*].isbnNumber").value(hasItem(DEFAULT_ISBN_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getIsbn() throws Exception {
        // Initialize the database
        isbnRepository.saveAndFlush(isbn);

        // Get the isbn
        restIsbnMockMvc.perform(get("/api/isbns/{id}", isbn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(isbn.getId().intValue()))
            .andExpect(jsonPath("$.isbnNumber").value(DEFAULT_ISBN_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIsbn() throws Exception {
        // Get the isbn
        restIsbnMockMvc.perform(get("/api/isbns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIsbn() throws Exception {
        // Initialize the database
        isbnRepository.saveAndFlush(isbn);
        int databaseSizeBeforeUpdate = isbnRepository.findAll().size();

        // Update the isbn
        Isbn updatedIsbn = isbnRepository.findOne(isbn.getId());
        // Disconnect from session so that the updates on updatedIsbn are not directly saved in db
        em.detach(updatedIsbn);
        updatedIsbn
            .isbnNumber(UPDATED_ISBN_NUMBER);

        restIsbnMockMvc.perform(put("/api/isbns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIsbn)))
            .andExpect(status().isOk());

        // Validate the Isbn in the database
        List<Isbn> isbnList = isbnRepository.findAll();
        assertThat(isbnList).hasSize(databaseSizeBeforeUpdate);
        Isbn testIsbn = isbnList.get(isbnList.size() - 1);
        assertThat(testIsbn.getIsbnNumber()).isEqualTo(UPDATED_ISBN_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingIsbn() throws Exception {
        int databaseSizeBeforeUpdate = isbnRepository.findAll().size();

        // Create the Isbn

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIsbnMockMvc.perform(put("/api/isbns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isbn)))
            .andExpect(status().isCreated());

        // Validate the Isbn in the database
        List<Isbn> isbnList = isbnRepository.findAll();
        assertThat(isbnList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIsbn() throws Exception {
        // Initialize the database
        isbnRepository.saveAndFlush(isbn);
        int databaseSizeBeforeDelete = isbnRepository.findAll().size();

        // Get the isbn
        restIsbnMockMvc.perform(delete("/api/isbns/{id}", isbn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Isbn> isbnList = isbnRepository.findAll();
        assertThat(isbnList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Isbn.class);
        Isbn isbn1 = new Isbn();
        isbn1.setId(1L);
        Isbn isbn2 = new Isbn();
        isbn2.setId(isbn1.getId());
        assertThat(isbn1).isEqualTo(isbn2);
        isbn2.setId(2L);
        assertThat(isbn1).isNotEqualTo(isbn2);
        isbn1.setId(null);
        assertThat(isbn1).isNotEqualTo(isbn2);
    }
}
