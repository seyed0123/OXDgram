from django.http import JsonResponse
from django.views import View
from django.shortcuts import render


class IndexView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'hello': 'world'})


def home(request):
    return render(request, 'home.html', )
