import { rf } from './images'
import { CASE_POOLS } from './case-pools'
import { STRIPS } from './strips'
import { REV_ITEMS, REV_PROV, revCap } from './reviews-manifest'
import type { PriceTable, RevItem, Service, ServiceChild } from '@/types/content'

/* ============ 줄눈 단가 2계열 (원본 홈페이지 게시 기준) ============ */
export const GROUT_STD_PRICE: PriceTable = {head:['패키지 (40평 미만 기준)','구성','가격'],rows:[['기본','화장실 2개 + 현관 1개 + 욕조 1개 + 젠다이 2개','350,000원'],['샤워부스','화장실 2개 + 현관 1개 + 샤워부스 3면 + 욕조 1개 + 젠다이 2개 + 세면대 2개 + 주방젠다이 1개','550,000원'],['벽바닥 풀시공','화장실 2개 + 현관 1개 + 욕조 1개 + 젠다이 2개 + 세면대 2개 + 주방젠다이 1개 + 전체 벽','1,000,000원']]}
export const GROUT_PREM_PRICE: PriceTable = {head:['기준 서비스','구성','비용'],rows:[['케라폭시 기준 서비스','화장실 2개 + 현관 서비스 + 곰팡이 오염방지','900,000원'],['폴리싱 / 포세린','거실 · 주방 폴리싱/포세린 타일','1,400,000원 ~ 3,000,000원']]}
export const GROUT_STD_NOTE = '※ 기준 평수 비용: 신축 40평 미만 13만원 · 신축 40평 이상 15만원 · 구축 40평 미만 15만원<br>※ 기타 개별 서비스: 현관 5만원 · 세탁실 신축 9만원, 구축 11만원 · 욕조테두리 5만원 · 세면대 2만원 · 안방베란다 신축 10만원, 구축 12만원'
export const GROUT_PREM_NOTE = '※ 정확한 금액은 현장 실측 후 확정됩니다.'

