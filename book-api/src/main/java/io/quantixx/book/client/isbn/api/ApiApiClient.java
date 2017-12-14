package io.quantixx.book.client.isbn.api;

import org.springframework.cloud.netflix.feign.FeignClient;
import io.quantixx.book.client.isbn.ClientConfiguration;

@FeignClient(value="ISBN", configuration = ClientConfiguration.class)
public interface ApiApiClient extends ApiApi {
}
