---
layout: default
title: Notes
description: Short field notes about design, software, and the web.
---

<section class="hero">
  <p class="eyebrow">Issue 08 · Late summer</p>
  <h1>Ideas worth keeping after the tab closes.</h1>
  <p class="lede">Small Hours is a notebook for durable interfaces, humane defaults, and software that earns its place.</p>
</section>

<section aria-labelledby="latest" class="notes">
  <div class="section-heading">
    <h2 id="latest">Latest notes</h2>
    <span>{{ site.posts | size }} entries</span>
  </div>
  {% for post in site.posts %}
  <article>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
    <div>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncatewords: 28 }}</p>
    </div>
  </article>
  {% endfor %}
</section>