/* ============ 서비스 데이터 (부모 4 + 하위 18) ============ */
export const SERVICES: Record<string, Service> = {
  cleaning:{
    label:'청소서비스', title:'입주 전문 청소서비스', hero:'g-hero1', tag:'청소',
    priceLead:'청소서비스 단가는 평수와 상태에 맞춰 전화 상담으로 안내드립니다.', priceNote:'※ 평수·오염도·일정에 따라 맞춤 견적을 안내드립니다.',
    infoBlocks:[
      {t:'청소범위',s:'모든 부분 빠지지 않고!',d:'외창을 제외한 전체창 창틀, 다용도실, 거실장, 신발장, 화장실, 전등일체, 전체바닥, 문틀, 방충망, 문짝, 몰딩, 싱크대, 가스렌지 후드, 베란다, 거실, 다용도실, 기본붙박이장',imgs:[rf('20240514_d7e73e2daf5da.jpg'),rf('20240514_f42692da7d4be.jpg')]},
      {t:'작업시간',s:'최소 4~6시간!',d:'최소 4~6시간 작업, 평수에 따라 시간은 변동될 수 있습니다. 시간에 쫓기지 않고 꼼꼼하게 진행합니다.',imgs:[rf('20240514_f5b3acd75e324.jpg'),rf('20240514_a7301f55457ed.jpg')]},
      {t:'작업인원',s:'평수별 2~5명 투입',d:'평수와 현장 상태에 따라 2~5명까지 투입되며, 인원은 상담 시 안내드립니다.',imgs:[rf('20240514_f6dec9685ec19.jpg'),rf('20240514_5a4fce4968948.jpg')]},
      {t:'작업완료',s:'작업완료통보',d:'모든 작업을 마친 후 1시간 전 1:1 서비스로 고객님에게 필히 직접 검수를 받고 있습니다.',imgs:[rf('20240514_ca66f43ca8c93.jpg'),rf('20240514_f4c132bafc879.jpg')]},
    ],
    lead:'신축·이사·새집증후군까지, 입주 전 단 한 번의 완벽한 청소로 새집의 첫인상을 지켜드립니다.',
    navDesc:'신축·이사·새집증후군 케어',
    children:[
      {id:'cleaning-new',t:'신축 입주청소',d:'분양·신축 아파트 전용 정밀 클리닝',img:'g-cleaning',
       intro:'막 지어진 새집에는 눈에 보이지 않는 공사 분진과 유해물질이 남아 있습니다. 신축 입주청소는 입주 전 단 한 번, 집 전체를 처음 상태보다 더 깨끗하게 만드는 가장 중요한 작업입니다.',
       scope:['공사 분진·시멘트 가루 정밀 제거','싱크대·수납장 내부까지 전체 클리닝','욕실 타일·유가·실리콘 오염 제거','창틀·샷시 레일 이물질 제거','바닥 왁스 전 오염물 제거','입주 전 최종 점검 리포트 제공']},
      {id:'cleaning-move',t:'이사청소',d:'살던 집·들어갈 집 완벽 리셋',img:rf('20240514_ca66f43ca8c93.jpg'),
       intro:'이사 나간 자리의 묵은 때, 이사 들어갈 집의 남의 흔적까지. 이사청소는 생활 오염 제거에 특화된 프로그램으로, 가구 배치 전 가장 효율적인 타이밍에 진행됩니다.',
       scope:['주방 기름때·후드 내부 클리닝','욕실 물때·곰팡이 집중 제거','베란다·창틀 묵은 때 제거','바닥 찌든 때·얼룩 클리닝','붙박이장·신발장 내부 소독','냉장고 자리·가구 자국 케어']},
      {id:'cleaning-sick',t:'새집증후군 케어',d:'포름알데히드 저감 · 친환경 약품 시공',img:rf('20241012_7a77a63a84276.jpg'),
       intro:'새집 건축자재나 벽지에 포함된 휘발성 유기화합물(VOCs)이 실내로 배출되어 비염·아토피성 피부염·두드러기·천식·심한 두통 등 각종 질병을 일으킬 수 있습니다. 국내 유일 특허 보유 내츄럴 폴리머 약품과 피톤치드 살포로 유해물질을 근본적으로 저감합니다.',
       explainImgs:[rf('20250122_4438a10c5f72c.png'),rf('20250122_64559d20b58d6.png'),rf('20250122_4405a9805bc5b.png'),rf('20250122_65c8b011b5f69.png'),rf('20250122_ff2a7bbc9ea71.png')],
       certImgs:[rf('20240514_bec94cf3babc0.jpg')],
       scope:['실내 공기질 사전 측정','베이크아웃 진행 안내','친환경 피톤치드 살포','내츄럴 폴리머 전체 시공','헤파필터 공기 정화 마무리','붙박이장·타공 부위까지 시공']},
    ],
    materials:[
      {g:'특허 약품',n:'내츄럴 폴리머',o:'특허 보유',f:['국내 유일 새집증후군 특허','포름알데히드 분자 분해','공공기관 납품 이력'],img:rf('20241012_14a5694aa1082.jpg')},
      {g:'친환경',n:'피톤치드 살포',o:'친환경',f:['시공 마무리 살균·탈취','솔잎향 마무리','아이·반려동물 안심'],img:rf('20240513_456882643ad37.jpg')},
      {g:'위생',n:'UV 살균 서비스',o:'전문 장비',f:['서랍·수납 내부까지 살균','입주 전 위생 마무리','시공 사진 공유']},
      {g:'세정 약품',n:'독일제 친환경 약품',o:'독일',f:['피부 자극 없는 성분','생활 오염 전용 세정','전 공정 공통 사용']},
    ],
    procTitle:'청소서비스 프로세스',
    process:[
      {t:'청소범위',d:'모든 부분 놓치지 않고! 붙박이장·전체창·창틀·다용도실·신발장·화장실·전체바닥·몰딩·방충망·씽크대·후드·기본 바닥왁스까지.',img:rf('20240514_d7e73e2daf5da.jpg')},
      {t:'작업시간',d:'최소 4~6시간! 평수에 따라 작업 시간은 달라질 수 있으며, 시간에 쫓기지 않고 꼼꼼하게 진행합니다.',img:rf('20240514_f5b3acd75e324.jpg')},
      {t:'작업인원',d:'평수에 따라 2~5명까지 투입되며, 검수까지 같은 팀이 책임지고 마무리합니다.',img:rf('20240514_f6dec9685ec19.jpg')},
      {t:'작업완료',d:'모든 작업을 마친 후 1시간의 1:1 검수 서비스로 마무리까지 직접 확인받고 완료를 통보드립니다.',img:rf('20240514_f4c132bafc879.jpg')},
    ],
    gallery:[rf('20241012_4c19344938088.jpg'),rf('20241012_c1507008faca4.jpg'),rf('20241012_f15b63df08634.jpg'),rf('20241012_14a5694aa1082.jpg'),'g-cleaning','hero-b'],
  },
  grout:{
    label:'줄눈시공', title:'프리미엄 줄눈시공', hero:'g-grout', tag:'줄눈', matChildren:true,
    lead:'하루 한 집만 책임시공, 최고급 자재 8종과 섬세한 수작업으로 곰팡이와 물때 걱정 없는 청결한 공간을 완성합니다.',
    navDesc:'프리미엄 자재 8종',
    priceNote:GROUT_STD_NOTE,
    children:[
      {id:'grout-polyurea',t:'폴리우레아 줄눈',d:'특허 크린파파 폴리아스파틱 우레아',img:rf('20240514_9fcc5076e07b0.jpg'),grade:'Premium',origin:'국산',
       intro:'줄눈시공 기술 가성비 1위! 변형 방지, 깨끗함 유지, 곰팡이 억제에 쾌적한 화장실 인테리어 효과까지. 특허받은 크린파파 폴리아스파틱 우레아 줄눈재로 황변·백화·수축·탈락 없는 시공을 약속합니다.',
       scope:['특허 폴리아스파틱 우레아 줄눈재','황변·백화·수축·탈락 방지','무황변 시험성적서 보유','습기·충격에 강한 도막','욕실 바닥 시공 최적','컬러차트 기반 색상 선택'],
       priceTable:GROUT_STD_PRICE,priceNote:GROUT_STD_NOTE,
       certImgs:[rf('20240514_2970045b81f08.png')],
       tall:[rf('20240514_cbeac954104f0.png'),rf('20240514_5b8ee098ccdca.jpg')]},
      {id:'grout-asfarshine',t:'아스팍샤인&퍼펙트PRO',d:'크린파파 프리미엄 줄눈제',img:rf('20250226_2674f759c5cae.jpg'),grade:'High-end',origin:'국산',
       intro:'기포 개선·강한 경도·강한 접착·저수축의 퍼펙트PRO, 최고점도·투명·무수축(오븐 테스트 검증)의 아스팍샤인. 100% 독일 바이엘·코베스트로 아스파틱 아민 원료를 사용한 특허(제10-1736583호) 프리미엄 줄눈제입니다.',
       scope:['기포 없이 맑고 깨끗한 마감','강한 표면경도 · 락스 세척 가능','무수축 오븐 테스트 검증','100% 독일 바이엘·코베스트로 원료','특허 제10-1736583호','무황변 시험성적서 보유'],
       priceTable:GROUT_STD_PRICE,priceNote:GROUT_STD_NOTE,
       certImgs:[rf('20250226_bbc9a26de25da.jpg')],
       tall:[rf('20250226_ab57bf9612c47.jpg')]},
      {id:'grout-nopearl',t:'무펄줄눈',d:'케라칼라 디자인 액상 안료 · 14색',img:rf('20240821_df02da571d58b.jpg'),grade:'Matt',origin:'국산',
       intro:'인기 급상승 중인 케라폭시 이지디자인의 색상을 모티브로 한 액상 무펄 안료입니다. 가루 안료의 최대 단점인 기포 발생이 거의 없어 하자 스트레스가 없고, 물감처럼 조색해 나만의 색을 만들 수 있습니다.',
       scope:['기포 없는 액상 안료 공법','케라폭시 이지디자인st 컬러','우수한 은폐력','단 5%만 사용하는 경제성','14색 라인업 · 조색 가능','모던·미니멀 인테리어 최적'],
       priceTable:GROUT_STD_PRICE,priceNote:GROUT_STD_NOTE,
       certImgs:[rf('20240821_b7e0338ef1243.jpg')],
       samplesTitle:'케라칼라 디자인 14색 샘플',
       samples:[rf('20240821_346203e17996a.jpg'),rf('20240821_716109f531a0c.jpg'),rf('20240821_5757ba059bec1.jpg'),rf('20240821_3ebfb2fdf16f3.jpg'),rf('20240821_807ff2f24c139.jpg'),rf('20240821_afec8b44e4e88.jpg'),rf('20240821_4819e112c62dc.jpg'),rf('20240821_b484ce49a3477.jpg'),rf('20240821_cfd4c9d214dbb.jpg'),rf('20240821_1abbdda52355b.jpg'),rf('20240821_2fb088e700524.jpg'),rf('20240821_7710e1bfb4ea3.jpg'),rf('20240821_8f38a89222e4d.jpg'),rf('20240821_996120701c785.jpg')],
       tall:[rf('20240821_b4d09cb01e796.jpg'),rf('20240821_ed1590aca66b4.jpg'),rf('20240821_51d46afdd8218.jpg')]},
      {id:'grout-asfarton',t:'아스팍톤',d:'세계 최초 무광 · 무펄 · 무수축 줄눈제',img:rf('20240514_4eb8a379accb3.jpg'),grade:'Premium',origin:'국산',
       intro:'세계 최초 무광·무펄·무수축·무오염·무황변 줄눈제. 락스에 색이 변하거나 거친 표면에 오염이 남는 기존 무광 줄눈의 단점을 해결한 신소재 특허 줄눈재입니다.',
       scope:['무광·무펄의 차분한 마감','매끈한 표면 · 오염물 흡수 없음','락스에도 변색 없음','무수축 · 무황변','거실·주방 폴리싱 타일 추천','10색 컬러차트 운영'],
       priceImg:rf('20240514_2dc622c5424a3.jpg'),priceLead:'아스팍톤 표준 시공 단가표입니다.',priceNote:GROUT_STD_NOTE,
       tall:[rf('20240514_afb163005acca.jpg'),rf('20240514_75574f546f4fc.jpg')],
       gallery:[rf('20240514_1bf9cb6986dfd.jpg'),rf('20251007_6a5e7d384c0d6.jpg'),rf('20251007_7701195464117.jpg'),rf('20240530_8d32601529db0.jpg')]},
      {id:'grout-kerapoxy',t:'케라폭시',d:'이탈리아 MAPEI 에폭시 최상급',img:rf('20240719_b9552f9f0b394.png'),grade:'High-end',origin:'이탈리아',
       intro:'항곰팡이·항균 2.5배 UP, 혁신적 BioBlock 기술의 MAPEI Kerapoxy Easy Design. 수축·균열 없는 강인한 도막과 이색·탈색 없는 균일한 색상을 유지하는 에폭시 최상급 정품 수입 자재입니다.',
       scope:['혁신적 BioBlock 항곰팡이 기술','항균력 2.5배 UP','수축·균열 없는 강인한 도막','이색·탈색 없는 균일한 색상','자외선 등 외부환경 내구성','40색 컬러 라인업'],
       priceTable:GROUT_PREM_PRICE,priceNote:GROUT_PREM_NOTE,
       samplesTitle:'케라폭시 컬러 라인업',
       samples:[rf('20240719_3b0a954ea3bb7.png'),rf('20240719_9510692e4d512.png')],
       tall:[rf('20240719_a6c01fbe4675c.png'),rf('20260317_06a5a711c29ea.png')],
       gallery:[rf('20240808_08c3ead5a4376.jpg'),rf('20240808_c03cc3a902157.jpg'),rf('20240808_fa17f2dfb55e8.jpg')]},
      {id:'grout-starlike',t:'명품 스타라이크 에보',d:'이탈리아 LITOKOL · 친환경 최고등급',img:rf('20250415_6b0d069ebc0f4.jpg'),grade:'Premium',origin:'이탈리아',
       intro:'친환경 인증 EC1 PLUS 최고 등급, 독성물질 안전등급 A+. 모든 기관이 인정한 이탈리아 LITOKOL의 신개념 줄눈재 스타라이크 에보입니다.',
       scope:['친환경 등급 EC1 PLUS 최고등급','독성물질 안전등급 A+','제로리스크(Zherorisk) 기술','마이크로 소성 석영 입자','완벽 방수 · 수영장급 내수성','손쉬운 세척 관리'],
       priceTable:GROUT_PREM_PRICE,priceNote:GROUT_PREM_NOTE,
       certImgs:[rf('20250415_3aa65f0c69aab.jpg')],
       samplesTitle:'스타라이크 에보 컬러 샘플',
       samples:[rf('20250415_a4dad6c658cef.png'),rf('20250415_a7f099ac512ed.png'),rf('20250415_8450e86799034.png'),rf('20250415_bdcefe0b232e9.png')],
       tall:[rf('20250415_b6697f1cbccbd.jpg')],
       gallery:[rf('20250415_a32e394b41f52.jpg'),rf('20250415_f582326c2ca91.jpg')]},
      {id:'grout-fugarite',t:'이태리 푸가리테',d:'kerakoll Fugalite Color · 친환경',img:rf('20260317_9a42730ec8a19.jpg'),grade:'Premium',origin:'이탈리아',
       intro:'유럽 최고 권위 CATAS 광학 테스트(ISO 105-A05)로 UV 저항성과 색상 안정성을 증명했습니다. ISO 846 향균 테스트 Class 0(곰팡이·박테리아 성장 제로), 수분 흡수율 0%, VOC 방출등급 A+의 친환경 프리미엄 줄눈재입니다.',
       scope:['CATAS 인증 UV 저항성','ISO 846 향균 Class 0','수분 흡수율 0%','VOC 방출등급 A+ 친환경','유기 세라믹 에폭시 기술','50색 컬러 필 시스템'],
       priceTable:GROUT_PREM_PRICE,priceNote:GROUT_PREM_NOTE,
       certImgs:[rf('20260317_d20df8923a743.jpg'),rf('20260317_86f67eae381f4.jpg')],
       samplesTitle:'푸가리테 컬러 필 시스템',
       samples:[rf('20260317_4a7d1c4b22ba0.jpg'),rf('20260317_e8b79ba3dc572.jpg')],
       tall:[rf('20260317_dfb2c3b6341d4.jpg')],
       gallery:[rf('20260317_557148bfcd4eb.jpg'),rf('20260317_1cd6f447c5145.jpg')]},
      {id:'grout-biglion',t:'프리미엄 빅 라이언',d:'독일 CUALI 5세대 수소화 에폭시',img:rf('20250819_8c86e5d9e76a1.jpg'),grade:'Premium',origin:'독일',
       intro:'독일 CUALI사의 5세대 수소화(Hydrogenation) 에폭시. 이중결합에 수소를 넣어 단일결합으로 바꾸는 수소화 공정으로 수지가 훨씬 안정되어 쉽게 변색되지 않으며, 로터스펄 효과로 얼룩에 강합니다.',
       scope:['5세대 수소화 에폭시','변색 없는 안정된 수지','로터스펄 얼룩 저항성','에그쉘 광택 무광 질감','24시간 경화 · 화학·UV 저항','프리미엄 공간 시공 최적'],
       priceTable:GROUT_PREM_PRICE,priceNote:GROUT_PREM_NOTE,
       tall:[rf('20250819_e45da763595ae.jpg'),rf('20250819_c2847e8df95ae.jpg')],
       gallery:[rf('20241115_28b2b1768128c.jpg'),rf('20241115_e0a427d098583.jpg'),rf('20250819_b71a494ba9165.jpg')]},
    ],
    process:['현장 점검·보양','백시멘트 제거','분진 청소·건조','프라이머 도포','줄눈제 주입','검수·마감','고객 확인','AS 안내'],
    priceTable:{head:['패키지','구성','가격'],rows:[['기본 패키지 (40평 미만)','화장실 2개 + 현관 1개 + 욕조 1개 + 젠다이 2개','350,000원'],['샤워부스 패키지','기본 구성 + 샤워부스 3면 + 세면대 2개 + 주방젠다이 1개','550,000원'],['벽·바닥 풀시공','샤워부스 구성 + 전체 벽 줄눈','1,000,000원'],['케라폭시 · 에보 등 프리미엄','화장실 2개 + 현관 + 곰팡이 오염방지','900,000원~'],['폴리싱 · 포세린 (거실/주방)','시공 범위 실측 후 확정','1,400,000 ~ 3,000,000원']]},
    gallery:[rf('20251007_6a5e7d384c0d6.jpg'),rf('20251007_7701195464117.jpg'),rf('20240530_8d32601529db0.jpg'),rf('20240530_f9a367fbab853.jpg'),rf('20241010_44320fecb71f1.jpg'),rf('20241010_6029c04824456.jpg')],
  },
  nano:{
    label:'나노코팅', title:'나노·논슬립 코팅', hero:'g-coating', tag:'나노',
    lead:'표면 오염방지와 바닥 미끄럼방지를 동시에. 화장실·상판·마루까지 생활 전 영역을 코팅합니다.',
    navDesc:'화장실·상판·마루·논슬립',
    note:'※ 나노코팅(표면 오염·물때 방지)과 논슬립코팅(바닥 미끄럼 방지)은 시공 범위가 다릅니다. 상담 시 목적에 맞게 안내드립니다.',
    children:[
      {id:'nano-bath',t:'화장실 나노코팅',d:'물때·오염을 밀어내는 초발수 코팅',img:rf('20240514_4206050fb00d7.jpg'),
       intro:'나노코팅, 이제는 필수입니다. 세면대·변기·타일 표면에 독일 BRIX 코팅제로 보호막을 형성해 물때와 오염물이 표면에 붙지 않게 합니다. 청소 시간이 절반으로 줄어듭니다.',
       scope:['세면대·변기 도기 코팅','벽·바닥 타일 표면 코팅','유리 파티션 발수 코팅','수전·금속 부위 광택 보호','독일 BRIX 안전 인증 약품','시공 후 발수 테스트 시연'],
       certImgs:[rf('20260304_1672bb17cef5f.png')],
       tall:[rf('20260304_4c8d52a2d6d9f.png'),rf('20250122_8ab0b4cc37728.jpg'),rf('20260304_164518e287cc3.png')]},
      {id:'nano-counter',t:'상판코팅',d:'주방 상판 스크래치·오염 방지',img:'g-material',
       intro:'상판코팅은 소수성·발수성·내마모성·향균 기능을 모두 탑재해 언제든 안전하게 식사할 수 있고, 청소가 편하고 위생적입니다. 세라믹 상판·엔지니어드스톤·인조대리석 모두 대응합니다.',
       scope:['인조대리석·엔지니어드스톤 대응','소수성·발수성 코팅막','내마모성 · 스크래치 방지','향균 기능 · 위생적 관리','열·오염 저항성 강화','식품 안전 인증 자재 사용'],
       tall:[rf('20260304_723b83255805b.png')]},
      {id:'nano-floor',t:'마루코팅',d:'생활기스 방지 프리미엄 코팅',img:rf('20251205_2f5985c8fba1c.jpg'),
       intro:'마루코팅은 화학물질과 액체에 대한 저항력을 제공하며 바닥 손상을 방지합니다. 코팅 없이 오염되면 교체 비용이 100~200만원. 하늘숲은 독일 브릭스 약품으로 프리미엄 마루코팅만 진행합니다.',
       scope:['강마루·강화마루·원목마루 대응','독일 브릭스 코팅제 사용','생활 스크래치 방지','변색·바램 방지','교체 대비 압도적 비용 절감','시공 당일 입주 가능'],
       tall:[rf('20251205_b37285b952253.png'),rf('20251205_27319ebce032a.png')]},
      {id:'nano-nonslip',t:'논슬립코팅',d:'욕실 낙상사고 예방 미끄럼방지',img:rf('20240610_1431a65f52d13.jpg'),
       priceTable:{head:['기준 서비스','비용'],rows:[['화장실 1개 (바닥 미백 포함)','400,000원'],['화장실 2개','750,000원']]},
       intro:'욕실은 물을 가장 많이 사용하는 공간입니다. 어린이·임산부·어르신은 미끄러짐에 특히 취약하기에 더욱 권장드립니다. Thessen no.1 논슬립 코팅제로 젖은 바닥에서도 미끄러지지 않게 합니다.',
       scope:['욕실 바닥 타일 논슬립','바닥 미백 시공 포함','외관 변화 없는 투명 시공','어르신·아이 안전 확보','Thessen no.1 전용 약품','시공 직후 사용 가능'],
       tall:[rf('20240610_fc872d9015355.jpg')]},
    ],
    materials:[
      {g:'나노코팅',n:'BRIX 그래핀 코팅제',o:'독일',f:['GRAPHENE THE GREAT 정품','안전 인증 4항목 불검출','화장실·상판·마루 공통'],img:rf('20260304_4c8d52a2d6d9f.png')},
      {g:'논슬립',n:'Thessen no.1 논슬립',o:'전용 약품',f:['논슬립 전용 코팅제','바닥 미백 병행 시공','욕실 낙상 예방'],img:rf('20240610_fc872d9015355.jpg')},
      {g:'소재 매칭',n:'케모나 · 나지올 · 나노포스',o:'수입',f:['소재별 전용 약품 매칭','네덜란드 · 미국 · 그리스','유리 · 도기 · 메탈 대응'],img:rf('20260304_f0cfca37a9fba.png')},
    ],
    process:['상담 및 진단','표면 세정','전처리·건조','1차 코팅','2차 코팅','경화','발수 테스트','AS 안내'],
    priceTable:{head:['서비스','20평대','30평대'],rows:[['나노코팅','350,000원 ~ 400,000원','400,000원 ~ 450,000원'],['상판코팅','270,000원 ~ 350,000원','400,000원 ~ 450,000원'],['마루코팅','270,000원 ~ 300,000원','350,000원 ~ 400,000원']]},
    gallery:['g-coating',rf('20240514_650c5ae595fbd.jpg'),rf('20240514_3bfff123ff495.jpg'),rf('20250122_626ae1358a8d3.jpg'),rf('20250122_5a6468c42a880.jpg'),rf('20250122_d3826406bfe31.jpg')],
  },
  elastic:{
    label:'탄성코트', title:'기능성 탄성코트', hero:'g-elastic', tag:'탄성', matChildren:true,
    lead:'결로와 곰팡이를 막는 프리미엄 탄성 도장. 베란다·벽면을 미세 균열까지 탄력 있게 감싸 보호합니다.',
    navDesc:'친환경 세라믹 · 올케어 · 스톤피쉬',
    priceLead:'친환경 세라믹 · 친환경 올케어 · 친환경 스톤피쉬 모두 전화 상담으로 안내드립니다.',
    priceNote:'※ 시공 부위·상태 확인 후 정확한 금액을 안내드립니다.',
    children:[
      {id:'elastic-ceramic',t:'친환경 세라믹',d:'향균 · 단열 · 결로 보완 친환경 인증 도료',img:rf('20241012_fd81d97eb9b4e.png'),grade:'Premium',origin:'네오케미칼',
       intro:'향균 기능, 단열 기능, 결로 보완에 내수성·내알칼리성까지 갖춘 친환경 인증 탄성코트입니다. 결로시험·단열시험을 통과한 도료로 베란다·대피실·실외기실·세탁실을 보호합니다.',
       scope:['향균 · 항곰팡이 기능','단열 기능 · 결로 보완','내수성 · 내알칼리성','환경표지 인증 제품','KCL 시험성적서 보유','견본 색상 16색'],
       samplesTitle:'친환경 세라믹 견본 색상',
       samples:[rf('20241012_6650fb30c9216.png')]},
      {id:'elastic-allcare',t:'친환경 올케어',d:'규조토 · 고령토 · 에어로겔 올인원 기능성',img:rf('20251021_466abc3f783ce.jpg'),grade:'올인원',origin:'네오케미칼',
       intro:'천연 다공성 광물 규조토·고령토와 초저밀도 신소재 에어로겔이 적용된 우수한 친환경 기능성 제품입니다. 항균·항곰팡이, 결로 보완·단열, 우수한 은폐력을 하나로 갖췄습니다.',
       scope:['천연 규조토 · 고령토 원료','에어로겔 신소재 적용','항균 · 항곰팡이 KCL 검증','결로 보완 · 단열','4대 중금속 · 포름알데히드 불검출','우수한 은폐력'],
       samplesTitle:'친환경 올케어 견본 색상',
       samples:[rf('20241012_4799907ec61e4.png')]},
      {id:'elastic-stonefish',t:'친환경 스톤피쉬',d:'불연 적합 · 스톤 질감 프리미엄 도료',img:rf('20241012_bae0314dbdb49.png'),grade:'기능성',origin:'네오케미칼',
       intro:'수용성 아크릴 수지와 기능성 안료를 주성분으로 설계된 고급 인테리어용 도료입니다. 불연재료 적합(KTR), 향균·단열·결로 보완 기능을 최상급으로 강화한 인증 제품입니다.',
       scope:['불연재료 적합 · KTR 시험','향균 기능 강화','단열 · 결로 보완 강화','스톤 질감 고급 마감','항곰팡이 시험 통과','견본 색상 16색 (D/E/F)'],
       samplesTitle:'친환경 스톤피쉬 SF 견본 색상',
       samples:[rf('20241012_119cb83d62fa4.png')]},
    ],
    process:['상담 및 진단','기존 도막 제거','균열 보수','프라이머','1차 탄성코팅','2차 마감','검수','AS 안내'],
    priceTable:{head:['패키지 (40평 미만)','시공 범위','비용'],rows:[['친환경 세라믹','앞베란다 · 대피실 · 실외기실 · 세탁실','전화 상담 안내'],['친환경 올케어','앞베란다 · 대피실 · 실외기실 · 세탁실','전화 상담 안내'],['친환경 스톤피쉬','앞베란다 · 대피실 · 실외기실 · 세탁실','전화 상담 안내']]},
    gallery:[rf('20251021_466abc3f783ce.jpg'),'g-elastic',rf('20251007_ba0ccaa3a4d54.jpg'),rf('20241012_fd81d97eb9b4e.png'),rf('20241012_bae0314dbdb49.png'),rf('20241012_3a7c3237758ae.png')],
  },
}

