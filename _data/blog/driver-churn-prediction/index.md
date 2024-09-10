---
title: OLA Cabs Driver Churn Prediction
date: 2024-08-30T11:54:00.060Z
slug: driver-churn-prediction
updatedDate: 2024-08-30T11:54:00.060Z
description: This case study delves deeply into OLA driver data to uncover insights about the driver churn and assist the company in retaining drivers.
publish: true
featuredpost: true
tags:
  - data
category: Data Science
keywords:
  - data analytics
  - churn prediction
  - machine learning
bannerImage: ola-driver-churn.png
---


Assume this, You are working in the HR department of OLA Cabs and are responsible for hiring and retaining drivers.
You've noticed an increase in the number of drivers leaving the company over the past few months. Your manager has tasked you with identifying the reasons for this trend.
Well, what do you do? You set a meeting with the analytics department and explain the problem. This is where I come in.
I am a data scientist responsible for finding out the reasons for the churn and predicting which drivers will churn in the future.

*A few moments later*

I have completed the analysis and the report of my findings is as follows:

## Business Problem

Ola Cabs provides convenience and transparency by connecting customers to various vehicles. Ola's main focus is to ensure a quality driving experience and retain efficient drivers.
Recruiting and retaining drivers is challenging due to high churn rates. Losing drivers affects morale, and acquiring new drivers is costlier than retaining current ones.
We will be building a predictive model to determine this. We are also going to determine which of the driver features is most responsible for driver churn.

## Dataset

The dataset contains monthly information for a segment of drivers for 2019 and 2020. The dataset contains the following columns:

* Demographics (city, age, gender etc.)
* Tenure information (joining date, Last Date)
* Historical data regarding the performance of the driver (Quarterly rating, Monthly business acquired, grade, Income)

<ExpandableSeeMore>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MMMM-YY</td>
      <td>Reporting Date (Monthly)</td>
    </tr>
    <tr>
      <td>Driver_ID</td>
      <td>Unique ID for drivers</td>
    </tr>
    <tr>
      <td>Age</td>
      <td>Age of the driver</td>
    </tr>
    <tr>
      <td>Gender</td>
      <td>Gender of the driver – Male : 0, Female: 1</td>
    </tr>
    <tr>
      <td>City</td>
      <td>City Code of the driver</td>
    </tr>
    <tr>
      <td>Education_Level</td>
      <td>Education level – 0 for 10+, 1 for 12+, 2 for graduate</td>
    </tr>
    <tr>
      <td>Income</td>
      <td>Monthly average Income of the driver</td>
    </tr>
    <tr>
      <td>Date Of Joining</td>
      <td>Joining date for the driver</td>
    </tr>
    <tr>
      <td>LastWorkingDate</td>
      <td>Last date of working for the driver</td>
    </tr>
    <tr>
      <td>Joining Designation</td>
      <td>Designation of the driver at the time of joining</td>
    </tr>
    <tr>
      <td>Grade</td>
      <td>Grade of the driver at the time of reporting</td>
    </tr>
    <tr>
      <td>Total Business Value</td>
      <td>The total business value acquired by the driver in a month (negative business indicates cancellation/refund or car EMI adjustments)</td>
    </tr>
    <tr>
      <td>Quarterly Rating</td>
      <td>Quarterly rating of the driver: 1, 2, 3, 4, 5 (higher is better)</td>
    </tr>
  </tbody>
</table>

</ExpandableSeeMore>

## Tech Stack

