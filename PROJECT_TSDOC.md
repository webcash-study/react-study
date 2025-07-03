# AICFO FRONT REACT 함수 TSDoc 작성 가이드 (재검증)

## 📋 개요
이 문서는 현재 AICFO REACT 내 함수들을 재분석하여 TSDoc 작성이 필요한 함수들과 불필요한 함수들을 정리한 가이드입니다. 간단한 공용 함수들은 제외하고 복잡한 비즈니스 로직이 포함된 함수들에 집중합니다.

---

## ✅ TSDoc 작성이 필요한 함수들

### 1. 복잡한 비즈니스 로직 함수들

#### `src/hooks/useApiInterceptor.ts`
- **`useApiInterceptor`** - API 인터셉터 훅
  - **복잡도**: 🔴 높음
  - **이유**: 토큰 갱신, 요청 재시도, 에러 처리 등 복잡한 로직 포함
  - **예시**:
  ```typescript
  /**
   * API 요청 인터셉터 훅
   * - JWT 토큰 자동 갱신 처리
   * - 401/403 에러 시 자동 토큰 갱신 후 요청 재시도
   * - 토큰 갱신 중 발생하는 요청들을 큐에 저장하여 처리
   * 
   * @example
   * ```tsx
   * function App() {
   *   useApiInterceptor(); // 앱 최상위에서 한 번만 호출
   *   return <div>...</div>;
   * }
   * ```
   * 
   * @remarks
   * - 토큰 갱신 중에는 isRefreshing 플래그로 중복 요청 방지
   * - 실패한 요청들은 failedQueue에 저장되어 토큰 갱신 후 재시도
   * - 리프레시 토큰이 유효하지 않으면 로그아웃 처리
   */
  ```

- **`getRefreshToken`** - 리프레시 토큰 요청 함수
  - **복잡도**: 🟡 중간
  - **이유**: 토큰 갱신 API 호출 로직
  - **예시**:
  ```typescript
  /**
   * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청
   * 
   * @param refreshToken - 현재 저장된 리프레시 토큰
   * @returns 새로운 액세스 토큰과 리프레시 토큰
   * 
   * @example
   * ```typescript
   * const tokenResult = await getRefreshToken(currentRefreshToken);
   * if (tokenResult.success) {
   *   // 새로운 토큰으로 헤더 업데이트
   *   setHeader(tokenResult.body.jwtToken);
   * }
   * ```
   */
  ```

#### `src/components/answers/aiResponse/footer/CsvExporter.tsx`
- **`CsvExporter`** 클래스
  - **복잡도**: 🔴 높음
  - **이유**: 복잡한 CSV 생성 로직, 테이블 데이터 처리, HTML 파싱 등
  - **예시**:
  ```typescript
  /**
   * CSV 내보내기 클래스
   * - 테이블 데이터 또는 HTML 테이블에서 CSV 파일 생성
   * - 다중 테이블 데이터 병합 및 헤더 매핑 처리
   * 
   * @example
   * ```typescript
   * // 테이블 데이터로 CSV 생성
   * const exporter = new CsvExporter(
   *   "매출 현황 조회", 
   *   [{ key: { desc: "월별 매출" }, data: [...] }]
   * );
   * exporter.exportCsv();
   * 
   * // HTML 테이블에서 CSV 생성
   * const exporter = new CsvExporter();
   * exporter.exportCsv(); // DOM의 table 요소들을 자동 감지
   * ```
   * 
   * @remarks
   * - 테이블 데이터가 있으면 exportFromTableData() 사용
   * - 없으면 DOM의 table 요소들을 파싱하여 exportFromHtmlTables() 사용
   * - CSV 헤더는 data_header의 change_title 값을 사용
   */
  ```

#### `src/hooks/useReport.ts`
- **`useReport`** - 보고서 관련 커스텀 훅
  - **복잡도**: 🔴 높음
  - **이유**: 다양한 보고서 타입별 조회 로직, 날짜 계산, UTC 변환 등
  - **예시**:
  ```typescript
  /**
   * 보고서 조회 커스텀 훅
   * - 일일/주간/월간/전체 보고서 조회 기능
   * - 한국 시간대 기준 날짜 처리
   * - 보고서 타입별 자동 날짜 계산
   * 
   * @returns 보고서 데이터, 로딩 상태, 조회 함수들
   * 
   * @example
   * ```tsx
   * function ReportComponent() {
   *   const { report, isReportLoading, handleGetReport } = useReport();
   *   
   *   // 일일 보고서 조회 (어제 날짜)
   *   const handleDayReport = () => handleGetReport(undefined, undefined, 'D');
   *   
   *   // 주간 보고서 조회 (지난주 월~일)
   *   const handleWeekReport = () => handleGetReport(undefined, undefined, 'W');
   *   
   *   // 월간 보고서 조회 (지난달)
   *   const handleMonthReport = () => handleGetReport(undefined, undefined, 'M');
   * }
   * ```
   * 
   * @remarks
   * - convertUTCToLocal: UTC 시간을 한국 시간으로 변환
   * - 보고서 타입: 'D'(일일), 'W'(주간), 'M'(월간), 'A'(전체)
   */
  ```

