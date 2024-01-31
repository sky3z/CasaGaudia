from django.urls import path
from .views import *

urlpatterns = [
    path('', HomePageView, name='home'),
    path('campeggio/campeggio', CampingPageView, name='campeggio'),
    path('campeggio/wellness', WellnessPageView, name='wellness'),
    path('campeggio/ristorante', RistorantePageView, name='ristorante'),
    path('sistemazioni/', SistemazioniPageView, name='sistemazioni'),
    path('sistemazioni/piazzole/piazzolebasic', PiazzolebasicPageView, name='piazzolebasic'),
    path('sistemazioni/piazzole/camper-stop', CamperstopPageView, name='camper-stop'),
    path('sistemazioni/chalet', ChaletPageView, name='chalet'),
    path('esperienze/famiglia', FamigliaPageView, name='famiglia'),
    path('esperienze/relax', RelaxPageView, name='relax'),
    path('esperienze/sport', SportPageView, name='sport'),
    path('esperienze/sport/bicicletta', BiciclettaPageView, name='bicicletta'),
    path('esperienze/sport/trekking', TrekkingPageView, name='trekking'),
    path('esperienze/sport/skiing', SkiingPageView, name='skiing'),
    path('prezzi', PrezziPageView, name='prezzi'),
    path('contatti', ContattiPageView, name='contatti'),
    path('contatti/faq', FaqPageView, name='faq'),
]