* Used [Apache PySpark](https://spark.apache.org/docs/latest/api/python/index.html) for data preprocessing, feature engineering and machine learning.
* Used KNN Imputer for imputing missing values.
* Used [Pandas](https://pandas.pydata.org/), [Numpy](https://numpy.org/), [Matplotlib](https://matplotlib.org/), and [Seaborn](https://seaborn.pydata.org/) for data analysis and visualization.
* [Optuna](https://optuna.org/) was used for hyperparameter tuning.
* [MLFlow](https://mlflow.org/) was used for tracking the model performance.

**Predictive Algorithms and Metrics**

* I used Random Forest Classifier, Gradient Boosting Classifier, LightGBM and XGBoost to predict the churn and the best model was selected based on F1 score.
* Along with the F1 score, I also used Precision, Recall and AUC to evaluate the model.

### Why PySpark?

Since I was already proficient in Pandas and [scikit-learn](https://scikit-learn.org/stable/), I wanted to explore a new technology. PySpark, a big data processing library capable of handling large datasets, presented a great opportunity to learn and apply it for data preprocessing, feature engineering, and machine learning.

Another advantage of PySpark is that I can execute SQL queries on the data directly. This is a great feature as I can use SQL queries to filter, group, and aggregate data. Only thing to keep in mind is that one has to create a [temporary view](https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_df.html#Working-with-SQL) of the data before executing SQL queries.

**Following is an example of SQL query to check the change in business value for drivers whose rating decreased**
<ExpandableSeeMore>

```python
spark_df.createOrReplaceTempView("ola_driver")

spark.sql("""
  with Lower_Rating_Drivers as (
      select
          distinct Driver_ID
      from
          (select
              Driver_ID,
              first(`Quarterly Rating`) over(partition by Driver_ID order by reporting_month_year) as first_rating,
              last(`Quarterly Rating`) over(partition by Driver_ID order by reporting_month_year) as last_rating
          from
              ola_driver
          )
      where
          first_rating > last_rating
  ),
  Quarterly_Business_Value as (
      select
          Driver_ID,
          ReportingYear_Quarter,
          sum(`Total Business Value`) over( partition by Driver_ID, ReportingYear_Quarter) as Total_Business_Value
      from
          ola_driver
          join Lower_Rating_Drivers using(Driver_ID)
  )
  select
      Driver_ID,
      first(Total_Business_Value) as First_Business_Value,
      last(Total_Business_Value) as Last_Business_Value,
      (Last_Business_Value - First_Business_Value)/ First_Business_Value as Business_Value_Change,
      case when Last_Business_Value < First_Business_Value then 1 else 0 end as Business_Decrease
  from
      Quarterly_Business_Value
  group by
      Driver_ID
""").show()
```

</ExpandableSeeMore>

## Data Preprocessing

### Imputation

This was a small dataset with some missing values. I wanted to use scikit-learn's KNN Imputer to impute these values. However, I didn't want to go through the hassle of converting my dataset to a Pandas dataframe, applying the KNN Imputer, and then converting it back to a PySpark dataframe.

Luckily, PySpark provides a feature called [UDF](https://sparkbyexamples.com/pyspark/pyspark-udf-user-defined-function/) (User Defined Functions). This allows me to use scikit-learn's KNN Imputer directly on my PySpark dataset.

<ExpandableSeeMore>

```python
list_of_columns = ['Driver_ID',
 'Age',
 'Gender',
 'Education_Level',
 'Income',
 'Joining Designation',
 'Grade',
 'Total Business Value',
 'Quarterly Rating']

df_numpy = np.array(spark_df.select(list_of_columns).collect()) # use a small subset of data that can fit in memory

k_imputer = KNNImputer(n_neighbors=5, weights='distance')
k_imputer.fit(df_numpy)

sc = spark.sparkContext
broadcast_model = sc.broadcast(k_imputer)

column_index_mapping = {col: idx for idx, col in enumerate(list_of_columns)}

def create_knn_imputer_udf(column_name):
    index = column_index_mapping[column_name]

    @sf.udf(IntegerType())
    def knn_impute(*cols):
        row = np.array(cols).reshape(1, -1)
        imputed_row = broadcast_model.value.transform(row)
        return int(imputed_row[0][index])
    return knn_impute

knn_impute_Age = create_knn_imputer_udf("Age")
spark_df = spark_df.withColumn("Age_Imputed", knn_impute_Age(*list_of_columns))

```

</ExpandableSeeMore>

<Alert title="NOTE" variant="warning">
There are better ways to impute missing values in PySpark, because of time and space complexity of KNN algorithm. I just wanted to learn how to use UDFs using scikit-learn's functions.
</Alert>

### Feature Engineering

* Converted Date columns to date-time format
* Created new features like `Tenure`, `Had_Negative_Business`, `Has_Income_Increased`, `Has_Rating_Increased` and `Churned`.

```python
window_spec = Window.partitionBy("Driver_ID").orderBy("reporting_month_year")

spark_df=spark_df.withColumns({
    "LastWorkingDate":  sf.coalesce(sf.col("LastWorkingDate"), sf.first("LastWorkingDate", True).over(window_spec)),
    "Churned":  sf.when(sf.col("LastWorkingDate").isNotNull(), 1).otherwise(0),
    "Had_Negative_Business":  sf.when(sf.col("Total Business Value") > 0, 1).otherwise(0),
    "Has_Income_Increased": sf.when(sf.last("Income").over(window_spec) > sf.first("Income").over(window_spec), 1).otherwise(0),
    "Has_Rating_Increased": sf.when(sf.last("Quarterly Rating").over(window_spec) > sf.first("Quarterly Rating").over(window_spec), 1).otherwise(0),
})
```

* Current data was a monthly data for each driver from 2019 to 2020. This data had to be aggregated to the individual driver level.

```python
agg_map=[
    sf.first("Dateofjoining").alias("Date_Of_Joining"),
    sf.sum("Total Business Value").alias("Total_Business_Value"),
    sf.sum("Had_Negative_Business").alias("Total_Had_Negative_Business"),
    sf.max("Has_Income_Increased").alias("Has_Income_Increased"),
    sf.max("Has_Rating_Increased").alias("Has_Rating_Increased"),
    sf.avg("Total Business Value").cast("int").alias("Avg_Business_Value"),
    sf.max("reporting_month_year").alias("Last_Reporting_Month"),
    sf.max("Age").alias("Age"),
    sf.mode("Gender").alias("Gender"),
    sf.last("Income").alias("Income"),
    sf.sum("Income").alias("Total_Income"),
    sf.first("Education_Level").alias("Education_Level"),
    sf.last("City").alias("City"),
    sf.first("Joining Designation").alias("Joining_Designation"),
    sf.last("Grade").alias("Grade"),
    sf.last("Quarterly Rating").alias("Quarterly_Rating"),
    sf.max("LastWorkingDate").alias("Last_Working_Date"),
    sf.max("churned").alias("Churned"),
]

merged_df = spark_df.sort("reporting_month_year").groupBy("Driver_ID").agg(*agg_map)
```

## Exploratory Data Analysis and Insights

### Tableau Dashboard

Although I am not a [Tableau](https://public.tableau.com/app/discover) expert, I created a dashboard to visualize the data. You can find the link to the dashboard below. A more detailed exploratory data analysis (EDA) is available in the notebook linked at the end.

[![Tableau](https://img.shields.io/badge/View%20on-Tableau-blue?logo=tableau)](https://public.tableau.com/views/OLA_Driver_Churn_Analysis/DriverChurnAnalysis?:showVizHome=no&:embed=true)

&nbsp;

**Following is the embedded dashboard from Tableau**

<iframe src="https://public.tableau.com/views/OLA_Driver_Churn_Analysis/DriverChurnAnalysis?:showVizHome=no&:embed=true" frameborder="0"  height="800" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" className="blog-wide-section"></iframe>

### Driver Related

* In the dataset, there are 1616 churned drivers, of which 667 are females.
* Only 699 drivers increased their rating
* Only 44 drivers were given increment
* There was a large number of drivers who joined in 2018 and a large exit of drivers during 2019.
* The income of Churned drivers is less than that of current drivers.
* Drivers with a 1-star rating are more likely to churn as compared to a higher rating
* Drivers having Grades 1, 2 and 3 are more likely to churn
* C13 has the highest ratio of Churned drivers
* C29 have the lowest ratio of Churned drivers and makes the highest revenue.
* C13 city has the best revenue-to-expense ratio
* Gender and Education level do not have a significant effect on Churn
* Joining designation and Joining year have significant effects on churn
* Drivers whose salary and rating increased are less likely to churn
* Higher-grade drivers have high business value
* We can see that Drivers who have negative business months are less likely to churn

**Driver Rating**

* The majority of driver ratings are 1 star. But there was no single 5-star rating.
* As Age increases, Quarterly ratings move towards the higher side.

**Change in ratings for different cities**

* C29 had the highest positive change in 4-star rating from 2019 to 2020
* C17 had the biggest fall of all types of rating from 2019 to 2020
* C2, C14, and C9 had a big fall of 3-star ratings from 2019 to 2020

**Effect on business value when ratings decrease**

* From the above plot we can see that out of 559 drivers whose rating decreased, 540 drivers' business decreased significantly.
* This shows that Driver rating has a significant impact on business

**Effect of rating based on the month of the year**

* We can see that demand increases from November to January but falls slightly during other months.
* This is because of the holiday season. Since the number of rides increases, the corresponding ratings also increase.
* There is not much seasonality

**Effect of Ratings based on City**

* There is little effect on drivers working in different cities, but there are some important points related to some cities.
* C17 has the lowest 4-star rating and the highest 1-star.
* C14, C16 and C24 have good pct of 4-star rating among other cities.

**Other features affecting Quarterly Rating**

* We can see that drivers joining at higher designation have a higher ratio of lower rating.
* But their absolute rating count is lesser as compared to lower designation.

## Business Recommendations

* Drivers should be given raises more often.
* Expectation from the job has to be asked of the drivers who joined recently as they tend to churn the most.
* Feedback must be taken from employees with consistently low ratings.
* Drivers can be assigned to different cities to check if their ratings can be increased.
* Ratings can be changed from Quarterly to monthly to reflect progress better.

* From all the above model feature importance Tenure, Quarterly Rating and Income are the biggest contributors for generating the predictions

## Predictive Model Recommendations

<div className="side-scrolling-table-container">
<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>F1</th>
      <th>Accuracy</th>
      <th>Precision</th>
      <th>Recall</th>
      <th>AUC</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LightGBM</td>
      <td>0.940727</td>
      <td>0.925659</td>
      <td>0.946154</td>
      <td>0.935361</td>
      <td>0.969285</td>
    </tr>
    <tr>
      <td>XGBoost</td>
      <td>0.937743</td>
      <td>0.923261</td>
      <td>0.960159</td>
      <td>0.916350</td>
      <td>0.968273</td>
    </tr>
    <tr>
      <td>Gradient Boosting</td>
      <td>0.919325</td>
      <td>0.896882</td>
      <td>0.907407</td>
      <td>0.931559</td>
      <td>0.955817</td>
    </tr>
    <tr>
      <td>Random Forest</td>
      <td>0.904762</td>
      <td>0.875300</td>
      <td>0.872792</td>
      <td>0.939163</td>
      <td>0.936497</td>
    </tr>
  </tbody>
</table>
</div>

From the above analysis of models, we can conclude that **LightGBM** has better stats as compared to other models.

### Precision Recall Gap

Recall means out of all the drivers, how correctly the model identifies churning and Precision means from all the drivers identified to be churned, how many churned.
Assume that the company has decided to give a raise to those drivers which are predicted to churn

**Case 1: Businesses want my model to detect even a small possibility of Churn.**

* In this case, I will decrease my threshold value. This will lead to an increase in recall but will decrease precision.
* This means more drivers will be predicted to churn i.e. More false positives will occur and fewer False negatives.
* This will lead to the company spending more money on retaining drivers.
* This model is important when retaining driver is more important than cost-saving

**Case 2: The business wants to make sure that the predicted driver will churn.**

* In this case, I will increase the threshold value. This will lead to an increase in precision but a decrease in recall
* This means less number of drivers will be predicted to churn. ie Less false positives and more false negative
* There is a possibility that the model will miss the driver that would churn. In this case, the company will lose an experienced driver.
* This model is important when cost saving has a higher priority than retaining the driver

**Conclusion**

* The company should focus more on Recall as this will help them retain more drivers.
* This might lead to higher costs but in the longer run it will be beneficial for the company

## Hosting the application

I have hosted the app on [Streamlit](https://streamlit.io/). The app can be found below. Although the final model had been built using PySpark, I couldn't host it on Streamlit due to resource constraints. So I built a model using scikit-learn and hosted it on Streamlit. ie I used the same hyper-parameters and features to build the model.

<Alert title="NOTE" variant="info">
  Streamlit shutdowns the app after some hours of inactivity. Please click on button 'wake up' button to restart the app.
</Alert>

[![Streamlit](https://static.streamlit.io/badges/streamlit_badge_red.svg)](https://driver-churn.streamlit.app/)

## Jupyter Notebook

The main notebook used for the analysis can be found below. One can view the notebook using the nbviewer or open it in Google Colab.

<div>

[![nbviewer](https://raw.githubusercontent.com/jupyter/design/master/logos/Badges/nbviewer_badge.svg)](https://nbviewer.org/github/gautamnaik1994/OLA-Driver-Churn-ML-CaseStudy/blob/main/notebooks/CaseStudy.ipynb?flush_cache=true)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/gautamnaik1994/OLA-Driver-Churn-ML-CaseStudy/blob/main/notebooks/CaseStudy.ipynb)
[![kaagle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://www.kaggle.com/code/gautamnaik1994/ola-driver-churn-prediction)

</div>

## GitHub Repository

The complete code can be found in the GitHub repository below

[![GitHub](https://img.shields.io/badge/View%20on-GitHub-blue?logo=github)](https://github.com/gautamnaik1994/OLA-Driver-Churn-ML-CaseStudy)