- **`getWeekReportDate`** - 주간 보고서 날짜 계산 함수
  - **복잡도**: 🟡 중간
  - **이유**: 주간 날짜 범위 계산 로직
  - **예시**:
  ```typescript
  /**
   * 주간 보고서용 날짜 범위 계산
   * - 지난주 월요일부터 이번주 일요일까지 계산
   * 
   * @returns [지난주 월요일, 이번주 일요일] 날짜 배열
   * 
   * @example
   * ```typescript
   * const [lastMonday, thisSunday] = getWeekReportDate();
   * console.log(lastMonday); // 2024-01-15 (월)
   * console.log(thisSunday); // 2024-01-21 (일)
   * ```
   */
  ```

- **`getMonthReportDate`** - 월간 보고서 날짜 계산 함수
  - **복잡도**: 🟡 중간
  - **이유**: 월간 날짜 범위 계산 로직
  - **예시**:
  ```typescript
  /**
   * 월간 보고서용 날짜 범위 계산
   * - 지난달 1일부터 지난달 마지막일까지 계산
   * 
   * @returns [지난달 1일, 지난달 마지막일] 날짜 배열
   * 
   * @example
   * ```typescript
   * const [lastMonthStart, lastMonthEnd] = getMonthReportDate();
   * console.log(lastMonthStart); // 2023-12-01
   * console.log(lastMonthEnd);   // 2023-12-31
   * ```
   */
  ```

#### `src/hooks/query/mutationUtils.ts`
- **`handleGlobalError`** - 글로벌 에러 처리 함수
  - **복잡도**: 🟡 중간
  - **이유**: 상태 코드별 에러 처리 로직
  - **예시**:
  ```typescript
  /**
   * 글로벌 에러 처리 함수
   * - 401/403 에러 시 로그아웃 처리
   * - 기타 에러는 알림으로 표시
   * - 리프레시 토큰 관련 에러는 무시
   * 
   * @param error - Axios 에러 객체
   * 
   * @example
   * ```typescript
   * try {
   *   await apiCall();
   * } catch (error) {
   *   handleGlobalError(error);
   *   // 401/403이면 자동으로 로그아웃 페이지로 이동
   *   // 기타 에러면 알림 표시
   * }
   * ```
   * 
   * @remarks
   * - 401/403: 로그아웃 페이지로 리다이렉트
   * - 리프레시 토큰 에러: 무시 (중복 알림 방지)
   * - 기타 에러: antd notification으로 표시
   */
  ```

- **`createMutation`** - 뮤테이션 생성 유틸리티 함수
  - **복잡도**: 🟡 중간
  - **이유**: 제네릭 타입과 글로벌 에러 처리 로직
  - **예시**:
  ```typescript
  /**
   * 글로벌 에러 처리가 포함된 뮤테이션 생성 함수
   * - 모든 뮤테이션에 자동으로 에러 처리 적용
   * - 성공 시 서버 응답의 success 필드 검증
   * 
   * @template TData - 뮤테이션 성공 시 반환 데이터 타입
   * @template TVariables - 뮤테이션 매개변수 타입
   * @param config - 뮤테이션 설정
   * @returns 글로벌 에러 처리가 적용된 뮤테이션
   * 
   * @example
   * ```typescript
   * const useCustomMutation = createMutation({
   *   mutationFn: (data: { id: number }) => api.updateData(data),
   *   onSuccess: (result) => {
   *     console.log('성공:', result);
   *   },
   *   onError: (error) => {
   *     console.log('커스텀 에러 처리:', error);
   *   }
   * });
   * ```
   */
  ```

