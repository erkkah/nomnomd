---
{
    "header": "nomnomd example v0.0.1",
    "title": "nomnomd"
}
---

# Basic examples

The rendered version of this page should look something like [this](rendered.png).

## Emojis:

[nomnoml] + [md] = :heart:

## Embedded nomnoml:

```nomnoml
#direction: right
[md|[nomnoml]] -> [HTML|[SVG]]
```

## Included nomnoml:

![nomnoml as image](diagram.noml)

## File list:

![- {title}](subdir)

## Included markdown:

![](included.md)

## Linked markdown:

Link to [markdown file](linked.md).

## Syntax highlighting:

```typescript
const a = "Syntax" + "highlighting";
```

[nomnoml]: https://nomnoml.com
[md]: https://www.markdownguide.org
