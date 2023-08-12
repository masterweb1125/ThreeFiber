# Pure static web service
FROM busybox:latest

ADD build/ /srv/
EXPOSE 80

CMD /bin/httpd -f -h /srv/
