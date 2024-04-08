package com.proj.Matjalal.domain.member.service;

import com.proj.Matjalal.domain.member.entity.Member;
import com.proj.Matjalal.domain.member.repository.MemberRepository;
import com.proj.Matjalal.global.RsData.RsData;
import com.proj.Matjalal.global.exception.GlobalException;
import com.proj.Matjalal.global.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    public Member join(String username, String password, String email) {
        Member member = Member.builder()
                .username(username)
                .password(password)
                .email(email)
                .build();

        memberRepository.save(member);

        return member;
    }

    public Optional<Member> findById (Long id) {
        return this.memberRepository.findById(id);
    }

    @AllArgsConstructor
    @Getter
    public static class AuthAndMakeTokensResponseBody {
        private Member member;
        private String accessToken;
    }

    @Transactional
    public RsData<AuthAndMakeTokensResponseBody> authAndMakeToken(String username, String password) {
        Member member = this.memberRepository.findByUsername(username).orElseThrow( () -> new GlobalException("400-1", "회원이 존재하지 않습니다."));

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw  new GlobalException("400-2", "비밀번호가 일치 하지 않습니다.");
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",member.getId());
        claims.put("username",member.getUsername());
        String accessToken = jwtProvider.genToken( claims , 60 * 60 * 5 );

        System.out.println("accessToken : " + accessToken);
        return RsData.of(
                "200-1",
                "🎉로그인 성공🎉",
                new AuthAndMakeTokensResponseBody(member, accessToken)
        );
    }
}
