package com.proj.Matjalal.domain.imageData.service;

import com.proj.Matjalal.domain.article.entity.Article;
import com.proj.Matjalal.domain.imageData.entity.ImageData;
import com.proj.Matjalal.domain.imageData.repository.ImageDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageDataService {
    private final ImageDataRepository imageDataRepository;
    private final String FOLDER_PATH = "C:\\file_upload";

    public ImageData findByArticle(Article article) {
        Optional<ImageData> optionalImageData = this.imageDataRepository.findByArticle(article);
        if(optionalImageData.isEmpty()){
            return null;
        }
        return optionalImageData.get();
    }

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        ImageData imageData = imageDataRepository.save(
                ImageData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .filePath(filePath)
                        .build()
        );

        // 파일 결로
        file.transferTo(new File(filePath));

        if (imageData != null) {
            return "file uploaded successfully! filePath : " + filePath;
        }

        return null;
    }
    public String uploadImageToFileSystemWithArticle(MultipartFile file, Article article) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        ImageData imageData = imageDataRepository.save(
                ImageData.builder()
                        .name(file.getOriginalFilename())
                        .type(file.getContentType())
                        .filePath(filePath)
                        .article(article)
                        .build()

        );

        // 파일 결로
        file.transferTo(new File(filePath));

        if (imageData != null) {
            return "file uploaded successfully! filePath : " + filePath;
        }

        return null;
    }
}
