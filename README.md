# Miniature-Learning-Management-System

A miniature Learning Management System (LMS) in the form of a RESTful API and  HTML forms for create only.
The system have two entities: Course and Student with a full CRUD operations (Create, read, update and delete).


## Specifications:
### Course entity have the following properties:

- name: string, required, min length of 5 characters
- code: string, required, must match 3 letters followed by 3 numbers.
- id: integer, auto generated.
- description: string, optional, max length of 200 characters.

### Student entity have the following properties:

- name: string, required, only letters in both cases, apostrophe and dashes are allowed.
- code: string, required, must match 7 characters.
- id: integer, auto generated.


* The endpoints for  API  looks like /api/courses/.. and /api/students/..
* The endpoints for  forms  looks like /web/courses/create and /web/students/create

### Data stored in a unstructured database  (Firebase)

## Deployment Heroku link

https://shielded-caverns-17083.herokuapp.com/
