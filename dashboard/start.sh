#!/bin/bash

#!/bin/sh
while ! curl http://mongo:27017/
do
  echo "$(date) - still trying"
  sleep 1
done
echo "$(date) - connected successfully"

cd /app/backend && npm run-script production