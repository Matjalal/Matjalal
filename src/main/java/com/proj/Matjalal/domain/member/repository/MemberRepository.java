package com.proj.Matjalal.domain.member.repository;

import com.proj.Matjalal.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
