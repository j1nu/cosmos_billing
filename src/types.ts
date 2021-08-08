export interface Bill {
  // 이용일시
  usedDate: string

  // 가맹점명
  storeName: string

  // 이용금액
  usedAmount: number

  // 이용구분
  usedType?: string

  // 매입상태
  purchaseStatus?: string
}
