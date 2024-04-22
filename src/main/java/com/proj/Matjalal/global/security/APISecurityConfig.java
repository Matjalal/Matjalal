package com.proj.Matjalal.global.security;


import com.proj.Matjalal.global.security.filter.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class APISecurityConfig {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/**")
                .authorizeRequests(
                        authorizeRequests -> authorizeRequests
                                .requestMatchers("/api/*/articles").permitAll()
                                .requestMatchers("/api/*/articles/*").permitAll()
                                .requestMatchers("/api/*/articles/*/brands").permitAll()
                                .requestMatchers("/api/*/articles/*/random").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/*/members/login").permitAll() // 로그인은 누구나 가능, post 요청만 허용
                                .requestMatchers(HttpMethod.POST, "/api/*/members/logout").permitAll() // 로그아웃은 누구나 가능
                                .requestMatchers("/api/*/members/me").permitAll() // 로그아웃은 누구나 가능
                                .requestMatchers("/api/*/ingredients").permitAll() //전체 재료 보기는 누구나 가능
                                .requestMatchers("/api/*/ingredients/*").permitAll() // 재료 상세 보기는 누구나 가능
                                .requestMatchers("/api/*/ingredients/type/*").permitAll() // 재료 상세 보기는 누구나 가능
                                .requestMatchers("/api/*/articles/search").permitAll()
                                .requestMatchers("/api/*/reviews").permitAll()
                                .requestMatchers("/api/*/reviews/*").permitAll()
                                .requestMatchers("/api/*/reviews/*/articles").permitAll()
                                .requestMatchers("/api/*/image-data/").permitAll()
                                .requestMatchers("/api/*/image-data/*").permitAll()
                                .requestMatchers("/api/*/image-data/articles").permitAll()
                                .requestMatchers("/api/*/image-data/*/articles").permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(
                        csrf -> csrf
                                .disable()
                ) // csrf 토큰 끄기
                .httpBasic(
                        httpBasic -> httpBasic.disable()
                ) // httpBasic 로그인 방식 끄기
                .formLogin(
                        formLogin -> formLogin.disable()
                ) // 폼 로그인 방식 끄기
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(STATELESS)
                ) // 세션 끄기
                .addFilterBefore(
                        jwtAuthorizationFilter, //엑세스 토큰을 이용한 로그인 처리
                        UsernamePasswordAuthenticationFilter.class
                );
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 허용할 오리진 설정
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // 허용할 HTTP 메서드 설정
        configuration.setAllowedHeaders(Arrays.asList("*")); // 허용할 헤더 설정
        configuration.setAllowCredentials(true); // 자격 증명 허용 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}