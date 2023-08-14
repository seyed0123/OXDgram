from django.http import JsonResponse
from django.views import View


class IndexView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'hello': 'world'})
