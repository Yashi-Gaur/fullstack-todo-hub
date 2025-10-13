from fastapi import FastAPI, Security, HTTPException, Depends, status
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from database import engine
import models
from routers import auth
 
app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
# Hardcoded users
USERS = [
    {
        "username": "admin",
        "password": "admin123",
        "name": "Admin User",
        "email": "admin@example.com",
        "mobile": "1234567890",
        "employee_id": "EMP001",
        "address": "123 Admin Street",
        "token": "token-admin-123",
    },
    {
        "username": "john",
        "password": "johnpass",
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "9876543210",
        "employee_id": "EMP002",
        "address": "456 John Lane",
        "token": "token-john-456",
    },
    {
        "username": "jane",
        "password": "janepass",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "mobile": "9876543210",
        "employee_id": "EMP003",
        "address": "456 Jane Lane",
        "token": "token-jane-789",
    },
    {
        "username": "alice",
        "password": "alicepass",
        "name": "Alice Cooper",
        "email": "alice@example.com",
        "mobile": "9876543210",
        "employee_id": "EMP004",
        "address": "456 Alice Lane",
        "token": "token-alice-abc",
    },
    {
        "username": "bob",
        "password": "bobpass",
        "name": "Bob Marley",
        "email": "bob@example.com",
        "mobile": "9876543210",
        "employee_id": "EMP005",
        "address": "456 Bob Lane",
        "token": "token-bob-def",
    },
]
 
# User-specific tasks stored as {username: [tasks]}
TASKS = {
    "admin": [
        {"id": 1, "title": "Review reports", "completed": False, "order": 1},
        {"id": 2, "title": "Update system settings", "completed": False, "order": 2},
    ],
    "john": [
        {"id": 1, "title": "Buy groceries", "completed": False, "order": 1},
        {"id": 2, "title": "Call client", "completed": False, "order": 2},
    ],
    "jane": [
        {"id": 1, "title": "Finish presentation", "completed": False, "order": 1},
        {"id": 2, "title": "Organize files", "completed": False, "order": 2},
    ],
    "alice": [
        {"id": 1, "title": "Prepare budget", "completed": False, "order": 1},
        {"id": 2, "title": "Team meeting", "completed": False, "order": 2},
    ],
    "bob": [
        {"id": 1, "title": "Write blog post", "completed": False, "order": 1},
        {"id": 2, "title": "Practice guitar", "completed": False, "order": 2},
    ],
}
 
# Pydantic models
class LoginRequest(BaseModel):
    username: str
    password: str
 
class TokenResponse(BaseModel):
    token: str
 
class Task(BaseModel):
    id: int
    title: str
    completed: bool
    order: int
 
class CompleteTaskRequest(BaseModel):
    id: int
    order: int
 
class UserProfile(BaseModel):
    username: str
    name: str
    email: str
    mobile: str
    employee_id: str
    address: str
 
api_token = APIKeyHeader(name="Authorization", auto_error=True)
 
# Dependency to get current user by token
# def get_current_user(authorization: Optional[str] = Header(None)):
def get_current_user(authorization: str = Security(api_token)):
    user = next((u for u in USERS if u["token"] == authorization), None)
    if user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user
 
# Routes
 
@app.post("/api/login", response_model=TokenResponse)
def login(data: LoginRequest):
    user = next((u for u in USERS if u["username"] == data.username and u["password"] == data.password), None)
    if user:
        return {"token": user["token"]}
    raise HTTPException(status_code=401, detail="Invalid username or password")

@app.get("/api/profile", response_model=UserProfile)
def profile(user=Depends(get_current_user)):
    return {
        "username": user["username"],
        "name": user["name"],
        "email": user["email"],
        "mobile": user["mobile"],
        "employee_id": user["employee_id"],
        "address": user["address"],
    }

@app.put("/api/profile")
def update_profile(data: UserProfile, user=Depends(get_current_user)):
    for u in USERS:
        if u["username"] == user["username"]:
            u.update({
                "name": data.name,
                "email": data.email,
                "mobile": data.mobile,
                "employee_id": data.employee_id,
                "address": data.address,
            })
            return {"message": "Profile updated"}
    raise HTTPException(status_code=404, detail="User not found")

@app.get("/api/tasks", response_model=List[Task])
def get_tasks(user=Depends(get_current_user)):
    return TASKS.get(user["username"], [])
 
@app.put("/api/tasks/complete")
def complete_task(data: CompleteTaskRequest, user=Depends(get_current_user)):
    user_tasks = TASKS.get(user["username"], [])
    for task in user_tasks:
        if task["id"] == data.id:
            task["completed"] = not task["completed"]
            task["order"] = data.order
            return {"message": "Task completed"}
    raise HTTPException(status_code=404, detail="Task not found")
 
 
class AddTaskRequest(BaseModel):
    title: str
    order: int
 
@app.post("/api/tasks/add", response_model=Task)
def add_task(data: AddTaskRequest, user=Depends(get_current_user)):
    user_tasks = TASKS.setdefault(user["username"], [])
    new_id = max([task["id"] for task in user_tasks], default=0) + 1
    new_task = {"id": new_id, "title": data.title, "completed": False, "order": data.order}
    user_tasks.append(new_task)
    return new_task
 
class UpdateTaskRequest(BaseModel):
    id: int
    title: str
 
@app.put("/api/tasks/update")
def update_task(data: UpdateTaskRequest, user=Depends(get_current_user)):
    user_tasks = TASKS.get(user["username"], [])
    for task in user_tasks:
        if task["id"] == data.id:
            task["title"] = data.title
            return {"message": "Task updated"}
    raise HTTPException(status_code=404, detail="Task not found")
 
class DeleteTaskRequest(BaseModel):
    id: int
 
@app.post("/api/tasks/delete")
def delete_task(data: DeleteTaskRequest, user=Depends(get_current_user)):
    user_tasks = TASKS.get(user["username"], [])
    filtered_tasks = [task for task in user_tasks if task["id"] != data.id]
    if len(filtered_tasks) == len(user_tasks):
        raise HTTPException(status_code=404, detail="Task not found")
    TASKS[user["username"]] = filtered_tasks
    return {"message": "Task deleted"}