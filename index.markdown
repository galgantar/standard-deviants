---
layout: page
title: Toxic Stew
subtitle: A cookbook on how to go viral on Reddit
---

# Introduction

TODO: Jane

# Dataset

## Base dataset

Our analysis uses data from the [Stanford SNAP Reddit datasets](https://snap.stanford.edu/data/index.html):

- **858,490 hyperlinks** between 55,863 subreddits
- Sentiment analysis of cross-subreddit posts
- Text properties including readability, sentiment, and linguistic features
- User and subreddit embeddings
- Temporal data spanning January 2014 to April 2017

1. **[Reddit Hyperlinks Network](https://snap.stanford.edu/data/soc-RedditHyperlinks.html)**: A directed, signed, temporal network of subreddit-to-subreddit hyperlinks with rich text features and sentiment annotations.

## Api enhancment

We scrapped all that we could. We were scraping for 7 days...

## Define virality

We considered fiels `ups`, `num_comments`, `score` ($\text{max}(0, (\text{upvotes} - \text{downvotes}))$), `upvote_ratio`, `subreddit_subscribers`. Our final chosen metric for virality score is Virality RSS (RSS stands for relative score per subscriber) $\text{virality_rss} = (\text{score} / (\text{subreddit_subscribers}+1)) * 10000$ which incorporates the difference between upvotes and downvotes per 10k subscribesrs of that subreddit. TODO: talk about how this metrics helps us detect which posts got an above average amount of upvotes for their subreddit (eg a post in smaller subreddit with score 1000 is more "viral" than the post in super huge subreddit with score 2000).

## Community detection

We take subreddit embeddings from **[Reddit Embeddings](https://snap.stanford.edu/data/web-RedditEmbeddings.html)** which includes vector representations of subreddits and users for advanced analysis. We discard subreddits that we don't have embeddins for (TODO: around 9%). We then perform Leiden clustering with params (...) and get the following clusters. We use Gemini LLM to name the clusters based on (TODO ...). At the end we are left with 7 clusters (communities).

Click into the clusters to explore them.

TODO: Jack include superclusters

<div class="flourish-embed flourish-hierarchy" data-src="visualisation/25685009"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25685009/thumbnail" width="100%" alt="hierarchy visualization" /></noscript></div>


# Initial analysis

TODO: plot of the Virality RSS distributino on log log scale. Prove that there exist viral post but of course their frequency is low.

<div class="flourish-embed flourish-chart" data-src="visualisation/26558729"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26558729/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

From this plot it seems like there is a difference between the mean of the virality score (Virality RSS) is different among communities. Lets do a statistical test to prove this. 

... Description of how t-test works.

TODO: Jane's plot for p-values (they are all below 0.5). This proves that the differences are statistically significant.

# Temporal analysis

First lets see what are some trending posts over time across communities:

<ul class="nav nav-tabs" id="viewTabsa" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="viewa1-tab" data-toggle="tab" data-target="#viewa1" type="button" role="tab" aria-controls="view1" aria-selected="true">Gaming</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa2-tab" data-toggle="tab" data-target="#viewa2" type="button" role="tab" aria-controls="view2" aria-selected="false">Politics</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa3-tab" data-toggle="tab" data-target="#viewa3" type="button" role="tab" aria-controls="view3" aria-selected="false">Meta</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa4-tab" data-toggle="tab" data-target="#viewa4" type="button" role="tab" aria-controls="view4" aria-selected="false">Lifestyle</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa5-tab" data-toggle="tab" data-target="#viewa5" type="button" role="tab" aria-controls="view5" aria-selected="false">Sports</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa6-tab" data-toggle="tab" data-target="#viewa6" type="button" role="tab" aria-controls="view6" aria-selected="false">Pop Culture</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="viewa7-tab" data-toggle="tab" data-target="#viewa7" type="button" role="tab" aria-controls="view7" aria-selected="false">Technology</button>
  </li>
</ul>

<div class="tab-content" id="viewTabsContenta" style="margin-top: 20px;">
  <div class="tab-pane fade show active" id="viewa1" role="tabpanel" aria-labelledby="view1-tab">
    <h4>View 1 Content</h4>
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26561176"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26561176/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="viewa2" role="tabpanel" aria-labelledby="view2-tab">
    <h4>View 2 Content</h4>
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26563051"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26563051/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="viewa3" role="tabpanel" aria-labelledby="view3-tab">
    <h4>View 3 Content</h4>
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26564979"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26564979/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="viewa4" role="tabpanel" aria-labelledby="viewa4-tab">
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26565674"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26565674/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="viewa5" role="tabpanel" aria-labelledby="viewa5-tab">
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26565719"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26565719/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  <div class="tab-pane fade" id="viewa6" role="tabpanel" aria-labelledby="viewa6-tab">
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26566023"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26566023/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
  <div class="tab-pane fade" id="viewa7" role="tabpanel" aria-labelledby="viewa7-tab">
    <div class="flourish-embed flourish-scatter" data-src="visualisation/26566068"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26566068/thumbnail" width="100%" alt="scatter visualization" /></noscript></div>
  </div>
</div>


Now lets also condsider the communitiy's popularity over time:

TODO: Aziz change the race to be against clusters (7 clusters racing against each othe).

<div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/25923109"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25923109/thumbnail" width="100%" alt="bar-chart-race visualization" /></noscript></div>


# Virality factors

TODO:
Define `is_viral` (0 or 1 - is the virality score among the top 1% in its own cluster)
Explain the theory behind logistic regression.
Train logistic regression use `smf.logreg` on the features that we have (post length), LIWC, ... visualize the coefficients, p-values

# Sentiment analyis

We suspect that the sentiment plays a big role (TODO: Jane reviewrite better). Here is the general sentiment of communities:

<div class="flourish-embed flourish-chart" data-src="visualisation/26532988"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26532988/thumbnail" width="100%" alt="chart visualization" /></noscript></div>


TODO: henrik - fancy looking circular plot.
<div class="flourish-embed flourish-chord" data-src="visualisation/26631957"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26631957/thumbnail" width="100%" alt="chord visualization" /></noscript></div>

Gal also made a hate graph, which subreddits (not communities) hate each other.

<div class="flourish-embed flourish-network" data-src="visualisation/26533122"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26533122/thumbnail" width="100%" alt="network visualization" /></noscript></div>



# Textual analys

We perform TFIDF on the titles and than do a regular linear regression and plot the results (explain linear regression theory), we used an R^2 metric (explain the theory) to asses the amount of variance explained

<ul class="nav nav-tabs" id="viewTabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="view1-tab" data-toggle="tab" data-target="#view1" type="button" role="tab" aria-controls="view1" aria-selected="true">Gaming</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view2-tab" data-toggle="tab" data-target="#view2" type="button" role="tab" aria-controls="view2" aria-selected="false">Lifestyle</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view3-tab" data-toggle="tab" data-target="#view3" type="button" role="tab" aria-controls="view3" aria-selected="false">Politics</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view4-tab" data-toggle="tab" data-target="#view4" type="button" role="tab" aria-controls="view4" aria-selected="false">Media</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view5-tab" data-toggle="tab" data-target="#view5" type="button" role="tab" aria-controls="view5" aria-selected="false">Meta</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view6-tab" data-toggle="tab" data-target="#view6" type="button" role="tab" aria-controls="view6" aria-selected="false">Sports</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="view7-tab" data-toggle="tab" data-target="#view7" type="button" role="tab" aria-controls="view7" aria-selected="false">Technology</button>
  </li>
</ul>

<div class="tab-content" id="viewTabsContent" style="margin-top: 20px;">
  <div class="tab-pane fade show active" id="view1" role="tabpanel" aria-labelledby="view1-tab">
    <h4>Gaming & Interactive Entertainment</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26556091"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26556091/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.239 (23.9% variance explained) | 1,557 significant word features</p>
    <p><strong>Key Insights:</strong> Gaming communities show strong preference for specific game-related acronyms and community identifiers. Top positive predictors include game-specific terms like "ps2pts", "tagpro", and "mltp", suggesting that niche gaming communities reward insider knowledge and game-specific references. Interestingly, words like "verified", "recruiting", and "troubleshooting" are negative predictors, indicating that posts focused on technical support or verification may receive fewer upvotes than gameplay-focused content.</p>
  </div>
  
  <div class="tab-pane fade" id="view2" role="tabpanel" aria-labelledby="view2-tab">
    <h4>Lifestyle & Niche Interests</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26557345"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26557345/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.423 (42.3% variance explained) | 2,062 significant word features</p>
    <p><strong>Key Insights:</strong> This cluster shows strong predictive power (42.3% variance explained) and has the most significant word features (2,062) of any cluster, indicating high linguistic diversity. Top positive words like "chatter", "neuralcast", "weighin", and "diplomacy" suggest that community engagement and discussion-focused content performs well. Notably, "politicaldiscussion" appears as a positive predictor, indicating that political discourse within lifestyle communities can drive engagement. Words like "journaling", "panic", and "legal" are negative predictors, suggesting that personal reflection posts or legal queries may receive fewer upvotes.</p>
  </div>
  
  <div class="tab-pane fade" id="view3" role="tabpanel" aria-labelledby="view3-tab">
    <h4>Politics & Society</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26557452"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26557452/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.276 (27.6% variance explained) | 1,629 significant word features</p>
    <p><strong>Key Insights:</strong> Political content shows strong associations with specific political figures and movements. Top positive predictors include "ghazi", "kasich", "sandersforpresident", and "nolibs", indicating that posts mentioning specific political candidates or movements tend to perform well. The word "declaration" also appears as a strong positive predictor, suggesting that posts framing content as official statements or declarations may resonate with political audiences. Negative predictors like "spews", "malaysian", and "french" suggest that certain geographic or descriptive terms may be associated with lower engagement, possibly due to context-specific factors or community preferences.</p>
  </div>
  
  <div class="tab-pane fade" id="view4" role="tabpanel" aria-labelledby="view4-tab">
    <h4>Pop Culture & Media</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26558624"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26558624/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.224 (22.4% variance explained) | 1,100 significant word features</p>
    <p><strong>Key Insights:</strong> Pop culture content shows strong associations with specific creators, platforms, and media properties. Top positive words include "nitro", "varien", "playmindcrack", "mindcrack", and "rmonstercat", indicating that posts mentioning specific content creators, gaming series, or music labels tend to perform well. The presence of "aoa" and "fiu" suggests that certain acronyms or identifiers are particularly effective in this space. Negative predictors like "author", "cookbooks", "crosspost", and "battle" suggest that certain content types (book discussions, recipe sharing, cross-posts, or battle-related content) may receive fewer upvotes in pop culture communities.</p>
  </div>
  
  <div class="tab-pane fade" id="view5" role="tabpanel" aria-labelledby="view5-tab">
    <h4>Reddit Meta & Community</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26559120"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26559120/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.238 (23.8% variance explained) | 1,224 significant word features</p>
    <p><strong>Key Insights:</strong> Meta and community-focused subreddits show interesting patterns around community engagement and specific subreddit mentions. Top positive predictors include "digest", "lawmaker", "rrandomactsofamazon", "rrandomactsofpizza", and "promises", suggesting that posts related to community summaries, random acts of kindness subreddits, and commitment-oriented content perform well. The word "fk" appears as a strong positive predictor, which may be context-specific. Negative predictors include common subreddit acronyms like "eli5" (Explain Like I'm 5), "cmv" (Change My View), "tomt" (Tip of My Tongue), and "wp" (Well Played), suggesting that posts referencing these popular subreddits may actually receive fewer upvotes, possibly due to over-saturation or different engagement patterns.</p>
  </div>

  <div class="tab-pane fade" id="view6" role="tabpanel" aria-labelledby="view6-tab">
    <h4>Sports & Athletics</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26564909"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26564909/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.421 (42.1% variance explained) | 936 significant word features</p>
    <p><strong>Key Insights:</strong> Sports content shows the second-highest predictive power (42.1% variance explained) with a relatively focused set of 936 significant features. Top positive predictors include "bradfords", "sultans", "marathon", and month names ("march", "december", "february", "november"), suggesting that posts mentioning specific teams, events, or time periods perform well. The strong association with months indicates that seasonal or time-sensitive sports content may drive higher engagement. Negative predictors like "madness", "nightly", and "jackets" suggest that certain descriptive terms or team references may be less effective, possibly due to context-specific factors or community preferences.</p>
  </div>

  <div class="tab-pane fade" id="view7" role="tabpanel" aria-labelledby="view7-tab">
    <h4>Technology & Digital Culture</h4>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26564946"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26564946/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
    <p><strong>Model Performance:</strong> R² = 0.564 (56.4% variance explained) | 1,260 significant word features</p>
    <p><strong>Key Insights:</strong> Technology content shows the highest predictive power of all clusters, with 56.4% of upvote variance explained—more than double the lowest-performing cluster. This suggests that title word choice is particularly important for technology-related posts. Top positive predictors include "tipped" (with an exceptionally high coefficient of 12.9), "mlp", "rmylittlepony", "human", "disabler", and "kerbal", indicating strong associations with specific communities, games, or technical concepts. The presence of "rmylittlepony" alongside technical terms highlights the diverse nature of technology communities. Negative predictors like "exploration", "19th", "22nd", "tuesdays", and "macbook" suggest that certain descriptive terms, dates, or product mentions may be associated with lower engagement, possibly due to context or timing factors.</p>
  </div>
</div>


## About the Project

This project is part of the ADA (Applied Data Analysis) course at EPFL. Our team, the **Standard Deviants**, is passionate about understanding social media dynamics through data.

## The Team

- Team Member 1
- Team Member 2
- Team Member 3

---

*Check out our [GitHub repository](https://github.com/epfl-ada/ada-2025-project-standard-deviants-ada) for code, analysis notebooks, and more details!*
