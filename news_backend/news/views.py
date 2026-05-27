# from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

API_KEY = "d929dbe211874dc29109a493cb72c0f8"

@api_view(['GET'])
def get_news(request):
    topic = request.GET.get('topic', 'technology')

    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={API_KEY}"

    response = requests.get(url)
    data = response.json()

    return Response(data["articles"])