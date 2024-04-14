package com.proj.Matjalal.domain.subway.entitiy;

import com.proj.Matjalal.domain.member.entity.Member;
import com.proj.Matjalal.global.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Subway extends BaseEntity {
    private String title;
    private String content;
    @ManyToOne
    private Member author;
}
