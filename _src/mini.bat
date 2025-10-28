docker build -t minify .
docker run --rm -v .:/work minify ./work/main.js -o ./work/all.min.js -c -m
move "all.min.js" ..\