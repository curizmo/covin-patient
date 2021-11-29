The patient app for phoenix.

## Setup

Change directory to the project folder i.e `covin-patient` folder

```shell
$ cd covin-patient
```

Install dependencies

```shell
$ yarn
```

Create an env file

```shell
$ cp .env.example .env
```

<strong>Note: Your .env file is where app credentials are stored [locally](https://docs.google.com/document/d/1_9vfTitCVBkhUFAraPkeC1zeUAxMgPgZ/edit). These credentials are read by the config.js file during runtime. If you need the config variables, please contact one of the contributors.</strong>

## Local development

```shell
$ npm start
```


## To View the application locally add the patient's hash code to the url:

[http://localhost:3000/patient-hash-code](http://localhost:3000/)

