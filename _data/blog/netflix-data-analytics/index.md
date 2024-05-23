---
title: Netflix Data Analysis
date: 2024-05-20T11:54:00.060Z
slug: netflix-data-analytics
updatedDate: 2024-05-20T11:54:16.272Z
description: This case study delves deeply into Netflix data to uncover insights
  about the content and assist the company in recommending which content to
  upload or produce.
publish: true
featuredpost: false
tags:
  - css
category: Data Science
keywords:
  - data analytics
bannerImage: netflix-data-analysis.png
---

## Business Problem

As one of the largest OTT streaming platforms in the market, Netflix faces the daily challenge of managing an immense volume of content. From deciding which content to produce and upload to determining the optimal timing for releases, the company needs to navigate these decisions while prioritizing profitability.

## Solution

To address these challenges, Netflix leverages the expertise of data analysts. These professionals employ a data-driven approach, analyzing historical data to extract insights that inform decision-making. By analyzing past data, data analysts can identify patterns, trends, and viewer preferences, enabling Netflix to determine the types of shows and movies that resonate with their audience. Additionally, data analysis helps the company understand how to optimize its content strategy for different countries, driving business growth globally.

Following is my analysis of the Netflix data provided by Kaggle, using Python, Pandas, Seaborn, and Matplotlib for data analysis and visualization. During this analysis, I sought to address the following questions:

- Which movie genres and TV shows are the most popular?
- Which country has the most content?
- What type of content do people in each country prefer?
- What types of rated content do people prefer?
- How often are different types of content uploaded?
- Who are the top actors and directors globally and in each country?

## Metric

Since there is not data about views count, user star rating we are going to use the count of content added to Netflix as the metric.
We will also use the count of cast, director, rating as measure of popularity

## Data Description

The dataset consists of a list of all the TV shows/movies available on Netflix

<table>

 <tr>
    <th width="30%">Field</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Show_id</td>
    <td>Unique ID for every Movie / TV Show</td>
  </tr>
  <tr>
    <td>Type</td>
    <td>Identifier - A Movie or TV Show</td>
  </tr>
  <tr>
    <td>Title</td>
    <td>Title of the Movie / TV Show</td>
  </tr>
  <tr>
    <td>Director</td>
    <td>Director of the Movie</td>
  </tr>
  <tr>
    <td>Cast</td>
    <td>Actors involved in the movie/show</td>
  </tr>
  <tr>
    <td>Country</td>
    <td>Country where the movie/show was produced</td>
  </tr>
  <tr>
    <td>Date_added</td>
    <td>Date it was added on Netflix</td>
  </tr>
  <tr>
    <td>Release_year</td>
    <td>Actual Release year of the movie/show</td>
  </tr>
  <tr>
    <td>Rating</td>
    <td>TV Rating of the movie/show</td>
  </tr>
  <tr>
    <td>Duration</td>
    <td>Total Duration - in minutes or number of seasons</td>
  </tr>
  <tr>
    <td>Listed_in</td>
    <td>Genre</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>The summary description</td>
  </tr>
</table>

## Data Preprocessing

### Data Cleaning

Since most of the data columns were nested. I had to unnest the data first.
for eg: The **cast** column had multiple comma separated names. Each of these
had to be on separate row.

```python
cast=df['cast'].apply(lambda x: str(x).split(', ')).tolist()
cast_df=pd.DataFrame(cast,index=df['show_id'])
cast_df=cast_df.stack().reset_index(name='cast').drop('level_1', axis=1).set_index('show_id')
cast_df.replace("nan", float('nan'), inplace=True)
```

### Missing Values Handling

There were many missing values for directors, country, and cast that needed to be included. They had to be replaced with “Unknown” instead of using popular replacement techniques like substituting by mean, or mode.

## Exploratory Data Analysis

I have conducted Exploratory Data Analysis (EDA) on each column in the dataset. This involved generating histograms, countplots, box plots, and line plots. Additionally, I used pair plots and correlation plots to examine relationships between columns. This EDA process provided me with a deeper understanding of each individual column and the relationships between pairs of columns.

## My Recommendations For Netflix

- **Release Content Strategically**: Focus on releasing content during the high-demand months of July, December, and January. Avoid releasing content in February due to lower viewership.
- **Prioritize Movies**: Produce and add more movies to the platform since they are more popular than TV shows.
- **Expand Content Genres**: Increase the variety of content by adding more international movies, dramas, and comedies to the platform.
- **Optimize Movie Length**: Aim for a movie duration of around 120 minutes to appeal to a wide audience.
- **Simplify TV Shows**: Create TV shows with a single season, as they are more popular than shows with multiple seasons.
- **Focus on Specific Regions**: In countries like Japan, South Korea, and Taiwan, where TV shows are more popular than movies, prioritize producing more TV shows.
- **Timely Movie Releases**: Add movies to Netflix within a year of their release date to stay relevant and attract viewers.
- **Catering to Older Audiences**: Add more classic TV shows to the platform to cater to older audiences and provide a diverse range of content.

## Jupyter Notebook

Here are the links to the Jupyter Notebook containing detailed code, insights, and recommendations:

- Github Link: [https://github.com/gautamnaik1994/NetflixDataAnalysisCaseStudy](https://github.com/gautamnaik1994/NetflixDataAnalysisCaseStudy)
- Kaggle Link: [https://www.kaggle.com/code/gautamnaik1994/netflix-case-study](https://www.kaggle.com/code/gautamnaik1994/netflix-case-study)

Following is the embedded version of above notebook hosted on Kaggle

<iframe src="https://www.kaggle.com/embed/gautamnaik1994/netflix-case-study?kernelSessionId=179013761" height="800"  className="blog-wide-section" frameborder="0" scrolling="auto" title="Netflix Case Study"></iframe>
