from django.views.generic import TemplateView
from django.http import request
from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings


def HomePageView(request):
    return render(request, 'index.html')

def CampingPageView(request):
    return render(request, 'campeggio.html')

def WellnessPageView(request):
    return render(request, 'wellness.html')

def RistorantePageView(request):
    return render(request, 'ristorante.html')

def SistemazioniPageView(request):
    return render(request, 'sistemazioni.html')

def PiazzolebasicPageView(request):
    return render(request, 'piazzolebasic.html')

def CamperstopPageView(request):
    return render(request, 'camper-stop.html')

def ChaletPageView(request):
    return render(request, 'chalet.html')

def FamigliaPageView(request):
    return render(request, 'famiglia.html')

def RelaxPageView(request):
    return render(request, 'relax.html')

def SportPageView(request):
    return render(request, 'sport.html')

def BiciclettaPageView(request):
    return render(request, 'bicicletta.html')

def TrekkingPageView(request):
    return render(request, 'trekking.html')

def SkiingPageView(request):
    return render(request, 'skiing.html')

def PrezziPageView(request):
    return render(request, 'prezzi.html')

def ContattiPageView(request):
    return render(request, 'contatti.html', {})

def FaqPageView(request):
    return render(request, 'faq.html')