---
layout: page
title: Tags
permalink: /tags/
jekyll-theme-WuK:
  default:
    sidebar:
      open: true
  tags:
    pie_chart:
      enable: false
    count: true
    toc:
      enable: false
---

<style>
body {
   background-color: #000;    
   margin: 0;
   overflow: hidden;
   background-repeat: no-repeat;
   
}
canvas{
   position:absolute;
   left:0;
   top:0;
   z-index:-1;
   background-attachment: fixed;
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>
<canvas id="canvas" width="100%" height="4000px"></canvas>

<audio preload="auto" autoplay loop>
   <source src="https://dewanmukto.github.io/asset/audio/frlegendsost2.mp3" type="audio/mpeg" preload="auto" />
</audio>

Categories, tags, and other nonsense identifiers to keep things organized

{% if page.jekyll-theme-WuK.tags.pie_chart.enable %}
1999-06-21-tags.md

```mermaid
pie
{{ page.jekyll-theme-WuK.tags.pie_chart.title }}
{% for tag in site.tags reversed %}
"{{ tag[0] }}" : {{ tag[1].size }}
{% endfor %}
```

{% endif %}
{% if page.jekyll-theme-WuK.tags.toc.enable %}
- TOC
{:toc}
{% endif %}
{% for tag in site.tags reversed %}
## <span class="fa-layers fa-fw"><i class="fas fa-tag"></i>{% if page.jekyll-theme-WuK.tags.count %}<span class="fa-layers-counter">{{ tag[1].size }}</span>{% endif %}</span> {{ tag[0] }}

{% for post in tag[1] %}
- *{{ post.date | date_to_string }}* [{{ post.title }}]({{ post.url | relative_url }}){% endfor %}
{% endfor %}
