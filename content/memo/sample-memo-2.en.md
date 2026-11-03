---
title: '[Dummy] Recording computational experiments'
date: "2026-09-02T12:00:00+09:00"
lastmod: "2026-09-08T12:00:00+09:00"
draft: false
type: memo
---

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

## Bash code example

```bash
#!/usr/bin/env bash
set -euo pipefail

# Print three calculation steps.
for step in 1 2 3; do
    printf 'step=%d\n' "$step"
done
```

## PowerShell (pwsh) code example

```powershell
$ErrorActionPreference = 'Stop'
$steps = 1..3

# Print three calculation steps.
foreach ($step in $steps) {
    Write-Output "step=$step"
}
```

## LaTeX code example

```latex
\documentclass{article}
\usepackage{amsmath}

\begin{document}
% A central difference approximation.
\begin{align*}
    u(x) &= x^2, \\
    u'(x) &\approx \frac{u(x+h)-u(x-h)}{2h}.
\end{align*}
\end{document}
```

## Julia code example

```julia
# Approximate a derivative by a central difference.
u(x) = x^2

function central_difference(f, x; h=0.001)
    return (f(x + h) - f(x - h)) / (2h)
end

x = 1.0
du = central_difference(u, x)
println("u'($x) = $du")
```
