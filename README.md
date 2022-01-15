# **Computer Vision Game Playground**

## **Install:**

install frontend & backend package
```
# in './Playground'
cd frontend && yarn

# in './Playground'
cd backend && yarn
```

---

## **Run in localhost :**
1. Open two terminal windows
2. go to './Playground/backend' folder and copy .env.defaults file to .env
3. Fill the MONGO_URL in .env file with your mongodb url and set SALT_ROUNDS
   ```
   #.env
    MONGO_URL= (your mongo url)
    SALT_ROUNDS= (you can set SALT_ROUNDS=10)
   ```
4. go to './Playground' 
5. In one window run this script to start your backend:
    ```
    yarn backend
    ```
6. In the other one window run this script to start your frontend:
    ```
    yarn frontend
    ```
7. Go to http://localhost:3000 in your browser than start to play our games!

---

## **Teamwork:**

郭柏志：  
- 前端整體畫面Layout的UI/UX設計
- Sign In, Sign Up  Page功能與畫面設計
- Game Page 架構與畫面設計
- Pose Flappy Bird Game 遊戲開發
- 各頁面的Routes安排與path處理  
  
費聿暄:  
-  ...
 
蔡予謙:
-  ...



