package com.proj.Matjalal.global.webMvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://cdpn.io", "http://localhost:3000", "http://localhost:8090")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);

    }
}