/* 시공사례: 원본 페이지별 생생현장 풀 그대로 매핑 */
const CASE_MAP: Record<string, string> = {'cleaning-new':'clean','cleaning-move':'clean','cleaning-sick':'clean','nano-bath':'clean','nano-counter':'clean','nano-floor':'clean','nano-nonslip':'clean','grout-polyurea':'clean','grout-asfarton':'clean','grout-asfarshine':'asfarshine','grout-nopearl':'nopearl','grout-kerapoxy':'kerapoxy','grout-starlike':'starlike','grout-fugarite':'fugarite','grout-biglion':'biglion','elastic-ceramic':'elB','elastic-allcare':'elA','elastic-stonefish':'elC'}

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const k = CASE_MAP[c.id]
    if (k && CASE_POOLS[k]) c.caseList = CASE_POOLS[k]
    if (STRIPS[c.id] && STRIPS[c.id].length) c.strip = STRIPS[c.id]
  }),
)

/* 후기: 내용 일치 → 원본 게재 페이지(출처) → 같은 서비스 순으로 매핑 */
const CHILD_REV: Record<string, [string, string]> = {'cleaning-new':['cleaning','new'],'cleaning-move':['cleaning','move'],'cleaning-sick':['cleaning','sickhouse'],'nano-bath':['nano','bathroom'],'nano-counter':['nano','countertop'],'nano-floor':['nano','floor'],'nano-nonslip':['nano','nonslip'],'grout-polyurea':['grout','polyurea'],'grout-asfarshine':['grout','asfarshine'],'grout-nopearl':['grout','nopearl'],'grout-asfarton':['grout','asfarton'],'grout-kerapoxy':['grout','kerapoxy'],'grout-starlike':['grout','starlike'],'grout-fugarite':['grout','fugarite'],'grout-biglion':['grout','biglion'],'elastic-ceramic':['elastic','general'],'elastic-allcare':['elastic','general'],'elastic-stonefish':['elastic','general']}

