package com.proj.Matjalal.domain.subway.service;

import com.proj.Matjalal.domain.subway.repository.SubwayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubwayService {
    private final SubwayRepository subwayRepository;
}
