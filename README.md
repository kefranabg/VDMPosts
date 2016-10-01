# VDMPosts
This project provides a tool and a REST api allowing to do the following :
* Get the 200 last posts of the VDM website (http://www.viedemerde.fr/) and store them to a Mongo database.
* Manipulate the posts through a REST api.

# Environment Required
* Nodejs
* Local mongodb running

# Install

### Install grunt cli
```sh
$ npm install grunt-cli -g
```

### Install mocha cli
```sh
$ npm install mocha -g
```

### Install dependencies
Go to the root of the project and use the following command line :
```sh
$ npm install
```

# Features

### Scan VDM last posts
```sh
$ grunt get-posts
```
This will retrieve the 200 last posts from http://www.viedemerde.fr/ and store them to the local database.

### Run the REST api
```sh
$ grunt serve
```
This will run the REST api.

### Remove all posts
You can delete all the posts by using the following command :
```sh
$ grunt delete-posts
```

# Use the REST api
The posts can be access on localhost with the default port 3000. You can modify the port by modifying the environment variable 'PORT'.
The route to get posts is the following :
``/api/posts``

Output :

```
{
    "posts":[
        {
            "_id":1,
            "content":"This is the content.",
            "date":"2014-01-0100:00:00",
            "author":"Genius"
        }
    ],
    "count":1
}
```

Several parameters are available :
 * ``from=YYYY-MM-DD`` allow to get posts from this date
 * ``to=YYYY-MM-DD`` allow to get posts until this date
 * ``author=XXXXX`` allow to get posts from this author

You can access one post with the following route :
``/api/posts/<id>``

Output :

```
{
    "post": {
        "id":1,
        "content":"This is the content.",
        "date":"2014-01-0100:00:00",
        "author":"Genius"
    }
}
```

# Tests

/!\ The REST api must be running to launch unit tests /!\

Unit tests can be run with the following command :

```sh
$ grunt test
```

If you want to run a test one at a time, you can use the following command :

```sh
$ mocha <name-of-the-test-file>
```
# App architecture

The application is divided in 5 parts :

* [api]

    - The controllers folder contains js files that will build the CRUD requests.
    - The models folder contains js files that will define a mongodb document structure.
    - The routes folder contains js files that will defines the routes of the REST api.

* [tests]

    This folder contains js files needed to run unit tests.

* [vdm-data]

    This folder contains js files needed to extract and parse the data from the VDM website.

* [scripts]

    This folder contains scripts that allows to delete all posts from the database and launch the data transfer between VDM website and the database.

* [config]

    This folder contains all configurations like the database uri, express settings ...


