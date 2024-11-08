export function arrayShuffle(userData: {number: number; name: string}[]): {number: number; name: string}[] {
  for(let i = (userData.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    let tmp = userData[i];
    userData[i] = userData[r];
    userData[r] = tmp;
  }
  return userData;
}
export function countTrueValues(matrix: boolean[][]) {
  let count = 0;

  // 行のループ
  for (let i = 0; i < matrix.length; i++) {
    // 行が undefined でないことを確認
    if (matrix[i] !== undefined) {
      // 列のループ
      for (let j = 0; j < matrix[i].length; j++) {
        // true の場合は count を増やす
        if (matrix[i][j] === true) {
          count++;
        }
      }
    }
  }
  return count;
}
