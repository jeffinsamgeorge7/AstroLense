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

from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
# clf = make_pipeline(StandardScaler(), SVC(gamma='auto'))
# clf.fit(X_train, y_train)
# y_pred = clf.predict(X_test)



def predict_exoplanetsvm(request):
    kepler_name = request.GET.get('kepler_name')
    if not kepler_name:
        return JsonResponse({'error': 'Kepler name not provided'}, status=400)

    # Load the trained model and perform prediction
    model = make_pipeline(StandardScaler(), SVC(gamma='auto'))
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



# from django.http import JsonResponse
# from django.views import View
# import matplotlib.pyplot as plt
# import lightkurve as lk
# import numpy as np
# import os

# class KeplerImageView(View):
#     def get(self, request, *args, **kwargs):
#         kepler_name = request.GET.get('kepler_name')

#         # Your existing code here...
    
#         search_result = lk.search_lightcurve(kepler_name , author='Kepler', cadence='long')

#         lc_collection = search_result.download_all()

#         lc = lc_collection.stitch().flatten(window_length=901).remove_outliers()
#         lightcurve_path = os.path.join('static', f'{kepler_name}_lightcurve.png')


#         period = np.linspace(1, 30, 10000)

#         bls = lc.to_periodogram(method='bls', period=period, frequency_factor=500)
#         periodogram_path = os.path.join('static', f'{kepler_name}_periodogram.png')
#         planet_b_period = bls.period_at_max_power
#         planet_b_t0 = bls.transit_time_at_max_power
#         planet_b_dur = bls.duration_at_max_power

#         ax = lc.fold(period=planet_b_period, epoch_time=planet_b_t0).scatter()
#         ax.set_xlim(-5, 5)
#         folded_lightcurve_path = os.path.join('static', f'{kepler_name}_folded_lightcurve.png')

#         plt.savefig(lightcurve_path)
#         plt.savefig(periodogram_path)
#         plt.savefig(folded_lightcurve_path)

#         # Return the URLs of the images
#         return JsonResponse({
#             'lightcurve_url': request.build_absolute_uri(lightcurve_path),
#             'periodogram_url': request.build_absolute_uri(periodogram_path),
#             'folded_lightcurve_url': request.build_absolute_uri(folded_lightcurve_path),
#         })

from django.http import JsonResponse
from django.views import View
import matplotlib.pyplot as plt
import lightkurve as lk
import numpy as np
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings

class KeplerImageView(View):
    def get(self, request, *args, **kwargs):
        kepler_name = request.GET.get('kepler_name')

        # Your existing code here...
    
        search_result = lk.search_lightcurve(kepler_name , author='Kepler', cadence='long')

        lc_collection = search_result.download_all()

        lc = lc_collection.stitch().flatten(window_length=901).remove_outliers()
        plt.savefig(lc)
        lightcurve_path = os.path.join('static', f'{kepler_name}_lightcurve.png')

        period = np.linspace(1, 30, 10000)

        bls = lc.to_periodogram(method='bls', period=period, frequency_factor=500)
        periodogram_path = os.path.join('static', f'{kepler_name}_periodogram.png')
        planet_b_period = bls.period_at_max_power
        planet_b_t0 = bls.transit_time_at_max_power
        planet_b_dur = bls.duration_at_max_power

        ax = lc.fold(period=planet_b_period, epoch_time=planet_b_t0).scatter()
        ax.set_xlim(-5, 5)
        folded_lightcurve_path = os.path.join('static', f'{kepler_name}_folded_lightcurve.png')

        # Save the images
        plt.savefig(lightcurve_path)
        lightcurve_url = os.path.join('static', f'{kepler_name}_lightcurve.png')
        # plt.savefig(periodogram_path)
        # periodogram_url = os.path.join('static', f'{kepler_name}_periodogram.png')
        # plt.savefig(folded_lightcurve_path)

        # # URLs of the images
        
       
        # folded_lightcurve_url = os.path.join('static', f'{kepler_name}_folded_lightcurve.png')

        # Return the URLs of the images
        return JsonResponse({
            'lightcurve_url': lightcurve_url,
            # 'periodogram_url': periodogram_url,
            # 'folded_lightcurve_url': folded_lightcurve_url
        })