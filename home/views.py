from django.views.generic import TemplateView
from django.http import request
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings


def HomePageView(request):
    return render(request, 'index.html')

def ServiziPageView(request):
    return render(request, 'servizi.html')

def GalleriaPageView(request):
    return render(request, 'gallery.html')

def DintorniPageView(request):
    return render(request, 'dintorni.html')

def MountainbikePageView(request):
    return render(request, 'mountainbike.html')

def TrekkingPageView(request):
    return render(request, 'trekking.html')

def EventiPageView(request):
    return render(request, 'eventi.html')

def ContattiPageView(request):
    return render(request, 'contatti.html')

def HomeenPageView(request):
    return render(request, 'indexen.html')

def ServicesenPageView(request):
    return render(request, 'servizien.html')

def GalleryenPageView(request):
    return render(request, 'galleryen.html')

def TrekkingenPageView(request):
    return render(request, 'trekkingen.html')

def MountainbikeenPageView(request):
    return render(request, 'mountainbikeen.html')

def DintornienPageView(request):
    return render(request, 'dintornien.html')

def EventienPageView(request):
    return render(request, 'eventien.html')

def ContattienPageView(request):
    return render(request, 'contattien.html')

def HomedePageView(request):
    return render(request, 'indexde.html')

def ServicesdePageView(request):
    return render(request, 'servizide.html')

def GallerydePageView(request):
    return render(request, 'galleryde.html')

def TrekkingdePageView(request):
    return render(request, 'trekkingde.html')

def MountainbikedePageView(request):
    return render(request, 'mountainbikede.html')

def DintornidePageView(request):
    return render(request, 'dintornide.html')

def EventidePageView(request):
    return render(request, 'eventide.html')

def ContattidePageView(request):
    return render(request, 'contattide.html')