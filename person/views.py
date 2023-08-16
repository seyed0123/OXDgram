# views.py
import json
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
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
            # Set other fields as necessary
        )
        person_.save()
        return JsonResponse({'message': 'Data saved successfully'})

    def get(self, request, *args, **kwargs):
        return JsonResponse({'message': 'Invalid request'})
