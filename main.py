import requests

api_key = "d929dbe211874dc29109a493cb72c0f8"

url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}"

response = requests.get(url)
news = response.json()

articles = news["articles"]

for index, article in enumerate(articles, start=1):
    print(f"{index}. {article['title']}")