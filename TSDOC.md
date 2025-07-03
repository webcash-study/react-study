
---

# 📘 TSDoc을 작성할만한 함수는?

## ✅ 언제 TSDoc을 작성해야 할까?

TSDoc은 **다른 사람이 이해하고 사용할 가능성이 높은 함수**에 주로 작성합니다.
아래 기준에 해당하면 TSDoc을 작성하는 것이 좋습니다.

---

## 1. 외부에 공개되거나 재사용 가능한 함수

> 라이브러리, 공용 유틸 함수 등

```ts
/**
 * 두 숫자의 평균을 계산합니다.
 *
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 평균
 */
function average(a: number, b: number): number {
  return (a + b) / 2;
}
```

* 다른 사람이 사용할 가능성이 있는 함수
* 함수명만으로 의도가 불명확할 수 있음

---

## 2. 로직이 복잡하거나 직관적이지 않은 함수

> 계산식, 날짜 처리, 파싱 등

```ts
/**
 * 주어진 날짜가 속한 주의 시작 날짜(월요일)를 반환합니다.
 *
 * @param date - 기준 날짜
 * @returns 해당 주의 월요일 날짜
 */
function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}
```

* 한 줄로 설명되지 않는 처리 로직
* 코드를 봐도 의도가 모호할 경우 문서화 필요

---

## 3. API 처리, 네트워크 요청, 비즈니스 핵심 로직

> 실제 동작 흐름에 영향을 주는 주요 함수

```ts
/**
 * 서버에 POST 요청을 보냅니다.
 *
 * @param url - 요청을 보낼 URL
 * @param data - 전송할 데이터 객체
 * @returns 서버 응답 객체
 * @throws 네트워크 오류 또는 서버 오류 발생 시 예외
 */
async function postRequest<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) throw new Error('Request failed');

  return res.json();
}
```

* 타입이 복잡하거나 예외 상황이 있는 경우
* 협업 시 의사소통을 위해 꼭 문서화 필요

---

## ❌ TSDoc 생략해도 되는 경우

| 경우                   | 설명                                            |
| -------------------- | --------------------------------------------- |
| 내부에서만 사용하는 간단한 헬퍼 함수 | `const clamp = () => {}` 등                    |
| 직관적인 매핑 함수           | `const getColor = (type) => colorMap[type]` 등 |
| 실험용/일회성 코드           | 테스트 코드, 임시 작성 함수 등                            |

> 단, **나중에 외부로 공개될 가능성이 있다면 TSDoc을 미리 써두는 것이 좋습니다.**

---

## ✅ 요약: 언제 TSDoc을 작성해야 할까?

| 우선순위 | 대상 함수 종류                 |
| ---- | ------------------------ |
| ⭐⭐⭐  | 공개 API, 라이브러리 함수         |
| ⭐⭐   | 로직이 복잡한 함수, 공용 유틸 함수     |
| ⭐    | 내부에서만 쓰이는 간단한 함수 (생략 가능) |

---

## 💡 판단 기준

> 📌 *“이 함수, 내가 3개월 뒤 다시 보면 설명 없이 이해 가능할까?”*

* **그렇지 않다면 → TSDoc 작성하세요.**
* 미래의 나를 위한 보험입니다.

---

## P.S.
* 위 내용처럼 로직이 복잡하거나 공용으로 쓰이는 함수에 TSDoc를 작성해야 한다고 생각합니다.
* 공용 함수라도 기능이 단순하다면 TSDoc을 생략해도 된다고 생각합니다다. 
  * 예: `const formatPrice = (price: number) => price.toLocaleString()`
  * 이유: 간단한 함수에 문서를 추가하면 오히려 코드 가독성이 떨어질 수 있음 
