// 設定を先に読み込み、続くMathJax本体の起動時に使用する。
window.MathJax = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    // tex-chtmlにはAMS拡張が含まれる。align・align*などに対応する。
    packages: { '[+]': ['ams'] }
  },
  options: {
    skipHtmlTags: [
      'script', 'noscript', 'style', 'textarea', 'pre', 'code',
      'annotation', 'annotation-xml'
    ]
  }
};
