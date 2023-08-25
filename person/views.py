# views.py
import datetime
import json
import random
import uuid

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, auth
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from .models import person, Follower

IDs = {}


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

        person_ = person.objects.create(username=username, email=email, password=hashed_password, boi='', can_follow=True,
                                        can_search=True)
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
            data_dict['follower_num'] = Follower.objects.filter(user=person_id).count()

            data_dict['following_num'] = Follower.objects.filter(follower=person_id).count()
            return JsonResponse(data_dict)
        except person.DoesNotExist:

            return JsonResponse({'message': "Person with the given ID does not exist"})

@method_decorator(csrf_exempt, name='dispatch')
class is_follow(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        person_id = data['person_id']
        token = data['token']

        global IDs
        username = IDs.get(token, 0)[0]
        user_id = person.objects.get(username=username).id
        data_dict = {}
        if Follower.objects.filter(follower=user_id, user=person_id).count() == 1:
            data_dict['following'] = True
        else:
            data_dict['following'] = False
        return JsonResponse(data_dict)


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
            password = data.get('password')

            if person.objects.filter(username=username).count() != 1:
                return JsonResponse({'message': "login failed"})
            elif not check_password(password, person.objects.get(username=username).password):
                return JsonResponse({'message': "login failed"})

            global IDs

            token = str(uuid.uuid4())
            timestamp = datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
            IDs[token] = (username, timestamp)
            return JsonResponse({'token': token})

        except Exception as e:
            return JsonResponse({'message': "login failed"})


@method_decorator(csrf_exempt, name='dispatch')
class logout(View):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        token = data['token']

        global IDs

        IDs.remove(token)
        return JsonResponse({'message': 'logout'})


@method_decorator(csrf_exempt, name='dispatch')
class check(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        token = data['token']

        global IDs
        username = IDs.get(token, 0)[0]
        user_id = 0
        if username != 0 and datetime.datetime.utcnow() < IDs.get(token, 0)[1]:
            user_id = person.objects.get(username=username).id
        return JsonResponse({'id': user_id})


@method_decorator(csrf_exempt, name='dispatch')
class follow(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        token = data['token']
        global IDs
        username = IDs.get(token, 0)[0]
        follower = person.objects.get(username=username).id
        user = data['user']

        if Follower.objects.filter(follower=follower, user=user).first():
            delete_follower = Follower.objects.get(follower=follower, user=user)
            delete_follower.delete()
            return JsonResponse({'message': 'Unfollowed'})
        else:
            new_follower = Follower.objects.create(follower=follower, user=user)
            new_follower.save()
            return JsonResponse({'message': 'followed'})


@method_decorator(csrf_exempt, name='dispatch')
class search(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        searched_username = data['search']
        persons = person.objects.filter(username__icontains=searched_username)
        if persons:
            data_list = []
            for data_obj in persons:
                data_dict_ = {'id': data_obj.id, 'username': data_obj.username, 'profile': str(data_obj.profile_img)}
                data_list.append(data_dict_)

            random.shuffle(data_list)
            return JsonResponse(data_list, safe=False)
        else:
            # Handle the case when no post is found for the given owner
            return JsonResponse({'message': "No user found."})


@method_decorator(csrf_exempt, name='dispatch')
class recom(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        person_id = data['id']
        user_following = Follower.objects.filter(follower=person_id)
        rec = []
        for obj in user_following:
            users = Follower.objects.filter(follower=obj.user).exclude(user=person_id)
            dics = []
            for user in users:
                if user not in user_following:
                    user = person.objects.get(id=user.user)
                    dics.append({'user': user.username, 'id': user.id, 'imgOwner': str(user.profile_img)})
                if dics:
                    rec.append(*dics)

        random_items = []
        for i in range(min(5, len(rec))):
            random_item = random.choice(rec)
            random_items.append(random_item)

        return JsonResponse(random_items, safe=False)
