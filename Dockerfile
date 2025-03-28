
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN npm install --frozen-lockfile

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ARG REACT_APP_BASE_URL_API
ENV REACT_APP_BASE_URL_API=${REACT_APP_BASE_URL_API}

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]