from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import LoginSerializer,RegisterSerializer,ExoplanetSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.http import FileResponse
from django.views import View
from PIL import Image
from astropy.io import fits
import matplotlib.pyplot as plt
import numpy as np
import os
from django.http import JsonResponse
import requests


# from rest_framework import viewsets
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import FitsFile

# from astropy.io import fits
# import matplotlib.pyplot as plt
# import io


class RegisterAPI(APIView):
    def post(self,request):
        data=request.data
        serializer=RegisterSerializer(data=data)

        if  not serializer.is_valid():
            return Response({
                'status':False,
                'message':serializer.errors}
                ,status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        
        return Response({'status':True,'message':'user created sucessfully'},status.HTTP_200_OK)
        
class LoginAPI(APIView):
    def post(self,request):
        data = request.data
        serializer =LoginSerializer(data=data)

        if  not serializer.is_valid():
            return Response({
                'status':False,
                'message':serializer.errors}
                ,status.HTTP_400_BAD_REQUEST)
        
        user=authenticate(username=serializer.data['username'],password=serializer.data['password'])
        if not user:
            return Response({
                'status':False,
                'message':'invalid credentials'}
                ,status.HTTP_400_BAD_REQUEST)


        token , _ =Token.objects.get_or_create(user=user)
        print(token)

        return Response({'status':True,'message':'login sucessfull','token':str(token)},status.HTTP_200_OK)
        


# views.py
from rest_framework import generics
from .models import Exoplanet

class ExoplanetListCreate(generics.ListCreateAPIView):
    queryset = Exoplanet.objects.all()
    serializer_class = ExoplanetSerializer



from django.http import JsonResponse


def exoplanet_list(request):
    exoplanets = Exoplanet.objects.all().values()  # Get all exoplanet data
    return JsonResponse(list(exoplanets), safe=False)


####
from django.http import JsonResponse
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
df = pd.read_csv('account/searchdata.csv')

def predict_exoplanet(request):
    kepler_name = request.GET.get('kepler_name')
    if not kepler_name:
        return JsonResponse({'error': 'Kepler name not provided'}, status=400)

    # Load the trained model and perform prediction
    model = RandomForestClassifier(n_estimators=100, criterion='gini')
    train = pd.read_csv('account/train.csv')
    X = train.drop(['ExoplanetCandidate'], axis=1)
    Y = train['ExoplanetCandidate']
    model.fit(X, Y)

    # Fetch data for the given Kepler name
    output_list = get_rows_by_koiname(kepler_name)

    # Predict using the model
    prediction = model.predict(output_list)

    # Return the prediction result
    result = {'is_exoplanet': bool(prediction[0])}
    return JsonResponse(result)

# Helper function
def get_rows_by_koiname(koiname):
    rows = df[df['KOIName'] == koiname]
    if not rows.empty:
        rows_list = []
        for index, row in rows.iterrows():
            # Exclude the 'KOIName' and 'KeplerName' columns from the row values
            row_values = row.drop(['KOIName', 'KeplerName']).tolist()
            rows_list.append(row_values)
        return rows_list
    else:
        return None
    

from astropy.io import fits
import matplotlib.pyplot as plt
import io
import base64

def generate_image_from_fits(request):
    if request.method == 'POST' and request.FILES.get('fits_file'):
        fits_file = request.FILES['fits_file']
        try:
            astro_data = fits.open(fits_file)
            image_data = astro_data[0].data

            # Generate image
            plt.figure(figsize=(10, 10))
            plt.imshow(image_data, cmap="inferno")
            plt.axis('off')

            # Convert image to base64 string
            buf = io.BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            image_base64 = base64.b64encode(buf.read()).decode('utf-8')

            # Close the FITS file
            astro_data.close()

            return JsonResponse({'image': image_base64})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Please upload a FITS file'}, status=400)

from django.http import JsonResponse
from django.views import View
from astropy.io import fits
import matplotlib.pyplot as plt
import io
import base64


# class UploadFITSView(View):
#     def post(self, request):
#         fits_file = request.FILES['file']
#         astro_data = fits.open(fits_file)
#         image_data = astro_data[0].data

#         plt.figure(figsize=(10, 10))
#         plt.imshow(image_data, cmap="inferno")
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png')
#         buf.seek(0)
#         string = base64.b64encode(buf.read())
#         uri = 'data:image/png;base64,' + urllib.parse.quote(string)
#         astro_data.close()

#         return JsonResponse({'image': uri})

# views.py
# from django.http import JsonResponse
# from django.views import View
# from astropy.io import fits
# import matplotlib.pyplot as plt
# import io
# import base64
# import urllib

# class UploadFITSView(View):
#     def post(self, request):
#         fits_file = request.FILES['file']
#         astro_data = fits.open(fits_file)
#         image_data = astro_data[0].data

#         plt.figure(figsize=(10, 10))
#         plt.imshow(image_data, cmap="inferno")
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png')
#         buf.seek(0)
#         string = base64.b64encode(buf.read())
#         uri = 'data:image/png;base64,' + urllib.parse.quote(string)
#         astro_data.close()

#         return JsonResponse({'image': uri})


class UploadFITSView(View):
    def post(self, request):
        fits_file = request.FILES['file']
        with fits.open(fits_file) as hdul:
            image_data = hdul[0].data
        plt.imshow(image_data, cmap="gray")
        plt.colorbar()
        plt.savefig("output.png")
        return FileResponse(open('account/output.png', 'rb'))



def apod(request):
    response = requests.get('https://api.nasa.gov/planetary/apod?api_key=qo425eXBFTrjbXSGfl6yPsa98TLM8pkR0eVqhgLI')
    return JsonResponse(response.json())

