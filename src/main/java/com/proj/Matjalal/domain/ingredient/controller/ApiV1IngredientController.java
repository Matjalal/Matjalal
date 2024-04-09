package com.proj.Matjalal.domain.ingredient.controller;

import com.proj.Matjalal.domain.article.controller.ApiV1ArticleController;
import com.proj.Matjalal.domain.article.entity.Article;
import com.proj.Matjalal.domain.ingredient.entity.Ingredient;
import com.proj.Matjalal.domain.ingredient.service.IngredientService;
import com.proj.Matjalal.global.RsData.RsData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ingredients")
public class ApiV1IngredientController {
    private final IngredientService ingredientService;

    @Data
    public static class IngredientsResponse {
        private final List<Ingredient> ingredients;
    }

    // 다건 요청
    @GetMapping("")
    public RsData<IngredientsResponse> getIngredients() {
        List<Ingredient> ingredients = this.ingredientService.getList();

        return RsData.of(
                "SI-1",
                "다건 요청 성공",
                new IngredientsResponse(ingredients)
        );
    }

    @AllArgsConstructor
    @Getter
    public static class IngredientResponse {
        private final Ingredient ingredient;
    }

    @GetMapping("/{id}")
    public RsData<IngredientResponse> getIngredient(@PathVariable("id") Long id){
        return this.ingredientService.getIngredient(id).map(ingredient -> RsData.of(
                "SI-2",
                "성공",
                new IngredientResponse(ingredient)
        )).orElseGet(() -> RsData.of(
                "FI-2",
                "%d 번 재료는 존재하지 않습니다.".formatted(id),
                null
        ));
    }
}
