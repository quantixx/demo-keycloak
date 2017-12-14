package io.quantixx.isbn.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "io.quantixx.isbn")
public class FeignConfiguration {

}
