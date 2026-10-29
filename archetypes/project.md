+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = '{{ .Date }}'
draft = true
type = "project"
grant_type = ''
grant_id = ''
role = ''
is_PI = true
principal_investigator = ''
period_start = '{{ now.Format "2006-01" }}'
period_end = '{{ now.Format "2006-01" }}'
external = true
external_url = ''

# 内部ページを作る場合は external=false と render='always' をセットで指定する。
[build]
  render = 'never'
  list = 'always'
  publishResources = false
+++