#### `src/hooks/useFds.ts`
- **`useFdsLists`** - FDS 리스트 관리 훅
  - **복잡도**: 🟡 중간
  - **이유**: 복잡한 상태 관리, 페이지네이션, 데이터 업데이트 로직
  - **예시**:
  ```typescript
  /**
   * FDS 알림 리스트 관리 훅
   * - FDS 알림 목록 조회, 읽음 처리, 삭제 기능
   * - 페이지네이션 지원 (추가 데이터 로드)
   * - 실시간 알림 카운트 업데이트
   * 
   * @param getFdsAlarmCnt - 알림 카운트 갱신 함수
   * @returns FDS 리스트 상태와 핸들러 함수들
   * 
   * @example
   * ```tsx
   * function FdsComponent() {
   *   const { fdsAlarmCnt, getFdsAlarmCnt } = useFdsAlarmCnt();
   *   const { 
   *     fdsLists, 
   *     handleGetFdsLists, 
   *     handleSetAlarmRead,
   *     isFetchingNextPage 
   *   } = useFdsLists(getFdsAlarmCnt);
   *   
   *   // 초기 데이터 로드
   *   useEffect(() => {
   *     handleGetFdsLists({ page: 1 });
   *   }, []);
   *   
   *   // 추가 데이터 로드 (무한 스크롤)
   *   const loadMore = () => {
   *     handleGetFdsLists({ 
   *       page: nextPage, 
   *       appendData: true 
   *     });
   *   };
   * }
   * ```
   */
  ```

### 2. 복잡한 유틸리티 함수들

#### `src/utils/format.ts`
- **`calculateWeightedAverage`** - 가중 평균 계산 함수
  - **복잡도**: 🟡 중간
  - **이유**: 복잡한 배열 처리와 가중치 계산 로직
  - **예시**:
  ```typescript
  /**
   * 가중 평균 계산 함수
   * - 각 항목의 값과 가중치를 곱한 후 합계를 가중치 합계로 나눔
   * 
   * @param items - 가중치와 값이 포함된 객체 배열
   * @returns 계산된 가중 평균값
   * 
   * @example
   * ```typescript
   * const items = [
   *   { value: 80, weight: 0.3 },  // 시험 30%
   *   { value: 90, weight: 0.4 },  // 과제 40%
   *   { value: 85, weight: 0.3 }   // 출석 30%
   * ];
   * 
   * const average = calculateWeightedAverage(items);
   * console.log(average); // 85.5
   * 
   * // 계산 과정: (80*0.3 + 90*0.4 + 85*0.3) / (0.3 + 0.4 + 0.3) = 85.5
   * ```
   */
  ```

#### `src/utils/date.ts`
- **`getKoreaDate`** - 한국 시간 기준 날짜 계산 함수
  - **복잡도**: 🟡 중간
  - **이유**: 복잡한 시간대 변환과 날짜 계산 로직
  - **예시**:
  ```typescript
  /**
   * 한국 시간 기준 날짜 계산 함수
   * - UTC 시간을 한국 시간(UTC+9)으로 변환
   * - 지정된 일수만큼 더하거나 뺄 수 있음
   * 
   * @param date - 기준 날짜
   * @param plusDays - 더할 일수 (기본값: 0)
   * @returns 한국 시간 기준으로 계산된 날짜
   * 
   * @example
   * ```typescript
   * const utcDate = new Date('2024-01-15T00:00:00Z');
   * 
   * // 한국 시간으로 변환
   * const koreaDate = getKoreaDate(utcDate);
   * console.log(koreaDate); // 2024-01-15T09:00:00.000Z
   * 
   * // 3일 후
   * const futureDate = getKoreaDate(utcDate, 3);
   * console.log(futureDate); // 2024-01-18T09:00:00.000Z
   * 
   * // 2일 전
   * const pastDate = getKoreaDate(utcDate, -2);
   * console.log(pastDate); // 2024-01-13T09:00:00.000Z
   * ```
   * 
   * @remarks
   * - UTC+9 시간대 적용 (9시간 추가)
   * - plusDays는 24시간 * 60분 * 60초 * 1000밀리초 단위로 계산
   */
  ```

- **`formatKoreanDate`** - 한국 시간대 기준 날짜 변환 함수
  - **복잡도**: 🟡 중간
  - **이유**: 복잡한 UTC 변환과 한국 시간대 처리 로직
  - **예시**:
  ```typescript
  /**
   * 한국 시간대 기준 날짜 변환 함수
   * - UTC 시간을 한국 시간(UTC+9)으로 변환하여 YYYY-MM-DD 형식으로 반환
   * - getUTCFullYear, getUTCMonth, getUTCDate 사용하여 정확한 시간대 처리
   * 
   * @param date - 변환할 날짜
   * @returns 한국 시간 기준 YYYY-MM-DD 형식 문자열
   * 
   * @example
   * ```typescript
   * const utcDate = new Date('2024-01-15T23:30:00Z');
   * 
   * const koreanDate = formatKoreanDate(utcDate);
   * console.log(koreanDate); // "2024-01-16"
   * 
   * // UTC 23:30 → 한국 시간 08:30 (다음날)
   * // 따라서 날짜가 15일에서 16일로 변경됨
   * ```
   * 
   * @remarks
   * - UTC+9 시간대 적용
   * - getUTCMonth는 0부터 시작하므로 +1 처리
   * - 날짜가 자정을 넘어가면 다음 날로 계산됨
   */
  ```

