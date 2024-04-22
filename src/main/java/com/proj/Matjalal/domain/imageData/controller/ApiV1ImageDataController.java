package com.proj.Matjalal.domain.imageData.controller;


import com.proj.Matjalal.domain.article.entity.Article;
import com.proj.Matjalal.domain.article.service.ArticleService;
import com.proj.Matjalal.domain.imageData.entity.ImageData;
import com.proj.Matjalal.domain.imageData.service.ImageDataService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image-data")
@Tag(name = "이미지", description = "이미지 관련 API")
public class ApiV1ImageDataController {
    private final ImageDataService imageDataService;
    private final ArticleService articleService;

    @PostMapping("")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = imageDataService.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @PostMapping("/articles")
    public ResponseEntity<?> uploadImageByArticle(@RequestParam("subject") String subject, @RequestParam("content") String content, @RequestParam("image") MultipartFile file) throws IOException {

        Optional<Article> optionalArticle =  this.articleService.getArticleBySubjectAndContent(subject, content);
        if(optionalArticle.isEmpty()){
            return null;
        }
        String uploadImage = imageDataService.uploadImageToFileSystemWithArticle(file, optionalArticle.get());
        ImageData imageData =  this.imageDataService.findByArticle(optionalArticle.get());
        // 만든 이미지 게시글에 더하기
        this.articleService.addImageData(optionalArticle.get(), imageData);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
}
