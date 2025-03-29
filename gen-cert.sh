mkdir -p ./certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ./certs/nginx.key \
  -out ./certs/nginx.crt \
  -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=reference-app"