#### `src/components/layout/LeftSidebar/Fds/components/FdsSettingModal/utils/index.ts`
- **`formatAmount`** - 한국어 단위 금액 포맷팅 함수
  - **복잡도**: 🟡 중간
  - **이유**: 복잡한 한국어 단위 변환 로직 (만, 억, 조 등)
  - **예시**:
  ```typescript
  /**
   * 한국어 단위 금액 포맷팅 함수
   * - 숫자를 한국어 단위(만, 억, 조, 경, 해, 자, 양, 구, 간)로 변환
   * - 4자리씩 그룹화하여 단위 적용
   * 
   * @param amount - 포맷팅할 금액 (숫자 또는 문자열)
   * @returns 한국어 단위가 적용된 금액 문자열
   * 
   * @example
   * ```typescript
   * formatAmount(1234567);     // "123만 4567"
   * formatAmount(100000000);   // "1억"
   * formatAmount(1234567890);  // "12억 3456만 7890"
   * formatAmount(1000000000000); // "1조"
   * formatAmount(-5000000);    // "-500만"
   * formatAmount(0);           // "0"
   * ```
   * 
   * @remarks
   * - 4자리씩 그룹화하여 단위 적용
   * - 0인 경우 단위 없이 "0" 반환
   * - 음수는 "-" 기호 유지
   * - 단위: 만(10^4), 억(10^8), 조(10^12), 경(10^16), 해(10^20), 자(10^24), 양(10^28), 구(10^32), 간(10^36)
   */
  ```

### 3. 기타 복잡한 함수들

#### `src/hooks/useGlobalInitialize.ts`
- **`useGlobalInitialize`** - 전역 초기화 훅
  - **복잡도**: 🟢 낮음
  - **이유**: 단순하지만 앱 전체에 영향을 주는 초기화 로직
  - **예시**:
  ```typescript
  /**
   * 전역 초기화 훅
   * - 앱 전체 설정을 한 번만 초기화
   * - 중복 실행 방지를 위한 플래그 사용
   * - antd notification 설정 적용
   * 
   * @example
   * ```tsx
   * function App() {
   *   useGlobalInitialize(); // 앱 최상위에서 한 번만 호출
   *   
   *   return (
   *     <div>
   *       {/* 앱 컴포넌트들 */}
   *     </div>
   *   );
   * }
   * ```
   * 
   * @remarks
   * - initialized 플래그로 중복 실행 방지
   * - notification 설정: 4초 지속, 상단 배치, 진행바 표시, 호버 시 일시정지, 최대 1개
   */
  ```

---

## ❌ TSDoc 작성이 불필요한 함수들

### 1. 단순한 Store 함수들
- **`recentQuestionStore`** - 최근 질문 스토어
- **`recommendQuestionStore`** - 추천 질문 스토어  
- **`useSidebarStore`** - 사이드바 스토어
- **`useAdminTokenStore`** - 관리자 토큰 스토어
- **`useAdminStore`** - 관리자 스토어

**이유**: Zustand 스토어는 상태 관리용으로 단순한 구조를 가지며, 타입 정의로 충분히 이해 가능

### 2. 단순한 UI 컴포넌트 함수들
- **`MainBanner`**, **`MainContent`**, **`SearchBar`**, **`RecommendQuestions`**
- **`SidebarList`**, **`AlarmModal`**, **`VocModal`**, **`FirstSidebar`**
- **`ReportItem`**, **`ReportHeader`**, **`FdsLists`**, **`RecentQuestionList`**
- **`NoticeModal`**, **`AnswerSection`**, **`ChatBox`**, **`Charts`**
- **`NewsChartTable`**, **`ChartTable`**, **`IconWrapper`**, **`ActionButtons`**
- **`InfoPopover`**, **`SqlDebugInfo`**, **`Skeleton`**

**이유**: React 컴포넌트는 props 타입 정의와 컴포넌트명으로 충분히 이해 가능

