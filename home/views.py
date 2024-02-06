from django.views.generic import TemplateView
from django.http import request
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings


def HomePageView(request):
    return render(request, 'index.html')

def ServiziPageView(request):
    return render(request, 'servizi.html')

def DintorniPageView(request):
    return render(request, 'dintorni.html')

def MountainbikePageView(request):
    return render(request, 'mountainbike.html')

def TrekkingPageView(request):
    return render(request, 'trekking.html')

def EventiPageView(request):
    return render(request, 'eventi.html')

def ContattiPageView(request):
    return render(request, 'contatti.html', {})

def FaqPageView(request):
    return render(request, 'faq.html')