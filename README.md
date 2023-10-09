## MS (Mitra Service)

### Requirement

- Please install docker 
- Please install nodejs version 16 above
- Make command (Linux/MacOS)

### Install

#### Linux/MacOS
Please run below command
- make build
- make setup
- make create-db
- make init

After that, if you want to run again container after restart or shutdown docker, just run `make setup`

### Windows
Please run below command
- cd container
- docker-compose build (to build image)
- docker volume create --name=ms-mysql-data (create volume for database)
- docker-compose -p ms-container up -d (create container)
- docker exec -i ms-db sh -c "MYSQL_PWD=root exec mysql -u root" < container/mysql/database.sql (create db)
- docker exec -ti php-ms make _init