const REV_BY_FILE = new Map<string, RevItem>(REV_ITEMS.map((it) => [it.f, it]))

Object.values(SERVICES).forEach((s) =>
  s.children.forEach((c) => {
    const m = CHILD_REV[c.id]
    if (!m) return
    const seen = new Set<string>()
    const pick = (arr: (RevItem | undefined)[]): RevItem[] =>
      arr.filter((it): it is RevItem => !!it && it.svc === m[0] && !seen.has(it.f) && (seen.add(it.f), true))
    const exact = pick(REV_ITEMS.filter((it) => it.det === m[1]))
    const fromPage = pick((REV_PROV[c.id] || []).map((f) => REV_BY_FILE.get(f)))
    const same = pick(REV_ITEMS)
    const list = [...exact, ...fromPage, ...same].slice(0, 24)
    if (list.length) c.revList = list.map((it) => ({ src: it.f, cap: revCap() }))
  }),
)

/** 부모 서비스 키 목록 (GNB / 라우팅 순서) */
export const SERVICE_KEYS = Object.keys(SERVICES)

/** 'cleaning-new' → 'new' (라우트 세그먼트) */
export function childSlug(parentKey: string, child: ServiceChild): string {
  return child.id.slice(parentKey.length + 1)
}

/** 하위 서비스 링크 */
export function childHref(parentKey: string, child: ServiceChild): string {
  return `/${parentKey}/${childSlug(parentKey, child)}`
}

/** 라우트 세그먼트로 하위 서비스 조회 */
export function findChild(parentKey: string, slug: string): ServiceChild | undefined {
  return SERVICES[parentKey]?.children.find((c) => childSlug(parentKey, c) === slug)
}
