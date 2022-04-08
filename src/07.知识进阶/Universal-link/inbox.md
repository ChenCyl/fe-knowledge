## 分类

- **Deep link:** When users click the link, users who have the App installed will be redirected to open the page with App.

    Users who haven't installed the App yet will be redirected to open the page with the mobile browser. 

- **Deferred deep link:** When users click the link, users who have the App installed will be redirect to open the page with App

    Users who haven't installed the App yet will be redirected to **Apple Store/ Google Store**

## 集成模块

- Facebook Ads
- Appsflyer Onelink. **External to Internal**.
- Xxxx Universal Link. In app, eg. banner
- Normal URL

## 问题导向

1. What is onelink?

   ![Linking Generator](inbox.assets/Linking%20Generator.jpeg)

   OneLink is a deep-linking product offered by Appsflyer.

2. Is using OneLink service? 

   根据上图，OneLink 的主要用途应该是在跳转到 Appstore 或 Google Play 的时候。

3. Why go to Google Play after 3 sec? - Link Type Behaviour - Android

   Currently when the universal-link url is open on mobile browser, we always redirect to the app download page, which will wait 3s for user action before continuing the redirection to mobile web page. The reason is that there could be case that user has already installed xxx app, but somehow clicking the link doesn't open xxx app directly, and therefore end up opening the universal link url in mobile browser. In this scenario, we want the user to be able to see the open app button and click it to open app again as last resort. But this is not necessary and sometimes it cause user complain, therefore the universal link url supports one additional parameter `deep_and_web=1` to skip the 3s wait time.

5. What is WSA?

   Web Service for Application

6. What is UTM?

   Urchin Tracking Module. A UTM code is a portion of text added to the end of a URL that enables you to track visits to that URL.

7. Could not go to Google Play when using Mobile Chrome in Android

   But Huawei self browser is OK.

7. Apple 是如何使 https:// 开头的 URL 唤醒 APP 的？

## Key Information of The Linking Problem

### 1. Deep Link 解决的问题

- 链接到一个**具体**的页面而不是单纯地打开一个 APP
  - devise a platform-neutral mechanism for identifying a page cause android and iOS has its own specific way of identifying a "page".
  - there're 3 different types of pages in xxx app, : web, RN, native :slightly_smiling_face:
  - can be used to open a page in xxx app, no matter the page is implemented in RN, web or native, and it will work on both android and iOS.
- 唤醒 APP
  - URI Schema 的缺点
    - when app is not installed, open this link will have error
    - different application can register the same URI schema and cause conflict.
  - iOS Universal Link and Android App Link
    - Tow-way association
    - Subdomain support: 目前 android 下只有根域名设置了 association，iOS 下只有根域名和 mall domain 设置了。这意味着 不支持 subdomain
    - System Requirement: The link click event is a system requirement, 将链接放在浏览器或 javascript navigate to link 是没用的
    - Happens in 3rd party application: depends on whether the 3rd party has its own logic.
  - 如果用户没有安装 APP，那么以上两种方法的表现是：
    - URI Schema: fail to open
    - iOS UL and Androil AL: fallback to the web page

### 2. Deferred Deep Link 解决的问题

- 预期：when app is not installed, we can redirect user to google play or app store to download app first and open the target page after app is installed.
- 方案：AppsFlyer.（Due to lack of support on iOS and limitation on android.）

>1. when user clicks the link, send a tracking event to server, store whatever device information that can gather along with the link
>2. navigate to app store or google play to download app
>3. when app first launches, send client information to server, if server is able to find a previous link click event that matches the device, returns associated link and app will open the link returned from server.

从以上过程可知，app 需要配合发送信息给 server
