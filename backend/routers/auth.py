from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from database import SessionLocal
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from starlette import status
from models import Users
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError

router = APIRouter( 
    prefix = '/user',
    tags=['user'] )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]  

SECRET_KEY = '197b2c37c391bed93fe80344fe73b806947a65e36206e05a1a23c2fa12702fe3'
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='user/token')

class createUserRequest(BaseModel):
    username: str
    email: str
    name: str
    mobile: str
    address: str
    password: str
    employee_id: str
    
class Token(BaseModel):
    access_token: str
    token_type: str

def authenticate_user(username, password, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, 
                        id: int, 
                        expires_delta: timedelta):
    encode = {'sub': username, 'id': id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        user = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = user.get('sub')
        id: int = user.get('id')
        if username is None or id is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail='Could not validate user1.')
        return {'username': username, 'id': id}
    except JWTError as e:
        print("JWT decode error:", e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user2.')   

@router.get('/all', status_code=status.HTTP_200_OK)
async def get_user(db: db_dependency):
    return db.query(Users).all()
    
@router.post('/new-user', status_code=status.HTTP_201_CREATED)
async def create_user(db:db_dependency, create_user_request: createUserRequest):
    create_user_model = Users(
        username=create_user_request.username,
        email=create_user_request.email,
        name=create_user_request.name,
        mobile=create_user_request.mobile,
        address=create_user_request.address,
        employee_id=create_user_request.employee_id,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )

    db.add(create_user_model)
    db.commit()


@router.post('/token', response_model=Token)
async def login_for_token_access(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user.')
    token = create_access_token(user.username, user.id, timedelta(hours=2))
    
    return {'access_token': token, 'token_type': 'bearer'}
    