tennis-analysising

0. Download Expo app

1. Install node_modules
  cd backend
  npm install
  cd ..
  cd frontend
  npm install

2. Run code in frontend folders
   cd frontend
   npx expo start

4. Connecting to phone
   Android: Scan QR code in Expo
   ios: Use the default scanner of ios ( No scanner in ios expo)

5. Click the bottom icon of "Add"
   
6. Allow all permissions (I'm not sure whether it works. If not, manually allow all access for microphone, camera, gallery access)
   
7. You could either shoot the video(manually stop or wait for 10 seconds automatically stop) to upload or select videos in gallery.
    (Attention: The shooting video will automatically saved in firebase. Please do not testing this function frequently.)

8. Firebase url: https://console.firebase.google.com/project/tiktok-clone-32fdc/overview
