from typing_extensions import Annotated
from fastapi import APIRouter, Path, HTTPException, Depends, status
from pydantic import BaseModel, Field
from database import SessionLocal
from sqlalchemy.orm import Session
from .auth import get_current_user
from models import Users

router = APIRouter( 
    prefix = '/profile',
    tags=['profile'] )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
class updateUserRequest(BaseModel):
    username: str
    email: str
    name: str
    mobile: str
    address: str
    employee_id: str        
        
db_dependency = Annotated[Session, Depends(get_db)]  
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.get("/", status_code=status.HTTP_200_OK)
async def read_user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return db.query(Users).filter(Users.username == user.get('username')).first()


@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
async def update_user_details(
        user: user_dependency,
        db: db_dependency,
        user_request: updateUserRequest
    ):
    
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    # Find user by username from the token
    user_model = db.query(Users).filter(Users.username == user.get("username")).first()
    if user_model is None:
        raise HTTPException(status_code=404, detail="User not found.")

    # Update the allowed fields
    user_model.email = user_request.email
    user_model.name = user_request.name
    user_model.mobile = user_request.mobile
    user_model.address = user_request.address
    user_model.employee_id = user_request.employee_id

    db.add(user_model)
    db.commit()
