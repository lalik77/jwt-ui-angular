
# 1 - Create project 
![](img/new-angular-project.png)
![](img/new-angular-project2.png)
Create new branch  'jwt-mami-ui' from master 
![](img/new-branch-jwt-ui.png)

# 2 - NPM Install bootstrap and JQuery

![](img/install-bootstrap-jquery-1.png)
![](img/install-bootstrap-jquery-2.png)
Once this installation is done we have to configure angular.json file
![](img/add-config-angular-json-file.png)
Now we have to open app.component.html file and remove everything,
and inside it write our simple implementation;
![](img/app-component-html-1.png)
![](img/app-component-html-2.png)
![](img/ng-serve.png)
![](img/app-running.png)

# 3 - Create components
Home component
![](img/ng-g-c-home-1.png)
![](img/ng-g-c-home-2.png)
As well we have to create admin , user , header , login ...

![](img/created-components-1.png)

Now we have created our required components 

# 4 - Create services and auth folders

Inside app folder we will create __services_ folder
and __auth_ folder 

![](img/services-and-auth-new-folders.png)

# 5 - Insert into header.component.hml code from bootstrap
![](img/nav-bar-from-bootstarp.png)

- go to header.component.ts file and copy 'app-header' selector

![](img/header-component-ts-file.png)

- go to app.component.html file

![](img/app-component-html-file.png)


And now after running the app we have 

![](img/app-running-nav-bar.png)

- Edit header.component.html file . Remove and rename some elements

# 6 - Configure the paths  and editing home , admin and user html files

So in Angular, the app-routing.module.ts file is a common convention for defining and configuring the routing module for your Angular application. If your Angular project doesn't have an app-routing.module.ts file, you can manually create one. Here's a step-by-step guide:

Step 1: Create app-routing.module.ts<br>
Create a new file named` app-routing.module.ts` in the `src/app` directory of your Angular project.

![](img/routing/app-routing-module-ts-1.png)

Step 2: Create Component Files<br>
Our Components are created

Step 3: Update app.module.ts<br>
Open your `app.module.ts` file and import and add the `AppRoutingModule` to the imports array.

![](img/routing/app-module-ts.png)

Step 4:

Make changes in the header-component-html file

![](img/header-component-html-1.png)
![](img/header-component-html-2.png)

![](img/routing/app-component-html-2.png)

Step 5: Use `<router-outlet>` in app.component.html
Open app.component.html and add the <router-outlet> element where you want the routed component to be displayed.

![](img/routing/app-component-html.png)



Now when we click, we have appropriate component in the view 

![](img/user-works.png)

# 7 - Create form for login 
![](img/login-component-html.png)
![](img/app-module-ts-2.png)
![](img/login-component-ts.png)
![](img/login-component-ts-2.png)
![](img/form-submitted-1.png)

# 8 - Communication with the backend

user service - that service will hold all my endpoints 

For this we have to create the services<br>
Back to the terminal , inside __services_ folder

![](img/create-services-user.png)
![](img/create-services-user-2.png)

After creating the service , we open app.module.ts file

![](img/app-module-ts-import-http.png)

Now we have to open user.service.ts<br>
And edit it

![](img/user-service-ts.png)

Now we have to inject user-service in login-component

![](img/inject-user-service-login-comp.png)

We have back end spring boot running . 
Remember when we run spring boot application we have 
a default admin-role-user is created by default 
login  - admin77
password - admin@password77

![](img/response-from-ui-1.png)

# 9 - Using Local Storage

