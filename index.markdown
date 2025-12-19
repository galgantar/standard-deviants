---
layout: page
title: Toxic Stew
subtitle: A cookbook on how to go viral on Reddit
---

# Preface 🗿

Every cookbook preface is unnecessarily long 🥱 and emotional 💔. We will spare you that part 😉. <br>
Every cookbook preface ends with a simple promise: follow these recipes, and you’ll create something unforgettable 😏.<br>
This one keeps that promise - although what you create might be unforgettable for… different reasons. 
Welcome to **Toxic Stew**, a data-powered guide to the secret ingredients behind _virality_ on Reddit 🤓.
Before diving into the dishes, let’s prepare our ingredients 🫡.


# Ingredients / Dataset 📝

## Basic Ingredients - Base Dataset 🧑‍🌾🫑

The basic ingredients are extracted from the [Stanford SNAP Reddit datasets](https://snap.stanford.edu/data/index.html):

- **858,490 hyperlinks** between 55,863 subreddits
- Sentiment analysis of cross-subreddit posts
- Text properties including readability, sentiment, and linguistic features
- Temporal data spanning January 2014 to April 2017
- **[Reddit Hyperlinks Network](https://snap.stanford.edu/data/soc-RedditHyperlinks.html)**: A directed, signed, temporal network of subreddit-to-subreddit hyperlinks with rich text features and sentiment annotations.

## The Seasoning - Subreddit Embeddings 🧑‍🍳🧂
The seasoning, which makes the stew more enjoyable is also extracted from [Stanford SNAP Reddit datasets](https://snap.stanford.edu/data/index.html):

- **300 dimensional embeddings for each subreddit** for more than 30,000 subreddits
- Covers more than 90% of the crosslinking posts
- Allows for similarity analysis of subreddits
- Used for clustering

## The Topping - API enhancement 🧑‍🔬🌶️

The following ingredients are optional but highly recommended for more sophisticated and advanced taste palettes. It cannot be found in the basic dataset, one must go to data scraping. The data has been lawfully scraped across **150 hours** from the official Reddit API. <br>
Ultimately, end up with additional ingredients:

- `ups` (number of upvotes)
- `downs` (number of downvotes)
- `num_comments` (number of comments)
- `score` (number of upvotes - number of downvotes)
- `upvote_ratio` (number of upvotes / number of votes)
- `subreddit_subscribers` (number of subscribers to source subreddit)

## Secret Ingredient - Virality 🕵️‍♀️🪺
For the first time in history, we  reveal the top secret of our trade. This is truly the ingredient that will make your stew irresistible to all your friends (and enemies) alike. It is something you can only make yourself; it is not sold by any gypsies in any markets anywhere in the world. 🧞 This ingredient is virality. 🤩 More particularly, _relative virality score per subscriber_ (`virality_rss`) And the secret formula to make this metric is as follows: <br><br>
`virality_rss` = (2* `ups` + `downs`) / sqrt(`subreddit_subscribers` + 1) <br><br>
What makes this metric so special is that is really captures the essence of what it is to be viral in a given community. With the denominator containing subreddit_subscribers, the virality standard accounts for the size of the subreddit in which the post originates. To be considered viral in a bigger community, a bigger score is needed, and virality is not penalized if the community itself is smaller. Ultimately, virality adapts to any dish and is always in perfect proportion.

## Kitchen Organization - Community detection 🌍

As you are cooking, it is important to keep your space clean. Any chef knows that dry and wet ingredients must be mixed separately, and proper cleaning practices need to be observed to prevent cross-contamination, food poisoning, and death 🪦. <br>
We take subreddit embeddings from **[Reddit Embeddings](https://snap.stanford.edu/data/web-RedditEmbeddings.html)** which includes vector representations of subreddits and users for advanced analysis. We discard subreddits that we don't have embeddings for (TODO: around 9%). We then perform Leiden clustering with params (...) and get the following clusters. We use Gemini LLM to name the clusters based on (TODO ...). At the end we are left with 7 clusters (communities).

Click into the clusters to explore them.

BIG TODO: Write our entire story about crosslinking posts not just posts in general

TODO: Jack include superclusters

<div class="flourish-embed flourish-hierarchy" data-src="visualisation/25685009"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/25685009/thumbnail" width="100%" alt="hierarchy visualization" /></noscript></div>


# Apéritif - Initial Analysis 🫒
We begin the meal with a light appetizer: a first glimpse at our secret ingredient, _virality_ 😋. Before diving into complex modelling, we take a step back and examine how virality behaves across the different clusters of Reddit communities. The bar chart gives us an early hint: the mean virality score isn’t uniform at all. Some clusters consistently produce more “viral-leaning” posts than others.<br>


<img src="assets/images/virality_rss_log_log.svg">

<div class="flourish-embed flourish-chart" data-src="visualisation/26558729"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26558729/thumbnail" width="100%" alt="chart visualization" /></noscript></div>


It seems like there is a difference between the mean of the virality score (Virality RSS) among communities. Lets do a statistical test to prove this. <br>

We will use a **t-test** 🫖 between all cluster pairs to understand whether the differences in average virality between these clusters are statistically significant. A _t-test_ compares the means between 2 groups to determine whether their difference is more than what is expected from random variation alone. It returns a _p-value_, where p < 0.05 is the standard for designating the result as statistically significant. <br>
In the context of our dataset, the _t-test_ shows us if the observed difference in average `virality_rss` of clusters is statistically significant. After performing pairwise _t-tests_ on all clusters, we obtain the following covariance matrix of p-values.

![p-value heatmap](assets/virality_rss_pvalue_heatmap.png)
*All p-values outside main diagonal are below 0.05. Some are much closer to 0 than others, which we convey with a -log scale on the color bar axis.*

💡Since all p-values are below 0.05, we conclude that the differences in means between our different communities are statistically significant.

# Let Us Cook - Temporal Analysis 🍳

A stew requires time to simmer 🛁, so that the flavours can open up and flourish 🌱. In most cases, the tastes blend together in an expected way, but in special situations, one persistent flavour can rise to the top. This brings us to our temporal analysis where we plot `virality_rss` of each cluster overtime. Most posts will end up on the bottom curve, with `virality_rss < 1`, but scattered above, outliers emerge 🦅. We study what separates these posts and makes them have the ✨viral factor✨:

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


Getting into the temporal analysis, we consider communities' popularity over time. We plot the geometric mean of `virality_rss` per cluster over time and watch the race to the top 🐇🐢. 

<div class="flourish-embed flourish-bar-chart-race" data-src="visualisation/26820962"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26820962/thumbnail" width="100%" alt="bar-chart-race visualization" /></noscript></div>

These major events played a key role in shaping the dynamics of the virality race over time : 

<div class="flourish-embed flourish-cards" data-src="visualisation/26826210"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26826210/thumbnail" width="100%" alt="cards visualization" /></noscript></div>


# Main Course I - Virality Factors 💫

What proportions of ingredients are actually needed to go viral 🤔? We model virality as a binary outcome using logistic regression. We rely on `virality_rss` to define whether a post is viral or not (how is it defined?) and other post properties (e.g. num_words, avg_word_length, sentiment, LIWC features, etc.) to be the features. We use `smf.logreg` to train our model and come up with the coefficients displayed in the plot below.

TODO: talk about link aggregation, the largest post has 167 outdegree (eg links 167 other posts).


<details>
<summary style="cursor: pointer; padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
<strong>🧑‍🍳 For cooking nerds: Logistic regression</strong>
</summary>

<div style="padding: 20px; background-color: #fafafa; border-left: 4px solid #007bff; margin: 10px 0;">

All of the coefficients have p-value below 0.05.

{% include mathjax-script.html %}

<p>Logistic regression models the probability of virality using the logistic function:</p>

$$P(\text{is_viral} = 1 | \mathbf{x}) = \sigma(\mathbf{x}^T \boldsymbol{\beta}) = \frac{1}{1 + e^{-(\beta_0 + \sum_{i=1}^{p} \beta_i x_i)}}$$

<p>The log-odds is modeled as a linear combination of features:</p>

$$\text{logit}(p) = \ln\left(\frac{p}{1-p}\right) = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \ldots + \beta_p x_p$$

<p>where $p = P(\text{is_viral} = 1 | \mathbf{x})$. Coefficients are estimated via Maximum Likelihood Estimation, maximizing:</p>

$$\ell(\boldsymbol{\beta}) = \log P(\boldsymbol{\beta}|\boldsymbol{X}, \boldsymbol{y})= \sum_{i=1}^{n} \left[ y_i \ln(p_i) + (1-y_i) \ln(1-p_i) \right]$$

<p><strong>Interpretation:</strong> For coefficient $\beta_j$, a one-unit increase in feature $x_j$ multiplies the odds by $e^{\beta_j}$.</p>

<p><strong>Model fit:</strong>Pseudo $R^2 = 0.02387$ (not high but high but $R^2$ is not what we are after).</p>

</div>
</details>


<div class="flourish-embed flourish-chart" data-src="visualisation/26640283"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26640283/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

TODO: smth on spider plots 🕷️

<div class="flourish-embed flourish-radar" data-src="visualisation/26851369"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26851369/thumbnail" width="100%" alt="radar visualization" /></noscript></div>

# Main Course II - Sentiment Analysis 😃😐🙁😡

Some viral posts care positive and uplifting 😇, but the reality is that they are also often negative 😈, hence the stew being... toxic... ☠️ but viral 🤑, nonetheless. The seasoning behind the message is defined by the [VADER sentiment](https://github.com/cjhutto/vaderSentiment) of posts. As we suspect that sentiment plays a big role in virality, we begin by looking at sentiment comprising our various clusters:

<div class="flourish-embed flourish-chart" data-src="visualisation/26532988"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26532988/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

(figure out what this is - negative sentiment??)

<div class="flourish-embed flourish-chord" data-src="visualisation/26631957"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26631957/thumbnail" width="100%" alt="chord visualization" /></noscript></div>

Furthermore, we model the sentiment that subreddits have towards one another. The following directed graph shows which subreddits hate each other.

<div class="flourish-embed flourish-network" data-src="visualisation/26533122"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26533122/thumbnail" width="100%" alt="network visualization" /></noscript></div>


# Main Course III - Central Graph Analysis 🥩

The next course on the menu is investigating interactions between the most popular subreddits. To determine which subreddits recieve the most attention, we used the _weighted PageRank centrality_ algorithm.

<details>
<summary style="cursor: pointer; padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
<strong>🧑‍🍳 For cooking nerds: Weighted PageRank centrality</strong>
</summary>

<div style="padding: 20px; background-color: #fafafa; border-left: 4px solid #28a745; margin: 10px 0;">

{% include mathjax-script.html %}

<p>
To analyze the structural importance of subreddits in the interaction graph, we use
<strong>weighted PageRank centrality</strong>. Unlike degree-based measures, PageRank captures not
only how many connections a node has, but also how important its neighbors are.
</p>

<p>
Given a directed, weighted graph with adjacency matrix $W$, the PageRank score of node $i$
is defined recursively as:
</p>

$$
PR(i) = \frac{1 - \alpha}{N} + \alpha \sum_{j \in \mathcal{N}_{\text{in}}(i)} \frac{w_{ji}}{\sum_{k} w_{jk}} PR(j)
$$

<p>
where:
</p>

<ul>
  <li>$\alpha \in (0,1)$ is the damping factor (typically $\alpha = 0.85$),</li>
  <li>$N$ is the total number of nodes,</li>
  <li>$w_{ji}$ is the weight of the directed edge from node $j$ to node $i$,</li>
  <li>$\mathcal{N}_{\text{in}}(i)$ denotes the set of nodes pointing to $i$.</li>
</ul>

<p>
In this formulation, a node receives high PageRank if it is pointed to by other nodes
that themselves have high PageRank, with edge weights modulating the strength of influence.
</p>

<p>
<strong>Interpretation:</strong> In our context, a subreddit with high weighted PageRank acts as a
central aggregation point for attention: it consistently receives interaction or content
flow from many other influential subreddits.
</p>

<p>
This explains why general-interest subreddits (e.g. content aggregation or discovery hubs)
emerge as highly central, even if they are not topically similar to their neighbors.
PageRank captures <em>attention flow</em>, not thematic proximity.
</p>

<p>
<strong>Why weighted?</strong> Using edge weights ensures that repeated or strong interactions
contribute more to centrality than incidental or rare links, yielding a more faithful
representation of influence in the network.
</p>

</div>
</details>


Todo: plot of page ranks.<br>
The following plot exhibits cross-link interactions among the top ranked subreddits 👯‍♀️.

<div class="flourish-embed flourish-network" data-src="visualisation/26800696"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26800696/thumbnail" width="100%" alt="network visualization" /></noscript></div>

# Main Course IV - Textual Analysis 🤌

Of course, no menu is complete without Term Frequency - Inverse Document Frequency (TF-IDF). We perform TF-IDF on post titles, follow-up with a regular linear regression, and finally plot the results. The coefficient of determination $R^2$ is used to assess the amount of explained variance a title has on the post's virality. $R^2$ ranges from $0 \le R^2 \le 1$, where $R^2=0$ means the title does not have any effect on virality, and $R^2=1$ means the title explains all the variance.

<details>
<summary style="cursor: pointer; padding: 10px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
<strong>🧑‍🍳 For cooking nerds: TF-IDF + Linear regression</strong>
</summary>

<div style="padding: 20px; background-color: #fafafa; border-left: 4px solid #6f42c1; margin: 10px 0;">

{% include mathjax-script.html %}

<p>
To quantify how the wording of post titles relates to virality, we combine
<strong>TF-IDF text representations</strong> with an
<strong>ordinary least squares (OLS) linear regression</strong>.
</p>

<h4>TF-IDF representation</h4>

<p>
Each post title is transformed into a numerical vector using
<strong>TF-IDF (Term Frequency–Inverse Document Frequency)</strong>, which assigns higher weight
to words that are frequent within a title but rare across the corpus.
</p>

<p>
For a word $w$ in title $d$, the TF-IDF score is:
</p>

$$
\text{TF-IDF}(w, d) = \text{TF}(w, d) \cdot \log\left(\frac{N}{\text{DF}(w)}\right)
$$

<p>
where:
</p>

<ul>
  <li>$\text{TF}(w, d)$ is the frequency of $w$ in title $d$,</li>
  <li>$\text{DF}(w)$ is the number of titles containing $w$,</li>
  <li>$N$ is the total number of titles in the cluster.</li>
</ul>

<p>
This weighting downplays common words and highlights terms that are
<strong>informative and cluster-specific</strong>.
</p>

<h4>Linear regression model</h4>

<p>
The TF-IDF vectors are then used as input features in a linear regression model
predicting the virality score:
</p>

$$
y = \beta_0 + \sum_{j=1}^{p} \beta_j x_j + \varepsilon
$$

<p>
where $y$ is the virality score and $x_j$ are TF-IDF features.
Coefficients are estimated by minimizing the sum of squared residuals:
</p>

$$
\min_{\boldsymbol{\beta}} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

<p>
<strong>Interpretation:</strong> Each coefficient $\beta_j$ captures the association between a
specific word and virality, holding all other words constant.
Positive coefficients indicate words more strongly associated with higher virality,
while negative coefficients indicate the opposite.
</p>

<h4>Model evaluation</h4>

<p>
Model performance is assessed using the coefficient of determination:
</p>

$$
R^2 = 1 - \frac{\sum_i (y_i - \hat{y}_i)^2}{\sum_i (y_i - \bar{y})^2}
$$

<p>
The relatively low $R^2$ values are expected: title text explains only a small fraction
of virality, which is heavily influenced by external factors such as timing,
community size, and network effects.
</p>

<p>
Rather than maximizing predictive power, this approach identifies
<strong>systematic linguistic patterns</strong> that distinguish viral titles from typical ones
within each cluster.
</p>

</div>
</details>



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
    <p><strong>Model Performance:</strong> R² = 0.057 (5.7% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26556091"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26556091/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="view2" role="tabpanel" aria-labelledby="view2-tab">
    <h4>Lifestyle & Niche Interests</h4>
    <p><strong>Model Performance:</strong> R² = 0.132 (13.2% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26557345"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26557345/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="view3" role="tabpanel" aria-labelledby="view3-tab">
    <h4>Politics & Society</h4>
    <p><strong>Model Performance:</strong> R² = 0.104 (10.4% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26557452"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26557452/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="view4" role="tabpanel" aria-labelledby="view4-tab">
    <h4>Pop Culture & Media</h4>
    <p><strong>Model Performance:</strong> R² = 0.045 (4.5% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26558624"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26558624/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>
  
  <div class="tab-pane fade" id="view5" role="tabpanel" aria-labelledby="view5-tab">
    <h4>Reddit Meta & Community</h4>
    <p><strong>Model Performance:</strong> R² = 0.162 (16.2% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26559120"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26559120/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>

  <div class="tab-pane fade" id="view6" role="tabpanel" aria-labelledby="view6-tab">
    <h4>Sports & Athletics</h4>
    <p><strong>Model Performance:</strong> R² = 0.199 (19.9% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26564909"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26564909/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>

  <div class="tab-pane fade" id="view7" role="tabpanel" aria-labelledby="view7-tab">
    <h4>Technology & Digital Culture</h4>
    <p><strong>Model Performance:</strong> R² = 0.249 (24.9% variance explained)</p>
    <div class="flourish-embed flourish-chart" data-src="visualisation/26564946"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26564946/thumbnail" width="100%" alt="chart visualization" /></noscript></div>
  </div>
</div>

Thus, the way a post is titled has an especially strong effect on virality in the Sports and Technology communities (accounting for approximately 20% and 25% of variance respectively), a reasonable effect on the Lifestyle, Politics, and Meta spheres (more than 10%), and a lesser but still noteworthy effect in the remaining Gaming and Media clusters (around 5%).


# Propensity score matching

<div class="flourish-embed flourish-chart" data-src="visualisation/26902981"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26902981/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

### Which decisions would you take to be viral?

{% include quiz.html %}

### Can you guess which post went viral?

{% include guess_viral.html %}

### Predicting Viratliy of other posts
In our dataset, we have a lot of posts that cannot be found on Reddit anymore and could not been scraped. Since we have them in our dataset, however, we can use prediction algorithms to estimate which posts could go viral. In the plots below we can see that the algorithm projects, that slightly more than 2% of the posts have gone viral, while also showing the features that have been most important for this prediction.

<div class="flourish-embed flourish-chart" data-src="visualisation/26795802"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26795802/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

<img src="assets/images/top_10_feature_importances.svg">

## About the Project

This project is part of the ADA (Applied Data Analysis) course at EPFL. Our team, the **Standard Deviants**, is passionate about understanding social media dynamics through data.

## The Team

- Team Member 1
- Team Member 2
- Team Member 3

---

*Check out our [GitHub repository](https://github.com/epfl-ada/ada-2025-project-standard-deviants-ada) for code, analysis notebooks, and more details!*
