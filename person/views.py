# views.py
import json
from django.contrib.auth.hashers import make_password
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from .models import person


@method_decorator(csrf_exempt, name='dispatch')
class Create(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if person.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'})

        if person.objects.filter(email=email).exists():
            return JsonResponse({'message': 'Email already exists'})

        hashed_password = make_password(password)

        person_ = person(
            username=username,
            password=hashed_password,
            email=email,
            boi='',
            can_follow=False,
            can_search=False,
            can_comment=False,
        )
        person_.save()
        return JsonResponse({'message': 'Data saved successfully'})

    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Invalid request'})


@method_decorator(csrf_exempt, name='dispatch')
class setting(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        _id = data.get('id')
        username = data.get('username')
        email = data.get('email')
        name = data.get('name')
        can_comment = data.get('can_comment')
        can_follow = data.get('can_follow')
        can_search = data.get('can_search')

        if person.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'})

        if person.objects.filter(email=email).exists():
            return JsonResponse({'message': 'Email already exists'})

        _person = person.objects.get(id=_id)

        _person.username = username
        _person.name = name
        _person.email = email
        _person.can_follow = can_follow
        _person.can_search = can_search
        _person.can_comment = can_comment

        _person.save()
        return JsonResponse({'message': 'Data saved successfully'})

    def get(self, request, *args, **kwargs):
        person_id = kwargs.get('person_id')
        try:
            data_obj = person.objects.get(id=person_id)
            data_dict = model_to_dict(data_obj)

            data_dict['profile_img'] = str(data_dict['profile_img'])

            return JsonResponse(data_dict)
        except person.DoesNotExist:

            return HttpResponseBadRequest("Person with the given ID does not exist")


@method_decorator(csrf_exempt, name='dispatch')
class profile(View):
    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('user_id')
        profile_img = request.FILES.get('profile_img')

        # Save the image and update the user profile
        user_profile = person.objects.get(id=user_id)
        user_profile.profile_img = profile_img
        user_profile.save()

        return JsonResponse({'message': 'Image uploaded successfully'})


