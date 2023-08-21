# views.py
import json

from django.contrib import auth
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from .models import person

ID = 0

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
        bio = data.get('boi')
        can_comment = bool(data.get('can_comment'))
        can_follow = bool(data.get('can_follow'))
        can_search = bool(data.get('can_search'))
        old_password = data.get('old_password')
        password = data.get('password')

        user = person.objects.get(id=_id)
        _person = person.objects.get(id=_id)
        if (username != user.username) and (person.objects.filter(username=username).exists()):
            return JsonResponse({'message': 'Username already exists'})

        if (email != user.email) and person.objects.filter(email=email).exists():
            return JsonResponse({'message': 'Email already exists'})

        if (old_password is not None) and not check_password(old_password, user.password):
            return JsonResponse({'message': 'old password in wrong'})

        elif old_password is not None:
            _person.password = make_password(password)

        _person.username = username
        _person.name = name
        _person.email = email
        _person.can_follow = can_follow
        _person.can_search = can_search
        _person.can_comment = can_comment
        _person.boi = bio

        _person.save()
        return JsonResponse({'message': 'Data saved successfully'})

    def get(self, request, *args, **kwargs):
        person_id = kwargs.get('person_id')
        try:
            data_obj = person.objects.get(id=person_id)
            data_dict = model_to_dict(data_obj)

            data_dict['profile_img'] = str(data_dict['profile_img'])
            data_dict['banner_img'] = str(data_dict['banner_img'])

            return JsonResponse(data_dict)
        except person.DoesNotExist:

            return JsonResponse({'message': "Person with the given ID does not exist"})


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


@method_decorator(csrf_exempt, name='dispatch')
class banner(View):
    def post(self, request, *args, **kwargs):
        user_id = request.POST.get('user_id')
        banner_img = request.FILES.get('banner_img')

        # Save the image and update the user profile
        user_profile = person.objects.get(id=user_id)
        user_profile.banner_img = banner_img
        user_profile.save()

        return JsonResponse({'message': 'Image uploaded successfully'})


@method_decorator(csrf_exempt, name='dispatch')
class login(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')

            if not (person.objects.filter(username=username).exists()):
                return JsonResponse({'message': 'Username is not correct'})

            user = person.objects.get(username=username)
            old_password = data.get('password')

            if not check_password(old_password, user.password):
                return JsonResponse({'message': 'password in wrong'})

            global ID
            ID = user.id
            return JsonResponse({'id': ID})

        except:
            return JsonResponse({'id': 0})


@method_decorator(csrf_exempt, name='dispatch')
class logout(View):
    def post(self, request, *args, **kwargs):
        global ID
        ID = 0
        return JsonResponse({'message': 'logout'})

class check(View):
    def get(self, request, *args, **kwargs):
        global ID
        return JsonResponse({'id': ID})
