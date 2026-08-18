# TyreSaathi — Free Setup Guide (Hinglish)

Ye app bilkul **free** rahegi agar aap in steps ko follow karein. Kahin bhi credit card nahi mangega.

---

## STEP 1: Firebase Project Banayein (Free)

1. Jayein: https://console.firebase.google.com
2. Google account se login karein (Gmail chalega)
3. **"Add Project"** dabayein → koi bhi naam dein (jaise `tyresaathi`) → Continue
4. Google Analytics ka option aayega — **"Disable"** kar dein (zaroorat nahi) → **Create Project**

## STEP 2: Firestore Database On Karein

1. Left sidebar mein **Build > Firestore Database** par jayein
2. **"Create Database"** dabayein
3. **"Start in test mode"** choose karein → Next → apna nearest region select karein (jaise `asia-south1 (Mumbai)`) → Enable

## STEP 3: Web App Register Karein & Config Copy Karein

1. Project Overview page par **`</>`** (Web) icon par click karein
2. App ka nickname dein (jaise `tyresaathi-web`) → **Register App**
3. Aapko ek code dikhega jisme `firebaseConfig = {...}` hoga — is object ke andar ki saari values copy kar lein
4. Is project ke andar `src/firebase.js` file kholein, aur jo `YOUR_API_KEY`, `YOUR_PROJECT_ID` waghera likha hai, unko apni copied values se replace kar dein

## STEP 4: Apne Computer Par App Chalayein (Test Karne Ke Liye)

Terminal/Command Prompt kholein, is folder ke andar jayein, aur ye commands chalayein:

```
npm install
npm run dev
```

Ek local link milega (jaise `http://localhost:5173`) — usko browser mein kholein aur app test karein. Ab jo bhi saman/job add karenge, wo Firebase mein permanently save hoga.

## STEP 5: Free Hosting (Vercel) Par Deploy Karein

1. Jayein: https://vercel.com aur GitHub/Google account se sign up karein (free)
2. Apna code GitHub par upload karein (agar GitHub account nahi hai to https://github.com par free bana lein, naya repository banayein, aur is poore folder ko usme push kar dein)
3. Vercel dashboard mein **"Add New Project"** → apni GitHub repository select karein → **Deploy**
4. 1-2 minute mein aapko ek free live link milega, jaise: `tyresaathi.vercel.app`

Ye link kisi ko bhi (WhatsApp, Facebook, kahin bhi) bhej sakte hain — unke phone ke browser mein khulega, aur wo chahe to "Add to Home Screen" karke ise app jaisa bana sakte hain.

---

## Security Note (Important)

`firestore.rules` file mein rules abhi **open** rakhe hain (koi bhi read/write kar sakta hai) taaki shuruaat aasan ho. Jab aapke real users badhein, Firebase Console > Firestore > Rules mein jaake in rules ko paste kar dein, aur aage chal ke Phone-number verification (Firebase Auth) jodne ka soch sakte hain taaki fake entries na ho.

## Free Limits (Firebase Spark Plan)

- 1 GB storage
- Roz ~50,000 reads / ~20,000 writes free
- Chhoti se medium app ke liye (shuru ke sainkdo users) ye kaafi hai — jab tak users bahut zyada na badh jayein, koi bill nahi aayega.

## Agar Kahin Atak Jayein

Jo bhi step mein dikkat aaye, uska exact error message ya screenshot leke poochh sakte hain — step-by-step aage guide kar diya jayega.