[Article](https://blog.jscrambler.com/working-with-angular-local-storage)

We generate a new service 

![](img/generate-user-auth-service.png)

This service will be responsible to communicate
with local storage

Inside `app.module.ts` we have to import `AppRoutingModule`

![](img/routing/app-module-ts.png)

Editing user-auth.service.ts <br>
We have to save the roles and save the token as well ...

- setters for roles:[] and jwtToken:string 
- getters for roles:[] and jwtToken
- function that will clear the localStorage
- isLoggedIn() function
<br>

![](img/user-auth-service.ts.png)

Inject new service in login.component.ts file


![](img/login-component-ts-inject-user-auth.png)
When we run the app with the backend

![](img/running-app-1.png)

Make changes to login() function in login.component.ts file

![](img/running-app-2.png)

And so on 
![](img/running-app-3.png)

Write some logic , if when the logger is admin, then 
route to admin , else to user;

![](img/login-component-ts-1.png)

# 10 - Write logic for Login and Logout

We open the header.component.ts file 

![](img/header-component-ts-1.png)

File header.component.html, using directive *ngIf

![](img/header-component-html-3.png)

Add logOut()

![](img/header-component-ts-2.png)

Edit header.component.html file -> add logOut() call
to click event 

![](img/header-component-html-4.png)

# 11 - Show Admin or User Dashboard respectively to who is logged in
![](img/running-app-4.png)

Inside `user.service.ts` we will write a new function `roleMatch(allowedRoles)` that will check the role we will pass

![](img/user-service-ts-2.png)

Inside header.component.ts we inject userService instance

![](img/header-component-ts-5.png)

Inside  header.component.html write conditions ising *ngIf

![](img/header-component-html-5.png)

Now we have the app like this<br>
Home page

![](img/running-app-without-login.png)

Entering admin credentials

![](img/running-app-login-admin.png)

Logged as admin - we have only admin dashboard active

![](img/running-app-logged-as-admin.png)

# 12 - Passing the JWT token. Implement AuthGuard and Interceptor

When create AuthInterceptor, does not forget to add @Injectable

In Angular, AuthGuard and Interceptor are both concepts related to handling authentication and authorization within an application.

 - Authguard
`AuthGuard` is a class that implements the CanActivate interface in Angular's Router. It's used to control access to certain routes based on whether the user is authenticated or meets certain criteria. When a user tries to navigate to a route protected by an AuthGuard, Angular calls the canActivate method of that guard. If the canActivate method returns true, navigation is allowed; otherwise, the user is redirected to another route or denied access.

- Interceptor
Interceptors are middleware functions that you can use to intercept incoming or outgoing HTTP requests and responses. They're particularly useful for tasks like adding headers to requests, handling errors globally, or performing logging. Angular's HttpClient module allows you to attach interceptors to its pipeline.

Generate guard

![](img/terminal-generate-auth-guard.png)

![](img/auth-guard-ts-file-created.png)

Before writing anything in auth guard , 
we have to create an interceptor, so we 
can configure the interceptor

![](img/create-auth-interceptor-ts-file.png)


Then we go the app.module.ts file 
![](img/app-module-ts-1.png)
![](img/app-module-ts-3.png)

Now we have to write code inside interceptor and auth guard

Write code in interceptor 
![](img/auth-interceptor-1.png)
------------------------------
![](img/auth-interceptor-2.png)

Write code in auth guard 
![](img/auth-guard-1.png)
-------------------------------
![](img/auth-guard-2.png)

Make config changes to `app-routing.module.ts`

![](img/app-module-can-activate.png)

Testing manually the app<br>
We will create with postman a user to have one admin and one user 
in our application 

![](img/postman-create-new-user.png)
![](img/app-running-jwt-1.png)
![](img/app-running-jwt-2.png)
![](img/app-running-jwt-3.png)
![](img/app-running-jwt-4.png)
![](img/app-running-jwt-5.png)
![](img/app-running-jwt-6.png)
![](img/app-running-jwt-7.png)
![](img/app-running-jwt-8.png)

# 13 - Calling end points in the backend especially created for user and admin

We have to hit those endpoints from the UI

![](img/hit-end-points.png)

Inside user service we ill add two functions
`forAdmin()`
`forUser()`
![](img/user-service-forAdmin-forUser.png)
![](img/user-component-ts.png)
![](img/user-component-html.png)
![](img/app-running-for-user.png)

Write the same thing for admin component, similar like in user component.