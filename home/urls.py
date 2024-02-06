from django.urls import path
from .views import *

urlpatterns = [
    path('', HomePageView, name='home'),
    path('servizi', ServiziPageView, name='servizi'),
    path('dintorni', DintorniPageView, name='dintorni'),
    path('esperienze/mountain-bike', MountainbikePageView, name='mountainbike'),
    path('esperienze/trekking', TrekkingPageView, name='trekking'),
    path('eventi', EventiPageView, name='eventi'),
    path('contatti', ContattiPageView, name='contatti'),
    path('contatti/faq', FaqPageView, name='faq'),
]