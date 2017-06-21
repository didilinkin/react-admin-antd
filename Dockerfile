FROM node

RUN mkdir /runtime
WORKDIR /runtime

RUN npm init -y

#install gulp for auto build
RUN npm install --save-dev gulp gulp-uglify;
RUN npm install --save-dev del;
RUN npm install --save-dev vinyl-source-stream;
RUN npm install --save-dev browserify;
RUN npm install --save-dev reactify;
RUN npm install --save-dev react react-dom;


#install react and build tool
#RUN npm install -g browserify
#RUN npm install --save-dev react react-dom babelify babel-preset-react

#add gulpfile
ADD . /runtime

CMD ["bash", "run.sh"]
