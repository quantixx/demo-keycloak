package io.quantixx.book.client.isbn.api;

import io.quantixx.book.client.isbn.model.Isbn;
import io.quantixx.book.client.isbn.model.User;
import io.quantixx.book.client.isbn.model.ProfileInfoVM;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-12-14T13:11:21.601+01:00")

@Api(value = "api", description = "the api API")
public interface ApiApi {

    @ApiOperation(value = "createIsbn", notes = "", response = Isbn.class, tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = Isbn.class),
        @ApiResponse(code = 201, message = "Created", response = Isbn.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Isbn.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Isbn.class),
        @ApiResponse(code = 404, message = "Not Found", response = Isbn.class) })
    @RequestMapping(value = "/api/isbns",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.POST)
    ResponseEntity<Isbn> createIsbnUsingPOST(@ApiParam(value = "isbn" ,required=true ) @RequestBody Isbn isbn);


    @ApiOperation(value = "deleteIsbn", notes = "", response = Void.class, tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = Void.class),
        @ApiResponse(code = 204, message = "No Content", response = Void.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Void.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Void.class) })
    @RequestMapping(value = "/api/isbns/{id}",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.DELETE)
    ResponseEntity<Void> deleteIsbnUsingDELETE(@ApiParam(value = "id",required=true ) @PathVariable("id") Long id);


    @ApiOperation(value = "generateIsbnNumber", notes = "", response = String.class, tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = String.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = String.class),
        @ApiResponse(code = 403, message = "Forbidden", response = String.class),
        @ApiResponse(code = 404, message = "Not Found", response = String.class) })
    @RequestMapping(value = "/api/isbns/number",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<String> generateIsbnNumberUsingGET();


    @ApiOperation(value = "getAccount", notes = "", response = User.class, tags={ "account-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = User.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = User.class),
        @ApiResponse(code = 403, message = "Forbidden", response = User.class),
        @ApiResponse(code = 404, message = "Not Found", response = User.class) })
    @RequestMapping(value = "/api/account",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<User> getAccountUsingGET();


    @ApiOperation(value = "getActiveProfiles", notes = "", response = ProfileInfoVM.class, tags={ "profile-info-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = ProfileInfoVM.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = ProfileInfoVM.class),
        @ApiResponse(code = 403, message = "Forbidden", response = ProfileInfoVM.class),
        @ApiResponse(code = 404, message = "Not Found", response = ProfileInfoVM.class) })
    @RequestMapping(value = "/api/profile-info",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<ProfileInfoVM> getActiveProfilesUsingGET();


    @ApiOperation(value = "getAllIsbns", notes = "", response = Isbn.class, responseContainer = "List", tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = Isbn.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Isbn.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Isbn.class),
        @ApiResponse(code = 404, message = "Not Found", response = Isbn.class) })
    @RequestMapping(value = "/api/isbns",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<List<Isbn>> getAllIsbnsUsingGET();


    @ApiOperation(value = "getIsbn", notes = "", response = Isbn.class, tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = Isbn.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Isbn.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Isbn.class),
        @ApiResponse(code = 404, message = "Not Found", response = Isbn.class) })
    @RequestMapping(value = "/api/isbns/{id}",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<Isbn> getIsbnUsingGET(@ApiParam(value = "id",required=true ) @PathVariable("id") Long id);


    @ApiOperation(value = "isAuthenticated", notes = "", response = String.class, tags={ "account-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = String.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = String.class),
        @ApiResponse(code = 403, message = "Forbidden", response = String.class),
        @ApiResponse(code = 404, message = "Not Found", response = String.class) })
    @RequestMapping(value = "/api/authenticate",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.GET)
    ResponseEntity<String> isAuthenticatedUsingGET();


    @ApiOperation(value = "updateIsbn", notes = "", response = Isbn.class, tags={ "isbn-resource", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "OK", response = Isbn.class),
        @ApiResponse(code = 201, message = "Created", response = Isbn.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = Isbn.class),
        @ApiResponse(code = 403, message = "Forbidden", response = Isbn.class),
        @ApiResponse(code = 404, message = "Not Found", response = Isbn.class) })
    @RequestMapping(value = "/api/isbns",
        produces = "*/*",
        consumes = "application/json",
        method = RequestMethod.PUT)
    ResponseEntity<Isbn> updateIsbnUsingPUT(@ApiParam(value = "isbn" ,required=true ) @RequestBody Isbn isbn);

}
