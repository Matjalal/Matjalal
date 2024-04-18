package com.proj.Matjalal.domain.ingredient.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proj.Matjalal.domain.article.entity.Article;
import com.proj.Matjalal.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Ingredient extends BaseEntity {
    private String name;
    private String type;

    @ManyToMany(mappedBy = "ingredients")
    private List<Article> articles = new ArrayList<>();
}

