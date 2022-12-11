---
title: Python Example
category: Tech
tags:
  - Python
  - スクレイピング
---

## pip

```shell
pip install requests bs4
```

## get request

```python
import requests

url = "https://example.com"

res = requests.get(url)
```

## create soup

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(res.text, "html.parser")
```

## select element

```python
el = soup.select("p")[0]

print(el)
```
