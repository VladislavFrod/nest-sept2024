Контрольну роботу підготовив Рущак Владислав
Більшість інформації було взято з мого старого проекту -так як це повторне проходження цього модулю -
і я вже був створив проект (для карів і потім вже під інтернет магазин)-
 Помилка в платформі цього проекту(Створив його на next js) але всі - модулі встановив для nest js

Колекції постмана немає так як вся інформація є в свагері http://localhost:3000/api-docs

Ось дані для env та дані для входу в адмін аккаунт

APP_PORT=3000
APP_HOST=localhost
#Optionaly Time Zone can be set
#TZ="Kyiv/Europe"

#Admin user
FIRST_NAME=admin
LAST_NAME=admin
MAIL=admin@gmail.com
PASSWORD=Csfe4354D$
PHONE=+381223322344
#ROLE=ADMIN
ROLE=ADMIN

#Postgres
POSTGRES_PORT=5435
POSTGRES_HOST=localhost
POSTGRES_USER=frod
POSTGRES_PASSWORD=frodpassword
POSTGRES_DB=db-postgres_frod

#Redis
REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_PASSWORD=frodpass

#JWT
JWT_ACCESS_SECRET=sffefsdfe45543tef
JWT_ACCESS_EXPIRE=36000
JWT_REFRESH_SECRET=sfsggrree45thySDAWDFF
JWT_REFRESH_EXPIRE=100000

### AWS Config ###
AWS_S3_REGION=us-east-1
AWS_S3_KEY_ID=frod
AWS_S3_ACCESS_KEY=frodpassword
AWS_S3_BUCKET_NAME=db-local-aws-s3
AWS_S3_BUCKET_URL=http://localhost:8000/db-local-aws-s3
AWS_S3_LOCAL_BUCKET=http://localhost:8000/