### 3. 단순한 유틸리티 함수들
- **`calculateChange`** - 단순한 변화율 계산 (current - previous) / previous * 100
- 예시코드
```
export const calculateChange = (current: number, previous: number) => {
  const change = current - previous;
  const percentage = (change / previous) * 100;
  return percentage;
};
```
- **`formatDate`** - 단순한 날짜 포맷팅 (Intl.DateTimeFormat 사용)
- 예시코드
```
const formatDate = (value: string) => {
  if (!value) return value;
  // yyyyMMddHHmmss 형식 체크
  if (value.length === 14) {
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  // yyyyMMdd 형식 체크
  if (value.length === 8) {
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  return value;
};
```
- **`formatStringDate`** - 단순한 문자열 날짜 포맷팅
- **`getKoreanWeekday`** - 단순한 요일 매핑 (배열 인덱스 사용)
- **`formatStringToDate`** - 단순한 문자열 파싱 (split, replace 사용)
- **`formatDateKR`** - 단순한 한국어 날짜 형식 변환
- **`isMobileDevie`** - 단순한 디바이스 감지 (userAgent 검사)
- **`getStoreUrl`** - 단순한 스토어 URL 반환
- **`showErrorNotification`** - 단순한 에러 알림 표시
- **`getFreeDDay`** - 단순한 D-Day 계산
- **`getWeekRange`** - 단순한 주간 범위 계산

**이유**: 함수명과 구현만으로도 충분히 이해 가능한 단순한 로직

### 4. 단순한 커스텀 훅들
- **`useFdsAlarmCnt`** - 단순한 FDS 알림 카운트 관리
- **`useAlarm`** - 단순한 알림 관리
- **`useAlarmCnt`** - 단순한 알림 카운트 관리
- **`useAdmin`** - 단순한 관리자 모드 토글
- **`useAdminToken`** - 단순한 관리자 토큰 관리
- **`useVoc`** - 단순한 VOC 저장
- **`useRecommend`** - 단순한 추천 질문 관리
- **`useRedirectToStore`** - 단순한 스토어 리다이렉트
- **`useGetVocDetail`** - 단순한 VOC 상세 조회
- **`useCompanyHook`** - 단순한 회사 정보 관리

**이유**: 단순한 상태 관리와 API 호출만 포함하여 복잡도가 낮음

### 5. 단순한 상수와 설정
- **`REPORT_LIST`** - 보고서 리스트 상수
- **`MIN_AMOUNT`** - 최소 금액 상수
- **`iconRegistry`** - 아이콘 레지스트리
- **`queryClient`** - React Query 클라이언트 설정

**이유**: 상수와 설정은 값 자체로 의미가 명확함

---

## 📝 TSDoc 작성 우선순위 (재검증)

### 🔴 높은 우선순위 (즉시 작성 필요)
1. **`useApiInterceptor`** - 복잡한 토큰 갱신 및 인터셉터 로직
2. **`CsvExporter`** 클래스 - 복잡한 CSV 생성 및 데이터 처리 로직
3. **`useReport`** - 복잡한 보고서 조회 및 날짜 계산 로직

### 🟡 중간 우선순위 (점진적 작성)
1. **`handleGlobalError`** - 에러 처리 로직
2. **`createMutation`** - 뮤테이션 생성 로직
3. **`useFdsLists`** - 복잡한 상태 관리 및 페이지네이션 로직
4. **`calculateWeightedAverage`** - 복잡한 계산 로직
5. **`getKoreaDate`** - 복잡한 시간대 계산 로직
6. **`formatKoreanDate`** - 복잡한 UTC 변환 로직
7. **`formatAmount`** (FdsSettingModal) - 복잡한 한국어 단위 변환 로직
8. **`getWeekReportDate`** - 주간 날짜 계산 로직
9. **`getMonthReportDate`** - 월간 날짜 계산 로직

### 🟢 낮은 우선순위 (여유 있을 때 작성)
1. **`useGlobalInitialize`** - 전역 초기화 로직

---

## 💡 TSDoc 작성 팁

1. **함수의 목적과 동작 방식**을 명확히 설명
2. **매개변수와 반환값**의 타입과 의미 설명
3. **예외 상황이나 주의사항** 명시
4. **사용 예시** 제공 (복잡한 함수의 경우)
5. **비즈니스 로직**이 포함된 경우 해당 규칙 설명
6. **한국어**로 작성하여 팀원들이 이해하기 쉽게 작성
7. **복잡도 표시** (🔴 높음, 🟡 중간, 🟢 낮음)로 우선순위 파악
8. **@remarks** 태그를 사용하여 추가 설명 제공 