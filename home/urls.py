from django.urls import path
from .views import *

urlpatterns = [
    path('', HomePageView, name='home'),
    path('servizi', ServiziPageView, name='servizi'),
    path('galleria', GalleriaPageView, name='galleria'),
    path('dintorni', DintorniPageView, name='dintorni'),
    path('esperienze/mountain-bike', MountainbikePageView, name='mountainbike'),
    path('esperienze/trekking', TrekkingPageView, name='trekking'),
    path('eventi', EventiPageView, name='eventi'),
    path('contatti', ContattiPageView, name='contatti'),
    path('en', HomeenPageView, name='homeen'),
    path('en/services', ServicesenPageView, name='servicesen'),
    path('en/gallery', GalleryenPageView, name='galleryen'),
    path('en/experience/trekking', TrekkingenPageView, name='trekkingen'),
    path('en/experience/mountain-bike', MountainbikeenPageView, name='mountainbikeen'),
    path('en/arounds', DintornienPageView, name='dintornien'),
    path('en/events', EventienPageView, name='eventien'),
    path('en/aboutus', ContattienPageView, name='contattien'),
     path('de', HomedePageView, name='homede'),
    path('de/dienstleistungen', ServicesdePageView, name='servicesde'),
    path('de/fotogalerie', GallerydePageView, name='galleryde'),
    path('de/erfahrungen/trekking', TrekkingdePageView, name='trekkingde'),
    path('de/erfahrungen/mountain-bike', MountainbikedePageView, name='mountainbikede'),
    path('de/umgebung', DintornidePageView, name='dintornide'),
    path('de/veranstaltungen', EventidePageView, name='eventide'),
    path('de/überuns', ContattidePageView, name='contattide'),

]