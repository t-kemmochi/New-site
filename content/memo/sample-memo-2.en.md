+++
title = "[Dummy] Recording computational experiments"
date = '2026-09-02T12:00:00+09:00'
lastmod = '2026-09-08T12:00:00+09:00'
draft = false
type = "memo"
+++

This is dummy content for display testing. It does not describe real publications, research activities, or achievements.

<!--more-->

## Overview

Sample content about recording computational experiments.

- Check headings and body text.
- Check switching between Japanese and English.

## C code example

This display sample approximates a derivative using a central difference.

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
