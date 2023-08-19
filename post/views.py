from django.forms import model_to_dict
from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import post
from person.models import person

# Create your views here.


class info(View):
    def get(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        try:
            data_obj = post.objects.get(id=post_id)
            data_dict = model_to_dict(data_obj)

            data_dict['img'] = str(data_dict['img'])

            return JsonResponse(data_dict)
        except post.DoesNotExist:

            return HttpResponseBadRequest("Person with the given ID does not exist")


@method_decorator(csrf_exempt, name='dispatch')
class new(View):
    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('user_id')
        img = request.FILES.get('img')
        text = request.POST.get('text')

        _person = person.objects.get(id=user_id)

        print(_person.username)
        name = _person.username

        post_obj = post(owner=name, img=img, text=text)
        post_obj.save()

        return JsonResponse({'message': 'Image uploaded successfully'})
