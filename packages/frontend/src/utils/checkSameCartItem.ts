import { IOrderOptionSnapShot } from "src/types/order";

export const checkSameCartItem = (prev: IOrderOptionSnapShot[], next: IOrderOptionSnapShot[]) => {
  // 길이가 다르다면? 다른 주문 정보
  if (prev.length !== next.length) {
    return false;
  }

  // 정렬할 경우 같은 옵션들을 가지고 있다면 같은 순서로 정렬됨
  prev.sort((a, b) => (a.optionName > b.optionName ? 0 : 1));
  next.sort((a, b) => (a.optionName > b.optionName ? 0 : 1));

  // 같다면? 내부 옵션 정보까지 같은지 확인 (optionDetail)
  // 옵션 이름과 옵션 세부 이름이 모두 같다면 같은 옵션이기 때문에 넘어감
  // 다르다면? 내부 아이템들은 sort를 진행해 같은 순서가 유지되기 때문에 이름이 다르면 다른 주문이다.
  const isSame = prev.every((_, i) => {
    const _prev = prev[i];
    const _next = next[i];

    if (
      _prev.optionDetailName !== _next.optionDetailName ||
      _prev.optionName !== _next.optionName
    ) {
      return false;
    }

    return true;
  });

  return isSame;
};
