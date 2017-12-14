# Demo

This demo is made of the following pieces:

* book-api : a microservice to create books
* isbn-api : a microservice to generate ISBN number
* gateway : an angular app to CRUD books

Being a microservice architecture, it needs :

* JHipster Registry (Eureka) : `$ docker-compose -f gateway/src/main/docker/jhipster-registry.yml up`
* Keycloak : `$ docker-compose -f gateway/src/main/docker/keycloak.yml up`

To be able to login to the JHipster Registry, you need to add into your /etc/host:

```
127.0.0.1  keycloak
```