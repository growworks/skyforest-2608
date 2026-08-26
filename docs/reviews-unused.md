# 후기 이미지 미사용 처리 기록

작성일: 2026-08-27

## 배경

게재 중이던 후기 이미지 271장을 전수 육안 검토해, 아래에 해당하는 이미지를 사이트에서 내렸다.

- 하늘숲홈케어 직원 **명함**(성명 · 휴대폰번호 · 계좌번호)이 찍힌 이미지
- 본문에 직원 **실명**("○○○ 팀장님" 등)이 적힌 이미지
- 판단이 필요한 건(성 + 직함, 인물 얼굴, 제3자 실명, 개인 연락처)도 함께 내렸다.

## 처리 방식

- 대상 파일은 `public/` **밖**인 `_unused/reviews/` 로 옮겼다.
  `public/` 안에서 폴더명만 바꾸면 URL 로 계속 접근되기 때문이다.
- `_unused/` 는 `.gitignore` 에 넣어 저장소에 올리지 않는다(계좌번호 · 개인 휴대폰 포함).
- `src/lib/content/reviews-manifest.ts` 의 `RAW_REV_ITEMS` · `RAW_REV_PROV` 에서도 해당 항목을 제거했다.

## 결과

| 구분 | 장수 |
| --- | ---: |
| 검토 전 게재 | 271 |
| 미사용 처리 | 115 |
| 현재 게재 | 156 |

빈 페이지는 없다. 서비스별 잔여는 청소 71장, 줄눈 85장.

## 사유별 내역

> 실명 · 연락처 · 계좌번호는 이 문서에 옮기지 않는다. 원본은 `_unused/reviews/` 에서 확인한다.

### 직원 실명 - 46장

```
cleaning_general_04  cleaning_general_06  cleaning_general_11  cleaning_new_03
cleaning_new_06  cleaning_new_101  cleaning_new_102  cleaning_new_103
cleaning_new_104  cleaning_new_107  cleaning_new_108  cleaning_new_11
cleaning_new_111  cleaning_new_112  cleaning_new_114  cleaning_new_117
cleaning_new_12  cleaning_new_14  cleaning_new_15  cleaning_new_18
cleaning_new_24  cleaning_new_30  cleaning_new_38  cleaning_new_39
cleaning_new_41  cleaning_new_44  cleaning_new_45  cleaning_new_50
cleaning_new_57  cleaning_new_59  cleaning_new_62  cleaning_new_68
cleaning_new_69  cleaning_new_73  cleaning_new_82  grout_general_107
grout_general_110  grout_general_111  grout_general_14  grout_general_72
grout_general_79  grout_general_85  grout_general_87  grout_general_92
grout_general_94  grout_general_96
```

### 명함(성명 · 연락처 · 계좌) - 41장

```
cleaning_general_15  cleaning_general_16  cleaning_new_106  cleaning_new_109
cleaning_new_113  cleaning_new_116  cleaning_new_34  cleaning_new_36
cleaning_new_64  cleaning_new_66  cleaning_new_71  cleaning_new_75
cleaning_new_78  cleaning_new_80  cleaning_new_88  cleaning_new_98
grout_general_06  grout_general_104  grout_general_11  grout_general_116
grout_general_117  grout_general_118  grout_general_124  grout_general_126
grout_general_18  grout_general_20  grout_general_25  grout_general_27
grout_general_40  grout_general_41  grout_general_46  grout_general_47
grout_general_50  grout_general_55  grout_general_62  grout_general_64
grout_general_65  grout_general_66  grout_general_83  grout_general_91
grout_general_99
```

### 명함 + 직원 실명 - 9장

```
cleaning_new_105  cleaning_new_110  cleaning_new_115  grout_general_127
grout_general_24  grout_general_52  grout_general_53  grout_general_57
grout_general_70
```

### 성 + 직함만 표기 (판단필요) - 6장

```
cleaning_general_07  cleaning_general_10  cleaning_new_20  cleaning_new_21
cleaning_new_43  cleaning_new_54
```

### 인물 얼굴 노출 (판단필요) - 6장

```
cleaning_new_61  cleaning_new_72  cleaning_new_96  grout_general_31
grout_general_32  grout_general_80
```

### 제3자(입주민) 실명 (판단필요) - 5장

```
cleaning_new_28  cleaning_new_86  cleaning_new_97  grout_general_105
grout_general_89
```

### 개인 연락처 노출 (판단필요) - 2장

```
grout_general_100  grout_general_74
```

## 되돌리려면

`_unused/reviews/` 에서 파일을 `public/images/reviews/` 로 옮기고,
`reviews-manifest.ts` 의 `RAW_REV_ITEMS` 에 `{"f":"/images/reviews/<파일명>.jpg","svc":"...","det":"..."}` 를 되살린다.
(매니페스트는 원본 확장자로 적고, 로드 시 `toWebp()` 가 `.webp` 로 바꾼다.)
