rm -rf bin/
tsc --watch &

cd html;
rm -rf bin index.cs*
cd ts; tsc --watch &
cd ..
sass --watch sass/index.scss index.css 