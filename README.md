<!-- HOW TO OPEN THE PROJECT -->

0. Download Expo app

1. Install node_modules
   cd frontend
   npm install

2. Run code in frontend folders
   cd frontend
   npx expo start

3. Connecting to phone
   Android: Scan QR code in Expo
   IOS: Use the default scanner of ios ( No scanner in ios expo)

<!-- CURRENT FUNCTIONS OF PROJECT -->

1. Sign up: When you first use this application, you should sign up a user account with an email link with "@XXX.XXX" and an at least six length password.
2. Login: Login with your email and password just signed up.
3. Profile: Navigate profile through the bottom navbar with me. And you can click the edit icon near the default avatar to edit your personal information.
4. Click the add icon to start recording. If you are the new user, you need open all the permission of gallery, video, and voice. You could either shoot the video(manually stop or wait for 10 seconds automatically stop) to upload or select videos in gallery. (Attention: The shooting video will automatically saved in firebase. Please do not testing this function frequently.)
