import random
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

            return HttpResponseBadRequest("Post with the given ID does not exist")


@method_decorator(csrf_exempt, name='dispatch')
class new(View):
    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('user_id')
        img = request.FILES.get('img')
        text = request.POST.get('text')
        if img is not None:
            post_obj = post(owner=user_id, img=img, text=text)
            post_obj.save()
            return JsonResponse({'message': 'Image uploaded successfully'})

        return JsonResponse({'message': 'Image was null'})

@method_decorator(csrf_exempt, name='dispatch')
class user_post(View):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            data_objects = post.objects.filter(owner=user_id)

            if data_objects:
                data_list = []
                for data_obj in data_objects:
                    data_dict = model_to_dict(data_obj)
                    data_dict['img'] = str(data_dict['img'])
                    data_list.append(data_dict)
                return JsonResponse(data_list, safe=False)
            else:
                # Handle the case when no post is found for the given owner
                return JsonResponse({'message': "No posts found for the owner."})
        except person.DoesNotExist:

            return JsonResponse({'message': "Person with the given ID does not exist"})

class home_post(View):
    def get(self, request, *args, **kwargs):
            data_objects = post.objects.all()

            if data_objects:
                data_list = []
                for data_obj in data_objects:
                    data_dict = model_to_dict(data_obj)

                    user = person.objects.get(id=data_obj.owner)
                    data_dict['img'] = str(data_dict['img'])
                    data_dict['owner_id'] = user.id
                    data_dict['profile'] = str(user.profile_img)
                    data_list.append(data_dict)

                random.shuffle(data_list)
                return JsonResponse(data_list, safe=False)
            else:
                # Handle the case when no post is found for the given owner
                return JsonResponse({'message': "No posts found."})
