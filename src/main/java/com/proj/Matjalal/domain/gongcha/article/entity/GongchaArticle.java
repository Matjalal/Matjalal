package com.proj.Matjalal.domain.gongcha.article.entity;

import com.proj.Matjalal.domain.ingredient.entity.Ingredient;
import com.proj.Matjalal.domain.member.entity.Member;
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
public class GongchaArticle extends BaseEntity {
    private String subject;
    private String content;
    @ManyToOne
    private Member author;
    @ManyToMany // ?????????????????? 모르겠음 List랑 게시글이랑 관계를 어떻게 맺어야 할지
    private List<Ingredient> ingredients = new ArrayList<>();
}
