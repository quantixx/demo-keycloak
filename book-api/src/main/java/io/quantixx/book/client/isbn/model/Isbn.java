package io.quantixx.book.client.isbn.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Isbn
 */
@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-12-14T13:11:21.601+01:00")

public class Isbn   {
  @JsonProperty("id")
  private Long id = null;

  @JsonProperty("isbnNumber")
  private String isbnNumber = null;

  public Isbn id(Long id) {
    this.id = id;
    return this;
  }

   /**
   * Get id
   * @return id
  **/
  @ApiModelProperty(value = "")
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Isbn isbnNumber(String isbnNumber) {
    this.isbnNumber = isbnNumber;
    return this;
  }

   /**
   * Get isbnNumber
   * @return isbnNumber
  **/
  @ApiModelProperty(value = "")
  public String getIsbnNumber() {
    return isbnNumber;
  }

  public void setIsbnNumber(String isbnNumber) {
    this.isbnNumber = isbnNumber;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Isbn isbn = (Isbn) o;
    return Objects.equals(this.id, isbn.id) &&
        Objects.equals(this.isbnNumber, isbn.isbnNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, isbnNumber);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Isbn {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    isbnNumber: ").append(toIndentedString(isbnNumber)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

