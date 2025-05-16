package com.medmate.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI medMateOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Medical HealthCare API")
                        .description("Medical Management System API")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("MedMate Support")
                                .email("support@medmate.com"))
                        .license(new License().name("MedMate License")));
    }
}
