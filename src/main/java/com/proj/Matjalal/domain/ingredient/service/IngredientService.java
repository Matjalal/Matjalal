package com.proj.Matjalal.domain.ingredient.service;

import com.proj.Matjalal.domain.ingredient.entity.Ingredient;
import com.proj.Matjalal.domain.ingredient.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public List<Ingredient> getList() {
        return this.ingredientRepository.findAll();
    }

    public void create(String name, String type){
        Ingredient ingredient = Ingredient.builder()
                .name(name)
                .type(type)
                .build();
        this.ingredientRepository.save(ingredient);
    }



    public Optional<Ingredient> getIngredient(Long id) {
        return this.ingredientRepository.findById(id);
    }
}
