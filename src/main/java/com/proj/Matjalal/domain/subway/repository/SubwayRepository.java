package com.proj.Matjalal.domain.subway.repository;

import com.proj.Matjalal.domain.subway.entitiy.Subway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubwayRepository extends JpaRepository<Subway, Long> {
}
