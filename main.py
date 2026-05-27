import requests

api_key = "d929dbe211874dc29109a493cb72c0f8"

url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={api_key}"

response = requests.get(url)
news = response.json()

articles = news["articles"]

# for index, article in enumerate(articles, start=1):
#     print(f"{index}. {article['title']}")

#     Connects to News API
# 👉 Gets latest US news
# 👉 Converts response into Python format
# 👉 Loops through news
# 👉 Prints titles one by one

for index, article in enumerate(articles, start=1):
    print(f"\n{index}. {article['title']}")
    print(f"   Source: {article['source']['name']}")
    print(f"   Description: {article['description']}")

topic = input("Enter topic: ")

url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={api_key}"    

with open("news.txt", "w", encoding="utf-8") as file:
    for index, article in enumerate(articles, start=1):
        file.write(f"{index}. {article['title']}\n")

for article in articles:
    if article["title"] is not None:
        print(article["title"])        


# EVEL 5: Make it real project (IMPORTANT FOR YOU)

# Since you're learning Django / GitHub:

# Upgrade idea:

# ✔ Django News API backend
# ✔ React frontend
# ✔ Deploy online

# 🚀 BEST NEXT STEP (I RECOMMEND YOU THIS)

# Do this order:

# 1. Add topic search (easy)
# 2. Save to file
# 3. Push to GitHub
# 4. Convert into Django API project        