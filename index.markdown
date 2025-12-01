---
layout: page
title: Toxic Stew
subtitle: A cookbook on how to go viral on Reddit
---

# Welcome to Toxic Stew

Ever wondered why some Reddit posts explode with thousands of upvotes while others languish in obscurity? We analyzed millions of Reddit posts to uncover the secret recipe for viral content.

## What We're Cooking

In this project, we're exploring:

- **Timing is Everything**: When should you post for maximum visibility?
- **The Perfect Title**: What makes a headline irresistible?
- **Subreddit Strategies**: Each community has its own flavor
- **Content Types**: What types of posts get the most engagement?
- **The Controversy Factor**: Does stirring the pot boost engagement?
- **Community Dynamics**: How do subreddits interact with each other?

## The Ingredients

Our analysis uses data from the [Stanford SNAP Reddit datasets](https://snap.stanford.edu/data/index.html):

- **858,490 hyperlinks** between 55,863 subreddits
- Sentiment analysis of cross-subreddit posts
- Text properties including readability, sentiment, and linguistic features
- User and subreddit embeddings
- Temporal data spanning January 2014 to April 2017

### Data Sources

We're working with two primary datasets from Stanford SNAP:

1. **[Reddit Hyperlinks Network](https://snap.stanford.edu/data/soc-RedditHyperlinks.html)**: A directed, signed, temporal network of subreddit-to-subreddit hyperlinks with rich text features and sentiment annotations.

2. **[Reddit Embeddings](https://snap.stanford.edu/data/web-RedditEmbeddings.html)**: Vector representations of subreddits and users for advanced analysis.

## Our Approach

We combine:
- **Network Analysis**: Understanding community relationships and influence
- **Natural Language Processing**: Analyzing titles and content
- **Sentiment Analysis**: Measuring emotional tone and controversy
- **Temporal Analysis**: Identifying optimal posting times
- **Machine Learning**: Predicting viral potential

## The Recipe

Our goal is to create a data-driven "cookbook" with actionable strategies for Reddit success. Each "recipe" will be backed by rigorous statistical analysis of real Reddit data.

## Clustered Embeddings
<div class="flourish-embed flourish-hierarchy" data-src="visualisation/25685009"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25685009/thumbnail" width="100%" alt="hierarchy visualization" /></noscript></div>

### Cluster sentiment

<div class="flourish-embed flourish-chart" data-src="visualisation/26532988"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26532988/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

### Directed hate graph

<div class="flourish-embed flourish-network" data-src="visualisation/26533122"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26533122/thumbnail" width="100%" alt="network visualization" /></noscript></div>

### Hate graph

<div class="flourish-embed flourish-network" data-src="visualisation/25414151"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25414151/thumbnail" width="100%" alt="network visualization" /></noscript></div>

### Selector

<ul class="nav nav-tabs" id="viewTabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="view1-tab" data-toggle="tab" data-target="#view1" type="button" role="tab" aria-controls="view1" aria-selected="true">View 1</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view2-tab" data-toggle="tab" data-target="#view2" type="button" role="tab" aria-controls="view2" aria-selected="false">View 2</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view3-tab" data-toggle="tab" data-target="#view3" type="button" role="tab" aria-controls="view3" aria-selected="false">View 3</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view4-tab" data-toggle="tab" data-target="#view4" type="button" role="tab" aria-controls="view4" aria-selected="false">View 4</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view5-tab" data-toggle="tab" data-target="#view5" type="button" role="tab" aria-controls="view5" aria-selected="false">View 5</button>
  </li>
</ul>

<div class="tab-content" id="viewTabsContent" style="margin-top: 20px;">
  <div class="tab-pane fade show active" id="view1" role="tabpanel" aria-labelledby="view1-tab">
    <h4>View 1 Content</h4>
    <p>This is the content for View 1. You can add markdown or HTML here.</p>
    <p>Add your visualizations, text, or any other content here.</p>
  </div>
  
  <div class="tab-pane fade" id="view2" role="tabpanel" aria-labelledby="view2-tab">
    <h4>View 2 Content</h4>
    <p>This is the content for View 2.</p>
    <p>Each view is independent and can contain different content.</p>
  </div>
  
  <div class="tab-pane fade" id="view3" role="tabpanel" aria-labelledby="view3-tab">
    <h4>View 3 Content</h4>
    <p>This is the content for View 3.</p>
    <p>You can add Flourish embeds, images, or any HTML/markdown here.</p>
  </div>
  
  <div class="tab-pane fade" id="view4" role="tabpanel" aria-labelledby="view4-tab">
    <h4>View 4 Content</h4>
    <p>This is the content for View 4.</p>
    <p>Keep adding your content here!</p>
  </div>
  
  <div class="tab-pane fade" id="view5" role="tabpanel" aria-labelledby="view5-tab">
    <h4>View 5 Content</h4>
    <p>This is the content for View 5.</p>
    <p>This is your last view - make it count!</p>
  </div>
</div>

### negativity upvotes 

<div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/25923109"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25923109/thumbnail" width="100%" alt="bar-chart-race visualization" /></noscript></div>

### Coming Soon

- Interactive visualizations of subreddit networks
- Predictive models for post engagement
- Timing optimization tools
- Title effectiveness analyzer
- Controversy vs. engagement trade-off analysis

## About the Project

This project is part of the ADA (Applied Data Analysis) course at EPFL. Our team, the **Standard Deviants**, is passionate about understanding social media dynamics through data.

## The Team

- Team Member 1
- Team Member 2
- Team Member 3

---

*Check out our [GitHub repository](https://github.com/epfl-ada/ada-2025-project-standard-deviants-ada) for code, analysis notebooks, and more details!*
