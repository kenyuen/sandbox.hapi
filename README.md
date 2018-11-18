# sandbox.hapi
Sandbox API playground based on nodeJS, hapi, mongoose/mongo and graphQL

The intent is to back this by a mongodb based on mLab

``` json
mongodb://<dbuser>:<dbpassword>@ds211694.mlab.com:11694/sandbox
```
## Setup on Ubuntu

### Install NodeJS
```bash
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Set up from scratch
```
npm init

npm install --save hapi
npm install --save nodemon
npm install --save mongoose 
npm install --save apollo-server-hapi
npm install --save graphql
npm install --save inert
npm install --save vision hapi-swagger 

```
### Install mongoDb
```bash
sudo apt install -y mongodb
# check service status
sudo systemctl status mongodb
```

##### Mongo reference: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04

### add npm packages
```bash
npm add hapi --save
npm add nodemon
npm add mongoose
npm add apollo-server-hapi
npm add graphql
npm add inert
npm add vision hapi-swagger 
```

## to Run

```bash
npm start
```
