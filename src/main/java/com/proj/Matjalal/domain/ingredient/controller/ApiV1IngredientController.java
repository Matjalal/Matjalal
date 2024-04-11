package com.proj.Matjalal.domain.ingredient.controller;

import com.proj.Matjalal.domain.article.controller.ApiV1ArticleController;
import com.proj.Matjalal.domain.article.entity.Article;
import com.proj.Matjalal.domain.ingredient.entity.Ingredient;
import com.proj.Matjalal.domain.ingredient.service.IngredientService;
import com.proj.Matjalal.global.RsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/type/{type}")
    public RsData<IngredientsResponse> getIngredientsByType(@PathVariable("type") String type){
        List<Ingredient> ingredients = this.ingredientService.getListByType(type);
        return RsData.of(
                "SI-2",
                "타입별 다건 요청 성공",
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

    @Data
    public static class CreateRequest {
        @NotBlank
        private String name;
        @NotBlank
        private String type;
    }
    @AllArgsConstructor
    @Getter
    public static class CreateResponce {
        private final  Ingredient ingredient;
    }


    @PostMapping("")
    public RsData<CreateResponce> create(@RequestBody CreateRequest createRequest){
        RsData<Ingredient> createRS = this.ingredientService.create(createRequest.getName(), createRequest.getType());
        if(createRS.isFail()) return (RsData) createRS;

        return RsData.of(
                createRS.getResultCode(),
                createRS.getMsg(),
                new CreateResponce(createRS.getData())
        );
    }

    @Data
    public static class ModifyRequest {
        @NotBlank
        private String name;
        @NotBlank
        private String type;
    }
    @AllArgsConstructor
    @Getter
    public static class ModifyResponce {
        private final  Ingredient ingredient;
    }

    @PatchMapping("/{id}")
    public RsData<ModifyResponce> modifyIngredient(@PathVariable("id") Long id, @Valid @RequestBody ModifyRequest modifyRequest){
        Optional<Ingredient> optionalIngredient = this.ingredientService.findById(id);
        if(optionalIngredient.isEmpty()){
            return RsData.of(
                    "FI-4",
                    "%s번 재료는 존재하지 않습니다.".formatted(id),
                    null
            );
        }

        RsData<Ingredient> ingredientRsData =this.ingredientService.modify(optionalIngredient.get(), modifyRequest.getName(), modifyRequest.getType());

        return RsData.of(
                ingredientRsData.getResultCode(),
                ingredientRsData.getMsg(),
                new ModifyResponce(ingredientRsData.getData())
        );
    }

    @AllArgsConstructor
    @Getter
    public static class DeleteResponce {
        private final  Ingredient ingredient;
    }
    @DeleteMapping("/{id}")
    public RsData<DeleteResponce> deleteIngredient(@PathVariable("id") Long id){
        Optional<Ingredient> optionalIngredient = this.ingredientService.findById(id);
        if(optionalIngredient.isEmpty()){
            return RsData.of(
                    "FI-5",
                    "%d번 재료가 없어 삭제 실패 했습니다.".formatted(id),
                    null
            );
        }
        RsData<Ingredient> deletedRsData = this.ingredientService.deleteByIngredient(optionalIngredient.get());
        return RsData.of(
                deletedRsData.getResultCode(),
                deletedRsData.getMsg(),
                new DeleteResponce(deletedRsData.getData())
        );
    }
}