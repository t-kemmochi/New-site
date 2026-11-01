+++
title = "【ダミー】計算実験の記録"
date = '2026-09-02T12:00:00+09:00'
lastmod = '2026-09-08T12:00:00+09:00'
draft = false
type = "memo"
+++

これは表示確認用のダミーデータです。実際の論文・研究活動・実績を示すものではありません。

<!--more-->

## 概要

計算実験の記録についてのサンプル本文です。

- 見出しと本文の表示を確認します。
- 日本語版と英語版の切り替えを確認します。

## C言語のコード例

中心差分で関数の微分を近似する、表示確認用のサンプルです。

```c
#include <stdio.h>

/* Approximate the derivative of u(x) = x * x. */
static double u(double x) {
    return x * x;
}

int main(void) {
    const double x = 1.0;
    const double h = 0.001;
    const double du = (u(x + h) - u(x - h)) / (2.0 * h);

    printf("u'(%.1f) = %.6f\n", x, du);
    return 0;
}
```
